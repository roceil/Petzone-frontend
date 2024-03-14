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

const userStore = useUserStore()
const authStore = useAuthStore()
const LoadingStore = useLoadingStore()
const { LoadingMode } = storeToRefs(LoadingStore)

onMounted(async () => {
  try {
    const { data } = await check_user_api()
    const photoPath = data.user.photo
    const userId = data.user._id
    const token = data.token
    authStore.set_token(token)
    userStore.setUserPhotoPath(photoPath)
    userStore.setUserId(userId)
  } catch (error) {
    console.error(error)
  } finally {
    authStore.read_cookie()
    userStore.read_cookie()
  }
})
</script>

<template>
  <Header />
  <RouterView />
  <Alert />
  <Loading v-if="LoadingMode" />
</template>
