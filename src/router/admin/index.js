const beforeEnter = () => {
  // 權限檢查
}
const routes = [{
  path: '/admin',
  name: 'admin',
  redirect: '/admin/community',
  beforeEnter,
  meta: {
    admin: true
  },
  children: [
    {
      path: 'community',
      name: 'community',
      component: () => import('../../views/admin/CommunityAdminView.vue')
    }
  ]
}]


export default routes
