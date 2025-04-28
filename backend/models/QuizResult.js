const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  wrongAnswers: {
    type: Number,
    required: true
  },
  timeTaken: {
    type: Number, // in minutes
    required: true
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    selectedOption: {
      type: Number,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    }
  }],
  completedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult; 