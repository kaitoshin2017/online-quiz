const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'student',
      avatar: req.file ? `/uploads/${req.file.filename}` : null
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

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
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

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
    res.status(500).json({ 
      success: false,
      message: 'Login failed',
      error: error.message 
    });
  }
});

module.exports = router; 