const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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