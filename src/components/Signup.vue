<template>
  <div class="outer">
    <div class="inner">
      <h3>Signup</h3>
    <form v-on:submit.prevent="frm">
      <input type="text" placeholder="Name" v-model="formdata.name" name="name">
      <input type="email" placeholder="Email" v-model="formdata.email" name="email">
      <input type="password" placeholder="Password" v-model="formdata.password" name="password">
      <input type="password" placeholder="Confirm Password" v-model="formdata.confirmpassword" name="confirmpassword">
     
      <button class="login_button" >Submit</button>
      <center> <span v-if="message">{{ message }}</span></center>
      <router-link to="/Login">Already have an Account ?</router-link>
    </form>
  </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
     message:'',
      formdata: {
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
      }
    };
  },
  methods: {
      validate() {
         
        setTimeout(()=>{
        this.message=''
      },2000)
        if (!this.formdata.name || !this.formdata.email || !this.formdata.password || !this.formdata.confirmpassword) {
        this.message ='All fields are required';
     
        return false;
       }
      else if(this.formdata.password!==this.formdata.confirmpassword){
          this.message ='Password Mustmatch';
          return false;
        }
      return true;
    },
    async frm() {
          
      if (this.validate()) {
       
        try {
          let {pass,...data}=this.formdata;
         const res=  await axios.post("http://127.0.0.1:8000/api/signup", data)
         console.log(res.data)
         if(res.data.message==='EmailExists'){
          this.message="Email Exists"
         }
         else{
          this.$router.push('/signup')
         }
          
        }
         catch (error) {
          alert("email already exits")
          
        }
      }
    }
  }
};
</script>
<style>
.login_button{
  padding: 0.6em;
}
</style>