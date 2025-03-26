<template>
  <div>
 <Header/>
  <div class="outer">
    <div class="inner">
      <h3  :style="{marginBottom:'1em'}">Login</h3>
      <form @submit.prevent="frm" :style="{  height: '180px'}">
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
        <button type="submit" class="loginbtn" >Submit</button>
        <p>Don't have an account ? <span><router-link to="/signup">Signup</router-link></span></p>
        <center>  <p v-if="errorMessage" :style="{color:color,fontSize:'1.1em'}" class="error">{{ errorMessage }}</p></center>
       
      </form>
   </div>
  </div>
  </div>
  
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
import router from "../Router";



export default {
  components:{
    Header
  },
  data() {
    return {
      errorMessage: "",
      color:'red',
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
         if (!this.formdata.email) {
         this.errorMessage='Email is Empty';
         return false;
        } 
        else if(!this.formdata.password){
          this.errorMessage='Pssword is Empty';
          return false;
        }
       return true;
        },
        
    async frm() {
      if(this.validate()){
      try {
        console.log(this.formdata)
        const response= await axios.post("http://127.0.0.1:8000/api/login", this.formdata);
        localStorage.setItem("Token",response.data.Token)
        localStorage.setItem("id",response.data.id)
        localStorage.setItem("email",response.data.email)
        console.log(response.data)
        
        if(response.data.message==='success'){
          this.color='green'
          this.errorMessage="Login Succesfull"

          setTimeout(()=>{
            this.$router.push('/')
          },1000)
       
      }
       else{
         this. errorMessage='Invalid Credentials'
      }
      } catch (error) {
        console.error(error);
       
      }
    }
    }
   
  },
  mounted(){
    if(localStorage.getItem("Token")){
      router.push('/')
    }
  }
};
</script>

<style>
.outer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40em;

  /* rgba(250, 230, 204, 0.589); */
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
.loginbtn{
  padding: 0.8em;
  background-color: rgb(60, 172, 60);
  border-radius:10px;
}
.loginbtn:hover{
  background-color: rgb(8, 145, 8);
}
</style>
