import { Box, Typography } from '@mui/material'
import React from 'react'
import notfound from "../../assets/not_found.svg"

function ErrorPage() {
  return (
     <Box sx={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
        <img height="50%" width="50%" src={notfound} />
        <Typography sx={{marginY:2}}>Page Not Found</Typography>
     </Box>
  )
}

export default ErrorPage