import React from 'react'
import { Authstate } from '../../components/aurthprovider'
import { useNavigate } from 'react-router-dom';

function Required({children}) {
    const {user : { isAuthenticated }} = Authstate();
    console.log("the isAuthenticated ",isAuthenticated)
    const navigate = useNavigate()
    if(!isAuthenticated){
       navigate("/login")
        return 
    }
  return (
    <>
     {children}
    </>
  )
}

export default Required