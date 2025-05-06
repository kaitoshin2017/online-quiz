const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const Settings = require('../models/Settings');
const SystemLog = require('../models/SystemLog');
const reportService = require('../services/reportService');

// Get system overview
exports.getSystemOverview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();
    const totalAttempts = await QuizResult.countDocuments();

    const recentLogs = await SystemLog.find()
      .sort({ timestamp: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalTeachers,
        totalStudents,
        totalQuizzes,
        totalAttempts,
        recentLogs
      }
    });
  } catch (error) {
    console.error('Error getting system overview:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update user status
exports.updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Log the action
    await SystemLog.create({
      action: 'UPDATE_USER_STATUS',
      details: `Updated user ${user.email} status to ${status}`,
      performedBy: req.user.id
    });

    res.json({ success: true, user });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get system settings
exports.getSystemSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json({ success: true, settings });
  } catch (error) {
    console.error('Error getting system settings:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update system settings
exports.updateSystemSettings = async (req, res) => {
  try {
    const { maintenanceMode, registrationEnabled, maxQuizAttempts, defaultQuizDuration } = req.body;

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    if (maintenanceMode !== undefined) settings.maintenanceMode = maintenanceMode;
    if (registrationEnabled !== undefined) settings.registrationEnabled = registrationEnabled;
    if (maxQuizAttempts !== undefined) settings.maxQuizAttempts = maxQuizAttempts;
    if (defaultQuizDuration !== undefined) settings.defaultQuizDuration = defaultQuizDuration;

    await settings.save();

    // Log the action
    await SystemLog.create({
      action: 'UPDATE_SYSTEM_SETTINGS',
      details: 'System settings updated',
      performedBy: req.user.id
    });

    res.json({ success: true, settings });
  } catch (error) {
    console.error('Error updating system settings:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Generate reports
exports.generateReport = async (req, res) => {
  try {
    const { reportType, startDate, endDate } = req.body;

    let report;
    switch (reportType) {
      case 'user_activity':
        report = await reportService.generateUserActivityReport(startDate, endDate);
        break;
      case 'quiz_performance':
        report = await reportService.generateQuizPerformanceReport(startDate, endDate);
        break;
      case 'system_usage':
        report = await reportService.generateSystemUsageReport(startDate, endDate);
        break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid report type' });
    }

    // Log the action
    await SystemLog.create({
      action: 'GENERATE_REPORT',
      details: `Generated ${reportType} report`,
      performedBy: req.user.id
    });

    res.json({ success: true, report });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get system logs
exports.getSystemLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50, action } = req.query;
    const query = action ? { action } : {};

    const logs = await SystemLog.find(query)
      .populate('performedBy', 'firstName lastName email')
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await SystemLog.countDocuments(query);

    res.json({
      success: true,
      logs,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Error getting system logs:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Delete associated data based on user role
    if (user.role === 'teacher') {
      await Teacher.findByIdAndDelete(userId);
      await Quiz.deleteMany({ teacher: userId });
    } else if (user.role === 'student') {
      await Student.findByIdAndDelete(userId);
      await QuizResult.deleteMany({ student: userId });
    }

    await User.findByIdAndDelete(userId);

    // Log the action
    await SystemLog.create({
      action: 'DELETE_USER',
      details: `Deleted user ${user.email}`,
      performedBy: req.user.id
    });

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}; 