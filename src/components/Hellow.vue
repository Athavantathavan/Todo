<template>
  <div id="app">
    <h2>Count: {{ doubleCount }}</h2>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  computed: {
    doubleCount() {
      console.log("Computed Property Re-calculated!"); // Logs when `doubleCount` runs
      return this.count * 2;
    }
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  updated() {
    console.log("Component Re-rendered!"); // Logs when the component updates
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
