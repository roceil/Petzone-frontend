<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import router from '@/router'
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { headerLinks } from '@/constants'

const GotoHome = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <header class="Header">
    <div class="container">
      <div class="flex justify-between items-center py-[10px] border-b border-font ">
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
          <button className="btn btn-primary text-white font-bold rounded-full py-4 px-5">
            登入／註冊
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

