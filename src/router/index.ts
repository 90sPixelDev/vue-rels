import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import PostsView from '@/views/PostsView.vue'

const routes = [
  { path: '/', component: App },
  { path: '/posts', component: PostsView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
