<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

type Post = {
  postId: Date
  postName: string
  postDesc: string
}

const isAddingPost = ref(false)

const postList: Ref<Post[]> = ref([])

const newPost = ref({
  postId: new Date(),
  postName: '',
  postDesc: '',
})

const addPost = () => {
  if (!newPost.value.postName || !newPost.value.postDesc) return

  newPost.value.postName.trim()
  newPost.value.postDesc.trim()

  const newPostData: Post = {
    postId: new Date(),
    postName: newPost.value.postName,
    postDesc: newPost.value.postDesc,
  }
  postList.value.push(newPostData)

  newPost.value.postName = ''
  newPost.value.postDesc = ''
}

//test push

const removePost = (postToDelete: Post) => {
  postList.value = postList.value.filter((pI) => pI.postId !== postToDelete.postId)
}
</script>

<template>
  <div class="page-wrapper">
    <div class="home-top">
      <h1>Welcome!</h1>
      <p>
        This web app is created for me to understand Vue and it's environment as well as to log
        posts on what I learned.
      </p>
      <v-divider></v-divider>

      <div class="posts-text-top">
        <h2>Posts</h2>
        <div v-if="!isAddingPost">
          <v-btn class="add-post-bttn" @click="() => (isAddingPost = true)">Add New Post</v-btn>
        </div>
      </div>

      <v-expand-transition>
        <div v-if="isAddingPost" class="new-post-section" v-expand-x-transition>
          <h3>New Post</h3>
          <div class="input-container">
            <v-text-field type="text" placeholder="Post Name" v-model="newPost.postName" />
            <v-textarea
              class="input-desc"
              type="text"
              placeholder="Post Description"
              v-model="newPost.postDesc"
            />
          </div>
          <div>
            <v-btn class="post-bttn" @click="addPost" v-on:keyup.enter="addPost" text="Post" />
            <v-btn class="cancel-bttn" @click="() => (isAddingPost = false)">Cancel</v-btn>
          </div>
        </div>
      </v-expand-transition>
    </div>

    <v-item-group class="post-list">
      <v-empty-state
        v-show="postList.length < 1"
        headline="No Posts Yet"
        text="You haven't added any posts yet. When you do, they'll appear here."
        title="Add some posts!"
      ></v-empty-state>

      <v-item
        class="post-item"
        v-for="post in postList"
        :key="post.postName + post.postId"
        rounded="lg"
      >
        <v-card
          class="mx-auto post"
          rounded="lg"
          :subtitle="post.postId.toLocaleDateString() + ' ' + post.postId.toLocaleTimeString()"
        >
          <template v-slot:title>
            <div class="title-area">
              <span class="font-weight-black">{{ post.postName }}</span>
              <v-btn
                class="ma-2"
                color="red-lighten-2"
                icon="$delete"
                variant="text"
                @click="removePost(post)"
              ></v-btn>
            </div>
          </template>
          <v-card-text class="bg-surface-light pt-4">
            {{ post.postDesc }}
          </v-card-text>
        </v-card>
      </v-item>
    </v-item-group>
  </div>
</template>

<style scoped>
/* POSTS TEXT TOP */
.page-wrapper {
  margin: 0 1rem 0 1rem;
}

.add-post-bttn {
  font-size: 0.8rem;
}

/* NEW POST INPUT AREA */

.input-container {
  display: flex;
  flex-direction: column;
  line-height: 2rem;

  gap: 1rem;
}
input,
textarea {
  max-width: 70%;
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.new-post-section {
  margin-left: 1rem;
  margin-bottom: 3rem;
}
.post-item + .post-item {
  margin-top: 3rem;
}

.title-area {
  display: flex;
  align-items: center;

  justify-content: space-between;
}

.post-bttn {
  margin-top: 1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin-right: 1rem;
}
.cancel-bttn {
  margin-top: 1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
}
</style>
