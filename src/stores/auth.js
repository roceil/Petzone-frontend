import { ref } from 'vue'
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')

  const set_token = (accessToken) => {
    token.value = accessToken
    write_cookie()
  }

  const clear_token = () => {
    token.value = ''
    clear_cookie()
  }

  // 有 token 時寫到 cookie 內部
  const write_cookie = () => {
    const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000) // 1 day

    if (token.value) {
      Cookies.set('token', token.value, { expires: expires })
    }
  }

  // 初始化時讀取 cookie
  const read_cookie = () => {
    const cookie = Cookies.get('token')
    if (cookie) {
      token.value = cookie
    }
  }

  // 清除 cookie 中的 token
  const clear_cookie = () => {
    Cookies.remove('token')
  }


  return { token, set_token, clear_token, read_cookie }
})
