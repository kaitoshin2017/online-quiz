const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const User = require('../models/User');

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate('teacher', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json({ success: true, quizzes });
  } catch (error) {
    console.error('Error getting quizzes:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('teacher', 'firstName lastName');
    
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    
    res.json({ success: true, quiz });
  } catch (error) {
    console.error('Error getting quiz:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create new quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, description, questions, duration, passingScore, isPublished } = req.body;
    
    const quiz = new Quiz({
      title,
      description,
      questions,
      duration,
      passingScore,
      isPublished: isPublished || false,
      teacher: req.user.id
    });

    await quiz.save();
    res.status(201).json({ success: true, quiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update quiz
exports.updateQuiz = async (req, res) => {
  try {
    const { title, description, questions, duration, passingScore, isPublished } = req.body;
    
    const quiz = await Quiz.findOneAndUpdate(
      { _id: req.params.id, teacher: req.user.id },
      { 
        title,
        description,
        questions,
        duration,
        passingScore,
        isPublished
      },
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

// Delete quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndDelete({ 
      _id: req.params.id,
      teacher: req.user.id 
    });

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    // Delete associated quiz results
    await QuizResult.deleteMany({ quiz: req.params.id });

    res.json({ success: true, message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Publish/Unpublish quiz
exports.toggleQuizPublish = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ 
      _id: req.params.id,
      teacher: req.user.id 
    });

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    quiz.isPublished = !quiz.isPublished;
    await quiz.save();

    res.json({ 
      success: true, 
      message: quiz.isPublished ? 'Quiz published successfully' : 'Quiz unpublished successfully',
      quiz 
    });
  } catch (error) {
    console.error('Error toggling quiz publish status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get quiz results
exports.getQuizResults = async (req, res) => {
  try {
    const results = await QuizResult.find({ quiz: req.params.id })
      .populate('student', 'firstName lastName email')
      .sort({ completedAt: -1 });

    res.json({ success: true, results });
  } catch (error) {
    console.error('Error getting quiz results:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Submit quiz attempt
exports.submitQuizAttempt = async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    if (!quiz.isPublished) {
      return res.status(400).json({ success: false, message: 'Quiz is not published' });
    }

    // Calculate score
    let score = 0;
    const totalQuestions = quiz.questions.length;

    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    const percentageScore = (score / totalQuestions) * 100;
    const passed = percentageScore >= quiz.passingScore;

    const quizResult = new QuizResult({
      quiz: quiz._id,
      student: req.user.id,
      answers,
      score: percentageScore,
      passed,
      completedAt: new Date()
    });

    await quizResult.save();

    res.json({ 
      success: true, 
      result: quizResult,
      message: passed ? 'Congratulations! You passed the quiz.' : 'You did not pass the quiz. Try again!'
    });
  } catch (error) {
    console.error('Error submitting quiz attempt:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get student's quiz attempts
exports.getStudentQuizAttempts = async (req, res) => {
  try {
    const attempts = await QuizResult.find({ 
      student: req.user.id,
      quiz: req.params.id 
    }).sort({ completedAt: -1 });

    res.json({ success: true, attempts });
  } catch (error) {
    console.error('Error getting student quiz attempts:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}; 