const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const auth = require('../middleware/auth');
const Settings = require('../models/Settings');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

// Get teacher dashboard data
router.get('/dashboard', auth, async (req, res) => {
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
router.get('/quizzes', auth, async (req, res) => {
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
router.get('/students', auth, async (req, res) => {
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
router.get('/results', auth, async (req, res) => {
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
router.get('/profile', auth, async (req, res) => {
    try {
        let teacher = await Teacher.findById(req.user.id).select('-password');
        
        // If teacher doesn't exist in Teacher model but exists in User model
        if (!teacher && req.user.role === 'teacher') {
            const user = await User.findById(req.user.id);
            teacher = new Teacher({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                avatar: user.avatar,
                role: 'teacher'
            });
            await teacher.save();
            console.log('Created new teacher record for existing user:', teacher.email);
        }

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            });
        }

        res.json({
            success: true,
            teacher: {
                id: teacher._id,
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                email: teacher.email,
                phone: teacher.phone,
                bio: teacher.bio,
                avatar: teacher.avatar
            }
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

// Update teacher profile
router.put('/profile', auth, async (req, res) => {
    try {
        const updates = req.body;
        const allowedUpdates = ['firstName', 'lastName', 'phone', 'bio', 'avatar'];
        const updateFields = {};

        Object.keys(updates).forEach(key => {
            if (allowedUpdates.includes(key)) {
                updateFields[key] = updates[key];
            }
        });

        let teacher = await Teacher.findById(req.user.id);

        // If teacher doesn't exist in Teacher model but exists in User model
        if (!teacher && req.user.role === 'teacher') {
            const user = await User.findById(req.user.id);
            teacher = new Teacher({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                avatar: user.avatar,
                role: 'teacher',
                ...updateFields
            });
            await teacher.save();
            console.log('Created and updated new teacher record for existing user:', teacher.email);
        } else if (teacher) {
            Object.assign(teacher, updateFields);
            await teacher.save();
            console.log('Updated existing teacher record:', teacher.email);
        }

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            });
        }

        // Also update the User model to keep data in sync
        await User.findByIdAndUpdate(req.user.id, updateFields);

        res.json({
            success: true,
            teacher: {
                id: teacher._id,
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                email: teacher.email,
                phone: teacher.phone,
                bio: teacher.bio,
                avatar: teacher.avatar
            }
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

// Get teacher settings
router.get('/settings', auth, async (req, res) => {
    try {
        let settings = await Settings.findOne({ userId: req.user.id });
        
        // If no settings exist, create default settings
        if (!settings) {
            settings = new Settings({
                userId: req.user.id,
                notifications: {
                    email: false,
                    quizResults: false,
                    studentActivity: false
                },
                quizPreferences: {
                    defaultDuration: 30,
                    questionsPerPage: '10',
                    showTimer: true,
                    randomizeQuestions: false
                },
                theme: {
                    darkMode: false,
                    themeColor: 'default'
                }
            });
            await settings.save();
        }

        res.json({
            success: true,
            settings
        });
    } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching settings',
            error: error.message
        });
    }
});

// Update teacher settings
router.put('/settings', auth, async (req, res) => {
    try {
        const updates = req.body;
        const allowedUpdates = ['notifications', 'quizPreferences', 'theme'];
        
        // Validate updates
        const isValidOperation = Object.keys(updates).every(update => 
            allowedUpdates.includes(update)
        );

        if (!isValidOperation) {
            return res.status(400).json({
                success: false,
                message: 'Invalid updates'
            });
        }

        let settings = await Settings.findOne({ userId: req.user.id });
        
        if (!settings) {
            settings = new Settings({
                userId: req.user.id,
                ...updates
            });
        } else {
            // Update only the provided fields
            Object.keys(updates).forEach(key => {
                settings[key] = updates[key];
            });
        }

        await settings.save();

        res.json({
            success: true,
            settings
        });
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating settings',
            error: error.message
        });
    }
});

// Create a new quiz
router.post('/quizzes', auth, async (req, res) => {
    try {
        const { title, description, duration, questions } = req.body;

        // Validate required fields
        if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Title and at least one question are required'
            });
        }

        // Validate each question
        for (const question of questions) {
            if (!question.text || !question.options || !Array.isArray(question.options) || 
                question.options.length < 2 || question.correctAnswer === undefined || 
                question.points === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Each question must have text, at least two options, a correct answer, and points'
                });
            }
        }

        // Calculate total points
        const totalPoints = questions.reduce((sum, question) => sum + question.points, 0);

        // Create new quiz
        const quiz = new Quiz({
            title,
            description: description || '',
            duration: duration || 30, // Default duration of 30 minutes
            questions,
            totalPoints,
            createdBy: req.user.id,
            status: 'published'
        });

        await quiz.save();

        res.status(201).json({
            success: true,
            quiz: {
                id: quiz._id,
                title: quiz.title,
                description: quiz.description,
                duration: quiz.duration,
                totalPoints: quiz.totalPoints,
                status: quiz.status,
                createdAt: quiz.createdAt
            }
        });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating quiz',
            error: error.message
        });
    }
});

// Add new student
router.post('/students', auth, async (req, res) => {
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
router.put('/students/:id', auth, async (req, res) => {
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
router.delete('/students/:id', auth, async (req, res) => {
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