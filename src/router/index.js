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
      path: '/community',
      name: 'community',
      component: () => import('../views/CommunityView.vue')
    },
    {
      path: '/membercenter',
      name: 'membercenter',
      component: () => import('../views/MemberCenterView.vue')
    },
    {
      path: '/membercenter/pointshistory',
      name: 'pointshistory',
      component: () => import('../views/PointsHistoryView.vue')
    },
    {
      path: '/membercenter/ordershistory',
      name: 'ordershistory',
      component: () => import('../views/OrdersHistoryView.vue')
    },
    {
      path: '/mypost',
      name: 'mypost',
      component: () => import('../views/MyPostView.vue')
    }
  ]
})

export default router
