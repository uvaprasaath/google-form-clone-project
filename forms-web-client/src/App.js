import { CssBaseline, ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useMemo } from "react";
import {  Route, Routes } from "react-router-dom";
import NotFound from "./pages/notfound"
import Login from "./pages/login"
import SignupPage from './pages/signup';
import LandingPage from './pages/landing';
import Forms from './pages/forms';
import CreateForm from './pages/createform';
import ResponseForm from "./pages/responseform";



function App() {
  const theme = useMemo(()=>createTheme(themeSettings("dark")),[]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
         <CssBaseline/> 
         <Routes>
          <Route path="*" element={<NotFound replace/>}/>
          <Route path='/' element={<LandingPage/>}>
              <Route index element={<Login/>} />
              <Route path='login' element={<Login/>}/>
              <Route path='signup' element={<SignupPage/>}/>
          </Route>
          <Route path="/forms" element={<Forms/>}/>
          <Route path='/forms/edit' element={<CreateForm/>}/>
          <Route path='/forms/:id' element={<ResponseForm/>}/>
         </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
