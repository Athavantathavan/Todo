<template>
 <div>
    <div  class="container">
     <div  class="out">
      <form @submit.prevent="add" class="forms" >
        <input 
          type="text" 
          v-model="task.title" 
          name="title"
          placeholder="Title"
          
        />
        <input 
          type="text" 
          placeholder="Description" 
          v-model="task.discription" 
       
          name="discription"
        />
        <button  class="addbutton" :style="{backgroundColor:'green',cursor:'pointer',paddingLeft:'1.7em',paddingRight:'1.7em',borderRadius:'5px'}">AddTask</button>
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
name:'Dashboard',
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
         this.task.title=""
         this.task.discription=""
          
         this.componentKey=this.componentKey+1;
         console.log(typeof res)
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
   height: 80px;
 
}
.addbutton:hover{

     background-color:rgb(19, 18, 102)
}
.out{
  margin:3em;
  height:70px;
  width: 800px;
  display: flex;
  background-color: rgb(227, 238, 238);
  align-items: center;
  justify-content: center;
  border-radius: 20px;

}

.forms{
  display: flex;
  flex-direction: row;
  
}
.forms >input{
  border:1.8px solid black;
}







</style>
