<template>
  <div class="faq-container">
    <!-- Header Section -->
    <header>
      <nav>
        <div class="logo">
          <Logo />
        </div>
        <ul class="desktop-nav">
          <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>
          <li><router-link to="/about"><i class="fas fa-info-circle"></i> About</router-link></li>
          <li><router-link to="/faq" class="active"><i class="fas fa-question-circle"></i> FAQ</router-link></li>
          <li><router-link to="/login" class="login-btn"><i class="fas fa-sign-in-alt"></i> Login</router-link></li>
          <li><router-link to="/signup" class="signup-btn"><i class="fas fa-user-plus"></i> Sign Up</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <section class="faq-section">
        <div class="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p class="subtitle">Find answers to common questions about EvoQuiz</p>
        </div>

        <!-- Search Bar -->
        <div class="search-container">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search for questions..."
              @input="filterFAQs"
            >
          </div>
        </div>

        <!-- FAQ Categories -->
        <div class="faq-categories">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['category-btn', { active: activeCategory === category.id }]"
            @click="setActiveCategory(category.id)"
          >
            <i :class="category.icon"></i>
            {{ category.name }}
          </button>
        </div>

        <!-- FAQ List -->
        <div class="faq-list">
          <div 
            v-for="faq in filteredFAQs" 
            :key="faq.id"
            class="faq-item"
            :class="{ 'active': faq.isOpen }"
          >
            <div class="faq-question" @click="toggleFAQ(faq.id)">
              <h3>{{ faq.question }}</h3>
              <i :class="['fas', faq.isOpen ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
            </div>
            <div class="faq-answer" v-show="faq.isOpen">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <!-- Contact Support -->
        <div class="contact-support">
          <h2>Still have questions?</h2>
          <p>Can't find the answer you're looking for? Please chat with our friendly team.</p>
          <button class="contact-btn" @click="contactSupport">
            <i class="fas fa-headset"></i>
            Contact Support
          </button>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer>
      <p>© 2024 EvoQuiz. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import Logo from '../components/Logo.vue'

export default {
  name: 'FAQView',
  components: {
    Logo
  },
  data() {
    return {
      searchQuery: '',
      activeCategory: 'general',
      categories: [
        { id: 'general', name: 'General', icon: 'fas fa-info-circle' },
        { id: 'account', name: 'Account', icon: 'fas fa-user-circle' },
        { id: 'quizzes', name: 'Quizzes', icon: 'fas fa-question-circle' },
        { id: 'technical', name: 'Technical', icon: 'fas fa-cogs' }
      ],
      faqs: [
        {
          id: 1,
          category: 'general',
          question: 'What is EvoQuiz?',
          answer: 'EvoQuiz is an interactive online quiz platform designed to make learning and assessment more engaging and efficient. It provides tools for both students and teachers to create, take, and manage quizzes in various subjects.',
          isOpen: false
        },
        {
          id: 2,
          category: 'general',
          question: 'Is EvoQuiz free to use?',
          answer: 'EvoQuiz offers both free and premium plans. The free plan includes basic features, while the premium plan provides access to advanced features, analytics, and unlimited quizzes.',
          isOpen: false
        },
        {
          id: 3,
          category: 'account',
          question: 'How do I create an account?',
          answer: 'To create an account, click on the "Sign Up" button in the top navigation bar. Fill in your details, choose your role (student or teacher), and follow the verification process.',
          isOpen: false
        },
        {
          id: 4,
          category: 'account',
          question: 'Can I change my account type later?',
          answer: 'Yes, you can change your account type from student to teacher or vice versa. However, this may require additional verification and approval from our team.',
          isOpen: false
        },
        {
          id: 5,
          category: 'quizzes',
          question: 'How do I create a quiz?',
          answer: 'As a teacher, you can create quizzes by navigating to the "Create Quiz" section. Add questions, set time limits, and customize settings according to your needs.',
          isOpen: false
        },
        {
          id: 6,
          category: 'quizzes',
          question: 'Can I retake a quiz?',
          answer: 'Yes, you can retake quizzes unless the teacher has disabled this option. Your previous attempts will be saved, and you can track your progress over time.',
          isOpen: false
        },
        {
          id: 7,
          category: 'technical',
          question: 'What devices are supported?',
          answer: 'EvoQuiz is fully responsive and works on all modern devices, including desktops, laptops, tablets, and smartphones. We recommend using the latest version of Chrome, Firefox, Safari, or Edge.',
          isOpen: false
        },
        {
          id: 8,
          category: 'technical',
          question: 'What if I lose my internet connection during a quiz?',
          answer: 'Don\'t worry! EvoQuiz automatically saves your progress. When you reconnect, you can continue from where you left off, as long as the quiz time hasn\'t expired.',
          isOpen: false
        }
      ]
    }
  },
  computed: {
    filteredFAQs() {
      return this.faqs.filter(faq => {
        const matchesCategory = this.activeCategory === 'general' || faq.category === this.activeCategory;
        const matchesSearch = this.searchQuery === '' || 
          faq.question.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    }
  },
  methods: {
    toggleFAQ(id) {
      const faq = this.faqs.find(f => f.id === id);
      if (faq) {
        faq.isOpen = !faq.isOpen;
      }
    },
    setActiveCategory(categoryId) {
      this.activeCategory = categoryId;
    },
    filterFAQs() {
      // The filtering is handled by the computed property
    },
    contactSupport() {
      // Implement contact support functionality
      alert('Contact support functionality will be implemented soon!');
    }
  }
}
</script>

<style scoped>
.faq-container {
  min-height: 100vh;
  background: linear-gradient(to right, #f8f9fa, #e3f2fd);
  font-family: "Poppins", sans-serif;
}

/* Header styles */
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
  position: relative;
  font-weight: 500;
}

nav ul li a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

nav ul li a:hover::after {
  width: 80%;
}

nav ul li a:hover {
  color: #4a90e2;
}

nav ul li a.active {
  color: #4a90e2;
}

nav ul li a.active::after {
  width: 80%;
}

nav ul li a i {
  margin-right: 8px;
  font-size: 1.1rem;
}

/* Main Content Styles */
main {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.faq-section {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.faq-header {
  text-align: center;
  margin-bottom: 40px;
}

.faq-header h1 {
  font-size: 3rem;
  color: #4a90e2;
  margin-bottom: 10px;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
}

/* Search Bar */
.search-container {
  margin-bottom: 30px;
}

.search-box {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-box i {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.search-box input {
  width: 100%;
  padding: 15px 20px 15px 50px;
  border: 2px solid rgba(74, 144, 226, 0.2);
  border-radius: 30px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.1);
}

/* FAQ Categories */
.faq-categories {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
}

.category-btn.active {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
}

/* FAQ List */
.faq-list {
  margin-bottom: 40px;
}

.faq-item {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  margin-bottom: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.faq-question {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.faq-question h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}

.faq-question i {
  color: #4a90e2;
  transition: transform 0.3s ease;
}

.faq-item.active .faq-question i {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 20px 20px;
  color: #666;
  line-height: 1.6;
}

/* Contact Support */
.contact-support {
  text-align: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  margin-top: 40px;
}

.contact-support h2 {
  color: #4a90e2;
  margin-bottom: 15px;
}

.contact-support p {
  color: #666;
  margin-bottom: 20px;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 30px;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

/* Footer */
footer {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .faq-header h1 {
    font-size: 2rem;
  }

  .category-btn {
    padding: 8px 15px;
    font-size: 0.9rem;
  }

  .faq-question h3 {
    font-size: 1rem;
  }
}
</style> 