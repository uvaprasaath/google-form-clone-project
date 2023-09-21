import React,{useState} from 'react';
import SnackbarComponent from '../../components/snackbar';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Container, CssBaseline, Grid, Link as MuiLink } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { loginAPI } from '../../services/authservice';
import { Authstate } from '../../components/aurthprovider';

const LoginPage = () =>  
{
  const {logIn} = Authstate();
  const [isButtonClicked,setButtenStatus] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleLogin = async (data) => {
    setButtenStatus(true)
    try {
      const response = await loginAPI(data);
      if (response.status === 200) {
        const errorCode = response.data?.header?.code;
        if (errorCode === 602) {
            setSnackbarMessage('Email not found.', 'error');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } else if (errorCode === 603) {
          setSnackbarMessage('Email or password mismatched.', 'error');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage('Login successful!');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          logIn(response.data?.body?.value.token)
        
        }
      }
    } catch (error) {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); 
    handleLogin(data)
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
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
                })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </Grid>
          </Grid>
          <Button  disabled={isButtonClicked} type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
            Log In
          </Button>
          <MuiLink  component={Link} to="/signup" variant="body2" sx={{ mt: 2 }}>
            <Typography m={1} sx={{color:"black"}}> Create Account</Typography>
          </MuiLink>
        </form>
        <SnackbarComponent
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
      </div>
    </Container>
  );
};

export default LoginPage;
