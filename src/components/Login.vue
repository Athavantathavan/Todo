<template>
  <div>
   
  <div class="outer">
    <div class="inner">
      <h3>Login</h3>
      <form @submit.prevent="frm">
        <input 
          type="email" 
          placeholder="Email" 
          v-model="formdata.email" 
          name="email"
        />
        <input 
          type="password" 
          placeholder="Password" 
          v-model="formdata.password" 
          name="password"
        />
        <button type="submit" class="btn" >Submit</button>
        <center>  <p v-if="errorMessage" class="error">{{ errorMessage }}</p></center>
        <router-link to="/">Don't have Account</router-link>
      </form>
   </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";

export default {
  components:{
      Header
    },
  data() {
    return {
      errorMessage: "",
      formdata: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    
    validate() {
         
         setTimeout(()=>{
         this.errorMessage=''
       },2000)
         if (!this.formdata.email || !this.formdata.password ) {
         this.errorMessage='Not be Empty';
         return false;
        }
       return true;
        },
        
    async frm() {
      if(this.validate()){
      try {
        console.log(this.formdata)
        const res= await axios.post("http://127.0.0.1:8000/api/login", this.formdata);
        localStorage.setItem("Token",res.data.Token)
        localStorage.setItem("id",res.data.id)
        localStorage.setItem("email",res.data.email)
        console.log(localStorage.getItem('email'))
        console.log(res.data)
        if(res.data.message==='success'){
        this.$router.push('/')
      }
      else{
        this. errorMessage='Invalid Credentials'
      }
      } catch (error) {
        console.error(error);
       
      }
    }
    },
  },
};
</script>

<style>
.outer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  
}
.inner{
 height: 450px;
 border-radius:30px;
 width: 400px;
 background-color: rgba(250, 230, 204, 0.589);
 display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
  
}
form{
  display: flex;
  flex-direction: column;
  gap: 1em;
  width:60%;

}

input{
  padding: 15px;
}
.btn{
  padding: 0.5em;
}






</style>
