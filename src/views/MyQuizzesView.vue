<template>
  <div class="my-quizzes-container">
    <!-- Header Section -->
    <header>
      <nav>
        <div class="logo">
          <h1>EvoQuiz</h1>
        </div>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/student">Available Quizzes</router-link></li>
          <li><router-link to="/my-quizzes" class="active">My Quizzes</router-link></li>
          <li><router-link to="/results">My Results</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <section class="my-quizzes-section">
        <h2><i class="fas fa-history"></i> My Quiz History</h2>
        
        <!-- Quiz Filters -->
        <div class="filters">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" v-model="searchQuery" placeholder="Search quizzes...">
          </div>
          <div class="filter-options">
            <select v-model="statusFilter">
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="upcoming">Upcoming</option>
            </select>
            <select v-model="sortBy">
              <option value="date">Sort by Date</option>
              <option value="score">Sort by Score</option>
            </select>
          </div>
        </div>

        <!-- Quizzes List -->
        <div class="quizzes-list">
          <div v-for="quiz in filteredQuizzes" :key="quiz.id" class="quiz-item">
            <div class="quiz-info">
              <h3>{{ quiz.title }}</h3>
              <div class="quiz-meta">
                <span><i class="fas fa-calendar"></i> {{ quiz.date }}</span>
                <span><i class="fas fa-clock"></i> {{ quiz.duration }} minutes</span>
                <span><i class="fas fa-star"></i> {{ quiz.score }}%</span>
              </div>
              <p class="quiz-description">{{ quiz.description }}</p>
            </div>
            <div class="quiz-status" :class="quiz.status.toLowerCase()">
              {{ quiz.status }}
            </div>
            <div class="quiz-actions">
              <button v-if="quiz.status === 'In Progress'" 
                      class="continue-btn"
                      @click="continueQuiz(quiz)">
                <i class="fas fa-play"></i> Continue
              </button>
              <button v-if="quiz.status === 'Completed'" 
                      class="review-btn"
                      @click="reviewQuiz(quiz)">
                <i class="fas fa-eye"></i> Review
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
export default {
  name: "MyQuizzesView",
  data() {
    return {
      searchQuery: "",
      statusFilter: "all",
      sortBy: "date",
      quizzes: [
        {
          id: 1,
          title: "Mathematics Basics",
          description: "Test your knowledge of basic mathematics concepts",
          date: "2024-03-15",
          duration: 30,
          score: 85,
          status: "Completed"
        },
        {
          id: 2,
          title: "Science Fundamentals",
          description: "Basic concepts in physics and chemistry",
          date: "2024-03-16",
          duration: 45,
          score: null,
          status: "In Progress"
        },
        {
          id: 3,
          title: "History Quiz",
          description: "World history from ancient times to modern era",
          date: "2024-03-17",
          duration: 60,
          score: null,
          status: "Upcoming"
        }
      ]
    };
  },
  computed: {
    filteredQuizzes() {
      return this.quizzes.filter(quiz => {
        const matchesSearch = quiz.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            quiz.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesStatus = this.statusFilter === "all" || 
                            quiz.status.toLowerCase() === this.statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
      }).sort((a, b) => {
        if (this.sortBy === "date") {
          return new Date(b.date) - new Date(a.date);
        } else {
          return (b.score || 0) - (a.score || 0);
        }
      });
    }
  },
  methods: {
    continueQuiz(quiz) {
      this.$router.push(`/take-quiz/${quiz.id}`);
    },
    reviewQuiz(quiz) {
      this.$router.push(`/review-quiz/${quiz.id}`);
    }
  }
};
</script>

<style scoped>
.my-quizzes-container {
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

.my-quizzes-section {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.my-quizzes-section h2 {
  color: #4a90e2;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Filters */
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-box input {
  width: 100%;
  padding: 12px 15px 12px 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-box i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #4a90e2;
}

.filter-options {
  display: flex;
  gap: 15px;
}

.filter-options select {
  padding: 12px 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Quizzes List */
.quizzes-list {
  display: grid;
  gap: 20px;
}

.quiz-item {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
}

.quiz-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.quiz-info {
  flex: 1;
}

.quiz-info h3 {
  color: #4a90e2;
  margin: 0 0 10px 0;
  font-size: 1.3rem;
}

.quiz-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  color: #666;
  font-size: 0.9rem;
}

.quiz-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.quiz-description {
  color: #666;
  margin: 0;
  font-size: 0.95rem;
}

.quiz-status {
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.quiz-status.completed {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.quiz-status.in-progress {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
}

.quiz-status.upcoming {
  background: rgba(155, 89, 182, 0.1);
  color: #9b59b6;
}

.quiz-actions {
  display: flex;
  gap: 10px;
}

.continue-btn, .review-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.continue-btn {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
}

.review-btn {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
}

.continue-btn:hover, .review-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

/* Dark Mode Styles */
:global(.dark-mode) .my-quizzes-container {
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

:global(.dark-mode) .my-quizzes-section {
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) .my-quizzes-section h2 {
  color: #7b61ff;
}

:global(.dark-mode) .search-box input,
:global(.dark-mode) .filter-options select {
  background: rgba(40, 40, 40, 0.9);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) .quiz-item {
  background: rgba(40, 40, 40, 0.9);
}

:global(.dark-mode) .quiz-info h3 {
  color: #7b61ff;
}

:global(.dark-mode) .quiz-meta,
:global(.dark-mode) .quiz-description {
  color: #aaa;
}

:global(.dark-mode) .review-btn {
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

  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-options {
    flex-direction: column;
  }

  .quiz-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .quiz-meta {
    flex-wrap: wrap;
    gap: 10px;
  }

  .quiz-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style> 