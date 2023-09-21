import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Box, CircularProgress, Dialog, Fab, IconButton, Typography, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Outlet, useNavigate } from "react-router-dom";
import PageBuilder from "../Pagebuilder";
import { getForm, getForms } from "../../services/formservice";
import { Authstate } from "../../components/aurthprovider";
import { DataGrid } from "@mui/x-data-grid";
import SnackbarComponent from "../../components/snackbar";
import { formatTimeDifference } from "../../utils";
import { LinkOffOutlined, LinkOutlined } from "@mui/icons-material";
import Trend from "../../components/trend";

const handler = {isLoading:false,isError:false,isSuccess:false};
function Forms({ data, loading, error, loadData }) {
  let navigate = useNavigate();
  const { user } = Authstate();
  const [open,setOpen] = useState(false);
  const [page,setPage] = useState(0);
  const [pageSize,setPageSize] = useState(20);
  const [handling,setHandling] = useState(handler)
  let isNonMobile = useMediaQuery("(min-width:740px)");
  const fetchData = async () => {
    try {
      return await getForms(user.userId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = ()=>{
    setOpen(false);
  }


    const getFormData = async (formId) => {
      setHandling({...handling,isLoading:true})
      try {
        let response = await getForm(formId);
        setHandling({...handler});
        navigate('edit',{state:response.data.body.value})

      } catch (error) {
        console.log(error);
        setHandling({...handling,isLoading:false,isError:true})
      }
    };

    
 const handleSnackbarClose = () => {
  setHandling({...handler})
};

  useEffect(() => {
    loadData(fetchData);
  }, []);

  const columns = [
    { field: 'title', headerName: 'Title' , width : 160},
    { field: 'createdAt', headerName: 'Created',width:200,renderCell: (params) => {
  
      const formattedTime = formatTimeDifference(params.value);
      return <span>{formattedTime}</span>;
    }},
    
    { field: 'updatedAt', headerName: 'Last Modified',width:200,renderCell: (params) => {
      const formattedTime = formatTimeDifference(params.value);
      return <span>{formattedTime}</span>;
    },},
  { field: 'isActive', headerName: 'Status' , width : 160,
  renderCell:(params)=>{
    return <span style={{color:params.value?"green":"red"}}>{params.value?"Active":"InActive"}</span>
  }
},
{field:"_id",headerName: 'Shareable link',renderCell:(params)=>{
  return  <IconButton onClick={(e)=>{
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/forms/${params.value}`)
    .then(() => {
       setOpen(true)
    })
    .catch((error) => {
      console.error('Failed to copy link: ', error);
    });
  }} >
  <LinkOutlined />
</IconButton>
}},
{field:"views",headerName:"Views"},
  ];

  const dataGridStyle = {
    border: 'none',
  };
  
  const headerCellStyle = {
    fontWeight: 'bold', 
  };


  return (
    <>
      <NavBar />
      {loading ? (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            justifyContent: "start",
            display: "flex",
            alignItems: "center",
          }}
        >
          Server Error
        </Box>
      ) : (
        <Box
          sx={{
            marginX:isNonMobile?0:3,
            height: "100%",
            width: "100%",
            flexDirection:"column",
            justifyContent: "start",
            display: "flex",
            alignItems: "center",
          }}
        >
           <div style={{ height: "89%", width: isNonMobile ? "70%" : '100%' }}>
            <Typography  sx={{marginY:1,fontSize:"2rem",fontWeight:"bold"}}>Form Statistics</Typography>
           <Trend/>
           <Typography  sx={{marginY:1,fontSize:"2rem",fontWeight:"bold"}}>My Forms</Typography>
      <DataGrid
      sx={{marginY:1}}
      autoHeight
        getRowId={(row) => row._id}
        rows={data || []}
        page={page}
              pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onRowClick={(val)=>{
           console.log("th row clicked is ",val)
           getFormData(val.id);
        }}
        columns={columns}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </div>
    <Dialog open={handling.isLoading}>
       <Box sx={{padding:"30px",display:"flex",justifyContent:"center",alignItems:"center",gap:2}}><CircularProgress /><Typography>Fetching...</Typography></Box>
    </Dialog>
    <SnackbarComponent
        open={handling.isError}
        message={"Something went wrong"}
        onClose={handleSnackbarClose}
      />
        </Box>
      )}
      <Fab
        sx={{ position: "absolute", bottom: 20, right: 10 }}
        color="white"
        aria-label="add"
      >
        <IconButton
          onClick={() => {
            navigate("edit");
          }}
        >
          <AddIcon />
        </IconButton>
      </Fab>
      <Box>
        <Outlet></Outlet>
      </Box>
      <SnackbarComponent
        open={open}
        message="Link Copied"
        onClose={handleClose}/>
    </>
  );
}

export default PageBuilder(Forms);
