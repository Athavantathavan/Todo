<template>
 
         <div class='header'>
            <img src="../assets/Todo.png" alt="image"  :style="{width:'200px',objectFit:'cover'}">
                   
            <div  class='innerdiv' v-show="Token" >     
              <div class="logos" :style="{textAlign:'center', alignItems:'center',fontSize:'1.3em',lineHeight:'1.8em'}" >{{logo}}</div>
              <button @click="logout" type="submit" class="logout-btn" >Logout</button>
            </div>
        </div>

  </template>
  <script>
import router from '../Router';
import '../assets/Todo.png'
  export default {
    
    name:'Header',
    data() {
      return {
        Token:"",
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
          this.Token=localStorage.getItem("Token")
          console.log(localStorage.getItem('email'))
          this.logo=(localStorage.getItem('email')[0]+localStorage.getItem('email')[1]).toUpperCase()
    }

  };
  </script>
  <style>
  .header{ 
      height: 105px;
      width: 100vw;
      background-color:rgba(248, 247, 242, 0.897);
      box-shadow: 3px 3px 2px 0.1px rgb(114, 112, 112);
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
    cursor: pointer;
    background-color: rgba(190, 13, 13, 0.733);


  }
  </style>