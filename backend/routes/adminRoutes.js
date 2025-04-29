const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Quiz = require('../models/Quiz');
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');
const reportService = require('../services/reportService');
const QuizAttempt = require('../models/QuizAttempt');
const SystemLog = require('../models/SystemLog');

// Apply authentication middleware to all routes
router.use(auth);

// Get admin profile
router.get('/profile', async (req, res) => {
  try {
    const admin = await User.findById(req.user._id).select('-password');
    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({
        success: false,
        message: 'Admin profile not found'
      });
    }

    res.json({
      success: true,
      admin
    });
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Get dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    const statistics = {
      totalUsers: await User.countDocuments(),
      activeTeachers: await Teacher.countDocuments({ status: 'active' }),
      activeStudents: await Student.countDocuments({ status: 'active' }),
      totalQuizzes: await Quiz.countDocuments()
    };

    const recentActivities = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName role createdAt');

    res.json({
      success: true,
      data: {
        statistics,
        recentActivities
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Get all teachers
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json({
      success: true,
      teachers
    });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json({
      success: true,
      students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Get all quizzes
router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json({
      success: true,
      quizzes
    });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Get system settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      // Create default settings if none exist
      const defaultSettings = new Settings({
        siteName: 'Online Quiz System',
        siteDescription: 'A modern online quiz platform',
        maxQuizDuration: 60,
        minPassingScore: 70,
        maxAttempts: 3,
        emailNotifications: true,
        maintenanceMode: false,
        registrationEnabled: true,
        defaultUserRole: 'student'
      });
      await defaultSettings.save();
      return res.json({
        success: true,
        settings: defaultSettings
      });
    }

    res.json({
      success: true,
      settings
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Update system settings
router.put('/settings', async (req, res) => {
  try {
    const updates = req.body;

    // Validate updates
    const allowedUpdates = [
      'siteName',
      'siteDescription',
      'maxQuizDuration',
      'minPassingScore',
      'maxAttempts',
      'emailNotifications',
      'maintenanceMode',
      'registrationEnabled',
      'defaultUserRole'
    ];

    // Filter out invalid updates
    const validUpdates = {};
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        validUpdates[key] = updates[key];
      }
    });

    // Update settings
    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: validUpdates },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      settings
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Update admin profile
router.put('/profile', async (req, res) => {
  try {
    const updates = req.body;
    const admin = await User.findById(req.user._id);

    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({
        success: false,
        message: 'Admin profile not found'
      });
    }

    // Update allowed fields
    const allowedUpdates = ['firstName', 'lastName', 'email', 'phone', 'avatar'];
    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        admin[field] = updates[field];
      }
    });

    await admin.save();

    res.json({
      success: true,
      admin: admin.toJSON()
    });
  } catch (error) {
    console.error('Error updating admin profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Create initial admin user if none exists
router.post('/init', async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin user already exists'
      });
    }

    const admin = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      admin: admin.toJSON()
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, phone, address } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      phone,
      address
    });

    await user.save();

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      user: userResponse
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Update user
router.put('/users/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, role, phone, address, status } = req.body;
    const userId = req.params.id;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update allowed fields
    const updates = {
      firstName,
      lastName,
      email,
      role,
      phone,
      address,
      status
    };

    // Remove undefined fields
    Object.keys(updates).forEach(key => {
      if (updates[key] === undefined) {
        delete updates[key];
      }
    });

    // Update user
    Object.assign(user, updates);
    await user.save();

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({
      success: true,
      user: userResponse
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Find and delete user
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Generate report
router.post('/reports/generate', async (req, res) => {
  try {
    const { type, startDate, endDate, filters } = req.body;

    // Validate required fields
    if (!type) {
      return res.status(400).json({
        success: false,
        message: 'Report type is required'
      });
    }

    let report;
    switch (type) {
      case 'user_activity':
        report = await reportService.generateUserActivityReport(startDate, endDate, filters);
        break;
      case 'quiz_performance':
        report = await reportService.generateQuizPerformanceReport(startDate, endDate, filters);
        break;
      case 'teacher_performance':
        report = await reportService.generateTeacherPerformanceReport(startDate, endDate, filters);
        break;
      case 'student_progress':
        report = await reportService.generateStudentProgressReport(startDate, endDate, filters);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid report type'
        });
    }

    res.json({
      success: true,
      report
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Create a new teacher
router.post('/teachers', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, address, subjects } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if email already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Create new teacher
    const teacher = new Teacher({
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      subjects: subjects || [],
      status: 'active'
    });

    await teacher.save();

    res.status(201).json({
      success: true,
      teacher
    });
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Update teacher
router.put('/teachers/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address, subjects, status } = req.body;
    const teacherId = req.params.id;

    // Find teacher
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    // Update allowed fields
    const updates = {
      firstName,
      lastName,
      email,
      phone,
      address,
      subjects,
      status
    };

    // Remove undefined fields
    Object.keys(updates).forEach(key => {
      if (updates[key] === undefined) {
        delete updates[key];
      }
    });

    // Update teacher
    Object.assign(teacher, updates);
    await teacher.save();

    res.json({
      success: true,
      teacher
    });
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Delete teacher
router.delete('/teachers/:id', async (req, res) => {
  try {
    const teacherId = req.params.id;

    // Find and delete teacher
    const teacher = await Teacher.findByIdAndDelete(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.json({
      success: true,
      message: 'Teacher deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Create a new student
router.post('/students', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, address, grade } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Create new student
    const student = new Student({
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      grade,
      status: 'active'
    });

    await student.save();

    res.status(201).json({
      success: true,
      student
    });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Update student
router.put('/students/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address, grade, status } = req.body;
    const studentId = req.params.id;

    // Find student
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Update allowed fields
    const updates = {
      firstName,
      lastName,
      email,
      phone,
      address,
      grade,
      status
    };

    // Remove undefined fields
    Object.keys(updates).forEach(key => {
      if (updates[key] === undefined) {
        delete updates[key];
      }
    });

    // Update student
    Object.assign(student, updates);
    await student.save();

    res.json({
      success: true,
      student
    });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Delete student
router.delete('/students/:id', async (req, res) => {
  try {
    const studentId = req.params.id;

    // Find and delete student
    const student = await Student.findByIdAndDelete(studentId);
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
      message: 'Server error occurred'
    });
  }
});

// Create a new quiz
router.post('/quizzes', async (req, res) => {
  try {
    const { title, description, duration, questions, passingScore, category } = req.body;

    // Validate required fields
    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Title and questions are required'
      });
    }

    // Validate each question
    for (const question of questions) {
      if (!question.text || !question.options || !Array.isArray(question.options) || 
          question.options.length < 2 || question.correctAnswer === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Invalid question format'
        });
      }
    }

    // Create new quiz
    const quiz = new Quiz({
      title,
      description,
      duration: duration || 30,
      questions,
      passingScore: passingScore || 70,
      category,
      createdBy: req.user._id,
      status: 'published'
    });

    await quiz.save();

    res.status(201).json({
      success: true,
      quiz
    });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Update quiz
router.put('/quizzes/:id', async (req, res) => {
  try {
    const { title, description, duration, questions, passingScore, category, status } = req.body;
    const quizId = req.params.id;

    // Find quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Validate questions if provided
    if (questions && Array.isArray(questions)) {
      for (const question of questions) {
        if (!question.text || !question.options || !Array.isArray(question.options) || 
            question.options.length < 2 || question.correctAnswer === undefined) {
          return res.status(400).json({
            success: false,
            message: 'Invalid question format'
          });
        }
      }
    }

    // Update quiz fields
    const updates = {
      title,
      description,
      duration,
      questions,
      passingScore,
      category,
      status
    };

    // Remove undefined fields
    Object.keys(updates).forEach(key => {
      if (updates[key] === undefined) {
        delete updates[key];
      }
    });

    // Update quiz
    Object.assign(quiz, updates);
    await quiz.save();

    res.json({
      success: true,
      quiz
    });
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Delete quiz
router.delete('/quizzes/:id', async (req, res) => {
  try {
    const quizId = req.params.id;

    // Find and delete quiz
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    res.json({
      success: true,
      message: 'Quiz deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Get quiz statistics
router.get('/quizzes/:id/statistics', async (req, res) => {
  try {
    const quizId = req.params.id;

    // Find quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Get quiz attempts
    const attempts = await QuizAttempt.find({ quiz: quizId });
    
    // Calculate statistics
    const totalAttempts = attempts.length;
    const passedAttempts = attempts.filter(attempt => attempt.score >= quiz.passingScore).length;
    const averageScore = totalAttempts > 0 
      ? attempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalAttempts 
      : 0;

    // Get question-wise statistics
    const questionStats = quiz.questions.map(question => {
      const correctAnswers = attempts.filter(attempt => {
        const answer = attempt.answers.find(a => a.questionId.toString() === question._id.toString());
        return answer && answer.selectedAnswer === question.correctAnswer;
      }).length;

      return {
        questionId: question._id,
        text: question.text,
        correctAnswers,
        totalAttempts,
        percentage: totalAttempts > 0 ? (correctAnswers / totalAttempts) * 100 : 0
      };
    });

    res.json({
      success: true,
      statistics: {
        totalAttempts,
        passedAttempts,
        averageScore,
        passingRate: totalAttempts > 0 ? (passedAttempts / totalAttempts) * 100 : 0,
        questionStats
      }
    });
  } catch (error) {
    console.error('Error fetching quiz statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Get system logs
router.get('/logs', async (req, res) => {
  try {
    const { type, startDate, endDate, limit = 100 } = req.query;

    // Build query
    const query = {};
    if (type) query.type = type;
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    // Get logs
    const logs = await SystemLog.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      logs
    });
  } catch (error) {
    console.error('Error fetching system logs:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

module.exports = router; 