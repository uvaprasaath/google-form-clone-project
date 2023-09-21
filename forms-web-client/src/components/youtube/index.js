import { Close, Search } from "@mui/icons-material";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material";
import FlexBetween from "../Flexbetween";
import { useCallback, useEffect, useState } from "react";
import youtube from "../../assets/youtube.svg"
import { formatDate, formattedDate } from "../../utils";
import { getYoutubeVideos } from "../../services/formservice";

let isScrolled = false;
let handling = {isLoading:false,isError:false,data:[]};

let style ={
    border:2,borderColor:"pink",borderRadius:1
}
export function YouTubeDialog({open,handleClose,onSelectHandler}){
    let [searchTexrt,setSearchText] = useState("");
    let [selectedVideo,setSelectedVideoIndex] = useState(-1); 
    let [searchandling,setSearchHandling] = useState({...handling})
    const handleScroll = () => {
      const scrollableDiv = document.getElementById('scrollableDiv');
      if (scrollableDiv) {
        const scrollPosition = scrollableDiv.scrollTop + scrollableDiv.clientHeight;
        const scrollHeight = scrollableDiv.scrollHeight;
  
        // Determine if the user has scrolled to the second-last item
        if (scrollHeight - scrollPosition < 200 && !isScrolled ) {
           
        }
      }
    };
    useEffect(()=>{
        console.log("the searvh handling is ",searchandling)
    },[searchandling])

   const fetchData = useCallback(async()=>{
    setSearchHandling({...searchandling,isLoading:true})
    try {
        let res = await getYoutubeVideos(searchTexrt);
        let updatedData = res.data.items ;
        console.log("res is yoputube ",res.data.items)
        setSearchHandling({isError:false,data:[...updatedData],isLoading:false});
    } catch (error) {
        setSearchHandling({isError:true,data:[],isLoading:false});
      console.log("thge eror ",error)  
    }
   }
)
    useEffect(()=>{
        // setSearchHandling({...searchandling,data})
    },[])
    return (
        <Dialog fullWidth  maxWidth="md" open={open} >
              <DialogTitle
    sx={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Typography
      variant="h5"
      textAlign="center"
      component="h1"
      fontWeight="bold"
      gutterBottom
    >
      Select Video
    </Typography>
    <IconButton onClick={handleClose} sx={{ ml: 'auto' }}>
      <Close />
    </IconButton>
  </DialogTitle>
  <DialogContent id="scrollableDiv" onScroll={handleScroll} style={{ maxHeight: '70vh', overflowY: 'auto' ,overflowX:"hidden"}}>
            <Box  marginTop={2} sx={{height:"60vh"}}>
                <Grid container columnGap={2} alignItems="center">
                    <Grid item>
                        <img height="50px" width="40px"  src={youtube}/>
                    </Grid>
                    <Grid item >
                    <Typography sx={{fontSize:"1.5rem",fontWeight:'bolder'}}>Youtube</Typography>
                    </Grid>
                    <Grid item sm={12} md={3}>
                    <TextField
                    placeholder="Seacrh"
                   variant="outlined"
                   value={searchTexrt}
                   onChange={(val)=>{
                    setSearchText(val.target.value);
                   }}
                 />
                    </Grid>
                    <Grid item >
                    <IconButton onClick={()=>{
                        fetchData(searchTexrt);
                    }}>
                    <Search/>
                 </IconButton>
                    </Grid>
                </Grid>
{searchandling.isLoading?<CircularProgress/>: searchandling.isError?<Typography>Something wentwrong</Typography> : searchandling.data && searchandling.data.length ? 
(searchandling
    .data.map((v,i)=><div onClick={()=>{
        setSelectedVideoIndex(i)
    }}>
       <Box sx={selectedVideo === i ? {display:"flex",marginY:1 ,padding:0.5,...style} : {display:"flex",marginY:1 ,padding:0.5}}>
       <img src={v.snippet.thumbnails.default.url} alt=""/>
       <div style={{justifyContent:"space-between",display:"flex",flexDirection:"column"}}>
          <Typography variant="body1" sx={{fontWeight:"bold",padding:1,maxLines:2,lineHeight:'1.2em'}}>{v.snippet.title}</Typography>
          <Typography  sx={{maxLines:2,lineHeight:'1.2em', padding:1,textOverflow: 'ellipsis'}}>{v.snippet.description}</Typography>
          <Typography sx={{padding:1}}>{formatDate(v.snippet.publishedAt)}</Typography>
       </div>
       </Box>
    </div>))
: <Typography>No Results found</Typography>}
                </Box>
      </DialogContent>
      <DialogActions >
        <Button onClick={()=>{
            onSelectHandler({"thumbnail":searchandling
            .data[selectedVideo].snippet.thumbnails.medium.url,"id":searchandling
            .data[selectedVideo].id.videoId})
        }} variant="contained" color="primary">
          Select
        </Button>
        <Button onClick={()=>{
            handleClose();
            setSelectedVideoIndex(-1);
            setSearchText('');
            setSearchHandling({...handling});
        }} variant="outlined" color="primary">
          Cancel
        </Button>
      </DialogActions>
        </Dialog>
    )
}