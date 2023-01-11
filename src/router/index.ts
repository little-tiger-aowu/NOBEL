import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'login',
    component: () => import('../view/login.vue')
  },
  {
    path:'/pictures',
    name:'Pictures',
    component: () => import('../view/Pictures.vue')
  },
  {
    path:'/photoList',
    name:'photoList',
    component:() => import('../view/photoList.vue')
  },
  {
    path:'/posters',
    name:'posters',
    component:() => import('../view/posters.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
