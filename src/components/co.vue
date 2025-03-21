<template>
    <div>
      <p>First Name: <input v-model="firstName"></p>
      <p>Last Name: <input v-model="lastName"></p>
      <p>Full Name: {{ fullName }}</p> 
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        firstName: "John",
        lastName: "Doe"
      };
    },
    computed: {
      fullName() {
        console.log("Computed property recalculating...");
        return this.firstName + " " + this.lastName;
      }
    }
  };
  </script>
  