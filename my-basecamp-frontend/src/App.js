import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import ProjectManagement from './components/Admin/ProjectManagement';
import TaskManagement from './components/Admin/TaskManagement';
import UserManagement from './components/Admin/UserManagement';

const App = () => {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/dashboard" />} />
        <Route path="/admin/projects" element={<ProjectManagement />} />
        <Route path="/admin/tasks" element={<TaskManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />

        {/* Add more routes for project management, task management, and file management */}
      </Routes>
    </Router>
  );
};

export default App;