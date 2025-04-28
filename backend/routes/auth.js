const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Teacher = require('../models/Teacher');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Verification codes
const TEACHER_CODE = 'TEACHER123';
const ADMIN_CODE = 'ADMIN123';

// Signup route
router.post('/signup', upload.single('avatar'), async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, role, teacherCode, adminCode } = req.body;
    console.log('Signup attempt:', { email, role });

    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Please enter a valid email address' 
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 6 characters long' 
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'Passwords do not match' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already registered' 
      });
    }

    // Role validation
    if (role === 'teacher' && teacherCode !== TEACHER_CODE) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid teacher code' 
      });
    }

    if (role === 'admin' && adminCode !== ADMIN_CODE) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid admin code' 
      });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: password.trim(),
      role: role || 'student',
      avatar: req.file ? `/uploads/${req.file.filename}` : null
    });

    await user.save();
    console.log('User created successfully:', user.email);

    // If the user is a teacher, create a teacher record
    if (role === 'teacher') {
      const teacher = new Teacher({
        _id: user._id,
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: password.trim(),
        avatar: req.file ? `/uploads/${req.file.filename}` : null,
        role: 'teacher'
      });
      await teacher.save();
      console.log('Teacher record created successfully:', teacher.email);
    }

    // Generate token
    const token = await user.generateAuthToken();

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Registration failed',
      error: error.message 
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log('Login attempt:', { email, role });

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    // Find user and validate credentials
    const user = await User.findByCredentials(email, password);
    
    // Check role if specified
    if (role && user.role !== role) {
      return res.status(401).json({ 
        success: false,
        message: `This account is registered as a ${user.role}, not a ${role}` 
      });
    }

    // Generate token
    const token = await user.generateAuthToken();

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ 
      success: false,
      message: error.message || 'Login failed'
    });
  }
});

module.exports = router; 