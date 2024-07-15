import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import { parseJwt } from '../utils/tokenParser';
import { getUserById } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const parsedToken = parseJwt(token);
      if (parsedToken) {
        const { id, role } = parsedToken;
        setRole(role);
        getUserById(id).then((user) => {
          if (user) {
            setUsername(user.username);
          }
        });
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h4" gutterBottom>Welcome, {username}</Typography>
        <Box sx={{ mt: 4 }}>
          {role === 'admin' && <Button variant="contained" color="secondary" component={Link} to="/users" sx={{ mr: 2 }}>User Management</Button>}
          {role === 'admin' && <Button variant="contained" color="secondary" component={Link} to="/projects" sx={{ mr: 2 }}>Project Management</Button>}
          {role === 'admin' && <Button variant="contained" color="secondary" component={Link} to="/tasks" sx={{ mr: 2 }}>Task Management</Button>}
          {role === 'admin' && <Button variant="contained" color="secondary" component={Link} to="/files" sx={{ mr: 2 }}>File Management</Button>}
          {role === 'project_manager' && <Button variant="contained" color="secondary" component={Link} to="/project_manager/projects" sx={{ mr: 2 }}>My Projects</Button>}
          {role === 'regular_user' && <Button variant="contained" color="secondary" component={Link} to="/regular_user/tasks" sx={{ mr: 2 }}>My Tasks</Button>}
        </Box>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
