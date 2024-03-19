<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { useLoadingStore } from '@/stores/loading'
import { storeToRefs } from 'pinia'
import { check_user_api } from '@/api/auth'
import Alert from '@/components/alert/Alert.vue'
import Loading from '@/components/LoadingView.vue'
import Cookies from 'js-cookie'

const userStore = useUserStore()
const authStore = useAuthStore()
const LoadingStore = useLoadingStore()
const { LoadingMode } = storeToRefs(LoadingStore)

onMounted(async () => {
  if (Cookies.get('google')) {
    // google登入
    try {
      const { data } = await check_user_api()
      const token = data.token
      const userId = data.user._id
      const photoPath = data.user.photo
      authStore.set_token(token)
      userStore.setUserId(userId)
      userStore.setUserPhotoPath(photoPath)
    } catch (error) {
      console.error(error)
    } finally {
      authStore.read_cookie()
      userStore.read_cookie()
    }
  } else {
    // 一般登入
    try {
      const token = Cookies.get('token')
      const userId = Cookies.get('userId')
      const photoPath = Cookies.get('photoPath')
      authStore.set_token(token)
      userStore.setUserId(userId)
      userStore.setUserPhotoPath(photoPath)
    } catch (error) {
      console.error(error)
    } finally {
      authStore.read_cookie()
      userStore.read_cookie()
    }
  }
})
</script>

<template>
  <Header />
  <RouterView />
  <Alert />
  <Loading v-if="LoadingMode" />
</template>
