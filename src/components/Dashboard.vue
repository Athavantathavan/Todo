<template>
 
 
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
        <input 
          type="text" 
          v-model="task.status" 
          name="status"
        />
        <button type="submit" class="btn" >Add</button>
      </form>
    </div>
  </div>
 
</template>

<script>
import axios from "axios";


export default {
  data() {
    return {
      errorMessage: "",
      task: {
        title: "",
        discription: "",
        status:""
      },
    };
  },
  methods: {
    validate(){

  if(!this.task.title||!this.task.discription||!this.task.status)   {
  
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
   height: 100vh;
   justify-content: center;
   
}
.out{
  margin-top: 4em;
}

.forms{
  display: flex;
  flex-direction: row;
}







</style>
