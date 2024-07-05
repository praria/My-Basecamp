import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Retrieve the username from local storage

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/login');
  };  

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h4" gutterBottom>Welcome, {username}</Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="secondary" component={Link} to="/admin/users" sx={{ mr: 2 }}>User Management</Button>
          <Button variant="contained" color="secondary" component={Link} to="/projects" sx={{ mr: 2 }}>Project Management</Button>
          <Button variant="contained" color="secondary" component={Link} to="/tasks" sx={{ mr: 2 }}>Task Management</Button>
          <Button variant="contained" color="secondary" component={Link} to="/files" sx={{ mr: 2 }}>File Management</Button>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
