import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      headerClass: "transparent-header" // 主页的导航栏透明
    }
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
    component: () => import('../views/user/User.vue'),
    // rendered inside User's <router-view>
    children: [
      {
        path: '',
        name: 'attributes',
        component: () => import('../views/user/attributes/Attributes.vue'),
      },
      {
        path: 'files',
        name: 'files',
        component: () => import('../views/user/files/Files.vue'),
      },
      {
        path: '/organization',
        name: 'organization',
        component: () => import('../views/user/organization/Organization.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
