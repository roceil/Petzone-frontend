import { computed } from 'vue'
import { drop_down_links, drop_down_admin_links } from '@/constants'
import { useAuthStore } from '@/stores/auth'

// 檢查是否要顯示後台管理下拉選單
export const render_dropdown_links = computed(() => {
  const authStore = useAuthStore()
  if (authStore.permissions) {
    return drop_down_admin_links
  } else {
    return drop_down_links
  }
})
