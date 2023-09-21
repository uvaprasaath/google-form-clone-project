import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageBuilder from "../Pagebuilder";
import { getForm, postAnswers, updateViews } from "../../services/formservice";
import { Box, CircularProgress, Dialog, Typography, useMediaQuery } from "@mui/material";
import FormPage from "../formpage";
import { QuestionType } from "../../utils";
import { useForm } from "react-hook-form";
import SnackbarComponent from "../../components/snackbar";
import ResponseSuccess from "../responsesuccess";
import ErrorPage from "../404error";




const handler = {isLoading:false,isError:false,isSuccess:false};
let isViewUpdated = false;
function ResponseForm({ data, loading, error, loadData }) {
  let params = useParams();
  let formId = params.id;
  let isNonMobile = useMediaQuery("(min-width:740px)");
  const [handling,setHandling] = useState(handler);
  let responses = useRef([]);
  let [isSuccess,setSuccess] = useState(false)
  let defaultForm = useRef({});
  let [currentIndex,setCurrentIndex] = useState(0);

function generateDefaultForm(sections){
   defaultForm = {};
   sections?.forEach((section)=>{
       let questionForm = generateFormHook(section.questions);
       defaultForm.current =  {...defaultForm.current,...questionForm};
   })
   console.log("the defaulte values are ",defaultForm.current)
}

  function generateFormHook(questions){
    let defaultValues = {}; 
    questions.forEach((question)=>{
     if(question.type===QuestionType.CHECKBOX){
       defaultValues[`${question._id}`] = [];
     }else{
      defaultValues[`${question._id}`] = "";
     }
    })
    return defaultValues;
 }

 function generateAnswers(dataToBeSubmitted){
   let sectionsResponses = [];
   data?.sections?.forEach((section)=>{
      let sectionResponse = {sectionId:section._id,"responses":[]};
      section.questions.forEach(({_id})=>{
        sectionResponse.responses.push({"questionId":[`${_id}`],"response":dataToBeSubmitted[`${_id}`]})
      })
      sectionsResponses.push(sectionResponse);
   })
   return sectionsResponses;
 }



 const postSectionAnswers = useCallback(async(requestBody,reset)=>{
   setHandling({...handling,isLoading:true})
  try {
    
    await postAnswers(requestBody)
    // reset(defaultForm.current);
    setHandling({isLoading:false,isError:false,isSuccess:true})
    setSuccess(true)
   
  } catch (error) {
    console.log("the form error",error)
   setHandling({...handling,isLoading:false,isError:true})
  }finally{
    setHandling({...handler})
  }
 },[])
 


 const handleSnackbarClose = () => {
    setHandling({...handler})
};
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        return await getForm(formId,true);
      } catch (error) {
        console.log(error);
      }
    };
    loadData(fetchData);
    if(!isViewUpdated){
      updateViews(formId);
      isViewUpdated = true;
    }
    console.log("awzsdxfcvgybuhnjkjhjfgd")
  }, [formId]);


  useEffect(()=>{
    responses.current = Array(data?.sections?.length||0)
    generateDefaultForm(data?.sections);
    // console.log("the current form is ",currentForm)
  },[data])


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
         <ErrorPage/>
        </Box>
      ) : (
       isSuccess ? <ResponseSuccess formTitle={data?.title}/> : <Box
          sx={{
            marginX:isNonMobile?0:3,
            backgroundColor: "#f0ebf8",
            width: "100%",
            justifyContent: "start",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
       {/* { data.sections.map((_,index)=><>
       { index === currentIndex && 
        */}
       <FormPage formObject={defaultForm.current} forms={responses} section={data.sections[currentIndex]}
       submitHandler={(formData,reset)=>{
           let resSections =  generateAnswers(formData,reset);
           postSectionAnswers({"formId":data?._id,"sections":resSections})
       }}
       currentIndex={currentIndex} nextHandler={(formValue)=>{
        if(currentIndex!==data.sections.length-1){
           setCurrentIndex(currentIndex+1);
        }
           responses.current[currentIndex] = formValue;
         } }  previousHandler={()=>{
             setCurrentIndex(currentIndex-1);
         }}  totalLength={data.sections.length}/>
         
         {/* }
       </>) } */}
        </Box>
      )}
            <Dialog open={handling.isLoading}>
       <Box sx={{padding:"30px",display:"flex",justifyContent:"center",alignItems:"center",gap:2}}><CircularProgress /><Typography>Submitting...</Typography></Box>
    </Dialog>
    <SnackbarComponent
        open={handling.isError}
        message={"Something went wrong"}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
}

export default PageBuilder(ResponseForm);
