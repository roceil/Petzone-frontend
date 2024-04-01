<script setup>
import WaterFall from '@/containers/WaterFall.vue'
import Footer from '../components/Footer.vue'
import ProductSuggestion from '@/containers/ProductSuggestion.vue'
import DonorList from '@/containers/DonorList.vue'
import { blocks } from '@/constants'
import banner_img from '@/assets/home/banner.jpg'
import banner_bottom from '@/assets/home/banner_bottom.svg'
</script>

<template>
  <div class="HomeView @container">
    <!-- banner -->
    <section class="container mt-9 md:mt-[76px]">
      <div class="flex flex-col md:flex-row md:space-x-10 items-center justify-center">
        <!-- 圖片區塊 -->
        <img
          :src="banner_img"
          alt="banner_img"
          class="w-[520px] h-[290px] rounded-[10px] object-cover"
        />

        <!-- 文字區塊 -->
        <div class="mt-3 max-w-[594px] space-y-3 md:space-y-4 md:mt-0">
          <h1 class="text-lg md:text-5xl font-bold text-font leading-[30px] md:leading-[60px]">
            寵愛無極限，精選商品盡在您的指尖！
          </h1>

          <p class="text-secondary text-xs md:text-xl leading-4 md:leading-8">
            寵愛從細節開始，為毛小孩挑選最好的，讓牠感受到無盡的溫暖!
            <br />
            PetZone提供多樣化、附品質保證的寵物商品，讓你能夠在輕鬆打造出讓毛小孩最舒適、健康的環境。
          </p>
        </div>
      </div>

      <!-- banner_bottom -->
      <img :src="banner_bottom" alt="裝飾圖片" class="w-full mt-6 md:mt-16" />
    </section>

    <!-- 推薦商品 -->
    <ProductSuggestion />

    <!-- 捐款者 -->
    <DonorList />

    <!-- 瀑布流圖片牆 -->
    <WaterFall :blocks="blocks" />

    <!-- Footer -->
    <Footer />
  </div>
</template>
