import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import FlexBetween from "../../components/Flexbetween";
import { QuestionType } from "../../utils";
import {
  AddBoxRounded,
  AddCircleOutline,
  CheckBox,
  CheckBoxOutlineBlankOutlined,
  Close,
  CloseOutlined,
  DeleteOutlineRounded,
  InsertPageBreakOutlined,
  PageviewRounded,
  RadioButtonCheckedRounded,
  RadioButtonUncheckedRounded,
  TextFieldsRounded,
  YouTube,
} from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { YouTubeDialog } from "../../components/youtube";

let defaultQuestion = {
  text: "Untitled question",
  type: QuestionType.SINGLELINE,
  options: [],
  video:undefined,
  isRequired : false,
  isQuestion : true,
  description:"description"
};
let section = { title: "Untitled Section", description: "Form description" };



function CreateOrEditQuestions({onSubmit,exixtingSection}) {
  let isNonMobile = useMediaQuery("(min-width:740px)");
  let [currentSection, setCurrentSection] = useState(0);
  let [currentQuestion, setCurrentQuestion] = useState(0);
  let [openYoutube,setOpenYoutube] = useState(false);
  let [sections, setSections] = useState(
    exixtingSection || [
    { ...section, questions: [{...defaultQuestion}] },
  ]);

  const handleCurrentSection = useCallback((sectionIndex) => {
    setCurrentSection(sectionIndex);
    setCurrentQuestion(0);
  }, []);

  const handleCurrentQuestion = useCallback((sectionIndex,questionIndex) => {
    setCurrentSection(sectionIndex);
    setCurrentQuestion(questionIndex);
  }, []);

  const updateTypeOfQuestion = 
    (sectionIndex, questionIndex, selectedType) => {
      let updateForm = [...sections];
      updateForm[sectionIndex].questions[questionIndex].type = selectedType;
      if (
        updateForm[sectionIndex].questions[questionIndex].options.length === 0
      ) {
        updateForm[sectionIndex].questions[questionIndex].options = [
          "Option 1",
        ];
      }
      setSections(updateForm);
    }

  const updateSectionProperties =(sectionIndex, key, value) => {
    let updateForm = [...sections];
    updateForm[sectionIndex][`${key}`] = value;
    setSections(updateForm);
  }

  const updateQuestionProperties = 
    (sectionIndex, questionIndex, key, value) => {
      let updateForm = [...sections];
      updateForm[sectionIndex].questions[questionIndex][`${key}`] = value;
      setSections(updateForm);
    }

  const updateOptionValue = 
    (sectionIndex, questionIndex, optionIndex, value) => {
      let updateForm = [...sections];
      updateForm[sectionIndex].questions[questionIndex].options[optionIndex] =
        value;
      setSections(updateForm);
    }

  const removeOption = 
    (sectionIndex, questionIndex, optionIndex) => {
      console.log("the option index is ", optionIndex);
      let updateForm = [...sections];
      let myArray = updateForm[sectionIndex].questions[questionIndex].options;
      if (optionIndex >= 0 && optionIndex < myArray.length) {
        myArray = myArray.filter((_, index) => index !== optionIndex);
      }

      updateForm[sectionIndex].questions[questionIndex].options = myArray;
      setSections(updateForm);
    }

    
  const removeQuestion = 
  (sectionIndex, questionIndex) => {
    console.log("the option index is ", questionIndex);
    let updateForm = [...sections];
    let myArray = updateForm[sectionIndex].questions;
    if (questionIndex >= 0 && questionIndex < myArray.length) {
      myArray = myArray.filter((_, index) => index !== questionIndex);
    }
    updateForm[sectionIndex].questions = myArray;
    setSections(updateForm);
  }


  const updateOptionsOfQuestion = 
    (sectionIndex, questionIndex, optionIndex) => {
      let updateForm = [...sections];
      updateForm[sectionIndex].questions[questionIndex].options.push(
        `Option ${optionIndex}`
      );
      setSections(updateForm);
    }

  const addQuestion = (sectionIndex,questionindex,isQuestion=true,video) => {
    let updateForm = [...sections];
    let questionIndexToBeUpdated = isQuestion?questionindex+1:questionindex
    let newArray;
    if (questionIndexToBeUpdated >= 0 && questionIndexToBeUpdated <=  updateForm[sectionIndex].questions.length) {
      newArray = [
        ...updateForm[sectionIndex].questions.slice(0, questionIndexToBeUpdated),
        {...defaultQuestion,isQuestion,video},
        ...updateForm[sectionIndex].questions.slice(questionIndexToBeUpdated)
      ];
    }
    updateForm[sectionIndex].questions = newArray;
   if(isQuestion){
     handleCurrentQuestion(sectionIndex,questionindex+1)
   }
    setSections(updateForm)
  }

  const addSection = () => {
     let updateForm = [...sections];
     updateForm.push( { ...section, questions: [{...defaultQuestion}] });
     setSections(updateForm)
  }

  return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          backgroundColor: "#f0ebf8",
          margin: 0,
        }}
      >
        {sections.map((section, sectionIndex) => (
          <>
          <div onClick={()=>{
            handleCurrentSection(sectionIndex);
          }} style={{ minWidth:"auto" ,width: isNonMobile ? "50%" : "94%",}}>
           <Box sx={{
                marginTop:3,
                paddingX:3,
                display:"inline-flex", width:"auto",
                backgroundColor:"rgb(103, 58, 183)",
                borderTop: 10,
                color:"white",
                borderTopColor: "rgb(103, 58, 183)",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                textAlign: "left",}}>Section {sectionIndex+1} of {sections.length}</Box>
            <Box
              sx={{
                marginTop:sections.length>0 ? 0 : 3,
                padding: "1.5rem",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                width:"100%",
                borderTop: 10,
                borderTopColor: "rgb(103, 58, 183)",
                borderTopLeftRadius: sections.length>0 ? 0 : 8,
                borderTopRightRadius: 8,
                textAlign: "left",
              }}
            >
              <TextField
            
                InputProps={{
                  style: {
                    fontWeight: "bolder",
                    fontSize: "130%",
                    color: "black",
                  },
                }}
                multiline
                fullWidth
                value={section.title}
                onChange={(val) => {
                  updateSectionProperties(
                    sectionIndex,
                    "title",
                    val.target.value
                  );
                }}
                sx={{
                  marginY: 1,
                  "& .MuiInput-underline:before": {
                    borderBottom: "none",
                  },
                }}
                variant="standard"
              />
              <TextField
                value={section.description}
                onChange={(val) => {
                  updateSectionProperties(
                    sectionIndex,
                    "description",
                    val.target.value
                  );
                }}
                multiline
                fullWidth
                sx={{
                  "& .MuiInput-underline:before": {
                    borderBottom: "none",
                  },
                }}
                variant="standard"
              />
             
            </Box>
            </div>
            {/* {currentSection === sectionIndex && currentQuestion===-1 && (
              <MyTab
                addQuestionCallBack={addQuestion}
                isNonMobile={isNonMobile}
                addSectionCallback={addSection}
              />
            )} */}
            {section.questions.map((question, questionIndex) => (
              <>
                <div onClick={()=>{
                  handleCurrentQuestion(sectionIndex,questionIndex)
                }} style={{ width: isNonMobile ? "50%" : "94%",}}>
                    <Box
                sx={{
                  padding: "1.5rem",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                  width:"100%",
                  border: "2px thin grey",
                  borderRadius: 2,
                  textAlign: "left",
                  marginY: 3,
                  boxShadow: "0 0 2px grey",
                }}
              >
                <FlexBetween
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "start",
                    gap: 10,
                  }}
                >
                  <TextField
                    sx={{
                      display: "flex",
                      alignContent: "center",
                      placeSelf: "center",
                      "& .MuiInput-underline:before": {
                        borderBottom: "none",
                      },
                    }}
                    value={question.text}
                    onChange={(val) => {
                      updateQuestionProperties(
                        sectionIndex,
                        questionIndex,
                        "text",
                        val.target.value
                      );
                    }}
                    multiline
                    fullWidth
                    InputProps={{
                      style: {
                        whiteSpace: "nowrap", // Prevent wrapping within a single line
                        overflow: "hidden", // Hide overflowed text
                      },
                    }}
                    variant="standard"
                  />
                  {(currentSection === sectionIndex && currentQuestion === questionIndex && question.isQuestion) && (
                  <FormControl sx={{ m: 1, width: "40%" }}>
                    <Select
                      value={question.type}
                      onChange={(val) => {
                        updateTypeOfQuestion(
                          sectionIndex,
                          questionIndex,
                          val.target.value
                        );
                      }}
                    >
                      <MenuItem value={QuestionType.SINGLELINE}>
                        Single Line
                      </MenuItem>
                      <MenuItem value={QuestionType.RADIO}>
                              Multiple Choice
                      </MenuItem>
                      <MenuItem value={QuestionType.CHECKBOX}>
                        CheckBox
                      </MenuItem>
                      <MenuItem value={QuestionType.DROPDOWN}>
                        DropDown
                      </MenuItem>
                      <MenuItem value={QuestionType.DATE}>
                        Date
                      </MenuItem>
                    </Select>
                  </FormControl>
                  )}
                </FlexBetween>
                
               { question.isQuestion ? (question.type === QuestionType.SINGLELINE ||
                question.type === QuestionType.PARAGRAPH ?
              (
                  <TextField
                    sx={{
                      marginY: 3,
                    }}
                    disabled
                    placeholder="Short answer text"
                    variant="standard"
                  />
                ) :   question.type === QuestionType.DATE ?
                <span style={{marginTop:2,marginBottom:2}}>
                <LocalizationProvider  dateAdapter={AdapterDayjs}>
               <DatePicker
               disabled
                       renderInput={(params) => (
                         <TextField
                         disabled
                         placeholder="mm/dd/yyyy"
                           {...params}
                         />
                       )}
                     />
                     </LocalizationProvider> </span>: (
                  <Box sx={{ width: "100%" }}>
                    {question.options.map((option, optionIndex) => (
                      <>
                        <FlexBetween sx={{ width: "100%", gap: 3 }}>
                          <FlexBetween
                            sx={{
                              width: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {question.type === QuestionType.RADIO && (
                              <RadioButtonUncheckedRounded
                                sx={{ color: "grey", marginRight: 1 }}
                              />
                            )}
                            {question.type === QuestionType.CHECKBOX && (
                              <CheckBoxOutlineBlankOutlined
                                sx={{ color: "grey", marginRight: 1 }}
                              />
                            )}
                            {question.type === QuestionType.DROPDOWN && (
                              <Typography
                                sx={{ color: "black", marginRight: 1 }}
                              >
                                {optionIndex + 1}.
                              </Typography>
                            )}
                            <TextField
                              sx={{
                                display: "flex",
                                alignContent: "center",
                                placeSelf: "center",
                                "& .MuiInput-underline:before": {
                                  borderBottom: "none",
                                },
                              }}
                              onChange={(val) => {
                                updateOptionValue(
                                  sectionIndex,
                                  questionIndex,
                                  optionIndex,
                                  val.target.value
                                );
                              }}
                              value={option}
                              fullWidth
                              variant="standard"
                            />
                          </FlexBetween>
                          {question.options.length > 1 && (
                            <IconButton
                              onClick={() => {
                                removeOption(
                                  sectionIndex,
                                  questionIndex,
                                  optionIndex
                                );
                              }}
                              sx={{ ml: 2 }}
                            >
                              <Close sx={{ fontSize: "larger" }} />
                            </IconButton>
                          )}
                        </FlexBetween>
                      </>
                    ))}
                     {(currentSection === sectionIndex && currentQuestion === questionIndex) && (<Button
                      onClick={() => {
                        updateOptionsOfQuestion(
                          sectionIndex,
                          questionIndex,
                          question.options.length + 1
                        );
                      }}
                    >
                      Add Option
                    </Button>)}
                  </Box>
                )): question.video ? <img src={question.video.thumbnail}  alt=""/>  :  <TextField
                multiline
                fullWidth
                value={question.description}
                onChange={(val) => {
                  updateQuestionProperties(
                    sectionIndex,
                    questionIndex,
                    "description",
                    val.target.value
                  );
                }}
                sx={{
                  marginY: 1,
                  "& .MuiInput-underline:before": {
                    borderBottom: "none",
                  },
                }}
                variant="standard"
              />}
                {(currentSection === sectionIndex && currentQuestion === questionIndex && question.isQuestion) && (<>
                 <Divider sx={{width:"100%",marginY:1}}/>
                 <Box sx={{display:"flex",width:"100%",justifyContent:"end",alignItems:"center"}}><Typography>Required</Typography><Switch value={question.isRequired} onChange={()=>{
                  updateQuestionProperties(sectionIndex,questionIndex,"isRequired",!question.isRequired)
                 }} checked={question.isRequired} /></Box></>)}
              </Box>
            </div>
             {(currentSection === sectionIndex && currentQuestion === questionIndex) && (
                <Box
                      sx={{
                        backgroundColor: "white",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 2,
                        alignItems: "start",
                        // width: isNonMobile ? "50%" : "96%",
                        border: "2px thin grey",
                        borderRadius: 2,
                        textAlign: "left",
                        marginTop: 1,
                        boxShadow: "0 0 2px grey",
                      }}
                    >
                      <IconButton onClick={()=>{
                  addQuestion(sectionIndex,questionIndex)
                }}>
                        <AddCircleOutline />
                      </IconButton>
                      <IconButton onClick={()=>{
                            addQuestion(sectionIndex,questionIndex,false)
                      }} >
                        <TextFieldsRounded/>
                      </IconButton>
                      <IconButton onClick={addSection}>
                        <InsertPageBreakOutlined />
                      </IconButton>
                      <IconButton onClick={()=>{setOpenYoutube(true)}}>
                        <YouTube />
                      </IconButton>
                     {( section.questions.length>0)&& <IconButton onClick={()=>{
                        removeQuestion(sectionIndex,questionIndex);
                      }}>
                        <DeleteOutlineRounded />
                      </IconButton>}
                    </Box>
            )}
            </>
            ))}
          </>
        ))}
        <Box sx={{alignItems:"center",justifyContent:"center"}}>
        <YouTubeDialog onSelectHandler={(selectedVideo)=>{
          setOpenYoutube(false)
          addQuestion(currentSection,currentQuestion,false,{...selectedVideo})
        }}  open={openYoutube} handleClose={()=>{setOpenYoutube(false)}}/>
        </Box>
          <Button sx={{backgroundColor:"rgb(103, 58, 183)",color:"white",placeSelf:"center",marginY:2}}
          onClick={() => {
            console.log("the form is ", sections);
            if(onSubmit){
              onSubmit(sections)
            }
          }}
        >
        { exixtingSection ? "Update" : "Submit"}
        </Button>
      </Box>
  );
}

export default CreateOrEditQuestions;
