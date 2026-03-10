import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleView from '../views/ArticleView.vue'
import TagView from '../views/TagView.vue'
import UserView from '../views/UserView.vue'

const routes = [
  {
  path: '/',
  name:'home',
  component: HomeView
},
{
  path: '/article/:id',
  name:'article',
  component: ArticleView
},
{
  path: '/tag/:tag',
  name:'tag',
  component: TagView
},
{
  path: '/user/:username',
  name:'user',
  component: UserView
}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
