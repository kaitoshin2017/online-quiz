<template>
  <div id="app">
    <!-- Sidebar -->
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />
    
    <!-- Overlay for mobile -->
    <div class="overlay" :class="{ 'overlay-open': isSidebarOpen }" @click="isSidebarOpen = false"></div>

    <!-- Header Section -->
    <header>
      <nav>
        <div class="logo">
          <Logo />
        </div>
        <button class="menu-btn" @click="isSidebarOpen = true">
          <i class="fas fa-bars"></i>
        </button>
        <ul class="desktop-nav">
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
        </div>
      </section>

      <section id="about">
        <h2>About Us</h2>
        <p>We are dedicated to providing a platform for learning and testing knowledge through quizzes.</p>
      </section>

      <section id="faq">
        <h2>Frequently Asked Questions</h2>
        <h3><button @click="$router.push('/teacher')">Go to Teacher Panel</button></h3>
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
import Sidebar from '../components/Sidebar.vue'

export default {
  name: "HomeView",
  components: {
    Logo,
    Sidebar
  },
  data() {
    return {
      isSidebarOpen: false
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

/* Overlay for mobile */
.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.overlay-open {
  display: block;
  opacity: 1;
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
  position: sticky;
  top: 0;
  z-index: 100;
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

/* Menu Button for Mobile */
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

.menu-btn:hover {
  color: #4a90e2;
  transform: scale(1.1);
}

/* Navigation Styles */
.desktop-nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 25px;
}

/* Navigation Links */
.desktop-nav li a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  padding: 8px 15px;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  position: relative;
  font-weight: 500;
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

.desktop-nav li a:hover::after {
  width: 80%;
}

.desktop-nav li a:hover {
  color: #4a90e2;
}

.desktop-nav li a.active {
  color: #4a90e2;
}

.desktop-nav li a.active::after {
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

/* Footer Styles */
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
  .menu-btn {
    display: block;
  }

  .desktop-nav {
    display: none;
  }

  header {
    padding: 1rem;
  }

  .logo h1 {
    font-size: 1.5rem;
  }

  #home h1 {
    font-size: 2rem;
  }

  section {
    padding: 20px;
    margin-bottom: 20px;
  }

  .start-btn {
    padding: 12px 24px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  #home h1 {
    font-size: 1.5rem;
  }

  #home p {
    font-size: 1rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  section {
    padding: 15px;
  }
}
</style>
