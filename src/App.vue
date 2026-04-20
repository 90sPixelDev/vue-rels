<script setup lang="ts">
import Home from './views/Home.vue'
</script>

<template>
  <v-app>
    <TheHeader />

    <v-main>
      <router-view v-slot="{ Component }">
        <v-fade-transition hide-on-leave>
          <component :is="Home" />
        </v-fade-transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
/* POSTS TEXT TOP */
.page-wrapper {
  margin: 0 1rem 0 1rem;
}

.divider {
  margin-top: 1rem;
}
</style>
