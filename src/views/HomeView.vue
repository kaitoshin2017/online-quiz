<template>
    <nav class="navbar">
      <!-- Logo -->
      <div class="logo">
        <a href="#">Online Quiz</a>
      </div>
      
      <!-- Navbar Links -->
      <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Login</a></li>
        <li><a href="#">Sign up</a></li>
      </ul>
      
      <!-- Hamburger Menu Icon -->
      <div class="burger" id="burger">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </nav>
</template>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding-left: 20%;
  position: fixed;
  top: 0;
  width: 80%;
}

.navbar .logo a {
  color: white;
  font-size: 24px;
  text-decoration: none;
}

.nav-links {
  list-style: none;
  display: flex;
}

.nav-links li {
  margin: 0 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  transition: 0.3s;
}

.nav-links a:hover {
  background-color: #555;
  border-radius: 4px;
}

/* Hamburger Menu */
.burger {
  display: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
}

.burger .line {
  height: 3px;
  width: 100%;
  background-color: white;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    background-color: #333;
    flex-direction: column;
    align-items: center;
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links li {
    margin: 10px 0;
  }

  .burger {
    display: flex;
  }
}

</style>
