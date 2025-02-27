<template>
    <div class="container">
        <div>
        <p>It always seems impossible until it's done.</p>
      </div>

      <div class="right-column">
        <h2>Sign up</h2>
        <form @submit.prevent="submitForm">
          <div>
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" v-model="firstName">
          </div>
          <div>
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" v-model="lastName">
          </div>
          <div>
            <label for="section">Section:</label>
            <input type="text" id="section" v-model="section">
          </div>
          <div>
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username">
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password">
          </div>
          <div>
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword">
          </div>
          <div v-if="password !== confirmPassword">
            <p style="color:red;">Passwords do not match!</p>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
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
      };
    },
    methods: {
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
  
  .container {
    width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    display: flex; 
  }
  
  .right-column {
    flex: 1;
    padding: 10px;
  }
  </style>
  