import { ref } from 'vue'
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
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

  const setUserId = (id) => {
    userId.value = id
    write_cookie_userId()
  }

  // UserId 寫入 cookie
  const write_cookie_userId = () => {
    const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000) // 1 day

    if (userId.value) {
      Cookies.set('userId', userId.value, { expires: expires })
    }
  }

  const userPhotoPath = ref('')
  const setUserPhotoPath = (path) => {
    userPhotoPath.value = path
    write_cookie_photo()
  }

  // userPhotoPath 寫入 cookie
  const write_cookie_photo = () => {
    const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000) // 1 day

    if (userPhotoPath.value) {
      Cookies.set('userPhotoPath', userPhotoPath.value, { expires: expires })
    }
  }

  // 初始化時讀取 cookie
  const read_cookie = () => {
    const cookie_userId = Cookies.get('userId')

    if (cookie_userId) {
      userId.value = cookie_userId
    }
  }

  return { userId, getUserId, resetUserId, setUserId, userPhotoPath, setUserPhotoPath, read_cookie }
})
