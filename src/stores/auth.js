import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const has_token = ref(false)
  const token = ref('')

  const set_token = (new_token) => {
    token.value = new_token
    has_token.value = true
  }

  const clear_token = () => {
    token.value = ''
    has_token.value = false
  }

  return { has_token, token, set_token, clear_token }
})
