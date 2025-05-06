<template>
  <div class="about-container">
    <!-- Header Section -->
    <header>
      <nav>
        <div class="logo">
          <Logo />
        </div>
        <ul class="desktop-nav">
          <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>
          <li><router-link to="/about" class="active"><i class="fas fa-info-circle"></i> About</router-link></li>
          <li><router-link to="/faq"><i class="fas fa-question-circle"></i> FAQ</router-link></li>
          <li><router-link to="/login" class="login-btn"><i class="fas fa-sign-in-alt"></i> Login</router-link></li>
          <li><router-link to="/signup" class="signup-btn"><i class="fas fa-user-plus"></i> Sign Up</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <section class="about-section">
        <div class="about-header">
          <h1>About EvoQuiz</h1>
          <p class="subtitle">Empowering Education Through Interactive Learning</p>
        </div>

        <div class="about-content">
          <div class="mission-vision">
            <div class="mission">
              <i class="fas fa-bullseye"></i>
              <h2>Our Mission</h2>
              <p>To revolutionize the way students learn and teachers assess by providing an engaging, interactive, and efficient online quiz platform that makes education more accessible and enjoyable.</p>
            </div>
            <div class="vision">
              <i class="fas fa-eye"></i>
              <h2>Our Vision</h2>
              <p>To become the leading platform for online assessment and learning, fostering a community where knowledge is shared, tested, and celebrated.</p>
            </div>
          </div>

          <div class="features">
            <h2>What We Offer</h2>
            <div class="features-grid">
              <div class="feature-card">
                <i class="fas fa-graduation-cap"></i>
                <h3>Interactive Learning</h3>
                <p>Engage with dynamic quizzes that adapt to your learning style and pace.</p>
              </div>
              <div class="feature-card">
                <i class="fas fa-chart-line"></i>
                <h3>Real-time Analytics</h3>
                <p>Track your progress with detailed performance metrics and insights.</p>
              </div>
              <div class="feature-card">
                <i class="fas fa-users"></i>
                <h3>Community Driven</h3>
                <p>Join a community of learners and educators sharing knowledge and experiences.</p>
              </div>
              <div class="feature-card">
                <i class="fas fa-shield-alt"></i>
                <h3>Secure Platform</h3>
                <p>Your data and progress are protected with enterprise-grade security.</p>
              </div>
            </div>
          </div>

          <div class="team">
            <h2>Our Team</h2>
            <p class="team-intro">Behind EvoQuiz is a dedicated team of educators, developers, and innovators committed to transforming the learning experience.</p>
            <div class="team-grid">
              <div class="team-member">
                <div class="member-avatar">
                  <i class="fas fa-user-circle"></i>
                </div>
                <h3>John Doe</h3>
                <p>Founder & CEO</p>
              </div>
              <div class="team-member">
                <div class="member-avatar">
                  <i class="fas fa-user-circle"></i>
                </div>
                <h3>Jane Smith</h3>
                <p>Head of Education</p>
              </div>
              <div class="team-member">
                <div class="member-avatar">
                  <i class="fas fa-user-circle"></i>
                </div>
                <h3>Mike Johnson</h3>
                <p>Lead Developer</p>
              </div>
            </div>
          </div>
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
  name: 'AboutView',
  components: {
    Logo
  }
}
</script>

<style scoped>
.about-container {
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

.about-section {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.about-header {
  text-align: center;
  margin-bottom: 40px;
}

.about-header h1 {
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

.mission-vision {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 40px;
}

.mission, .vision {
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.mission:hover, .vision:hover {
  transform: translateY(-5px);
}

.mission i, .vision i {
  font-size: 2rem;
  color: #4a90e2;
  margin-bottom: 20px;
}

.mission h2, .vision h2 {
  color: #333;
  margin-bottom: 15px;
}

.features {
  margin-bottom: 40px;
}

.features h2 {
  text-align: center;
  color: #4a90e2;
  margin-bottom: 30px;
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
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card i {
  font-size: 2rem;
  color: #4a90e2;
  margin-bottom: 20px;
}

.feature-card h3 {
  color: #333;
  margin-bottom: 15px;
}

.team {
  text-align: center;
}

.team h2 {
  color: #4a90e2;
  margin-bottom: 20px;
}

.team-intro {
  color: #666;
  margin-bottom: 30px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.team-member {
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
}

.member-avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #4a90e2, #7b61ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.member-avatar i {
  font-size: 3rem;
  color: white;
}

.team-member h3 {
  color: #333;
  margin-bottom: 5px;
}

.team-member p {
  color: #666;
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
  .mission-vision {
    grid-template-columns: 1fr;
  }

  .about-header h1 {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>
