import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';

const App = () => {
  const user = localStorage.getItem('username');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/dashboard" />} />
        {/* Add more routes for project management, task management, and file management */}
      </Routes>
    </Router>
  );
};

export default App;