<template>
    <div>
      <p>Enter your age:</p>
      <input v-model="age" type="number" />
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        age: 18,
        message: "",
      };
    },
    watch: {
      age(newValue, oldValue) {
        console.log(`Age changed from ${oldValue} to ${newValue}`);
        if (newValue   >= 18) {
          this.message = "You are an adult!";
        } else {
          this.message = "You are under 18!";
        }
      }
    }
  };
  </script>
  