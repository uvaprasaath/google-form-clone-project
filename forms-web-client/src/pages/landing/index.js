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
    <FlexBetween> 
         <Box sx={{ height:"100%", width:"50%",backgroundColor:"white",display:isNonMobile?"flex":"none",justifyContent:"center",alignItems:"center"}}>
           <img height="70%" width="80%" alt="loginpageimage" src={loginPage} />
        </Box>
        <Outlet/>
    </FlexBetween>
  )
}

export default LandingPage