<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from '@/components/AdminSidebar.vue'
import support from '@/assets/points_history/support.svg'

const isWideScreen = ref(window.innerWidth >= 992)

const updateScreenSize = () => {
  isWideScreen.value = window.innerWidth >= 992
}

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})
</script>

<template>
  <div class="container grid grid-cols-12">
    <!-- 在寬屏時顯示側邊欄和路由視圖 -->
    <template v-if="isWideScreen">
      <Sidebar />
      <RouterView />
    </template>

    <!-- 在窄屏時顯示提示信息 -->
    <template v-else>
      <div class="col-span-12 h-[calc(100vh-64px)]">
        <img :src="support" alt="" srcset="" />

        <p class="text-center flex justify-center items-center text-font text-lg font-semibold">
          非常抱歉<br />後台只支援解析度高於 992px 的裝置
        </p>
      </div>
    </template>
  </div>
</template>
