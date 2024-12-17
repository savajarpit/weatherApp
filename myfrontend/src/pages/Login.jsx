import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';  
import "../styles/form.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      const res = await API.post('/auth/login', { email, password });

      
      localStorage.setItem('token', res.data.token);

      
      API.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;

      alert('Login successful!');
      
      
      navigate('/weather-search');
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h1 className='text-center'>WeatherApp</h1>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
