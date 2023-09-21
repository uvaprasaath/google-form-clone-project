import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useMediaQuery, Box } from '@mui/material'
import loginPage from "../../assets/loginpage.svg"
import { Authstate } from '../../components/aurthprovider'
import FlexBetween from '../../components/Flexbetween'

 

function LandingPage() {
    const {user} = Authstate();
   
    const isNonMobile = useMediaQuery("(min-width:720px)")
    if(user.isAuthenticated){
        return <Navigate to="/forms"/>
    }
  return (
    <FlexBetween sx={{height:"100%"}}> 
         <Box sx={{ height:"100%", width:"50%",backgroundColor:"#f0ebf8",display:isNonMobile?"flex":"none",justifyContent:"center",alignItems:"center"}}>
           <img height="60%" width="50%" alt="loginpageimage" src={loginPage} />
        </Box>
        <Outlet/>
    </FlexBetween>
  )
}

export default LandingPage