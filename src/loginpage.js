// Import necessary modules
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Box } from '@mui/material';
import back from './images/backgroundlogin.jpg'

// Define styles using makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginTop: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  backgroundImage: {
    backgroundImage: `url(${back})`,
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
}));

// Define the Login page component
function LoginPage() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response= await axios.post('http://127.0.0.1:8000/users/login/',{'username':username,'password':password})
    console.log(response.status)
    navigate('/dashboard')

    }
    catch(err){
      console.log(err)
    }
  };

  return (
    <Box className={classes.backgroundImage}>
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Typography variant="h4">Login</Typography>
        {/* Add login form here */}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {/* Add input fields for username and password */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              style: { borderRadius: '5px' },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { borderRadius: '5px' },
            }}
          />
          {/* Add login button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          {/* Display error message if login fails */}
          {error && <Typography color="error">{error}</Typography>}
        </form>
      </div>
    </Container>
    </Box>
  );
}

export default LoginPage;
