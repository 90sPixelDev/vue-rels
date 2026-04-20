<style></style>

<template>
  <v-text-field
    class="search-input"
    type="text"
    v-model="postSearchText"
    placeholder="Search Posts..."
    clearable
    prepend-inner-icon="mdi-magnify"
    hint="You may search by post name or post description here"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['runSearchPost', 'searchingToggle'])
const postSearchText = ref('')

watch(postSearchText, () => {
  if (postSearchText.value !== null && postSearchText.value.length > 3) {
    emit('runSearchPost', postSearchText.value)
    emit('searchingToggle', true)
  } else emit('searchingToggle', false)
})
</script>
