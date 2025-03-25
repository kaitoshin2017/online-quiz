 <template>
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

<scrip
<template>
    <body>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <div class="container">
            <div class="form-box login">
                <form action="">
                    <h1>Log In</h1>
                    <div class="input-box">
                        <input type="text" placeholder="Username" required>
                        <i class='bx bxs-user'></i>
                    </div>
                    <div class="input-box"> 
                        <input type="password" placeholder="Password" required>
                        <i class='bx bxs-lock-alt' ></i>
                    </div>
                    <div class="input-box"> 
                        <input type="id" placeholder="Id" required>
                        <i class='bx bxs-id-card'></i>
                    </div>
                    <div class="forgot-link">
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit" class="btn">Log In</button>
                    <p>or login with social platforms?</p>
                    <div class="social-icons">
                        <a href="#"><i class='bx bxl-google' ></i></a>
                        <a href="#"><i class='bx bxl-facebook' ></i></a>
                        <a href="#"><i class='bx bxl-github' ></i></a>
                        <a href="#"><i class='bx bxl-linkedin' ></i></a>
                    </div>
                </form>
            </div>


            <div class="form-box register">
                <form action="">
                    <h1>Registration Form</h1>
                    <div class="input-box">
                        <input type="text" placeholder="Username" required>
                        <i class='bx bxs-user'></i>
                    </div>
                    <div class="input-box"> 
                        <input type="password" placeholder="Password" required>
                        <i class='bx bxs-lock-alt' ></i>
                    </div>
                    <div class="input-box"> 
                        <input type="id" placeholder="Id" required>
                        <i class='bx bxs-id-card'></i>
                    </div>
                    <button type="submit" class="btn">Register</button>
                    <p>or register with social platforms?</p>
                    <div class="social-icons">
                        <a href="#"><i class='bx bxl-google' ></i></a>
                        <a href="#"><i class='bx bxl-facebook' ></i></a>
                        <a href="#"><i class='bx bxl-github' ></i></a>
                        <a href="#"><i class='bx bxl-linkedin' ></i></a>
                    </div>
                </form>
            </div>

            <div class="toggle-box">
                <div class="toggle-panel toggle-left">
                    <h1>Hello, Welcome!</h1>
                    <p>Sign Up</p>
                    <button class="btn register-btn">Register</button>
                </div>
            </div>
        </div>
    </body>
</template>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(90deg, #e2e2e2, #c9d6ff);
}

.container {
    position: relative;
    width: 850px;
    height: 550px;
    background: #fff;
    border-radius: 30px;
    box-shadow: 0 0 30px rgba(0, 0, 0, .2);
    overflow: hidden;
}

.form-box {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    color: #333;
    text-align: center;
    padding: 40px;
}

.form-box.register {
    visibility: hidden;
}
form {
    width: 100%;
}
.container h1 {
    font-size: 36px;
    margin: -10px 0;
    }

.input-box {
    position: relative;
    margin: 30px;
}

.input-box input{
    width: 100%;
    padding: 13px 50px 13px 20px;
    background: #eee;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 16px;
    color: #333;
    font-weight: 500;
}

.input-box input::placeholder {
    color: #888;
    font-weight: 400;
}

.input-box i{
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: #888;
}

.forgot-link {
    margin: -15px 0 15px;
    color: #333;
    text-decoration: none;
}

.forgot-link a{
    text-decoration: none;
}
.btn  {
    width: 100%;
    height: 48px;
    background: #7494ec;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
}

.container p {
    font-size: 14.5px;
    margin: 15px 0;
}

.social-icons a {
    display: inline-flex;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 8px;
    font-size: 24px;
    color: #333;
    text-decoration: none;
    margin: 0 8px;
}

.toggle-box {
    position: absolute;
    width: 100%;
    height: 100%;
}

.toggle-box::before {
    content: '';
    position: absolute;
    left: -250%;
    width: 300%;
    height: 100%;
    background: #7494ec;
    border-radius: 150px;
    z-index: 2;
}

.toggle-panel {
    position: absolute;
    width: 50%;
    height: 100%;
    /* background: seagreen; */
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.toggle-panel p {
    margin-bottom: 20px;
}

.toggle-panel .btn {
    width: 160px;
    height: 46px;
    background: transparent;
    border: 2px solid #fff;
    box-shadow: none;
}
</style>
