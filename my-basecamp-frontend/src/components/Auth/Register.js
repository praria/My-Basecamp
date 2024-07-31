import React, { useState } from 'react';
import { registerUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const role = 'admin' // Default role
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
      <button type="submit">Register</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="button" onClick={handleNavigateHome}>Go to Homepage</button>
    </form>
  );
};

export default Register;