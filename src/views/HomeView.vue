<template>
  <div id="app">
    <nav class="navbar">
      <!-- Logo -->
      <div class="logo">
        <a href="#">Online Quiz</a>
      </div>

      <!-- Navbar Links -->
      <ul class="nav-links" :class="{ active: menuActive }">
        <li><a href="AboutView.vue">Home</a></li>
        <li><a href="LoginView.vue">About</a></li>
        <li><a href="FAQView.vue">FAQ</a></li>
        <li><a href="LoginView.vue">Login</a></li>
        <li><a href="#">Sign up</a></li>

      </ul>

      <!-- Hamburger Menu Icon -->
      <div class="burger" @click="toggleMenu">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      menuActive: false, // To toggle the menu on mobile
    };
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive; // Toggle active class
    },
  },
};
</script>

<style scoped>


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color:  #0A0F1F;
  height: 70px;
  padding: 10px 20px;
}


.navbar .logo a {
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
}


.navbar .nav-links {
  list-style: none;
  display: flex;
}

.navbar .nav-links li {
  margin: 0 15px;
}

.navbar .nav-links li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.navbar .nav-links li a:hover {
  color: #8B0000;
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
}

.burger .line {
  width: 100%;
  height: 3px;
  background-color: white;
}

@media screen and (max-width: 768px) {
  .navbar .nav-links {
    display: none;
    width: 100%;
    flex-direction: column;
    position: absolute;
    top: 50px;
    left: 0;
    background-color:  #8B0000;
    text-align: center;
  }

  .navbar .nav-links li {
    margin: 15px 0;
  }

  .burger {
    display: flex;
  }


  .nav-links.active {
    display: flex;
  }
}
</style>
