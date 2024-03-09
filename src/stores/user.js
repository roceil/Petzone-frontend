import { ref } from 'vue'
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useUserStore = defineStore('user', () => {
  const userId = ref('')

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

  const reset_photo_path = () => {
    userPhotoPath.value = ''
  }

  // 初始化時讀取 cookie
  const read_cookie = () => {
    const cookie_userId = Cookies.get('userId')
    const cookie_userPhotoPath = Cookies.get('userPhotoPath')

    if (cookie_userId) {
      userId.value = cookie_userId
    }
    if (cookie_userPhotoPath) {
      userPhotoPath.value = cookie_userPhotoPath
    }
  }

  // 登出時清除 cookie
  const user_logout = () => {
    Cookies.remove('userId')
    Cookies.remove('userPhotoPath')
    resetUserId()
    reset_photo_path()
  }

  return {
    userId,
    resetUserId,
    setUserId,
    userPhotoPath,
    setUserPhotoPath,
    read_cookie,
    user_logout
  }
})
