import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom';

function ResponseSuccess({formTitle}) {
    let isNonMobile = useMediaQuery("(min-width:740px)");
   
  return (
    <Box
    sx={{
      backgroundColor: "#f0ebf8",
      height: "100%",
      width: "100%",
      justifyContent: "center",
      display: "flex",
      alignItems: "start",
    }}
  >
    <Box
               sx={{
                 marginTop: 3,
                 padding: "1.5rem",
                 backgroundColor: "white",
                 alignItems: "center",
                 width:isNonMobile? "40%":"100%",
                 borderTop: 10,
                 borderTopColor: "rgb(103, 58, 183)",
                 borderTopLeftRadius: 8,
                 borderTopRightRadius: 8,
                 textAlign: "left",
               }}
             >
                <Typography sx={{margin:2,fontWeight:"bold",fontSize:"2rem",textTransform:"capitalize"}}>{formTitle}</Typography>
                <Typography sx={{margin:2,fontSize:"rem"}}>response recorded successfuly</Typography>
             </Box>
  </Box>
  )
}

export default ResponseSuccess