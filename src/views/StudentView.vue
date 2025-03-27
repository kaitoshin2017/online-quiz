<template>
  <div class="student-container">
    <!-- Header Section -->
    <header>
      <nav>
        <div class="logo">
          <Logo />
        </div>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/student" class="active">My Quizzes</router-link></li>
          <li><router-link to="/results">My Results</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <!-- Available Quizzes Section -->
      <section id="available-quizzes">
        <h2><i class="fas fa-list-alt"></i> Available Quizzes</h2>
        <div class="quizzes-grid">
          <div v-for="quiz in availableQuizzes" :key="quiz.id" class="quiz-card">
            <div class="quiz-header">
              <h3>{{ quiz.title }}</h3>
              <span class="quiz-status" :class="quiz.status">{{ quiz.status }}</span>
            </div>
            <div class="quiz-details">
              <p><i class="fas fa-clock"></i> Duration: {{ quiz.duration }} minutes</p>
              <p><i class="fas fa-question-circle"></i> Questions: {{ quiz.questions }}</p>
              <p><i class="fas fa-star"></i> Points: {{ quiz.points }}</p>
            </div>
            <p class="quiz-description">{{ quiz.description }}</p>
            <button class="start-quiz-btn" @click="startQuiz(quiz)" :disabled="quiz.status !== 'Available'">
              <i class="fas fa-play"></i> Start Quiz
            </button>
          </div>
        </div>
      </section>

      <!-- Active Quiz Section -->
      <section v-if="activeQuiz" id="active-quiz" class="active-quiz">
        <div class="quiz-header">
          <h2>{{ activeQuiz.title }}</h2>
          <div class="timer">
            <i class="fas fa-clock"></i>
            <span>{{ formatTime(remainingTime) }}</span>
          </div>
        </div>
        
        <div class="quiz-progress">
          <div class="progress-bar">
            <div class="progress" :style="{ width: `${(currentQuestion / activeQuiz.questions.length) * 100}%` }"></div>
          </div>
          <span>Question {{ currentQuestion + 1 }} of {{ activeQuiz.questions.length }}</span>
        </div>

        <div class="question-container">
          <h3>{{ activeQuiz.questions[currentQuestion].question }}</h3>
          <div class="options">
            <div v-for="(option, index) in activeQuiz.questions[currentQuestion].options" 
                 :key="index"
                 class="option"
                 :class="{ selected: selectedAnswer === index }"
                 @click="selectAnswer(index)">
              {{ option }}
            </div>
          </div>
        </div>

        <div class="quiz-navigation">
          <button class="nav-btn" @click="previousQuestion" :disabled="currentQuestion === 0">
            <i class="fas fa-arrow-left"></i> Previous
          </button>
          <button class="nav-btn" @click="nextQuestion" :disabled="currentQuestion === activeQuiz.questions.length - 1">
            Next <i class="fas fa-arrow-right"></i>
          </button>
          <button class="submit-btn" @click="submitQuiz" v-if="currentQuestion === activeQuiz.questions.length - 1">
            <i class="fas fa-check"></i> Submit Quiz
          </button>
        </div>
      </section>

      <!-- Quiz Results Section -->
      <section v-if="quizResult" id="quiz-results" class="quiz-results">
        <h2><i class="fas fa-trophy"></i> Quiz Results</h2>
        <div class="result-card">
          <div class="score-circle">
            <div class="score">{{ quizResult.score }}%</div>
            <div class="score-label">Final Score</div>
          </div>
          <div class="result-details">
            <h3>{{ quizResult.title }}</h3>
            <div class="stats">
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
        </div>
        <button class="review-btn" @click="reviewAnswers">
          <i class="fas fa-search"></i> Review Answers
        </button>
      </section>
    </main>

    <!-- Footer Section -->
    <footer>
      <p>© 2025 Online Quiz System.STZ MADE CJ Kai Igna</p>
    </footer>
  </div>
</template>

<script>
import Logo from '../components/Logo.vue'

export default {
  name: "StudentView",
  components: {
    Logo
  },
  data() {
    return {
      availableQuizzes: [
        {
          id: 1,
          title: "Mathematics Basics",
          description: "Test your knowledge of basic mathematics concepts",
          duration: 30,
          questions: 10,
          points: 100,
          status: "Available"
        },
        {
          id: 2,
          title: "Science Fundamentals",
          description: "Basic concepts in physics and chemistry",
          duration: 45,
          questions: 15,
          points: 150,
          status: "Available"
        }
      ],
      activeQuiz: null,
      currentQuestion: 0,
      selectedAnswer: null,
      remainingTime: 0,
      quizResult: null,
      timer: null
    };
  },
  methods: {
    startQuiz(quiz) {
      this.activeQuiz = {
        ...quiz,
        questions: [
          {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correctAnswer: 1
          },
          // Add more questions here
        ]
      };
      this.remainingTime = quiz.duration * 60;
      this.startTimer();
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
        } else {
          this.submitQuiz();
        }
      }, 1000);
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
    selectAnswer(index) {
      this.selectedAnswer = index;
    },
    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
        this.selectedAnswer = null;
      }
    },
    nextQuestion() {
      if (this.currentQuestion < this.activeQuiz.questions.length - 1) {
        this.currentQuestion++;
        this.selectedAnswer = null;
      }
    },
    submitQuiz() {
      clearInterval(this.timer);
      this.quizResult = {
        title: this.activeQuiz.title,
        score: 85,
        correctAnswers: 8,
        wrongAnswers: 2,
        timeTaken: Math.floor((this.activeQuiz.duration * 60 - this.remainingTime) / 60)
      };
      this.activeQuiz = null;
    },
    reviewAnswers() {
      // Implement review functionality
    }
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style scoped>
/* Inherit base styles from HomeView */
.student-container {
  min-height: 100vh;
  background: linear-gradient(to right, #f8f9fa, #e3f2fd);
  font-family: "Poppins", sans-serif;
}

/* Header styles (same as HomeView) */
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

section {
  margin-bottom: 40px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Quizzes Grid */
.quizzes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.quiz-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.quiz-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.quiz-header h3 {
  margin: 0;
  color: #4a90e2;
  font-size: 1.3rem;
}

.quiz-status {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.quiz-status.Available {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.quiz-status.Completed {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
}

.quiz-details {
  margin: 15px 0;
}

.quiz-details p {
  margin: 8px 0;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
}

.quiz-description {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.start-quiz-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.start-quiz-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.start-quiz-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

/* Active Quiz Styles */
.active-quiz {
  position: relative;
}

.timer {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e74c3c;
  font-size: 1.2rem;
  font-weight: 600;
}

.quiz-progress {
  margin: 20px 0;
}

.progress-bar {
  height: 8px;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  transition: width 0.3s ease;
}

.question-container {
  margin: 30px 0;
}

.question-container h3 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.options {
  display: grid;
  gap: 15px;
}

.option {
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option:hover {
  border-color: #4a90e2;
  transform: translateX(5px);
}

.option.selected {
  background: rgba(74, 144, 226, 0.1);
  border-color: #4a90e2;
}

.quiz-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.nav-btn, .submit-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.nav-btn {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
}

.submit-btn {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
}

.nav-btn:hover, .submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

/* Quiz Results Styles */
.quiz-results {
  text-align: center;
}

.result-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin: 30px 0;
}

.score-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.score {
  font-size: 3rem;
  font-weight: 700;
}

.score-label {
  font-size: 1rem;
  opacity: 0.9;
}

.result-details {
  text-align: left;
}

.result-details h3 {
  color: #4a90e2;
  margin-bottom: 20px;
}

.stats {
  display: grid;
  gap: 15px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
}

.stat i {
  color: #4a90e2;
}

.review-btn {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.review-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

/* Dark Mode Styles */
:global(.dark-mode) .student-container {
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

:global(.dark-mode) section {
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) .quiz-card {
  background: rgba(40, 40, 40, 0.9);
}

:global(.dark-mode) .quiz-header h3 {
  color: #7b61ff;
}

:global(.dark-mode) .quiz-details p,
:global(.dark-mode) .quiz-description {
  color: #aaa;
}

:global(.dark-mode) .option {
  background: rgba(40, 40, 40, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) .option:hover {
  border-color: #7b61ff;
}

:global(.dark-mode) .option.selected {
  background: rgba(123, 97, 255, 0.1);
  border-color: #7b61ff;
}

:global(.dark-mode) .question-container h3 {
  color: #fff;
}

:global(.dark-mode) .nav-btn {
  background: rgba(123, 97, 255, 0.1);
  color: #7b61ff;
}

:global(.dark-mode) .stat {
  color: #aaa;
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

  .result-card {
    flex-direction: column;
    gap: 20px;
  }

  .quiz-navigation {
    flex-direction: column;
    gap: 15px;
  }

  .nav-btn, .submit-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
