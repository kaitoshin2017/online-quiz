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
router.get('/dashboard', teacherController.getDashboard);

// Get teacher's quizzes
router.get('/quizzes', teacherController.getQuizzes);

// Get teacher's students
router.get('/students', teacherController.getStudents);

// Get quiz results
router.get('/results', teacherController.getResults);

// Get teacher profile
router.get('/profile', teacherController.getProfile);

// Update teacher profile
router.put('/profile', teacherController.updateProfile);

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
router.post('/students', teacherController.addStudent);

// Update student
router.put('/students/:id', teacherController.updateStudent);

// Delete student
router.delete('/students/:id', teacherController.deleteStudent);

module.exports = router;
