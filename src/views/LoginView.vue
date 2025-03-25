<!-- <template>
<body>
    <div class="container">
        <div class="login-box">
            <h2>Online Quiz</h2>
            <h3>LOG IN</h3>
            <div class="input-group">
                <input type="text" placeholder="Username">
            </div>
            <div class="input-group">
                <input type="password" id="password" placeholder="Password">
            </div>
            <button class="btn">LOG IN</button>
            <button class="btn btn-outline">ADMIN</button>
            <p>Don't have an account? <a href="#">Sign up now!</a></p>

        </div>
    </div>
</body>
</template> -->


<template>
    <div class="container" :class="{ active: isRegister }">
      <!-- Login Form -->
      <div class="login-box" v-if="!isRegister">
        <form @submit.prevent="login">
          <h1>Online Quiz</h1>
          <h2>Log In</h2>
          <div class="input-group">
            <input type="text" v-model="loginData.username" placeholder="Username" required />
            <i class="bx bxs-user"></i>
          </div>
          <div class="input-group">
            <input type="password" v-model="loginData.password" placeholder="Password" required />
            <i class="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" class="btn">LOG IN</button>
          <button class="btn btn-outline">ADMIN</button>
          <p>Don't have an account? <a href="#">Sign up now!</a></p>
        </form>
      </div>
  

    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isRegister: false, // Toggle between login and register
        loginData: {
          username: "",
          password: "",
          id: "",
        },
        registerData: {
          username: "",
          password: "",
          id: "",
        },
      };
    },
    methods: {
      toggleRegister() {
        this.isRegister = true;
      },
      toggleLogin() {
        this.isRegister = false;
      },
      login() {
        alert(`Logging in with: \nUsername: ${this.loginData.username} \nID: ${this.loginData.id}`);
      },
      register() {
        alert(`Registering: \nUsername: ${this.registerData.username} \nID: ${this.registerData.id}`);
      },
    },
  };
  </script>

<style>

body {
            background-color: #8B0000;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
        }
        .container {
            background: white;
            width: 600px;
            padding: 20px;
            border-radius: 15px;
            display: flex;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .login-box {
            flex: 1;
            padding: 20px;
        }
        .login-box h2 {
            margin-bottom: 10px;
        }
        .input-group {
            margin-bottom: 15px;
        }
        .input-group input {
            width: 97%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 2px;
        }
        .input-group label {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .btn {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            background: #8B0000;
            color: white;
            font-size: 16px;
            cursor: pointer;
            margin-bottom: 10px;
        }
        .btn-outline {
            background: none;
            border: 2px solid #8B0000;
            color: #8B0000;
        }
        .btn:hover {
            opacity: 0.8;
        }
         p{
           padding-left: 150px;
         }
</style>
<!-- 

<script>


</script> -->