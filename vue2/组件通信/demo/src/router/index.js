import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/props',
    name: 'props',
    component: () => import('../components/props/parent.vue')
  },
  {
    path: '/sync',
    name: 'sync',
    component: () => import('../components/sync/parent.vue')
  },
  {
    path: '/model',
    name: 'model',
    component: () => import('../components/model/parent.vue')
  },
  {
    path: '/ref',
    name: 'ref',
    component: () => import('../components/ref/parent.vue')
  },
  {
    path: '/emit',
    name: 'emit',
    component: () => import('../components/emit/parent.vue')
  },
  {
    path: '/attrs',
    name: 'attrs',
    component: () => import('../components/attrs/parent.vue')
  },
  {
    path: '/child',
    name: 'child',
    component: () => import('../components/pAndsDom/parent.vue')
  },
  {
    path: '/provide',
    name: 'provide',
    component: () => import('../components/provide/parent.vue')
  },
  {
    path: '/eventBus',
    name: 'eventBus',
    component: () => import('../components/eventBus/parent.vue')
  },
  {
    path: '/vuex',
    name: 'vuex',
    component: () => import('../components/vuex/parent.vue')
  },
  {
    path: '/root',
    name: 'root',
    component: () => import('../components/root/parent.vue')
  },
  {
    path: '/slot',
    name: 'slot',
    component: () => import('../components/slot/parent.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
