<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { check_user_api } from '@/api/auth'

const userStore = useUserStore()
const authStore = useAuthStore()

onMounted(async () => {
  try {
    const { data } = await check_user_api()
    const photoPath = data.user.photo
    const userId = data.user._id
    userStore.setUserPhotoPath(photoPath)
    userStore.setUserId(userId)
    authStore.read_cookie()
    userStore.read_cookie()
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <Header />
  <RouterView />
</template>
import { useAuthStore } from './stores/auth'
