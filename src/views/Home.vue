<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <div class="page-wrapper">
    <div class="home-top">
      <h1>Welcome!</h1>
      <p>
        This web app is created for me to understand Vue and it's environment as well as to log
        posts on what I learned.
      </p>

      <v-divider />
      <p>Count: {{ counter.count }}</p>
      <v-btn text="+1" @click="counter.increment" />
      <v-btn text="-1" @click="counter.decrement" />

      <v-divider class="divider" />
    </div>
  </div>
</template>
