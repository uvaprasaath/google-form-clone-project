import { createContext, useContext, useEffect, useRef, useState } from "react"
import { clearStorage, decodeToken, setToken } from "../../utils"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()
const defaultUser = {isAuthenticated:false,userId:null,email:null}
export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(defaultUser)
    const [mode,setMode] = useState('light')
    const navigate = useNavigate();
    let decodedUser = useRef(); 
    useEffect(()=>{
       try {
         decodedUser.current = decodeToken();
         console.log("the decoded user ", decodedUser)
         if(decodedUser.current){
          setUser((prevUser) => ({
            ...prevUser,
            userId: decodedUser?.current?.id,
            email:decodedUser?.current?.email,
            isAuthenticated: true,
          })) 
         }
       } catch (error) {
         setUser({...defaultUser})
         decodedUser.current = undefined;
       }
    },[])
   
    const logIn = (token)=>{
      setToken(token);
      decodedUser.current = decodeToken();
      if(decodedUser.current){
        setUser((prevUser) => ({
          ...prevUser,
          userId: decodedUser?.current?.id,
          email:decodedUser?.current?.email,
          isAuthenticated: true,
        })) 
       }
       navigate('/forms')
    }

    const setTheme = ()=>{
       setMode((prev) => prev === "light" ? "dark" : "light")
    }

    const logOut = ()=>{
        clearStorage();
        setUser({...defaultUser})
        decodedUser.current = undefined;
        navigate("/",{replace:true})
    }

    return <AuthContext.Provider value={{logIn, logOut, user,setTheme,mode}}>
        {children}
    </AuthContext.Provider>
}

export const Authstate = ()=>useContext(AuthContext)
