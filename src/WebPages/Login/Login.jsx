import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { Alert } from '@mui/material';
import { URL } from '../../Constants/DataBaseURL';

export const Login = () => {
  const navigate = useNavigate();
  const [ShowPass, setShowPass] = useState(false)


  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="#">
          Spicy Cottage
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const theme = createTheme();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    VerifyUser(data.get('email'), data.get('password'));
  };
  const VerifyUser = (email, password) => {

    const UploadDataCredentials = {
      email: email,
      passwordHash: password,
    };
    fetch(URL.My_Database_Url + 'verifyuser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(UploadDataCredentials),
    })
      .then(response => response.text())
      .then(async responseText => {
        let responseData = JSON.parse(responseText);
        if (responseData.status == 300) {
          console.log("Value", responseData.user.isAdmin)
          if (responseData.user.isAdmin) {
            const Data = responseData.user
            localStorage.setItem('userinfo', Data);

            navigate("/dashboard")
          }
        } else {
          // console.log("Api Hit but no Admin")
          alert("Invalid Email or Password")
        }
      })
      .catch(error => {
        console.log(error, 'error from APi Check User');
      });

  }



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4">
            Spicy Cottage
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={ShowPass ? "text" : "password"}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox onChange={() => setShowPass(!ShowPass)} value="remember" color="primary" />}
              label="Show Password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
