const User = require('../models/User');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get student profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password -__v')
      .populate('completedQuizzes', 'title score completedAt');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching profile', error: error.message });
  }
};

// Update student profile
exports.updateProfile = async (req, res) => {
  try {
    const allowedFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'avatar', 'bio'];
    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password -__v');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'Profile updated successfully', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating profile', error: error.message });
  }
};

// Get student dashboard data
exports.getDashboard = async (req, res) => {
  try {
    const availableQuizzes = await Quiz.find({
      isPublished: true,
      _id: { $nin: req.user.completedQuizzes }
    }).select('title description duration totalQuestions');
    const completedQuizzes = await QuizResult.find({ user: req.user._id })
      .populate('quiz', 'title description')
      .sort({ completedAt: -1 })
      .limit(5);
    const totalQuizzes = await Quiz.countDocuments({ isPublished: true });
    const completedCount = req.user.completedQuizzes.length;
    const averageScore = completedQuizzes.length > 0
      ? completedQuizzes.reduce((acc, curr) => acc + curr.score, 0) / completedQuizzes.length
      : 0;
    res.json({
      success: true,
      data: {
        availableQuizzes,
        completedQuizzes,
        statistics: {
          totalQuizzes,
          completedCount,
          averageScore,
          progress: totalQuizzes > 0 ? (completedCount / totalQuizzes) * 100 : 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching dashboard', error: error.message });
  }
};

// Get all quiz results for student
exports.getQuizResults = async (req, res) => {
  try {
    const results = await QuizResult.find({ user: req.user._id })
      .populate('quiz', 'title description')
      .sort({ completedAt: -1 });
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching results', error: error.message });
  }
};

// Submit quiz
exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    // Calculate score (dummy logic, replace with real)
    let score = Math.floor(Math.random() * 100);
    const quizResult = new QuizResult({
      user: req.user._id,
      quiz: quizId,
      answers,
      score,
      completedAt: new Date()
    });
    await quizResult.save();
    // Add to user's completedQuizzes
    await User.findByIdAndUpdate(req.user._id, { $push: { completedQuizzes: quizResult._id } });
    res.json({ success: true, data: quizResult });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting quiz', error: error.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error changing password', error: error.message });
  }
};

// Update avatar (expects avatar URL in body)
exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, avatar: user.avatar });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating avatar', error: error.message });
  }
}; 