<script setup>
import { ref, onMounted } from 'vue'

import { get_recommend_product_api } from '@/api/products'
import VueMarquee from '@/components/VueMarquee.vue'
import crown from '@/assets/home/crown.svg'
import left_decorate from '@/assets/home/suggestion_dec_left.svg'
import right_decorate from '@/assets/home/suggestion_dec_right.svg'

const suggestProductList = ref([])

// 取得推薦商品
const getRecommendProduct = async () => {
  const { products } = await get_recommend_product_api()
  suggestProductList.value = products
}

onMounted(() => {
  getRecommendProduct()
})
</script>

<template>
  <section class="container mt-[49px] relative">
    <div class="flex flex-col justify-center items-center">
      <!-- 標題區塊 -->
      <div class="flex justify-center items-center space-x-2">
        <img :src="crown" alt="裝飾ICON" />
        <h2 class="text-5xl font-bold text-font text-center">推薦商品專區</h2>
      </div>

      <!-- 商品列表 -->
      <div class="w-[1124px] h-[399px] mt-10 space-y-5">
        <VueMarquee :suggestProductList="suggestProductList" />
        <VueMarquee :suggestProductList="suggestProductList" direction="reverse" />
      </div>
    </div>

    <!-- 裝飾區塊 -->
    <img :src="left_decorate" alt="裝飾ICON" class="absolute left-0 top-0 -z-10" />
    <img
      :src="right_decorate"
      alt="裝飾ICON"
      class="absolute right-0 top-[550px] -z-10 -translate-y-1/2"
    />
  </section>
</template>
