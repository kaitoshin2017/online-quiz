<template>
  <link rel="stylesheet" href="boxicons.min.css">
  <body>
    <div class="container">
      <div>
        <h3>"It always seems impossible until it's done."</h3>
      </div>
      <div class="right-column">
        <section>
          <div>
            <h1>Sign</h1>
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" v-model="firstName">
          </div>
          <div>
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username">
          </div>
          <div>
            <label for="password">Password:</label>
            <div class="password-input">
              <input 
                :type="passwordVisible ? 'text' : 'password'" 
                id="password" 
                v-model="password"
              >
              <i 
                :class="passwordVisible ? 'bx bxs-hide' : 'bx bxs-show'" 
                @click="togglePasswordVisibility('password')"
                class="password-icon"
              ></i>
            </div>
          </div>
          <button type="submit">Submit</button>
        </section>
        <section class="sec2">
          <h2>Up</h2>
          <div>
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" v-model="lastName">
          </div>
          <div>
            <label for="section">Section/id:</label>
            <input type="text" id="section" v-model="section">
          </div>
          <div>
            <label for="confirmPassword">Confirm Password:</label>
            <div class="password-input">
              <input 
                :type="confirmPasswordVisible ? 'text' : 'password'" 
                id="confirmPassword" 
                v-model="confirmPassword"
              >
              <i 
                :class="confirmPasswordVisible ? 'bx bxs-hide' : 'bx bxs-show'" 
                @click="togglePasswordVisibility('confirmPassword')"
                class="password-icon"
              ></i>
            </div>
          </div>
          <div v-if="password !== confirmPassword">
            <p style="color:red;">Passwords do not match!</p>
          </div>
        </section>
      </div>
    </div>
  </body>
</template>



<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      section: '',
      username: '',
      password: '',
      confirmPassword: '',
      passwordVisible: false,
      confirmPasswordVisible: false,
    };
  },
  methods: {
    togglePasswordVisibility(field) {
      if (field === 'password') {
        this.passwordVisible = !this.passwordVisible;
      } else if (field === 'confirmPassword') {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
      }
    },
    submitForm() {
      if (this.password !== this.confirmPassword) {
        return; 
      }
    
      console.log('Form submitted:', {
        firstName: this.firstName,
        lastName: this.lastName,
        section: this.section,
        username: this.username,
        password: this.password, 
      }); 
      this.firstName = '';
      this.lastName = '';
      this.section = '';
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
    },
  },
};
</script>

<style scoped>
* {
  font-family: Arial, sans-serif;
  text-align: center;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0A0F1F;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  height: 50dvh;
  justify-content: center;
  align-items: center;
  padding: 32px 48px;
  background: #fff;
  box-shadow: 0 0 30px rgba(0, 0, 0, .2);
}

h3 {
  padding-right: 100px;
  font-family: sans-serif;
  font-weight: 20px;
  font-size: 30px;
}

h1 {
  color: #00698f;
  padding-left: 69%;
}

h2 {
  color: #00698f;
  padding-right: 90%;
}

section {
  margin-left: 3%;
}

.sec2 {
  margin-right: 3%;
}

.right-column {
  background-color: #ccc;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 90%;
  border-radius: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
}

input[type="text"],
input[type="password"] {
  width: 90%;
  height: 10px;
  margin-bottom: 8px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: 20px;
  border: 1px solid black;
  color: #888;
}

button {
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

.password-input {
  position: relative;
}

.password-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
  color: #333;
}
</style>
