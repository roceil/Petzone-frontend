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
    },
    {
      path: '/ecommerce/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue')
    },
    {
      path: '/ecommerce/order',
      name: 'order',
      component: () => import('../views/OrderView.vue')
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/CommunityView.vue')
    }
  ]
})

export default router
