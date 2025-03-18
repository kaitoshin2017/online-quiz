<template>
  <div id="app">
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

    <main>
      <section id="home">
        <h1>Welcome to the Online Quiz System</h1>
        <p>Test your knowledge with our fun and engaging quizzes!</p>
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

    <footer>
      <p>Igna
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
/* Global background and font styles */
html,
body {
  margin: 0;
  padding: 0;
  background-color: #333; /* Gray background */
  font-family: Arial, sans-serif;
  color: #333;
}

/* Header styles */
header {
  background-color: #4caf50;
  padding: 1rem 2rem;
  color: white;
}

/* Flex container for header */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo styles */
.logo h1 {
  margin: 0;
  font-size: 1.8rem;
}

/* Navigation styles */
nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 20px;
}

/* Navigation links */
nav ul li {
  margin: 0;
}

nav ul li a {
  text-decoration: none;
  color: white;
  font-size: 1rem;
  transition: color 0.3s;
}

/* Hover effect for links */
nav ul li a:hover {
  color: #ddd;
}

/* Main content styles */
main {
  padding: 20px;
  background-color: #333;
  color: white;
}

/* Section spacing */
section {
  margin-bottom: 40px;
}

/* Footer styles */
footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>
