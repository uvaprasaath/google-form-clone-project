import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Container, Grid, CssBaseline, Link as MuiLink } from '@mui/material';
import { Email, Lock, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import SnackbarComponent from '../../components/snackbar'; 
import { signupAPI } from '../../services/authservice';
import { Authstate } from '../../components/aurthprovider';


const SignupPage = () => {
 const {logIn} = Authstate()   
 const [isButtonClicked,setButtenStatus] = useState(false);
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const [snackbarSeverity, setSnackbarSeverity] = useState('info'); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); 
    handleSignup(data);
  };

  const handleSignup = async (data) => {
    setButtenStatus(true)
    try {
      const response = await signupAPI(data);
      console.log("the response is ", response)
      if (response.status === 201) {
        setSnackbarMessage('Signup successful!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        logIn(response.data.body.value.token);
        return
      }  else if (response.status === 200) {
        if (response.data?.header?.code === 615) {
          setSnackbarMessage('Email already exists.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage('Something went wrong.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      }else{
        setSnackbarMessage('Something went wrong.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
      }
    } catch (error) {
        console.log("itxdrcfvgbhnjkjhgdctfvg")
      setSnackbarMessage('Something went wrong.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }finally{
        setButtenStatus(false)
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>  
      <Typography mb="10px" component="h1" variant="h5">
          Sign up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
         
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                icon={<Person />}
                {...register('name', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username should be at least 3 characters',
                  },
                })}
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                icon={<Email />}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address',
                  },
                })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                icon={<Lock />}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password should be at least 8 characters',
                  },
                })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </Grid>
          </Grid>
          <Button disabled={isButtonClicked} type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
            Sign Up
          </Button>
          <MuiLink component={Link} to="/login" variant="body2" sx={{ mt: 2 }}>
          <Typography m={1} sx={{color:"black"}}>   Already Having Account </Typography>
          </MuiLink>
        </form>
        <SnackbarComponent
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={handleSnackbarClose}
        />
      </div>
    </Container>
  );
};

export default SignupPage;
