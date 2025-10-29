// src/pages/Login/Login.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { baseURI } from '../../constants/api';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch(`${baseURI}login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: email, password }), // match your backend
      });

      const data = await res.json();
      console.log('Login response:', data);

      if (res.ok && data.message === 'Login successful' && data.user) {
        dispatch(loginSuccess(data.user));
        toast.success(data.message);
        navigate('/'); // redirect to BookList
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <input
          className="login-input"
          placeholder="Username"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;


