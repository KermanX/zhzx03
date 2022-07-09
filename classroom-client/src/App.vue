<script lang="ts">
import { writeFile } from "fs";
export default {
  data() {
    return {
      path: 'C:\\Users\\HONOR\\Desktop\\test.txt',
      content: "..."
    }
  },
  methods: {
    submit() {
      writeFile(this.path, this.content, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
}
</script>

<template>
  <div id="app">
    <h1>Hello World</h1>
    <p>This is a simple example of a Vue.js component.</p>
  </div>
  <input type="text" v-model="path" />
  <textarea type="text" v-model="content" />
  <button @click="submit">OK</button>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
