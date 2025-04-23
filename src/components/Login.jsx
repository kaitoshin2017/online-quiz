import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData.email, formData.password);
      if (response.token) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Sign in to your account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <input
              name="email"
              type="email"
              required
              className="form-input"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <input
              name="password"
              type="password"
              required
              className="form-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button">
            Sign in
          </button>
        </form>
        
        <Link to="/signup" className="auth-link">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login; 