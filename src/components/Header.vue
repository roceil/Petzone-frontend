<!-- eslint-disable vue/multi-word-component-names -->
<script>
import router from '@/router'
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { headerLinks } from '@/constants'
import { useAuthStore } from '@/stores/auth'

export default {
  components: {
    ShoppingCartIcon
  },

  data() {
    return {
      headerLinks
    }
  },

  methods: {
    GotoHome() {
      router.push({ name: 'home' })
    },
    login() {
      this.authStore.set_token('your-token-value')
    },
    logout() {
      this.authStore.clear_token()
    }
  },

  computed: {
    authStore() {
      return useAuthStore()
    },
    token() {
      return this.authStore.token
    },
    has_token() {
      return this.authStore.has_token
    }
  }
}
</script>
<template>
  <header class="Header">
    <div class="container">
      <div class="flex justify-between items-center py-[10px] border-b border-font">
        <!-- LOGO -->
        <button @click="GotoHome" class="w-20 ml-[98px]">
          <img src="../assets/logo.svg" alt="logo" />
        </button>

        <!-- Nav -->
        <ul class="flex space-x-12 text-font text-2xl">
          <li v-for="link in headerLinks" :key="link.name">
            <RouterLink :to="link.link">{{ link.name }}</RouterLink>
          </li>
        </ul>

        <!-- 購物車＆登入 -->
        <div class="flex space-x-4 mr-[25px] items-center">
          <ShoppingCartIcon class="w-[37.5px] h-[37.5px] text-font p-[6.25]" />
          <button
            v-if="!has_token"
            @click="login"
            class="btn btn-primary text-white font-bold rounded-full py-4 px-5"
          >
            登入／註冊
          </button>
          <button v-if="has_token" @click="logout">
            <div class="w-[50px] h-[50px] bg-red-400 rounded-full"></div>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
