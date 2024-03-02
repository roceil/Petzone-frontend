<script setup>
import {onMounted} from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { useUserStore } from '@/stores/user'


const userStore = useUserStore()



onMounted(() => {
  userStore.read_cookie()
})
</script>

<template>
  <Header />
  <RouterView />
</template>
