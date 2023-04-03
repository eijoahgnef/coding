import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      console.log("home的beforeEnter：", to.name, from.name)
      next()
    }
  },
  {
    path: '/page',
    name: 'page',
    component: () => import('../views/Page.vue'),
    beforeEnter: (to, from, next) => {
      console.log("page的beforeEnter：", to.name, from.name)
      next()
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
