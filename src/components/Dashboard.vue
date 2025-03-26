<template>
 <div>
    <div  class="container">
     <div  class="out">
      <form @submit.prevent="add" class="forms" >
        <input 
          type="text" 
          v-model="task.title" 
          style="font-size:15px;"
          name="title"
          placeholder="Title"
          :style="{fontSize:'1em',fontWeight:'10px'}"
          :disabled="isDisabled"
        />
        <input 
          type="text" 
          style="font-size:15px;" 
          placeholder="Description" 
          v-model="task.discription" 
          :disabled="isDisabled"
          :style="{fontSize:'1em',fontWeight:'10px'}"
          name="discription"
        />
        <button  class="addbutton" >AddTask</button>
      </form>
    </div>
   </div>
  <Taskbody  :key="componentKey" />
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
      isDisabled:false,
      componentKey:'',
      task: {
           title: "",
           discription: "",
           status:"pending"
            },
    };
  },
  methods: {
    validate(){

  if(!this.task.title||!this.task.discription||!this.task.status)  
  { if(!this.task.title){
    this.task.title="TaskNeeded"
    this.isDisabled=true
    
  }
  else if(!this.task.discription){
    this.task.discription="Discription Needed"
    this.isDisabled=true
  ;
  } 
  setTimeout(()=>{
    if(this.task.title==="TaskNeeded"){
    this.task.title=""
    this.isDisabled=false
  }
  else if(this.task.discription==="Discription Needed"){
    this.task.discription=""
    this.isDisabled=false
  } 

  },1000)
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
         this.$store.commit('setmessage','Task Added')
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
.addbutton{
  background-color:rgb(27, 138, 27) ;
  padding-left:1.7em ;
  cursor:pointer;
  padding-right: 1.7em;
  border-radius: 5px;
  
}
.addbutton:hover{
background-color:rgb(11, 131, 11)
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
  background-color: white;
}

</style>
