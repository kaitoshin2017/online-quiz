const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const studentController = require('../controllers/studentController');

// Validation middleware
const validateProfileUpdate = [
  body('firstName').optional().trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
  body('lastName').optional().trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('address').optional().trim(),
  body('avatar').optional().isURL().withMessage('Please provide a valid avatar URL'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters')
];

// Get student profile
router.get('/profile', auth, studentController.getProfile);

// Update student profile
router.put('/profile', auth, validateProfileUpdate, studentController.updateProfile);

// Get student dashboard data
router.get('/dashboard', auth, studentController.getDashboard);

// Get all quiz results for student
router.get('/results', auth, studentController.getQuizResults);

// Submit quiz
router.post('/submit-quiz', auth, studentController.submitQuiz);

// Change password
router.post('/change-password', auth, studentController.changePassword);

// Update avatar
router.post('/update-avatar', auth, studentController.updateAvatar);

// Helper function to calculate user rank
async function calculateRank(userId) {
  const users = await User.find().sort({ totalPoints: -1 });
  const rank = users.findIndex(user => user._id.toString() === userId.toString()) + 1;
  return rank;
}

module.exports = router; 