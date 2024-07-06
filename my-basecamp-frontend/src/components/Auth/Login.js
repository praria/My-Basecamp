import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import {loginUser} from '../../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //localStorage.setItem('username', username);
      const response = await loginUser( username, password );
      const token = response.data.token // based on backend response upon successful login
      console.log(token)
      localStorage.setItem('token', token);
      console.log('Login successful, navigating to dashboard...');    
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
      localStorage.removeItem('username'); // Remove username if login fails
    }
  };

  const handleNavigateHome = () => {
    navigate('/');
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>          
        </Box>
        <Box sx={{ mt: 4 }}>
          <button type="button" onClick={handleNavigateHome}>Go to Homepage</button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
