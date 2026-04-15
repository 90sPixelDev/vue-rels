<template>
  <v-card
    class="mx-auto post"
    :subtitle="postDateTime.toDateString() + ' | ' + postDateTime.toLocaleTimeString()"
  >
    <template v-slot:title>
      <div class="title-area">
        <span class="font-weight-black">{{ postItem.postName }}</span>
        <v-btn
          class="ma-2"
          color="red-lighten-2"
          icon="$delete"
          variant="text"
          @click="removePost(postItem)"
        ></v-btn>
      </div>
    </template>
    <v-card-text class="bg-surface-light pt-4">
      {{ postItem.postDesc }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Post } from '@/App.vue'
const props = defineProps<{ postItem: Post; removePost: (p: Post) => void }>()

const postDateTime = new Date(props.postItem.postId)
</script>

<style scoped>
.title-area {
  display: flex;
  align-items: center;

  justify-content: space-between;
}
</style>
