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

module.exports = router; 