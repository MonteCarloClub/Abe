import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/certificates/Certificates.vue'), 
    children: [
      {
        path: '',
        name: 'list',
        component: () => import('../views/certificates/_List.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router
