import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import ProjectManagement from './components/Admin/ProjectManagement';
import TaskManagement from './components/Admin/TaskManagement';
import UserManagement from './components/Admin/UserManagement';
import FileManagement from './components/Admin/FileManagement';

const App = () => {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/dashboard" />} />
        <Route path="/projects" element={<ProjectManagement />} />
        <Route path="/tasks" element={<TaskManagement />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/files" element={<FileManagement />} />
        {/* Fallback route */}
        <Route path="*" render={() => <div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;