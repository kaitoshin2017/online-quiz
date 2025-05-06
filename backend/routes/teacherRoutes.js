const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const auth = require('../middleware/auth');
const Settings = require('../models/Settings');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const teacherController = require('../controllers/teacherController');
const upload = require('../middleware/upload');

// Apply authentication middleware to all routes
router.use(auth);

// Get teacher dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    const teacher = await User.findById(req.user._id).select('-password -tokens');
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    // Get teacher's quizzes
    const quizzes = await Quiz.find({ createdBy: teacher._id });
    
    // Get active students (students who have taken at least one quiz)
    const activeStudents = await User.countDocuments({
      role: 'student',
      totalQuizzesCompleted: { $gt: 0 }
    });

    // Get quiz results for teacher's quizzes
    const results = await QuizResult.find({
      quiz: { $in: quizzes.map(q => q._id) }
    }).populate('student', 'firstName lastName');

    // Calculate average score
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const averageScore = results.length > 0 ? Math.round(totalScore / results.length) : 0;

    // Get pending reviews (quizzes that need grading)
    const pendingReviews = await QuizResult.countDocuments({
      quiz: { $in: quizzes.map(q => q._id) },
      status: 'pending'
    });

    const dashboardData = {
      teacher: teacher.toObject(),
      statistics: {
        totalQuizzes: quizzes.length,
        activeStudents,
        averageScore,
        pendingReviews
      },
      recentActivities: [
        {
          id: 1,
          type: 'quiz',
          description: 'New quiz submission from Sarah',
          time: '5 minutes ago'
        },
        {
          id: 2,
          type: 'student',
          description: 'New student registration',
          time: '1 hour ago'
        },
        {
          id: 3,
          type: 'result',
          description: 'Quiz results updated',
          time: '2 hours ago'
        }
      ]
    };

    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data'
    });
  }
});

// Get teacher's quizzes
router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.user._id })
      .select('title description duration totalPoints participants status')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      quizzes
    });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching quizzes'
    });
  }
});

// Get teacher's students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find()
      .select('firstName lastName email quizzesTaken averageScore status')
      .sort({ quizzesTaken: -1 });

    res.json({
      success: true,
      students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching students'
    });
  }
});

// Get quiz results
router.get('/results', async (req, res) => {
  try {
    const { quizId, timeRange } = req.query;
    const query = { quiz: quizId };

    // Add time range filter if provided
    if (timeRange) {
      const now = new Date();
      switch (timeRange) {
        case 'week':
          query.completedAt = { $gte: new Date(now.setDate(now.getDate() - 7)) };
          break;
        case 'month':
          query.completedAt = { $gte: new Date(now.setMonth(now.getMonth() - 1)) };
          break;
      }
    }

    const results = await QuizResult.find(query)
      .populate('student', 'firstName lastName')
      .populate('quiz', 'title')
      .sort({ completedAt: -1 });

    res.json({
      success: true,
      results
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching results'
    });
  }
});

// Get teacher profile
router.get('/profile', teacherController.getProfile);

// Update teacher profile
router.put('/profile', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, bio } = req.body;
    const teacher = await User.findById(req.user._id);
    
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    // Update fields if provided
    if (firstName) teacher.firstName = firstName;
    if (lastName) teacher.lastName = lastName;
    if (email) teacher.email = email;
    if (phone) teacher.phone = phone;
    if (bio) teacher.bio = bio;

    await teacher.save();

    res.json({
      success: true,
      data: teacher
    });
  } catch (error) {
    console.error('Error updating teacher profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating teacher profile'
    });
  }
});

// Get teacher settings
router.get('/settings', teacherController.getSettings);

// Update teacher settings
router.put('/settings', teacherController.updateSettings);

// Update avatar
router.post('/avatar', upload.single('avatar'), teacherController.updateAvatar);

// Change password
router.put('/password', teacherController.changePassword);

// Create a new quiz
router.post('/quizzes', teacherController.createQuiz);

// Update a quiz
router.put('/quizzes/:id', teacherController.updateQuiz);

// Delete a quiz
router.delete('/quizzes/:id', teacherController.deleteQuiz);

// Add new student
router.post('/students', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name, email, and password are required'
      });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email already exists'
      });
    }

    const student = new Student({
      firstName,
      lastName,
      email,
      password,
      phone
    });

    await student.save();

    res.status(201).json({
      success: true,
      student: {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        status: student.status,
        quizzesTaken: student.quizzesTaken,
        averageScore: student.averageScore
      }
    });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding student',
      error: error.message
    });
  }
});

// Update student
router.put('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const allowedUpdates = ['firstName', 'lastName', 'phone', 'status'];
    const updateFields = {};

    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updateFields[key] = updates[key];
      }
    });

    const student = await Student.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      student
    });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating student'
    });
  }
});

// Delete student
router.delete('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting student'
    });
  }
});

module.exports = router;
