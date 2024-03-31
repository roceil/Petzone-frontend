import Cookies from 'js-cookie'

const beforeEnter = () => {
  // 檢查進入 admin 之前 Cookie 是否有 permissions
  const permissionsCheck = Cookies.get('permissions')
  if (!permissionsCheck) {
    alert('權限不足')
    return '/'
  }
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
    component: () => import('@/views/admin/AdminView.vue'),
    children: [
      {
        path: 'accounts',
        component: () => import('@/views/admin/AccountsAdminView.vue')
      },
      {
        path: 'accountdetails/:id',
        component: () => import('@/views/admin/AccountsDetailsView.vue')
      },
      {
        path: 'pointshistory/:id',
        component: () => import('@/views/admin/AccountsPointsHistoryView.vue')
      },

      {
        path: 'products',
        name: 'adminproducts',
        component: () => import('@/views/admin/ProductsAdminView.vue')
      },
      {
        path: 'product',
        name: 'adminproduct',
        component: () => import('@/views/admin/ProductAdminView.vue')
      },
      {
        path: 'orders',
        name: 'adminorders',
        component: () => import('@/views/admin/OrdersAdminView.vue')
      },
      {
        path: 'order',
        name: 'adminorder',
        component: () => import('@/views/admin/OrderAdminView.vue')
      },
      {
        path: 'posts',
        component: () => import('@/views/admin/PostsAdminView.vue')
      },
      {
        path: 'post/:id',
        component: () => import('@/views/admin/PostAdminView.vue')
      },
      {
        path: 'coupons',
        component: () => import('@/views/admin/CouponsAdminView.vue')
      }
    ]
  }
]

export default routes
