import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUp.vue'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/User.vue'),
  },
  {
    path: '/organization',
    name: 'organization',
    component: () => import('../views/Organization.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
