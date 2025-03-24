<template>
 <div>
    <div  class="container">
     <div  class="out">
      <form @submit.prevent="add" class="forms" >
        <input 
          type="text" 
          v-model="task.title" 
          name="title"
          
        />
        <input 
          type="text" 
          placeholder="" 
          v-model="task.discription" 
          name="discription"
        />
        <button :style="{backgroundColor:'green',cursor:'pointer',paddingLeft:'1.7em',paddingRight:'1.7em',borderRadius:'5px'}">Add</button>
      </form>
    </div>
   </div>
  <Taskbody  :key="componentKey"/>
  </div>
 
</template>

<script>
import axios from "axios";
import Taskbody from "./Taskbody.vue";

export default {

  components:{
      Taskbody
},
  data() {
    
    return {
      errorMessage: "",
      componentKey:'',
      count:'',
      task: {
        title: "",
        discription: "",
        status:"pending"
      },
    };
  },
  methods: {
    validate(){

  if(!this.task.title||!this.task.discription||!this.task.status)   {
    this.errorMessage="cannot be Empty"
    return false;
  }
  return true;

    },
   
      async add(){
        if(this.validate()){
         try {
          const token=localStorage.getItem("Token")
          const res= await axios.post("http://127.0.0.1:8000/api/store", this.task,{
           headers: {
          'Authorization': `Bearer ${token}`
          
    }
         });
         this.componentKey=this.componentKey+1;
         console.log(res.data)
        } 
        catch (error) {
        console.error(error);
      }
    }
        } 
  },
};
</script>

<style>


.container{
  display: flex;
   justify-content: center;
   
}
.out{
  margin-top: 4em;
}
.forms{
  display: flex;
  flex-direction: row;
  
}
.forms >input{
  border:1.9px solid black;
}







</style>
