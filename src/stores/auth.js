import { ref } from 'vue'
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('auth', () => {
  const has_token = ref(false)
  const token = ref('')

  const set_token = (login_status) => {
    // token.value = login_status
    has_token.value = login_status
    write_cookie()
  }

  const clear_token = () => {
    clear_cookie()
  }

  // 有 token 時寫到 cookie 內部
  const write_cookie = () => {
    const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000) // 1 day

    if (has_token.value) {
      Cookies.set('has_login', has_token.value, { expires: expires })
    }
  }

  // 初始化時讀取 cookie
  const read_cookie = () => {
    const cookie = Cookies.get('has_login')
    if (cookie) {
      token.value = cookie
      has_token.value = true
    }
  }

  // 清除 cookie 中的 token
  const clear_cookie = () => {
    Cookies.remove('has_login')
  }

  return { has_token, token, set_token, clear_token, read_cookie }
})
