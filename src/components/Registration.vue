<template>
    <div>
        <a class="note">it's always seems imposible until it's done.</a>
    </div>
    <div class="rgy">
        <div class="flex flex-col p-3">
            <h1 class="">Users Registration</h1>
            
            <label for="">Fist Name</label>
            <input v-model.trim="username" class="p-2" type="text" placeholder="Username">

        </div>
        <div class="flex flex-col p-3">
          
            
            <label for="">Last Name</label>
            <input v-model.trim="username" class="p-2" type="text" placeholder="Username">

        </div>
        <div class="flex flex-col p-3">
            <label for="">User Name</label>
            <input v-model.trim="password" class="p-2" placeholder="Password" type="password">

        </div>
        <div class="flex flex-col p-3">

            
            <label for="">Password</label>
            <input v-model.trim="username" class="p-2" type="text" placeholder="Username">

        </div>
        <div class="">
       <!-- <router-link to="/" class=" mx-6 bg-purple-500 text-gray-50 w-50px rounded p-3 ">Back to home</router-link> -->
  <button @click="registerNewUser" type="button" class="">Create
            Account</button> 
       </div> 
    </div>

       
      
</template>

<script setup>
import { ref } from 'vue'
import axiosClient from '../axiosClient.js'
const username = ref('')
const password = ref('')


const registerNewUser = async () => {
    try {
        const response = await axiosClient.post('/registration',
            {
                username: username.value,
                password: password.value
            }
        )
        console.log('====================================');
        console.log(response);
        console.log('====================================');
    } catch (err) {
        console.log(err.message)
    }
}

</script>

<style scoped>

   
.note{
    color: rgb(0, 0, 0);
    padding-right: 50%;
    font-weight: bold;
}
.rgy{
    background-color: #350376;
    width:50%;
    
}
h1{
    color: aliceblue;
    font-size: 30px;
    padding: 10px;
}
label{
    color: aliceblue;
}
button{
    margin: 10px;
    color: aliceblue;
}
body{
    max-width: 50px;
}




</style>