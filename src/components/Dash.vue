<template>
    <div class="maindiv">
      <Header/>
      <Dashboard/>
      
    </div>
  </template>
  
  <script>
  import Header from './Header.vue';
  import Dashboard from './Dashboard.vue';

 
  export default {
   components:{
        Header,
        Dashboard,
   }
   
  };
  </script>
  <style>
 
  </style>