import React, { useState } from 'react';
import { signup } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'student'
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
      await signup(formData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Create your account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <input
              name="username"
              type="text"
              required
              className="form-input"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          
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
              name="firstName"
              type="text"
              required
              className="form-input"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <input
              name="lastName"
              type="text"
              required
              className="form-input"
              placeholder="Last Name"
              value={formData.lastName}
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
            Sign up
          </button>
        </form>
        
        <Link to="/login" className="auth-link">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
};

export default Signup; 