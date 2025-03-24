<template>
    <div class='header'>
      
        <img src="" alt="image"  :style="{marginLeft:'3em'}">
            <div  class='innerdiv'>     
            <div class="logos" :style="{textAlign:'center', alignItems:'center'
          ,fontSize:'1.5em',lineHeight:'1.5em',textTransform:'capitalize'}" >{{logo}}</div>
            <button @click="logout" type="submit" class="logout-btn" >Logout</button>
        </div>
      
    </div>
  </template>
  <script>
import router from '../Router';
  export default {
    name:'Header',
    data() {
      return {
        logo:''
       
      };
    },
    methods: {
        logout(){
            localStorage.removeItem("Token")
            router.push('/login')
        }
        
    },
    created() {
        if(!localStorage.getItem("Token")){
            this.$router.push('/login')
        }
        console.log(localStorage.getItem('email'))
        this.logo=localStorage.getItem('email')[0] +localStorage.getItem('email')[1]
       

    }

  };
  </script>
  <style>
  .header{ 
      height: 105px;
     
      background-color:rgba(206, 203, 192, 0.897);
      display: flex;
      align-items: center;
      justify-content: space-between;
     
      
  }
  .logo{
    display: flex;
    justify-content: space-between;
    align-items: center;
    
  }
  .innerdiv{
   
    display: flex;
    justify-content: space-between;
    align-items: center;
    

  }
  
  .logos{
    height: 40px;
    width: 40px;
    background-color: rgb(233, 231, 231);
    border-radius:20px;
  }
  .logout-btn{
    padding: 10px;
    border-radius:10px;
    margin-left: 2em;
    margin-right: 2em;
    background-color: rgba(190, 13, 13, 0.733);


  }
  </style>