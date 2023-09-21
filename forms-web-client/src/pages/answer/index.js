import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { QuestionType, formattedDate } from '../../utils'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function Answer({sections,data,currentIndex}) {
  return (
    <>
    {sections.map((section) => (
        <>
          <Box
            sx={{
              marginTop: 3,
              padding: "1.5rem",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              width: "100%",
              borderTop: 10,
              borderTopColor: "rgb(103, 58, 183)",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              textAlign: "left",
            }}
          >
            <Typography sx={{fontWeight:"bold",fontSize:"1.5rem",marginBottom:2}}>{section.title}</Typography>
            <Typography>{section.description}</Typography>
           
          </Box>
          {section.questions.map((question)=>
          <FormControl key={section._id} sx={{width:"100%"}} disabled>
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
                  <Typography sx={{color:"black",fontSize:"1.5em"}}>
                     {question.text} {question.isRequired && <span sx={{color:"red"}}>*</span>}
                   </Typography>
                   {question.isQuestion ?  question.type===QuestionType.SINGLELINE || question.type === QuestionType.PARAGRAPH  ? 
                    <Typography
                    key={`${question._id}`}
                    placeholder="Your Answer"
                    multiline
                    fullWidth
                    disabled
                    sx={{marginY:2}}
                    defaultValue={data.sections[`${section._id}`][`${question._id}`]}
                    variant="standard"
                  >{data.sections[`${section._id}`][`${question._id}`]}</Typography>
                   : question.type === QuestionType.DATE ? 
                             <TextField
                             disabled
                             defaultValue={formattedDate(data.sections[`${section._id}`][`${question._id}`])}
                             />
                          
                      :
                   <Box sx={{marginY:2,width:"100%"}}>
                     {question.type===QuestionType.RADIO && 
                      <RadioGroup key={`${question._id}`} defaultValue={data.sections[`${section._id}`][`${question._id}`]} 
                      >
                          {question.options.map((option)=>
                      <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                      )}
                       </RadioGroup>
                   }
                   {question.type === QuestionType.DROPDOWN && 
                     <Select key={`${question._id}`} defaultValue={data.sections[`${section._id}`][`${question._id}`]}>
                     {question.options.map((option)=>
                    <MenuItem key={option} value={option}>
                         {option}
                    </MenuItem>
                    )}
                    </Select>
                   }
                   {question.type === QuestionType.CHECKBOX && 
                     ( 
                     <FormGroup >{question.options.map((option)=>
                     <FormControlLabel control={<Checkbox  
                               checked={((data.sections[`${section._id}`][`${question._id}`] && data.sections[`${section._id}`][`${question._id}`].length) ?  data.sections[`${section._id}`][`${question._id}`] : [])?.includes(option)}
                           />} label={option} />)
                  }</FormGroup>)
                   }
                   </Box>
                   : question.video?.id ? <iframe title={`${question.video.id}`} height="315" src={`https://www.youtube.com/embed/${question.video.id}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  :
                   <Typography sx={{color:"black",fontSize:"1em"}}>
                   {data.sections[`${section._id}`][`${question._id}`]?.description} 
                 </Typography>  
                 }
               </Box>
               </FormControl>
            )}
            </>)
        )}
  </>)
}

export default Answer