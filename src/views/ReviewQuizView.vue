<template>
  <div class="review-container">
    <!-- Header Section -->
    <header>
      <nav>
        <div class="logo">
          <h1>EvoQuiz</h1>
        </div>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/student">My Quizzes</router-link></li>
          <li><router-link to="/results">My Results</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <section class="review-section">
        <div class="review-header">
          <button class="back-btn" @click="$router.push('/results')">
            <i class="fas fa-arrow-left"></i> Back to Results
          </button>
          <h2><i class="fas fa-search"></i> Quiz Review</h2>
        </div>

        <!-- Quiz Summary -->
        <div class="quiz-summary">
          <div class="summary-card">
            <div class="score-circle" :class="getScoreClass(quizResult.score)">
              {{ quizResult.score }}%
            </div>
            <div class="summary-info">
              <h3>{{ quizResult.title }}</h3>
              <p class="quiz-date">Completed on {{ quizResult.date }}</p>
            </div>
          </div>
          <div class="summary-stats">
            <div class="stat">
              <i class="fas fa-check-circle"></i>
              <span>Correct Answers: {{ quizResult.correctAnswers }}</span>
            </div>
            <div class="stat">
              <i class="fas fa-times-circle"></i>
              <span>Wrong Answers: {{ quizResult.wrongAnswers }}</span>
            </div>
            <div class="stat">
              <i class="fas fa-clock"></i>
              <span>Time Taken: {{ quizResult.timeTaken }} minutes</span>
            </div>
          </div>
        </div>

        <!-- Questions Review -->
        <div class="questions-review">
          <div v-for="(question, index) in quizResult.questions" 
               :key="index" 
               class="question-card"
               :class="{ 'correct': question.isCorrect, 'incorrect': !question.isCorrect }">
            <div class="question-header">
              <span class="question-number">Question {{ index + 1 }}</span>
              <span class="question-status">
                <i :class="question.isCorrect ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
                {{ question.isCorrect ? 'Correct' : 'Incorrect' }}
              </span>
            </div>
            <div class="question-content">
              <h3>{{ question.question }}</h3>
              <div class="options">
                <div v-for="(option, optIndex) in question.options" 
                     :key="optIndex"
                     class="option"
                     :class="{
                       'selected': optIndex === question.selectedAnswer,
                       'correct': optIndex === question.correctAnswer,
                       'incorrect': !question.isCorrect && optIndex === question.selectedAnswer
                     }">
                  {{ option }}
                </div>
              </div>
            </div>
            <div class="explanation" v-if="question.explanation">
              <h4>Explanation:</h4>
              <p>{{ question.explanation }}</p>
            </div>
          </div>
        </div>

        <!-- Review Actions -->
        <div class="review-actions">
          <button class="retake-btn" @click="retakeQuiz">
            <i class="fas fa-redo"></i> Retake Quiz
          </button>
          <button class="share-btn" @click="shareResults">
            <i class="fas fa-share-alt"></i> Share Results
          </button>
        </div>
      </section>
    </main>

    <!-- Footer Section -->
    <footer>
      <p>© 2025 Online Quiz System.STZ MADE CJ Kai Igna</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "ReviewQuizView",
  data() {
    return {
      quizResult: {
        title: "Mathematics Basics",
        date: "2024-03-15",
        score: 85,
        correctAnswers: 8,
        wrongAnswers: 2,
        timeTaken: 25,
        questions: [
          {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            selectedAnswer: 1,
            correctAnswer: 1,
            isCorrect: true,
            explanation: "The correct answer is 4 because 2 + 2 = 4."
          },
          {
            question: "What is the square root of 16?",
            options: ["2", "3", "4", "5"],
            selectedAnswer: 2,
            correctAnswer: 2,
            isCorrect: true,
            explanation: "The square root of 16 is 4 because 4 × 4 = 16."
          },
          {
            question: "What is 7 × 8?",
            options: ["54", "56", "58", "60"],
            selectedAnswer: 0,
            correctAnswer: 1,
            isCorrect: false,
            explanation: "The correct answer is 56 because 7 × 8 = 56."
          }
        ]
      }
    };
  },
  methods: {
    getScoreClass(score) {
      if (score >= 90) return "excellent";
      if (score >= 80) return "good";
      if (score >= 70) return "fair";
      return "poor";
    },
    retakeQuiz() {
      this.$router.push(`/take-quiz/${this.quizResult.id}`);
    },
    shareResults() {
      // Implement share functionality
      alert("Share functionality coming soon!");
    }
  }
};
</script>

<style scoped>
.review-container {
  min-height: 100vh;
  background: linear-gradient(to right, #f8f9fa, #e3f2fd);
  font-family: "Poppins", sans-serif;
}

/* Header styles (same as other views) */
header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1.5rem 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 25px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  padding: 8px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

nav ul li a:hover {
  color: #4a90e2;
  background: rgba(74, 144, 226, 0.1);
}

/* Main Content Styles */
main {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.review-section {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.review-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  transform: translateX(-5px);
  background: rgba(74, 144, 226, 0.2);
}

.review-header h2 {
  color: #4a90e2;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Quiz Summary */
.quiz-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  gap: 30px;
  flex-wrap: wrap;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 20px;
}

.score-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: white;
}

.score-circle.excellent {
  background: linear-gradient(to right, #2ecc71, #27ae60);
}

.score-circle.good {
  background: linear-gradient(to right, #3498db, #2980b9);
}

.score-circle.fair {
  background: linear-gradient(to right, #f1c40f, #f39c12);
}

.score-circle.poor {
  background: linear-gradient(to right, #e74c3c, #c0392b);
}

.summary-info h3 {
  margin: 0;
  color: #4a90e2;
  font-size: 1.5rem;
}

.quiz-date {
  color: #666;
  margin: 5px 0 0;
}

.summary-stats {
  display: flex;
  gap: 20px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.stat i {
  color: #4a90e2;
}

/* Questions Review */
.questions-review {
  display: grid;
  gap: 20px;
  margin-bottom: 30px;
}

.question-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.question-card.correct {
  border-left: 4px solid #2ecc71;
}

.question-card.incorrect {
  border-left: 4px solid #e74c3c;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.question-number {
  color: #4a90e2;
  font-weight: 600;
}

.question-status {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
}

.question-status i {
  font-size: 1.1rem;
}

.question-card.correct .question-status {
  color: #2ecc71;
}

.question-card.incorrect .question-status {
  color: #e74c3c;
}

.question-content h3 {
  margin: 0 0 15px;
  color: #333;
  font-size: 1.2rem;
}

.options {
  display: grid;
  gap: 10px;
}

.option {
  padding: 12px;
  border-radius: 8px;
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  transition: all 0.3s ease;
}

.option.selected {
  background: rgba(74, 144, 226, 0.2);
  border: 2px solid #4a90e2;
}

.option.correct {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
  border: 2px solid #2ecc71;
}

.option.incorrect {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  border: 2px solid #e74c3c;
}

.explanation {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.explanation h4 {
  color: #4a90e2;
  margin: 0 0 10px;
}

.explanation p {
  color: #666;
  margin: 0;
  line-height: 1.5;
}

/* Review Actions */
.review-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.retake-btn, .share-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.retake-btn {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
}

.share-btn {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
}

.retake-btn:hover, .share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

/* Dark Mode Styles */
:global(.dark-mode) .review-container {
  background: linear-gradient(to right, #1a1a1a, #2d3436);
}

:global(.dark-mode) header {
  background: rgba(30, 30, 30, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) nav ul li a {
  color: #fff;
}

:global(.dark-mode) nav ul li a:hover {
  color: #7b61ff;
  background: rgba(123, 97, 255, 0.1);
}

:global(.dark-mode) .review-section {
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) .back-btn {
  background: rgba(123, 97, 255, 0.1);
  color: #7b61ff;
}

:global(.dark-mode) .back-btn:hover {
  background: rgba(123, 97, 255, 0.2);
}

:global(.dark-mode) .summary-info h3 {
  color: #7b61ff;
}

:global(.dark-mode) .quiz-date,
:global(.dark-mode) .stat {
  color: #aaa;
}

:global(.dark-mode) .question-card {
  background: rgba(40, 40, 40, 0.9);
}

:global(.dark-mode) .question-content h3 {
  color: #fff;
}

:global(.dark-mode) .option {
  background: rgba(123, 97, 255, 0.1);
  color: #7b61ff;
}

:global(.dark-mode) .option.selected {
  background: rgba(123, 97, 255, 0.2);
  border-color: #7b61ff;
}

:global(.dark-mode) .explanation {
  border-top-color: rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) .explanation h4 {
  color: #7b61ff;
}

:global(.dark-mode) .explanation p {
  color: #aaa;
}

:global(.dark-mode) .share-btn {
  background: rgba(123, 97, 255, 0.1);
  color: #7b61ff;
}

/* Responsive Design */
@media (max-width: 768px) {
  nav {
    flex-direction: column;
    gap: 20px;
  }

  nav ul {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .quiz-summary {
    flex-direction: column;
    text-align: center;
  }

  .summary-stats {
    flex-direction: column;
    align-items: center;
  }

  .review-actions {
    flex-direction: column;
  }

  .retake-btn, .share-btn {
    width: 100%;
    justify-content: center;
  }
}
</style> 