import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'ad1',
//     component: () => import(/* webpackChunkName: "about" */ '../views/ad1.vue')
//   },
// ]

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/vhtml',
    name: 'vhtml',
    component: () => import(/* webpackChunkName: "about" */ '../views/vhtml.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/video',
    name: 'videopage',
    component: () => import(/* webpackChunkName: "about" */ '../views/video.vue')
  },
  {
    path: '/myorder',
    name: 'myorder',
    component: () => import(/* webpackChunkName: "about" */ '../views/myorder.vue')
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import(/* webpackChunkName: "about" */ '../views/pay.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/user.vue')
  },
  {
    path: '/myshare',
    name: 'myshare',
    component: () => import(/* webpackChunkName: "about" */ '../views/myshare.vue')
  },
  {
    path: '/agencydesc',
    name: 'agencydesc',
    component: () => import(/* webpackChunkName: "about" */ '../views/agencydesc.vue')
  },
  {
    path: '/caregory',
    name: 'caregory',
    component: () => import(/* webpackChunkName: "about" */ '../views/caregory.vue')
  },
  // {
  //   path: '/ad2',
  //   name: 'ad2',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/ad2.vue')
  // },
  {
    path: '*',
    name: 'null404',
    component: () => import(/* webpackChunkName: "about" */ '../views/null404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
