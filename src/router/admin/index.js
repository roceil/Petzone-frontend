const beforeEnter = () => {
  // 權限檢查
}
const routes = [
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/accounts',
    beforeEnter,
    meta: {
      admin: true
    },
    component: () => import('../../views/admin/AdminView.vue'),
    children: [
      {
        path: 'accounts',
        component: () => import('../../views/admin/AccountsAdminView.vue')
      },

      {
        path: 'products',
        component: () => import('../../views/admin/ProductsAdminView.vue')
      },
      {
        path: 'product',
        component: () => import('../../views/admin/ProductAdminView.vue')
      },
      {
        path: 'orders',
        component: () => import('../../views/admin/OrdersAdminView.vue')
      },
      {
        path: 'posts',
        component: () => import('../../views/admin/PostsAdminView.vue')
      },
      {
        path: 'coupons',
        component: () => import('../../views/admin/CouponsAdminView.vue')
      }
    ]
  }
]

export default routes
