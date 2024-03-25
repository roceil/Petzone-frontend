<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { cartStore } from '@/stores/cart'
import { useLoadingStore } from '@/stores/loading'
import { storeToRefs } from 'pinia'
import { check_google_login_api } from '@/api/auth'
import Alert from '@/components/alert/Alert.vue'
import Loading from '@/components/LoadingView.vue'
import Cookies from 'js-cookie'

const userStore = useUserStore()
const authStore = useAuthStore()
const cartHandler = cartStore()
const LoadingStore = useLoadingStore()
const { LoadingMode } = storeToRefs(LoadingStore)

onMounted(async () => {
  if (Cookies.get('type') === 'nomal') {
    // 一般登入
    const token = Cookies.get('token')
    const userId = Cookies.get('userId')
    const photoPath = Cookies.get('photoPath')
    authStore.set_token(token)
    userStore.setUserId(userId)
    userStore.setUserPhotoPath(photoPath)
    cartHandler.getCart()
  } else {
    // google登入
    const { data } = await check_google_login_api()
    const token = data.accessToken
    const userId = data.userId
    const photoPath = data.photo
    authStore.set_token(token)
    userStore.setUserId(userId)
    userStore.setUserPhotoPath(photoPath)
    cartHandler.getCart()
  }
  authStore.read_cookie()
  userStore.read_cookie()
})
</script>

<template>
  <Header />
  <RouterView />
  <Alert />
  <Loading v-if="LoadingMode" />
</template>
