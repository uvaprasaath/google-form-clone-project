import React, { useEffect, useState } from "react";
import { getAnswers } from "../../services/formservice";
import PageBuilder from "../Pagebuilder";
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { QuestionType } from "../../utils";
import FlexBetween from "../../components/Flexbetween";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Answer from "../answer";
import { useNavigate } from "react-router-dom";

function ViewAnswers({ data, loading, error, loadData, formId, sections }) {
  let isNonMobile = useMediaQuery("(min-width:740px)");
  let [currentResponseIndex, setCurrentResponseIndex] = useState(0);
  let [currentResponse,setCurrentResponse] = useState([]);
  let navigate = useNavigate();
  const fetchData = async () => {
    try {
      return await getAnswers(formId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => { 
    loadData(fetchData);
  }, [formId]);

useEffect(()=>{
    if(data){
        setCurrentResponseIndex(0)
    }
},[data])

  useEffect(() => {
    // if(data){
    // navigate('answer',{state:{sections,data:data[currentResponseIndex]}})
    // }
  }, [currentResponseIndex]);

  return (
    <Box
      sx={{
        backgroundColor: "#f0ebf8",
        height: "100%",
        width: "100%",
      }}
    >
      {loading ? (
        <Box
          sx={{
            backgroundColor: "#f0ebf8",
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
            backgroundColor: "#f0ebf8",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          Server Error
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: "#f0ebf8",
            width: "100%",
            justifyContent: "start",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {data && data.length ? (
            <Box
              sx={{
                paddingY:2,
                width: isNonMobile ? "50%" : "94%",
              }}
            >
             <Box  sx={{
                padding:2,
                backgroundColor:"white",
                borderRadius:2,
                width: "100%",
              }}>
                <FlexBetween>
                            <Typography sx={{ fontWeight: "bold" }}>
                            {data.length} Responses
                            </Typography>
                            <FlexBetween>
                                <IconButton onClick={()=>{
                                    setCurrentResponseIndex(currentResponseIndex-1)
                                }}  sx={{color:"black",visibility:currentResponseIndex>0?"visible":"hidden"}}><ArrowBackIos/></IconButton>
                                <Typography>{currentResponseIndex+1} of {data.length}</Typography>
                                <IconButton onClick={()=>{
                                    setCurrentResponseIndex(currentResponseIndex+1)
                                }} sx={{color:"black",visibility:currentResponseIndex<data.length-1?"visible":"hidden"}}><ArrowForwardIos/></IconButton> 
                            </FlexBetween>
                </FlexBetween>
             </Box>
              <Answer key={data[currentResponseIndex]._id} sections={sections} data={data[currentResponseIndex]} currentIndex={currentResponseIndex}/>
            </Box>
          ) : ( 
            "No Responses Found"
          )}
        </Box>
      )}
    </Box>
  );
}


export default PageBuilder(ViewAnswers);
