const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Quiz = require('../models/Quiz');
const Student = require('../models/Student');
const QuizResult = require('../models/QuizResult');


// Get teacher profile
exports.getProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id).select('-password');
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }
    res.json({ success: true, teacher });
  } catch (error) {
    console.error('Error getting teacher profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update teacher profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, bio } = req.body;
    const teacher = await Teacher.findById(req.user.id);

    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    teacher.firstName = firstName || teacher.firstName;
    teacher.lastName = lastName || teacher.lastName;
    teacher.email = email || teacher.email;
    teacher.phone = phone || teacher.phone;
    teacher.bio = bio || teacher.bio;

    await teacher.save();
    res.json({ success: true, teacher });
  } catch (error) {
    console.error('Error updating teacher profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get teacher settings
exports.getSettings = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id).select('settings');
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }
    res.json({ success: true, settings: teacher.settings });
  } catch (error) {
    console.error('Error getting teacher settings:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update teacher settings
exports.updateSettings = async (req, res) => {
  try {
    const { notifications, quizPreferences, themePreferences } = req.body;
    const teacher = await Teacher.findById(req.user.id);

    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    if (notifications) teacher.settings.notifications = notifications;
    if (quizPreferences) teacher.settings.quizPreferences = quizPreferences;
    if (themePreferences) teacher.settings.themePreferences = themePreferences;

    await teacher.save();
    res.json({ success: true, settings: teacher.settings });
  } catch (error) {
    console.error('Error updating teacher settings:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update avatar
exports.updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const teacher = await Teacher.findById(req.user.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    teacher.avatar = `/uploads/${req.file.filename}`;
    await teacher.save();

    res.json({ success: true, avatar: teacher.avatar });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const teacher = await Teacher.findById(req.user.id);

    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    teacher.password = await bcrypt.hash(newPassword, salt);
    await teacher.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    res.json({ success: true, message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get teacher dashboard data
exports.getDashboard = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    const totalQuizzes = await Quiz.countDocuments({ teacher: req.user.id });
    const totalStudents = await Student.countDocuments({ teacher: req.user.id });
    const recentQuizzes = await Quiz.find({ teacher: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        totalQuizzes,
        totalStudents,
        recentQuizzes
      }
    });
  } catch (error) {
    console.error('Error getting dashboard:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get teacher's quizzes
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ teacher: req.user.id })
      .sort({ createdAt: -1 });
    res.json({ success: true, quizzes });
  } catch (error) {
    console.error('Error getting quizzes:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get teacher's students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({ teacher: req.user.id })
      .sort({ createdAt: -1 });
    res.json({ success: true, students });
  } catch (error) {
    console.error('Error getting students:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get quiz results
exports.getResults = async (req, res) => {
  try {
    const results = await QuizResult.find({ teacher: req.user.id })
      .populate('student', 'firstName lastName')
      .populate('quiz', 'title')
      .sort({ createdAt: -1 });
    res.json({ success: true, results });
  } catch (error) {
    console.error('Error getting results:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, description, questions, duration, passingScore } = req.body;
    const quiz = new Quiz({
      title,
      description,
      questions,
      duration,
      passingScore,
      teacher: req.user.id
    });
    await quiz.save();
    res.status(201).json({ success: true, quiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update a quiz
exports.updateQuiz = async (req, res) => {
  try {
    const { title, description, questions, duration, passingScore } = req.body;
    const quiz = await Quiz.findOneAndUpdate(
      { _id: req.params.id, teacher: req.user.id },
      { title, description, questions, duration, passingScore },
      { new: true }
    );
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    res.json({ success: true, quiz });
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Add new student
exports.addStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const student = new Student({
      firstName,
      lastName,
      email,
      password,
      teacher: req.user.id
    });
    await student.save();
    res.status(201).json({ success: true, student });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, teacher: req.user.id },
      { firstName, lastName, email },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, student });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ _id: req.params.id, teacher: req.user.id });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
