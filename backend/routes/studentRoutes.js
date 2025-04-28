const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

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
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password -__v')
      .populate('completedQuizzes', 'title score completedAt');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching profile',
      error: error.message 
    });
  }
});

// Update student profile
router.put('/profile', auth, validateProfileUpdate, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const updates = {};
    const allowedFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'avatar', 'bio'];
    
    // Only update fields that are provided and allowed
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { 
        new: true,
        runValidators: true
      }
    ).select('-password -__v');

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error updating profile',
      error: error.message 
    });
  }
});

// Get student dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    // Get available quizzes
    const availableQuizzes = await Quiz.find({ 
      status: 'Available',
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() }
    })
    .select('title description duration points createdAt startDate endDate')
    .sort({ createdAt: -1 });

    // Get completed quizzes with results
    const completedQuizzes = await QuizResult.find({ student: req.user._id })
      .populate('quiz', 'title description')
      .sort({ completedAt: -1 });

    // Calculate statistics
    const totalQuizzes = completedQuizzes.length;
    const averageScore = totalQuizzes > 0 
      ? completedQuizzes.reduce((sum, quiz) => sum + quiz.percentage, 0) / totalQuizzes 
      : 0;

    // Get recent activity
    const recentActivity = await QuizResult.find({ student: req.user._id })
      .populate('quiz', 'title')
      .sort({ completedAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        profile: {
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          avatar: req.user.avatar,
          email: req.user.email,
          totalPoints: req.user.totalPoints || 0
        },
        availableQuizzes,
        completedQuizzes,
        statistics: {
          totalQuizzes,
          averageScore: Math.round(averageScore),
          totalPoints: req.user.totalPoints || 0,
          rank: await calculateRank(req.user._id)
        },
        recentActivity
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message 
    });
  }
});

// Helper function to calculate user rank
async function calculateRank(userId) {
  const users = await User.find().sort({ totalPoints: -1 });
  const rank = users.findIndex(user => user._id.toString() === userId.toString()) + 1;
  return rank;
}

module.exports = router; 