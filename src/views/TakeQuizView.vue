<template>
  <div class="quiz-container">
    <!-- Quiz Header -->
    <header class="quiz-header">
      <button class="back-btn" @click="$router.push('/student')">
        <i class="fas fa-arrow-left"></i> Back to Quizzes
      </button>
      <div class="quiz-info">
        <h1>{{ quiz.title }}</h1>
        <div class="timer">
          <i class="fas fa-clock"></i>
          <span>{{ formatTime(remainingTime) }}</span>
        </div>
      </div>
    </header>

    <!-- Quiz Content -->
    <main class="quiz-content">
      <!-- Progress Bar -->
      <div class="quiz-progress">
        <div class="progress-bar">
          <div class="progress" :style="{ width: `${(currentQuestion / quiz.questions.length) * 100}%` }"></div>
        </div>
        <span>Question {{ currentQuestion + 1 }} of {{ quiz.questions.length }}</span>
      </div>

      <!-- Question -->
      <div class="question-container">
        <h2>{{ quiz.questions[currentQuestion].question }}</h2>
        <div class="options">
          <div v-for="(option, index) in quiz.questions[currentQuestion].options" 
               :key="index"
               class="option"
               :class="{ selected: selectedAnswer === index }"
               @click="selectAnswer(index)">
            {{ option }}
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="quiz-navigation">
        <button class="nav-btn" @click="previousQuestion" :disabled="currentQuestion === 0">
          <i class="fas fa-arrow-left"></i> Previous
        </button>
        <button class="nav-btn" @click="nextQuestion" :disabled="currentQuestion === quiz.questions.length - 1">
          Next <i class="fas fa-arrow-right"></i>
        </button>
        <button class="submit-btn" @click="submitQuiz" v-if="currentQuestion === quiz.questions.length - 1">
          <i class="fas fa-check"></i> Submit Quiz
        </button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "TakeQuizView",
  data() {
    return {
      quiz: {
        title: "Mathematics Basics",
        questions: [
          {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correctAnswer: 1
          },
          {
            question: "What is the square root of 16?",
            options: ["2", "3", "4", "5"],
            correctAnswer: 2
          },
          {
            question: "What is 5 x 5?",
            options: ["20", "25", "30", "35"],
            correctAnswer: 1
          }
        ],
        duration: 30
      },
      currentQuestion: 0,
      selectedAnswer: null,
      remainingTime: 0,
      timer: null
    };
  },
  methods: {
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
    startTimer() {
      this.remainingTime = this.quiz.duration * 60;
      this.timer = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
        } else {
          this.submitQuiz();
        }
      }, 1000);
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
      if (this.currentQuestion < this.quiz.questions.length - 1) {
        this.currentQuestion++;
        this.selectedAnswer = null;
      }
    },
    submitQuiz() {
      clearInterval(this.timer);
      // Navigate to results page
      this.$router.push('/results');
    }
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style scoped>
.quiz-container {
  min-height: 100vh;
  background: linear-gradient(to right, #f8f9fa, #e3f2fd);
  font-family: "Poppins", sans-serif;
}

.quiz-header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1.5rem 2.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.back-btn {
  background: none;
  border: none;
  color: #4a90e2;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(74, 144, 226, 0.1);
}

.quiz-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quiz-info h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #4a90e2;
}

.timer {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e74c3c;
  font-size: 1.2rem;
  font-weight: 600;
}

.quiz-content {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.quiz-progress {
  margin-bottom: 2rem;
}

.progress-bar {
  height: 8px;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress {
  height: 100%;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  transition: width 0.3s ease;
}

.question-container {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.question-container h2 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
}

.options {
  display: grid;
  gap: 1rem;
}

.option {
  padding: 1rem;
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
  gap: 1rem;
}

.nav-btn, .submit-btn {
  padding: 0.8rem 1.5rem;
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

/* Dark Mode Styles */
:global(.dark-mode) .quiz-container {
  background: linear-gradient(to right, #1a1a1a, #2d3436);
}

:global(.dark-mode) .quiz-header {
  background: rgba(30, 30, 30, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) .back-btn {
  color: #7b61ff;
}

:global(.dark-mode) .back-btn:hover {
  background: rgba(123, 97, 255, 0.1);
}

:global(.dark-mode) .quiz-info h1 {
  color: #7b61ff;
}

:global(.dark-mode) .question-container {
  background: rgba(30, 30, 30, 0.8);
}

:global(.dark-mode) .question-container h2 {
  color: #fff;
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

:global(.dark-mode) .nav-btn {
  background: rgba(123, 97, 255, 0.1);
  color: #7b61ff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .quiz-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .quiz-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .quiz-navigation {
    flex-direction: column;
  }

  .nav-btn, .submit-btn {
    width: 100%;
    justify-content: center;
  }
}
</style> 