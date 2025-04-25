const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const auth = require('../middleware/auth');

// Get student profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password -__v');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update student profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, email, avatar } = req.body;
    const updates = {};
    
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (email) updates.email = email;
    if (avatar) updates.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    ).select('-password -__v');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get student dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    // Get available quizzes
    const availableQuizzes = await Quiz.find({ status: 'Available' })
      .select('title description duration points createdAt')
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

    res.json({
      profile: {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        avatar: req.user.avatar,
        email: req.user.email
      },
      availableQuizzes,
      completedQuizzes,
      statistics: {
        totalQuizzes,
        averageScore: Math.round(averageScore)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 