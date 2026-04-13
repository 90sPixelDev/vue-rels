<script setup lang="ts">
import { ref } from 'vue'
const counter = ref(0)

function incrememt() {
  counter.value++
}
function decrement() {
  counter.value--
}
</script>

<template>
  <h1>Welcome!</h1>
  <p>This web app is created for me to understand Vue and it's environment.</p>
  <hr />
  <p>{{ counter }}</p>
  <button @click="incrememt">++</button>
  <button @click="decrement">--</button>
</template>

<style scoped>
h1 {
  color: darkred;
}
</style>
