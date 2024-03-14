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
    Cookies.remove('token')
  }

  // 有 token 時寫到 cookie 內部
  const write_cookie = () => {
    const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000) // 1 day

    if (token.value) {
      Cookies.set('token', token.value, { expires: expires })
    }
    if (permissions.value) {
      Cookies.set('permissions', permissions.value, { expires: expires })
    }
  }

  const permissions = ref('')

  const set_permissions = (permissionData) => {
    permissions.value = permissionData
    write_cookie()
  }

  const clear_permissions = () => {
    permissions.value = ''
    Cookies.remove('permissions')
  }

  // 初始化時讀取 cookie
  const read_cookie = () => {
    const cookie = Cookies.get('token')
    const accessToken = Cookies.get('accessToken')
    const permissionsCookie = Cookies.get('permissions')
    if (cookie) {
      token.value = cookie
    }

    if (accessToken) {
      token.value = accessToken
    }

    if (permissionsCookie) {
      permissions.value = permissionsCookie
    }
  }

  // 清除 cookie 中的 token
  const clear_cookie = () => {
    clear_token()
    clear_permissions()
  }

  return {
    token,
    set_token,
    clear_token,
    read_cookie,
    permissions,
    set_permissions,
    clear_permissions,
    clear_cookie
  }
})
