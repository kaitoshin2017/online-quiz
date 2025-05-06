<template>
  <div id="app">
    <!-- Sidebar -->
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />
    
    <!-- Overlay for mobile -->
    <div class="overlay" :class="{ 'overlay-open': isSidebarOpen }" @click="isSidebarOpen = false"></div>

    <!-- Header Section -->
    <header :class="{ 'header-scrolled': isScrolled }">
      <nav>
        <div class="logo">
          <Logo />
        </div>
        <button class="menu-btn" @click="isSidebarOpen = true">
          <i class="fas fa-bars"></i>
        </button>
        <ul class="desktop-nav">
          <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>
          <li><router-link to="/about"><i class="fas fa-info-circle"></i> About</router-link></li>
          <li><router-link to="/faq"><i class="fas fa-question-circle"></i> FAQ</router-link></li>
          <li><router-link to="/login" class="login-btn"><i class="fas fa-sign-in-alt"></i> Login</router-link></li>
          <li><router-link to="/signup" class="signup-btn"><i class="fas fa-user-plus"></i> Sign Up</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-badge">
            <span>🎉 New Features Available!</span>
          </div>
          <h1>Welcome to EvoQuiz 🎯</h1>
          <p class="hero-subtitle">Transform your learning experience with interactive quizzes</p>
          <div class="hero-features">
            <div class="feature" v-for="(feature, index) in heroFeatures" :key="index">
              <i :class="feature.icon"></i>
              <span>{{ feature.text }}</span>
            </div>
          </div>
          <div class="cta-buttons">
            <router-link to="/signup" class="primary-btn">
              <i class="fas fa-user-plus"></i>
              Get Started
              <span class="btn-shine"></span>
            </router-link>
            <router-link to="/about" class="secondary-btn">
              <i class="fas fa-info-circle"></i>
              Learn More
            </router-link>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">10K+</span>
              <span class="stat-label">Active Users</span>
            </div>
            <div class="stat">
              <span class="stat-number">50K+</span>
              <span class="stat-label">Quizzes Created</span>
            </div>
            <div class="stat">
              <span class="stat-number">95%</span>
              <span class="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <img src="../assets/hero-image.svg" alt="EvoQuiz Hero Image">
          <div class="floating-elements">
            <div class="floating-element" v-for="(element, index) in floatingElements" :key="index"
                 :style="{ animationDelay: `${index * 0.2}s` }">
              <i :class="element.icon"></i>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="section-header">
          <span class="section-badge">Features</span>
          <h2>Why Choose EvoQuiz?</h2>
          <p class="section-subtitle">Discover the tools that make learning more effective and enjoyable</p>
        </div>
        <div class="features-grid">
          <div class="feature-card" v-for="(feature, index) in features" :key="index"
               :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <a href="#" class="feature-link">Learn more <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="how-it-works">
        <div class="section-header">
          <span class="section-badge">Process</span>
          <h2>How It Works</h2>
          <p class="section-subtitle">Get started in minutes with our simple process</p>
        </div>
        <div class="steps-container">
          <div class="step" v-for="(step, index) in steps" :key="index"
               :style="{ animationDelay: `${index * 0.2}s` }">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="testimonials">
        <div class="section-header">
          <span class="section-badge">Testimonials</span>
          <h2>What Our Users Say</h2>
          <p class="section-subtitle">Join thousands of satisfied users worldwide</p>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index"
               :style="{ animationDelay: `${index * 0.15}s` }">
            <div class="testimonial-content">
              <i class="fas fa-quote-left"></i>
              <p>{{ testimonial.content }}</p>
            </div>
            <div class="testimonial-author">
              <img :src="testimonial.avatar" :alt="testimonial.name">
              <div class="author-info">
                <h4>{{ testimonial.name }}</h4>
                <p>{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action Section -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>Ready to Start Your Learning Journey?</h2>
          <p>Join thousands of students and teachers already using EvoQuiz</p>
          <div class="cta-buttons">
            <router-link to="/signup" class="cta-button primary">
              <i class="fas fa-rocket"></i>
              Get Started Now
            </router-link>
            <router-link to="/about" class="cta-button secondary">
              <i class="fas fa-info-circle"></i>
              Learn More
            </router-link>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer Section -->
    <footer>
      <div class="footer-content">
        <div class="footer-section">
          <h3>EvoQuiz</h3>
          <p>Empowering education through interactive learning</p>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/faq">FAQ</router-link></li>
            <li><router-link to="/login">Login</router-link></li>
            <li><router-link to="/signup">Sign Up</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Contact Us</h4>
          <ul class="contact-info">
            <li><i class="fas fa-envelope"></i> support@evoquiz.com</li>
            <li><i class="fas fa-phone"></i> +1 (555) 123-4567</li>
            <li><i class="fas fa-map-marker-alt"></i> 123 Education St, Learning City</li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe to our newsletter for updates and tips</p>
          <form class="newsletter-form">
            <input type="email" placeholder="Enter your email">
            <button type="submit"><i class="fas fa-paper-plane"></i></button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 EvoQuiz. All rights reserved.</p>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Logo from '../components/Logo.vue'
import Sidebar from '../components/Sidebar.vue'

export default {
  name: "HomeView",
  components: {
    Logo,
    Sidebar
  },
  data() {
    return {
      isSidebarOpen: false,
      isScrolled: false,
      heroFeatures: [
        { icon: 'fas fa-graduation-cap', text: 'Learn at your pace' },
        { icon: 'fas fa-chart-line', text: 'Track your progress' },
        { icon: 'fas fa-users', text: 'Join the community' }
      ],
      features: [
        {
          icon: 'fas fa-brain',
          title: 'Smart Learning',
          description: 'Adaptive quizzes that adjust to your learning style and pace'
        },
        {
          icon: 'fas fa-chart-bar',
          title: 'Detailed Analytics',
          description: 'Track your progress with comprehensive performance insights'
        },
        {
          icon: 'fas fa-clock',
          title: 'Time Management',
          description: 'Practice with timed quizzes to improve your speed'
        },
        {
          icon: 'fas fa-trophy',
          title: 'Achievement System',
          description: 'Earn badges and rewards as you progress'
        }
      ],
      steps: [
        {
          title: 'Create an Account',
          description: 'Sign up as a student or teacher to get started'
        },
        {
          title: 'Choose Your Path',
          description: 'Select from a variety of subjects and topics'
        },
        {
          title: 'Take Quizzes',
          description: 'Test your knowledge with interactive quizzes'
        },
        {
          title: 'Track Progress',
          description: 'Monitor your improvement over time'
        }
      ],
      testimonials: [
        {
          content: 'EvoQuiz has transformed how I study. The interactive quizzes make learning fun and effective!',
          name: 'Sarah Johnson',
          role: 'Medical Student',
          avatar: '../assets/avatar1.jpg'
        },
        {
          content: 'As a teacher, I love how easy it is to create and manage quizzes. My students are more engaged than ever!',
          name: 'Michael Chen',
          role: 'High School Teacher',
          avatar: '../assets/avatar2.jpg'
        },
        {
          content: 'The analytics feature helps me identify areas where I need to improve. It\'s like having a personal tutor!',
          name: 'Emily Rodriguez',
          role: 'College Student',
          avatar: '../assets/avatar3.jpg'
        }
      ],
      floatingElements: [
        { icon: 'fas fa-book' },
        { icon: 'fas fa-pencil-alt' },
        { icon: 'fas fa-calculator' },
        { icon: 'fas fa-flask' }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    }
  }
}
</script>

<style scoped>
/* Global Styles */
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%);
  font-family: "Poppins", sans-serif;
  overflow-x: hidden;
}

/* Header Styles */
header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1.5rem 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: all 0.3s ease;
}

.header-scrolled {
  padding: 1rem 2.5rem;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
  transition: all 0.3s ease;
}

.header-scrolled .logo h1 {
  font-size: 1.8rem;
}

.menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  padding: 0.5rem;
  transition: all 0.3s ease;
}

.desktop-nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 25px;
  align-items: center;
}

.desktop-nav li a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  padding: 8px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.desktop-nav li a::after {
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

.desktop-nav li a:hover::after,
.desktop-nav li a.active::after {
  width: 80%;
}

.desktop-nav li a:hover,
.desktop-nav li a.active {
  color: #4a90e2;
}

.login-btn,
.signup-btn {
  padding: 8px 20px !important;
  border-radius: 20px !important;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.login-btn {
  border: 2px solid #4a90e2;
  color: #4a90e2 !important;
  background: transparent;
}

.signup-btn {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white !important;
  border: none;
}

.login-btn:hover,
.signup-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.2);
}

.login-btn i,
.signup-btn i {
  font-size: 1.1rem;
}

/* Main Content Styles */
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 40px;
}

/* Hero Section */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  margin-bottom: 80px;
  position: relative;
}

.hero-badge {
  display: inline-block;
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 20px;
  animation: fadeInUp 0.5s ease;
}

.hero-content {
  text-align: left;
}

.hero-content h1 {
  font-size: 3.5rem;
  color: #4a90e2;
  margin-bottom: 20px;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeInUp 0.5s ease 0.2s both;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
  animation: fadeInUp 0.5s ease 0.4s both;
}

.hero-features {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  animation: fadeInUp 0.5s ease 0.6s both;
}

.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.feature:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.feature i {
  color: #4a90e2;
}

.hero-stats {
  display: flex;
  gap: 30px;
  margin-top: 40px;
  animation: fadeInUp 0.5s ease 0.8s both;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #4a90e2;
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.cta-buttons {
  display: flex;
  gap: 15px;
  animation: fadeInUp 0.5s ease 0.8s both;
}

.primary-btn,
.secondary-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.primary-btn {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
  border: none;
}

.secondary-btn {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  border: 2px solid #4a90e2;
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: 0.5s;
}

.primary-btn:hover .btn-shine {
  left: 100%;
}

.primary-btn:hover,
.secondary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

.hero-image {
  position: relative;
  animation: fadeInRight 0.5s ease 0.4s both;
}

.hero-image img {
  width: 100%;
  max-width: 500px;
  height: auto;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.floating-element {
  position: absolute;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: float 3s ease-in-out infinite;
}

.floating-element i {
  color: #4a90e2;
  font-size: 1.2rem;
}

.floating-element:nth-child(1) { top: 20%; left: 10%; }
.floating-element:nth-child(2) { top: 60%; left: 20%; }
.floating-element:nth-child(3) { top: 30%; right: 20%; }
.floating-element:nth-child(4) { bottom: 20%; right: 10%; }

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-badge {
  display: inline-block;
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.section-subtitle {
  color: #666;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 15px auto 0;
}

/* Features Section */
.features-section {
  margin-bottom: 80px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: fadeInUp 0.5s ease both;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon i {
  font-size: 1.5rem;
  color: white;
}

.feature-card h3 {
  color: #333;
  margin-bottom: 15px;
}

.feature-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #4a90e2;
  text-decoration: none;
  margin-top: 15px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.feature-link:hover {
  gap: 8px;
}

/* How It Works Section */
.how-it-works {
  margin-bottom: 80px;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  animation: fadeInUp 0.5s ease both;
}

.step-number {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content h3 {
  color: #333;
  margin-bottom: 10px;
}

/* Testimonials Section */
.testimonials {
  margin-bottom: 80px;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  animation: fadeInUp 0.5s ease both;
}

.testimonial-content {
  margin-bottom: 20px;
}

.testimonial-content i {
  color: #4a90e2;
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 15px;
}

.testimonial-author img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info h4 {
  color: #333;
  margin: 0;
}

.author-info p {
  color: #666;
  margin: 0;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
  padding: 60px;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 80px;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../assets/pattern.svg');
  opacity: 0.1;
  animation: slide 20s linear infinite;
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-content h2 {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.cta-content p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
}

.cta-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 15px 40px;
  border-radius: 30px;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.cta-button.primary {
  background: white;
  color: #4a90e2;
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid white;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
}

/* Footer Styles */
footer {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 60px 20px 20px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h3,
.footer-section h4 {
  color: #333;
  margin-bottom: 20px;
}

.footer-section p {
  color: #666;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: #4a90e2;
}

.contact-info li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
}

.contact-info li i {
  color: #4a90e2;
}

.newsletter-form {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.newsletter-form input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #e1e8ed;
  border-radius: 20px;
  font-size: 0.9rem;
}

.newsletter-form button {
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-form button:hover {
  background: #357abd;
  transform: translateY(-2px);
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a90e2;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #4a90e2;
  color: white;
  transform: translateY(-2px);
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.footer-bottom p {
  color: #666;
  margin: 0 0 10px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.footer-links a {
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #4a90e2;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .menu-btn {
    display: block;
  }

  .desktop-nav {
    display: none;
  }

  header {
    padding: 1rem;
  }

  .hero-section {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-features {
    justify-content: center;
  }

  .cta-buttons {
    justify-content: center;
  }

  .hero-image {
    order: -1;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .hero-stats {
    justify-content: center;
  }

  .features-section h2,
  .how-it-works h2,
  .testimonials h2 {
    font-size: 2rem;
  }

  .cta-section {
    padding: 40px 20px;
  }

  .cta-content h2 {
    font-size: 2rem;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }

  .contact-info li {
    justify-content: center;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .footer-links {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-features {
    flex-direction: column;
    align-items: center;
  }

  .hero-stats {
    flex-direction: column;
    gap: 20px;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
