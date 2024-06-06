import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './lg.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4446/api/login', {
        username,
        password,
      });
      const token = response.data;
      localStorage.setItem('jwtToken', token);
      navigate('/Home'); // Redirect to home page on successful login
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login">
      <h4>Login</h4>
      <form onSubmit={handleLogin}>
        <div className="text_area">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text_input"
          />
        </div>
        <div className="text_area">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text_input"
          />
        </div>
        <div>
          <button className="btn" type="submit">Login</button>
        </div>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default LoginPage;
