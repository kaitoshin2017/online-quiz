const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const auth = require('../middleware/auth');

// Get all available quizzes
router.get('/', auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ status: 'Available' })
      .select('title description duration points createdAt')
      .sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific quiz
router.get('/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .select('title description duration points questions');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit quiz answers
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const { answers, timeTaken } = req.body;
    let score = 0;
    const quizResults = answers.map((answer, index) => {
      const question = quiz.questions[index];
      const isCorrect = answer.selectedAnswer === question.correctAnswer;
      if (isCorrect) {
        score += question.points;
      }
      return {
        questionIndex: index,
        selectedAnswer: answer.selectedAnswer,
        isCorrect
      };
    });

    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);

    const quizResult = new QuizResult({
      quiz: quiz._id,
      student: req.user._id,
      score,
      totalPoints,
      percentage,
      answers: quizResults,
      timeTaken
    });

    await quizResult.save();
    res.json(quizResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get quiz results for a student
router.get('/results/:quizId', auth, async (req, res) => {
  try {
    const result = await QuizResult.findOne({
      quiz: req.params.quizId,
      student: req.user._id
    });
    if (!result) {
      return res.status(404).json({ message: 'Quiz result not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new quiz (Admin only)
router.post('/create', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create quizzes' });
    }

    const { title, description, duration, questions } = req.body;

    // Validate required fields
    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Title and questions are required' });
    }

    // Validate each question
    for (const question of questions) {
      if (!question.text || !question.options || !Array.isArray(question.options) || 
          question.options.length < 2 || question.correctAnswer === undefined) {
        return res.status(400).json({ message: 'Invalid question format' });
      }
    }

    const quiz = new Quiz({
      title,
      description,
      duration: duration || 30,
      questions,
      createdBy: req.user._id,
      status: 'published'
    });

    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Server error occurred' });
  }
});

// Update a quiz (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update quizzes' });
    }

    const { title, description, duration, questions, status } = req.body;
    
    // Validate required fields
    if (!title || !description || !duration || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate questions
    for (const question of questions) {
      if (!question.text || !question.options || !Array.isArray(question.options) || 
          question.options.length < 2 || !question.correctAnswer || !question.points) {
        return res.status(400).json({ message: 'Invalid question format' });
      }
    }

    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Update quiz fields
    quiz.title = title;
    quiz.description = description;
    quiz.duration = duration;
    quiz.questions = questions;
    if (status) quiz.status = status;

    await quiz.save();
    res.json(quiz);
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 