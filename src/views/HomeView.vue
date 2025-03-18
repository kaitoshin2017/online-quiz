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
        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus praesentium ut eaque quasi laborum omnis nisi sit explicabo, esse debitis atque itaque culpa amet mollitia, illum id unde. Vitae, similique.</h1>
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
      <p>Igna</p>
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
  background-color: #f8f9fa; /* Light Gray/White background */
  font-family: Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
}

/* Header styles - Glassmorphism effect */
header {
  background: rgba(30, 144, 255, 0.9); /* Dodger Blue with slight transparency */
  backdrop-filter: blur(10px); /* Glass blur effect */
  -webkit-backdrop-filter: blur(10px); /* For Safari support */
  padding: 1rem 2rem;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Subtle shadow */
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
  color: #fff;
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
  color: #f8f9fa;
  font-size: 1rem;
  transition: color 0.3s, transform 0.3s;
}

/* Hover effect for links */
nav ul li a:hover {
  color: #6c63ff; /* Soft Indigo hover effect */
  transform: scale(1.1);
}

/* Main content styles */
main {
  padding: 20px;
  background-color: #f8f9fa;
  color: #333;
}

/* Section styles */
section {
  margin-bottom: 40px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Home section headline */
#home h1 {
  color: #1e90ff;
}

/* About and FAQ section headers */
h2 {
  color: #6c63ff;
}

/* Footer styles */
footer {
  background-color: #1e90ff;
  color: white;
  text-align: center;
  padding: 10px 0;
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>
