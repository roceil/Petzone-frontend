<script setup>
import WaterFall from '@/containers/WaterFall.vue'
import Footer from '../components/Footer.vue'
import { blocks } from '@/constants'


</script>

<template>
  <div class="HomeView">
    <!-- 3D -->
    <section class="container">
      <div class="w-full h-[calc(70vh-96.24px)] bg-secondary flex justify-center items-center">
        <p class="text-white font-bold text-5xl">3D Scene To Be Continue...</p>
      </div>
    </section>

    <!-- banner -->
    <section class="container flex space-x-10 xl:justify-center mt-[76px]">
      <!-- 圖片區塊 -->
      <div class="w-[520px] h-[290px] bg-red-300 rounded-[10px] max-w-[1163px]"></div>

      <!-- 文字區塊 -->
      <div class="max-w-[594px] space-y-4">
        <h1 class="text-5xl font-bold text-font leading-[60px]">
          寵愛無極限，精選商品盡在您的指尖！
        </h1>

        <p class="text-secondary text-2xl leading-8">
          寵愛從細節開始，為您的毛小孩挑選最好的一切，讓牠感受到無盡的溫暖!
          <br />
          PetZone提供多樣化、附品質保證的寵物商品，讓你能夠在輕鬆打造出讓毛小孩最舒適、健康的環境。
        </p>
      </div>
    </section>

    <!-- 捐款者 -->
    <section class="container mt-[93.5px] flex flex-col items-center justify-center">
      <h2 class="text-5xl font-bold text-font">本月最佳慈善捐款者</h2>
      <p class="mt-[30px] text-2xl leading-8 max-w-[945px] text-secondary">
        在PetZone你可以透過社群互動獲得積分，並選擇捐贈積分給可愛的毛寶寶們，捐贈的積分將提供給XX平台為流浪的毛小孩們提供必要的食物、醫療照護。您的善舉不僅提供了關懷也為牠們點燃了希望的燈火。
      </p>

      <!-- 捐款者圖片 -->
      <ul class="flex items-center justify-center space-x-[50px] mt-[30px]">
        <li v-for="img in 4" :key="img">
          <div class="w-[200px] h-[200px] bg-red-300 rounded-full" />
        </li>
      </ul>
    </section>

    <!-- 瀑布流圖片牆 -->
    <WaterFall :blocks="blocks" />

    <!-- Footer -->
    <Footer />
  </div>
</template>
