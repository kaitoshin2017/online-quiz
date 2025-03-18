<template>
  <body>
    <div id="app">
      <nav class="navbar">
        <div class="logo">
          <a href="#">Online Quiz</a>
        </div>

        <ul class="nav-links" :class="{ active: menuActive }">
          <li><a href="AboutView.vue">Home</a></li>
          <li><a href="LoginView.vue">About</a></li>
          <li><a href="FAQView.vue">FAQ</a></li>
          <li><a href="LoginView.vue">Login</a></li>
          <li><a href="Sign up.vue">Sign up</a></li>
        </ul>

        <div class="burger" @click="toggleMenu">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
      </nav>
    </div>
  </body>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      menuActive: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
  },
};
</script>

<style scoped>
/* Set background color for the app */
body {
  margin: 0;
  padding: 0;
  background-color: black; /* Changed to black */
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.685);
  backdrop-filter: blur(10px);
}

.navbar .logo a {
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-weight: bold;
  padding-left: 10px;
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
  color: rgb(0, 0, 0);
  text-decoration: none;
  font-size: 18px;
  padding-right: 10px;
}

.navbar .nav-links li a:hover {
  color: #b97a7a;
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  padding-right: 15px;
  cursor: pointer;
  padding-left: 30%;
}

.burger .line {
  width: 90%;
  height: 3px;
  background-color: rgb(0, 0, 0);
}

@media screen and (max-width: 768px) {
  .navbar .nav-links {
    display: none;
    width: 100%;
    flex-direction: column;
    position: absolute;
    padding-left: 9px;
    top: 50px;
    left: 0;
    background-color: #ffffff;
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
.a {
  color: #1cff3a;
}
</style>
