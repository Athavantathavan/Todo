<template>
    <div  class="tableouter">
      <div class="table-container">
      <table :style="{ border: '1px solid black', width: '75%',margin:'1em'}">
        <thead >
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Status</th>
            <th>Modify</th> 
          </tr > 
        </thead >
        <tbody>
          <tr v-for="(task, index) in getdata()" :key="index"  :style="line(task)">
        
            <td>
              <span v-if="isEditing === task.id">
                <input type="text" v-model="update.title" />
              </span>
              <span v-else>{{ task.title }}</span>
            </td>
  
            <td>
              <span v-if="isEditing === task.id">
                <input type="text" v-model="update.description" />
              </span>
              <span v-else>{{ task.description }}</span>
            </td>
  
            <td>
              <span v-if="isEditing === task.id">
                <input type="checkbox" v-model="update.status" :style="{ transform: 'scale(1.9)'}" />
              </span>
              <span v-else>
                
                <input type="checkbox"    :style="{ transform: 'scale(1.9)', border: '1px solid black',
                 }"   :checked="task.status === 'Completed'" disabled />
              </span>
            </td>
            <td >
              <button class="actions"  v-if="isEditing === task.id" @click="save()">Save</button>
              <button class="actions" v-else @click="edit(task)"> Edit</button>
              <button class="action"  @click="deleteTask(task.id)" >Delete</button>
            </td>
          </tr> 
        </tbody>
      </table>
      <h3 v-show="visible">rthr</h3>
    </div>
  </div>
  </template>
  
  <script>
  import store from '../store/index';
import Login from './Login.vue';
  
  export default {
    name: 'Taskbody',
  
    data() {
      return {
        isEditing: '',
        update: {
          title: '',
          description: '',
          status: false
        },
       
        tasks: [],
        visible:false
      };
    },
  
    methods: {
      edit(task) {
        this.isEditing = task.id;
        this.update = { 
          ...task, 
          status: task.status === 'Completed'
        };
       
      },
      line(task){
        if(task.status==='Completed'){
          return "text-decoration: line-through";
        }
      },
  
      save() {
        this.update.status = this.update.status ? 'Completed' : 'Pending';
        this.$store.dispatch('update',this.update);
        this.isEditing = '';
        this.resetForm();
      },
      getdata(){
        const a=this.$store.getters.gettask
        if(a.length)
         return a;
      },
   
      deleteTask(id) {
        this.$store.dispatch('delete', id);        
      },
  
      resetForm() {
        this.update = { title: '', description: '', status: false };
      }
    },
 
    created() {
      if(!localStorage.getItem("Token")){
            this.$router.push('/login')
        }
        const id=localStorage.getItem("id");
        this.$store.dispatch('get', id);
        console.log("Hi");
    }
  };
  </script>
  <style>
    .tableouter{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left:21em;
    
    }
  .table-container{
   display: flex;
   justify-content: center;
   margin-top: 4em;
   align-items: center;
   
  
  }
  table{
    
    background-color: rgba(252, 252, 252, 0.986);
    border-spacing: 20px;
    table-layout: fixed; 
    border-radius:10px;
   
  }
  table th{
    font-size: larger;
    }
    .action{
      padding: 0.6em;
      margin-left: 5px;
      background-color: rgb(221, 38, 38);
      border-radius: 5px;
      cursor: pointer;
    }
    .action:hover{
      background-color: red;
    }
    .actions{
     padding-left:14px;
     padding-right:14px;
     padding-top:8px;
     padding-bottom:8px;
     background-color: rgba(20, 167, 76, 0.973);
     border-radius: 5px;
     cursor: pointer;
    }
    .actions:hover{
      background-color: green;
    }
    .tableouter{
      height: auto;
      width:60%;
    }
  
  table td {
     
      font-weight:200;
      text-align: center;
      font-size: larger;
    }
   
  </style>