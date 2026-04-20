<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import Post from './components/Post.vue'
import SearchTextInput from './components/SearchTextInput.vue'

export type Post = {
  postId: Date
  postName: string
  postDesc: string
}

const isAddingPost = ref(false)
const isSearching = ref(false)
const postList: Ref<Post[]> = ref([])
const filteredPostList: Ref<Post[]> = ref([])

const newPost = ref({
  postId: new Date(),
  postName: '',
  postDesc: '',
})

const addPost = () => {
  if (!newPost.value.postName || !newPost.value.postDesc) return

  newPost.value.postName.trim()
  newPost.value.postDesc.trim()

  if (newPost.value.postName.length < 2 || newPost.value.postDesc.length < 5) return

  const newPostData: Post = {
    postId: new Date(),
    postName: newPost.value.postName,
    postDesc: newPost.value.postDesc,
  }
  postList.value.push(newPostData)

  newPost.value.postName = ''
  newPost.value.postDesc = ''
}

const removePost = (postToDelete: Post) => {
  postList.value = postList.value.filter((pI) => pI.postId !== postToDelete.postId)
}

const searchValidator = (searchText: string) => {
  if (searchText === null) return false
  searchText.trim()
  if (searchText.length < 3) return false
  else return true
}

const searchingToggle = (searching: boolean) => {
  isSearching.value = searching
}

const searchPosts = (searchText: string) => {
  if (searchValidator(searchText) === false) return

  filteredPostList.value = postList.value.filter(
    (postItem) =>
      postItem.postDesc.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
      postItem.postName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
  )
}

watch(
  postList,
  () => {
    localStorage.setItem('posts', JSON.stringify(postList.value))
  },
  { deep: true },
)
onMounted(() => {
  const saved = localStorage.getItem('posts')
  if (saved) {
    postList.value = JSON.parse(saved)
  }
})

// testing a change for git user
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

      <div class="posts-text-top">
        <div class="posts-top">
          <h2 class="post-text">Posts</h2>
          <SearchTextInput @searchingToggle="searchingToggle" @runSearchPost="searchPosts" />
        </div>

        <div v-if="!isAddingPost">
          <v-btn class="add-post-bttn" @click="() => (isAddingPost = true)">Add New Post</v-btn>
        </div>
      </div>

      <v-expand-transition>
        <div v-if="isAddingPost" class="new-post-section">
          <h3>New Post</h3>
          <div class="input-container">
            <v-text-field type="text" placeholder="Post Name" v-model="newPost.postName" />
            <v-textarea
              class="input-desc"
              type="text"
              placeholder="Post Description"
              maxlength="300"
              counter
              v-model="newPost.postDesc"
              hint="Press CTRL + ENTER to post without having to click the button"
              @keyup.ctrl.enter="addPost"
            />
          </div>
          <div>
            <v-btn class="post-bttn" @click="addPost" text="Post" />
            <v-btn class="cancel-bttn" @click="() => (isAddingPost = false)">Cancel</v-btn>
          </div>
        </div>
      </v-expand-transition>
    </div>

    <v-item-group>
      <v-empty-state
        v-show="postList.length < 1"
        headline="No Posts Yet"
        text="You haven't added any posts yet. When you do, they'll appear here."
        title="Add some posts!"
      ></v-empty-state>
      <v-empty-state
        v-show="isSearching && filteredPostList.length < 1"
        headline="404 No posts found"
        text="Try searching with other keywords!"
        title="Your search inquiery did not yield any posts."
      ></v-empty-state>

      <v-item
        v-if="isSearching"
        v-for="post in filteredPostList"
        :key="'filtered-' + post.postName + post.postId"
      >
        <Post :postItem="post" :removePost="removePost" />
      </v-item>
      <v-item v-else v-for="post in postList" :key="post.postName + post.postId">
        <Post :postItem="post" :removePost="removePost" />
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

.posts-top {
  display: flex;
  margin-top: 1rem;
}

.post-text {
  display: block;
  flex: 0.1 1 auto;
  text-align: center;
}

.search-input {
  flex: 1 0;
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
