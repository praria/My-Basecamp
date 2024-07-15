import React, { useState } from 'react';
import { registerUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('regular'); // default role
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(username, password, role);
      setMessage('Successfully registered');
      setError('');
    } catch (error) {
      setMessage('');
      setError('Registration Error');
    }
  };

  const handleNavigateHome = () => {
    navigate('/');
  }

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="project_manager">Project Manager</option>
        <option value="regular">Regular User</option>
      </select>
      <button type="submit">Register</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="button" onClick={handleNavigateHome}>Go to Homepage</button>
    </form>
  );
};

export default Register;