<template>
  <div class="results-container">
    <!-- Header Section -->
    <header>
      <nav>
        <div class="logo">
          <Logo />
        </div>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/student">My Quizzes</router-link></li>
          <li><router-link to="/results" class="active">My Results</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <section class="results-section">
        <div class="results-header">
          <button class="back-btn" @click="$router.push('/student')">
            <i class="fas fa-arrow-left"></i> Back to Dashboard
          </button>
          <h2><i class="fas fa-poll"></i> Quiz Results</h2>
        </div>

        <!-- Results Summary -->
        <div class="results-summary">
          <div class="summary-card">
            <div class="summary-icon">
              <i class="fas fa-trophy"></i>
            </div>
            <div class="summary-info">
              <h3>Average Score</h3>
              <p>{{ averageScore }}%</p>
            </div>
          </div>

          <div class="summary-card">
            <div class="summary-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="summary-info">
              <h3>Quizzes Completed</h3>
              <p>{{ totalQuizzes }}</p>
            </div>
          </div>

          <div class="summary-card">
            <div class="summary-icon">
              <i class="fas fa-clock"></i>
            </div>
            <div class="summary-info">
              <h3>Time Spent</h3>
              <p>{{ totalTime }}</p>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="filters">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search quizzes..."
            >
          </div>
          <div class="filter-group">
            <select v-model="subjectFilter">
              <option value="">All Subjects</option>
              <option value="math">Mathematics</option>
              <option value="science">Science</option>
              <option value="history">History</option>
              <option value="english">English</option>
            </select>
            <select v-model="sortBy">
              <option value="date">Date</option>
              <option value="score">Score</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>

        <!-- Results List -->
        <div class="results-list">
          <div v-for="result in filteredResults" :key="result.id" class="result-card">
            <div class="result-header">
              <h3>{{ result.title }}</h3>
              <div class="score-circle" :class="getScoreClass(result.score)">
                {{ result.score }}%
              </div>
            </div>
            <div class="result-details">
              <div class="detail-item">
                <i class="fas fa-calendar"></i>
                <span>{{ result.date }}</span>
              </div>
              <div class="detail-item">
                <i class="fas fa-clock"></i>
                <span>{{ result.duration }}</span>
              </div>
              <div class="detail-item">
                <i class="fas fa-check-circle"></i>
                <span>{{ result.correctAnswers }}/{{ result.totalQuestions }} correct</span>
              </div>
            </div>
            <div class="result-actions">
              <button class="review-btn" @click="reviewQuiz(result.id)">
                <i class="fas fa-eye"></i> Review Answers
              </button>
            </div>
          </div>
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
import Logo from '../components/Logo.vue'

export default {
  name: "ResultsView",
  components: {
    Logo
  },
  data() {
    return {
      searchQuery: '',
      subjectFilter: '',
      sortBy: 'date',
      averageScore: 85,
      totalQuizzes: 12,
      totalTime: '24h 30m',
      results: [
        {
          id: 1,
          title: 'Mathematics Final Exam',
          date: '2024-03-15',
          duration: '45m',
          score: 92,
          correctAnswers: 23,
          totalQuestions: 25,
          subject: 'math'
        },
        {
          id: 2,
          title: 'Science Quiz - Physics',
          date: '2024-03-14',
          duration: '30m',
          score: 88,
          correctAnswers: 17,
          totalQuestions: 20,
          subject: 'science'
        },
        {
          id: 3,
          title: 'History Midterm',
          date: '2024-03-13',
          duration: '60m',
          score: 95,
          correctAnswers: 38,
          totalQuestions: 40,
          subject: 'history'
        },
        {
          id: 4,
          title: 'English Literature Quiz',
          date: '2024-03-12',
          duration: '40m',
          score: 85,
          correctAnswers: 17,
          totalQuestions: 20,
          subject: 'english'
        }
      ]
    };
  },
  computed: {
    filteredResults() {
      let filtered = [...this.results];

      // Apply search filter
      if (this.searchQuery) {
        filtered = filtered.filter(result => 
          result.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Apply subject filter
      if (this.subjectFilter) {
        filtered = filtered.filter(result => 
          result.subject === this.subjectFilter
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        switch (this.sortBy) {
          case 'score':
            return b.score - a.score;
          case 'duration':
            return this.parseDuration(b.duration) - this.parseDuration(a.duration);
          case 'date':
          default:
            return new Date(b.date) - new Date(a.date);
        }
      });

      return filtered;
    }
  },
  methods: {
    getScoreClass(score) {
      if (score >= 90) return 'excellent';
      if (score >= 80) return 'good';
      if (score >= 70) return 'fair';
      return 'poor';
    },
    parseDuration(duration) {
      const [minutes] = duration.split('m').map(Number);
      return minutes;
    },
    reviewQuiz(quizId) {
      this.$router.push(`/review-quiz/${quizId}`);
    }
  }
};
</script>

<style scoped>
.results-container {
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

nav ul li a:hover, nav ul li a.active {
  color: #4a90e2;
  background: rgba(74, 144, 226, 0.1);
}

/* Main Content Styles */
main {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.results-section {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.results-header {
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

.results-header h2 {
  color: #4a90e2;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Results Summary */
.results-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.summary-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 15px;
}

.summary-icon {
  width: 50px;
  height: 50px;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.summary-icon i {
  font-size: 1.5rem;
  color: #4a90e2;
}

.summary-info h3 {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.summary-info p {
  margin: 5px 0 0 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

/* Filters */
.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 200px;
  position: relative;
}

.search-box i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #4a90e2;
}

.search-box input {
  width: 85%;
  padding: 12px 15px 12px 45px;
  border: 2px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.filter-group {
  display: flex;
  gap: 15px;
}

.filter-group select {
  padding: 12px 20px;
  border: 2px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-group select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

/* Results List */
.results-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.result-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.score-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
}

.score-circle.excellent {
  background: #2ecc71;
}

.score-circle.good {
  background: #3498db;
}

.score-circle.fair {
  background: #f1c40f;
}

.score-circle.poor {
  background: #e74c3c;
}

.result-details {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.detail-item i {
  color: #4a90e2;
}

.result-actions {
  display: flex;
  justify-content: flex-end;
}

.review-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.review-btn:hover {
  background: rgba(74, 144, 226, 0.2);
  transform: translateY(-2px);
}

/* Dark Mode Styles */
:global(.dark-mode) .results-container {
  background: linear-gradient(to right, #1a1a1a, #2d3436);
}

:global(.dark-mode) header {
  background: rgba(30, 30, 30, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) nav ul li a {
  color: #fff;
}

:global(.dark-mode) nav ul li a:hover,
:global(.dark-mode) nav ul li a.active {
  color: #7b61ff;
  background: rgba(123, 97, 255, 0.1);
}

:global(.dark-mode) .results-section {
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

:global(.dark-mode) .summary-card,
:global(.dark-mode) .result-card {
  background: rgba(40, 40, 40, 0.9);
}

:global(.dark-mode) .summary-info h3 {
  color: #aaa;
}

:global(.dark-mode) .summary-info p {
  color: #fff;
}

:global(.dark-mode) .search-box input,
:global(.dark-mode) .filter-group select {
  background: rgba(40, 40, 40, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

:global(.dark-mode) .search-box input:focus,
:global(.dark-mode) .filter-group select:focus {
  border-color: #7b61ff;
  box-shadow: 0 0 0 3px rgba(123, 97, 255, 0.1);
}

:global(.dark-mode) .result-header h3 {
  color: #fff;
}

:global(.dark-mode) .detail-item {
  color: #aaa;
}

:global(.dark-mode) .review-btn {
  background: rgba(123, 97, 255, 0.1);
  color: #7b61ff;
}

:global(.dark-mode) .review-btn:hover {
  background: rgba(123, 97, 255, 0.2);
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

  .results-summary {
    grid-template-columns: 1fr;
  }

  .filters {
    flex-direction: column;
  }

  .filter-group {
    flex-direction: column;
  }

  .result-details {
    flex-direction: column;
    gap: 10px;
  }

  .result-actions {
    justify-content: center;
  }

  .review-btn {
    width: 100%;
    justify-content: center;
  }
}
</style> 