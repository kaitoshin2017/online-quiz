<template>
  <div id="app">
    <!-- Header Section -->
    <header>
      <nav>
        <div class="logo">
          <Logo />
        </div>
        <button class="menu-btn" @click="toggleMenu">
          <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
        <ul :class="{ 'menu-open': isMenuOpen }">
          <li><router-link to="/" class="active">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/faq">FAQ</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/signup">Sign Up</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <section id="home">
        <h1>Welcome to the Online Quiz System 🎯</h1>
        <p>Test your knowledge with our fun and engaging quizzes!</p>
        <div class="cta-buttons">
          <button class="start-btn">Start Quiz</button>
          <button class="switch-view-btn" @click="switchView">
            <i class="fas fa-exchange-alt"></i> Switch View
          </button>
        </div>
      </section>

      <section id="about">
        <h2>About Us</h2>
        <p>We are dedicated to providing a platform for learning and testing knowledge through quizzes.</p>
      </section>

      <section id="faq">
        <h2>Frequently Asked Questions
        </h2>
        <h3><button @click="$router.push('/teacher')">Go to Teacher Panel</button>
        </h3>
        <p>Here you can find answers to the most common questions about our quiz system.</p>
      </section>
    </main>

    <!-- Footer Section -->
    <footer>
      <p>© 2025 Online Quiz System.STZ MADE CJ Kai Igna </p>
    </footer>
  </div>
</template>

<script>
import Logo from '../components/Logo.vue'

export default {
  name: "HomeView",
  components: {
    Logo
  },
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    switchView() {
      // Toggle between student and teacher views
      const currentPath = this.$route.path;
      if (currentPath === '/student') {
        this.$router.push('/teacher-panel');
      } else {
        this.$router.push('/student');
      }
    }
  }
};
</script>

<style scoped>
/* Global Styles */
html,
body {
  background: linear-gradient(to right, #f8f9fa, #e3f2fd);
  font-family: "Poppins", sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
  transition: all 0.3s ease;
}

/* Header with Glassmorphism */
header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1.5rem 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* Flexbox for Header */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Logo Styling */
.logo h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
}

/* Navigation Styles */
nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 25px;
}

/* Navigation Links */
nav ul li a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  padding: 8px 15px;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  position: relative;
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

/* Main Content Styles */
main {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Section Styles */
section {
  margin-bottom: 40px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Section Hover Effect */
section:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Home Section Headline */
#home {
  text-align: center;
  padding: 60px 30px;
}

#home h1 {
  color: #4a90e2;
  font-size: 3rem;
  margin-bottom: 20px;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#home p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

/* About and FAQ Section Headings */
h2 {
  color: #7b61ff;
  font-size: 2rem;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  border-radius: 3px;
}

/* CTA Button Style */
.start-btn {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
  padding: 15px 30px;
  font-size: 1.1rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
  position: relative;
  overflow: hidden;
}

.start-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.start-btn:hover::before {
  left: 100%;
}

.start-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
}

/* Footer Styles */
footer {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
  text-align: center;
  padding: 20px 0;
  position: relative;
  bottom: 0;
  width: 100%;
  font-size: 0.9rem;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.1);
}

/* Dark Mode Styles */
@media (prefers-color-scheme: dark) {
  html,
  body {
    background: linear-gradient(to right, #1a1a1a, #2d3436);
    color: #fff;
  }

  header {
    background: rgba(30, 30, 30, 0.8);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .logo h1 {
    background: linear-gradient(to right, #7b61ff, #4a90e2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  nav ul li a {
    color: #fff;
  }

  nav ul li a::after {
    background: linear-gradient(to right, #7b61ff, #4a90e2);
  }

  section {
    background: rgba(30, 30, 30, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  #home h1 {
    background: linear-gradient(to right, #7b61ff, #4a90e2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  #home p {
    color: #aaa;
  }

  h2 {
    color: #7b61ff;
  }

  h2::after {
    background: linear-gradient(to right, #7b61ff, #4a90e2);
  }

  .start-btn {
    background: linear-gradient(to right, #7b61ff, #4a90e2);
  }
}

/* Responsive Design for Mobile */
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

  main {
    padding: 20px;
  }

  section {
    padding: 20px;
  }

  #home h1 {
    font-size: 2rem;
  }

  #home p {
    font-size: 1rem;
  }

  .start-btn {
    padding: 12px 25px;
    font-size: 1rem;
  }
}

/* Menu Button Styles */
.menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #4a90e2;
  cursor: pointer;
  padding: 8px;
  transition: all 0.3s ease;
}

.menu-btn:hover {
  color: #7b61ff;
}

/* CTA Buttons */
.cta-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.switch-view-btn {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  padding: 15px 30px;
  font-size: 1.1rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 8px;
}

.switch-view-btn:hover {
  background: rgba(74, 144, 226, 0.2);
  transform: translateY(-3px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .menu-btn {
    display: block;
  }

  nav ul {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 20px;
    flex-direction: column;
    gap: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  nav ul.menu-open {
    display: flex;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .start-btn, .switch-view-btn {
    width: 100%;
  }
}

/* Dark Mode Styles */
@media (prefers-color-scheme: dark) {
  .menu-btn {
    color: #7b61ff;
  }

  .menu-btn:hover {
    color: #4a90e2;
  }

  nav ul {
    background: rgba(30, 30, 30, 0.95);
  }

  .switch-view-btn {
    background: rgba(123, 97, 255, 0.1);
    color: #7b61ff;
  }

  .switch-view-btn:hover {
    background: rgba(123, 97, 255, 0.2);
  }
}
</style>
