import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const Homepage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h3" gutterBottom>Welcome to Basecamp</Typography>
        <Typography variant="h5" gutterBottom>Manage your projects efficiently</Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" component={Link} to="/login" sx={{ mr: 2 }}>Login</Button>
          <Button variant="outlined" color="primary" component={Link} to="/register" sx={{ mr: 2 }}>Register</Button>
        </Box>        
      </Box>
    </Container>
  );
};

export default Homepage;
