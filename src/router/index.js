import { createRouter, createWebHistory } from 'vue-router'
import adminRoutes from './admin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:catchAll(.*)', redirect: '/' },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/ecommerce',
      name: 'ecommerce',
      component: () => import('@/views/EcommerceView.vue')
    },
    {
      path: '/ecommerce/product',
      name: 'product',
      component: () => import('@/views/ProductView.vue')
    },
    {
      path: '/ecommerce/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue')
    },
    {
      path: '/ecommerce/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutView.vue')
    },
    {
      path: '/ecommerce/order/:id',
      name: 'order',
      component: () => import('@/views/OrderView.vue')
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('@/views/CommunityView.vue')
    },
    {
      path: '/community/:id',
      name: 'communityDetail',
      component: () => import('@/views/CommunityDetailView.vue')
    },
    {
      path: '/membercenter',
      name: 'membercenter',
      component: () => import('@/views/MemberCenterView.vue')
    },
    {
      path: '/membercenter/pointshistory',
      name: 'pointshistory',
      component: () => import('@/views/PointsHistoryView.vue')
    },
    {
      path: '/membercenter/ordershistory',
      name: 'ordershistory',
      component: () => import('@/views/OrdersHistoryView.vue')
    },
    {
      path: '/mypost/:id',
      name: 'mypost',
      component: () => import('@/views/MyPostView.vue')
    },
    {
      path: '/donateexplain',
      name: 'donateexplain',
      component: () => import('@/views/DonateExplain.vue')
    },
    ...adminRoutes
  ]
})

import { closeSidebar } from '@/lib'
router.afterEach(() => {
  closeSidebar()
})

export default router
