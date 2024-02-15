import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const has_token = ref(false)
  const token = ref('')

  const set_token = (new_token) => {
    token.value = new_token
    has_token.value = true
    write_cookie()
  }

  const clear_token = () => {
    token.value = ''
    has_token.value = false
  }

  // 有 token 時寫到 cookie 內部
  const write_cookie = () => {
    if (has_token.value) {
      document.cookie = `token=${token.value}; path=/`
    }
  }

  // 初始化時讀取 cookie
  const read_cookie = () => {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.startsWith('token=')) {
        token.value = cookie.substring(6)
        has_token.value = true
        break
      }
    }
  }

  return { has_token, token, set_token, clear_token, write_cookie, read_cookie }
})
