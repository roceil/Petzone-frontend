import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/ecommerce',
      name: 'ecommerce',
      component: () => import('../views/EcommerceView.vue')
    },
    {
      path: '/ecommerce/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    }
  ]
})

export default router
