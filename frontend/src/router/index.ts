import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path:'/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path:'/login',
      name:'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path:'/profile',
      name:'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/book/:id',
      name: 'book-view',
      component: () => import('../views/BookView.vue')
    }


  ],
})

export default router
