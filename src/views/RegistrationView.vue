<template>
    <div class="container">
    
        <div>
        <p>It always seems impossible until it's done.</p>
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
            <input type="password" id="password" v-model="password">
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
            <input type="password" id="confirmPassword" v-model="confirmPassword">
          </div>
          <div v-if="password !== confirmPassword">
            <p style="color:red;">Passwords do not match!</p>
          </div>
          </section>
        
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
  *{
    font-family: Arial, sans-serif;
    text-align: center;
  }
  
   .container {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    height: 90dvh;
    justify-content: center;
    align-items: center;
    padding: 32px 48px;
  }
  p{
    padding-right: 20px
    
  }
  h1 {
    color: #00698f;
    padding-left: 78%;
    
  }
  h2 {
    color: #00698f;
    padding-right: 1000%;
    
  }

  section{
    margin-left: 3%;
  }
 .sec2{
  
  margin-right: 3%;
 }
  .right-column{
    background-color: #ccc;
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 50%;
    border-radius: 20px;
  }
 
  label{
    display: block;
    margin-bottom: 10px;
    font-size: 18px;
    color: #333;
  }
  input[type="text"], input[type="password"]{
    width: 90%;
    height: 10px;
    margin-bottom: 8px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }

  input[type="submit"]{
    width: 100%;
    height: 40px;
    background-color: #4CAF50;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  input[type=submit]:hover{
    background-color: #3e8e41;
  }
  button{
    background-color: #3b5998;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    width: 50%;
    margin-top: 5%;
  }


   

  </style>
