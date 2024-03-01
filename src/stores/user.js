import { ref } from 'vue'
import { defineStore } from 'pinia'
import { get_selfId_api } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const userId = ref('')
  const getUserId = async () => {
    const { data } = await get_selfId_api()
    if (data) {
      userId.value = data
    }
  }
  const resetUserId = () => {
    userId.value = ''
  }

  return { userId, getUserId, resetUserId }
})
