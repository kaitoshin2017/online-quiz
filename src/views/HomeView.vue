<template>
  <div id="app">
    <!-- Header Section -->
    <header>
      <nav>
        <div class="logo">
          <h1>Online Quiz</h1>
        </div>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/faq">FAQ</router-link></li>
          <li><router-link to="/login">Log In</router-link></li>
          <li><router-link to="/signup">Sign Up</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <section id="home">
        <h1>Welcome to the Online Quiz System 🎯</h1>
        <p>Test your knowledge with our fun and engaging quizzes!</p>
        <button class="start-btn">Start Quiz</button>
      </section>

      <section id="about">
        <h2>About Us</h2>
        <p>We are dedicated to providing a platform for learning and testing knowledge through quizzes.</p>
      </section>

      <section id="faq">
        <h2>Frequently Asked Questions</h2>
        <p>Here you can find answers to the most common questions about our quiz system.</p>
      </section>
    </main>

    <!-- Footer Section -->
    <footer>
      <p>© 2025 Online Quiz System.STZ MADE KAI </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
/* Global Styles */
html,
body {
  background: linear-gradient(to right, #f8f9fa, #e3f2fd); /* Soft gradient */
  font-family: "Poppins", sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
}

/* Header with Glassmorphism */
header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1.5rem 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

/* Flexbox for Header */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo Styling */
.logo h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #4a90e2;
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
}

/* Hover Animation for Links */
nav ul li a:hover {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
  transform: scale(1.1);
}

/* Main Content Styles */
main {
  padding: 40px 20px;
  background-color: #f8f9fa;
}

/* Section Styles */
section {
  margin-bottom: 40px;
  padding: 30px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

/* Section Hover Effect */
section:hover {
  transform: translateY(-5px);
}

/* Home Section Headline */
#home h1 {
  color: #4a90e2;
  font-size: 2.5rem;
  margin-bottom: 10px;
}

/* About and FAQ Section Headings */
h2 {
  color: #7b61ff;
  font-size: 1.8rem;
}

/* CTA Button Style */
.start-btn {
  background: linear-gradient(to right, #4a90e2, #7b61ff);
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: 20px;
}

/* Button Hover Effect */
.start-btn:hover {
  background: linear-gradient(to right, #7b61ff, #4a90e2);
  transform: scale(1.1);
}

/* Footer Styles */
footer {
  background-color: #4a90e2;
  color: white;
  text-align: center;
  padding: 12px 0;
  position: relative;
  bottom: 0;
  width: 100%;
  font-size: 0.9rem;
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
  }
  main {
    padding: 20px;
  }
  section {
    padding: 20px;
  }
}
</style>
