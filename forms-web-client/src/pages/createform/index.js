import {
  Box,
  Dialog,
  CircularProgress,
  Tab,
  Tabs,
  TextField,
  Typography,
  Switch,
} from "@mui/material";
import React, { useState } from "react";
import CreateOrEditQuestions from "../createoreditquestions";
import FlexBetween from "../../components/Flexbetween";
import formIcon from "../../assets/form_icon.png";
import { TextFieldsOutlined } from "@mui/icons-material";
import { addForm, updateForm } from "../../services/formservice";
import { Authstate } from "../../components/aurthprovider";
import { useLocation, useNavigate } from "react-router-dom";
import ViewAnswers from "../viewanswers";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{ height: "91%" }}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const handler = { isLoading: false, isError: false };

function CreateForm() {
  const navigate = useNavigate();
  let location = useLocation();
  let sectionForEditing = location.state;
  const [value, setValue] = React.useState(0);
  const { user } = Authstate();
  const [formStatus,sdetFormStatus] = useState( sectionForEditing ? sectionForEditing.isActive:undefined)
  const [formTitle, setTitle] = useState(
    sectionForEditing ? sectionForEditing.title : "Untitled Form"
  );
  const [handling, setHandling] = useState({ ...handler });
  const createForm = async (sections) => {
    setHandling({ ...handling, isLoading: true });
    let result;
    try {
      if (sectionForEditing) {
        result = await updateForm(sectionForEditing._id, {
          title: formTitle,
          isActive:formStatus,
          userId: user.userId,
          sections,
          updatedAt: new Date(),
        });
      } else {
        result = await addForm({
          title: formTitle,
          userId: user.userId,
          sections,
        });
      }

      console.log("the result is ", result);
      if (result.data.header.code === 600) {
        navigate(-1, { state: true });
      }
    } catch (error) {
      console.log("the error is ", error);
    } finally {
      setHandling({ ...handler });
    }
  };

  const statusHandler = ()=>{
    sdetFormStatus(!formStatus)
  }

  const handleChange = (__, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ height: "100%" }}>
      <FlexBetween sx={{ height: "9%" }}>
        <FlexBetween flexGrow={1}>
          <Box sx={{ margin: "8px" }}>
            <img src={formIcon} alt="" />
          </Box>
          <TextField
            value={formTitle}
            onChange={(val) => {
              setTitle(val.target.value);
            }}
            sx={{
              "& .MuiInput-underline:before": {
                borderBottom: "none",
              },
            }}
            disabled={value > 0}
            variant="standard"
          />
           {sectionForEditing &&  <Box sx={{marginLeft:"auto", display:"flex",width:"100%",justifyContent:"end",alignItems:"center"}}><Typography sx={{color:"red"}}>Deactivate Form</Typography><Switch  value={!formStatus} onChange={()=>{
                      statusHandler();
                 }} checked={!formStatus} /></Box>}
        </FlexBetween>
      </FlexBetween>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab sx={{ textTransform: "none" }} label="Questions" />
          {sectionForEditing && (
            <Tab sx={{ textTransform: "none" }} label="Responses" />
          )}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CreateOrEditQuestions
        formStatus={formStatus}
        onStatusChange={statusHandler}
          exixtingSection={sectionForEditing?.sections}
          onSubmit={(sections) => {
            createForm(sections);
          }}
        />
      </CustomTabPanel>
      {sectionForEditing && (
        <CustomTabPanel value={value} index={1}>
          <ViewAnswers
            formId={sectionForEditing._id}
            sections={sectionForEditing?.sections}
          />
        </CustomTabPanel>
      )}
      <Dialog open={handling.isLoading}>
        <Box
          sx={{
            padding: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography>Creating...</Typography>
        </Box>
      </Dialog>
    </Box>
  );
}

export default CreateForm;
