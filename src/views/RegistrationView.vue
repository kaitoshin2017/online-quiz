<template>
 <div id="app">
  <div class="container">
   <h1>Sign Up</h1>
    <form @submit.prevent="submitForm">
      <div class="form-grid">
        <div class="column">

          <h2>"It's always seems impossible until it's done."</h2>
        </div>
        
        <div class="column">
          <label for="firstName">FirstName</label>
          <input type="text" id="firstName" v-model="form.firstName" required/>


          <label for="lastName">LastName</label>
          <input type="text" id="lastName" v-model="form.lastName" required/>

          <label for="section">Section</label>
          <input type="text" id="section" v-model="form.section" required/>
          

          <label for="dob">Date of Birth</label>
          <input type="date" id="dob" v-model="form.dob" required/>

          <button type="submit":disabled="passwordMismatch">Submit</button>
          
        </div>
       
        <div class="column">
          <label for="profileImage">Profile Image</label>
        <input type="file" id="profileImage" @change="hamdleFilechange"/>


          <label for="username">Username</label>
          <input type="text" id="username" v-model="form.username" required/>

          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" required/>

          <label for="confirmPassword"> Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="form.confirmPassword" required :class="{'error': passwordmismatch}"/>
          
          <div v-if="passwordMismatch" class="warning">
              <span>⚠️ Passwords do not match!</span>
            </div>

          <button class="cancel" type="button" @click="cancelForm">Cancel</button>
        </div>
      </div>
    </form>
  </div>
 </div>
</template>

<script>
export default{
  data(){
    return{
    form:{
    firstName:"",
    lastName:"",
    dob:"",
    profileImage:null,
    username:"",
    section:"",
    password:"",
    confirmPassword:"",
      }
    };
  },
  computed:{
    passwordMismatch(){
      return this.form.password!== this.form.confirmPassword;
    }
  },
  methods:{
    handleFileChange(event){
      const file= event.target.files[0];
      if (file){
        this.form.profileImage = file;
      }
    },
    submitForm() {
  console.log("Form submitted!");
  console.log('Form Data:', this.form);

  this.form = {
    firstName: "",
    lastName: "",
    dob: "",
    profileImage: null,
    username: "",
    section: "",
    password: "",
    confirmPassword: "",
  };
},

    cancelForm() {
      
      this.form = {
        firstName: "",
        lastName: "",
        dob: "",
        profileImage: null,
        username: "",
        section: "",
        password: "",
        confirmPassword: "",
      };
      console.log("Form reset!");
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 20px;

}

h1{
  margin-bottom: 5%;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  width: 75%;
  height: 70dvh;
  margin: 0 auto;
  background-color: #ec5bec;
}

h2 {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
}

input {
  margin-bottom: 12px;
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


.cancel {
  padding: 10px 20px;
  background-color:rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled, .cancel {
  background-color: #ddd;
}

.error {
  border-color: red;
}

.warning {
  color: red;
  font-weight: 5px;
  font-size: 1em;
  margin-bottom: 5px;
}
</style>
