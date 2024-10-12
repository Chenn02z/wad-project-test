<template>
    
    <div class="signup-container">
      <h1>Sign Up</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" v-model="formData.name" id="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="formData.email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="formData.password" id="password" required />
        </div>
        <div class="form-group">
            <label for="radio">User Type</label>
            <div class="user-type">
            <input type="radio" name="User" v-model="inpVal" id="Student" value="Student"> Student
            <input type="radio" name="User" v-model="inpVal" id="Instructor" value="Instructor"> Instructor  
            </div>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          email: '',
          password: '',
          selected: ''
        }
      };
    },
    methods: {
      submitForm() {
        // Perform sign-up logic here, like sending form data to a backend
        console.log('Form submitted:', this.formData);
        alert('Sign-up successful!');
        this.$router.push('/Login/Auth');
      }
    }
  };
  </script>
  
  <style scoped>
  .signup-container {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 1%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  
  h1 {
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    padding: 5px;
  }
  
  #name, #email,#password {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }

 .user-type{
    text-align: center;
 }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #389e6f;
  }

  .id .email .password{
    border: 1px solid black
  }
  </style>
  