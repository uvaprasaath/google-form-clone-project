import { Box, Typography } from '@mui/material'
import React from 'react'
import serverdown from "../../assets/serverdown.svg";
import notfound from "../../assets/not_found.svg"

function NotFound() {
  return (
     <Box sx={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
        <img height="50%" width="50%" src={serverdown} />
        <Typography sx={{}}>Page Not Found</Typography>
     </Box>
  )
}

export default NotFound