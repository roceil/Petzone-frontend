<script setup>
import { ref, onMounted } from 'vue'

import { get_recommend_product_api } from '@/api/products'
import VueMarquee from '@/components/VueMarquee.vue'
import crown from '@/assets/home/crown.svg'
import left_decorate from '@/assets/home/suggestion_dec_left.svg'
import right_decorate from '@/assets/home/suggestion_dec_right.svg'
import { useLoadingStore } from '@/stores/loading'

const LoadingStore = useLoadingStore()

const upSuggestProductList = ref([])
const downSuggestProductList = ref([])

// 取得推薦商品
const getRecommendProduct = async () => {
  LoadingStore.openLoading()
  try {
    const { products } = await get_recommend_product_api()
    upSuggestProductList.value = products.slice(0, 5)
    downSuggestProductList.value = products.slice(5, 10)
  } catch (error) {
    console.error(error)
  } finally {
    LoadingStore.closeLoading()
  }
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
        <img :src="crown" alt="裝飾ICON" class="w-10 md:w-auto" />
        <h2 class="text-xl md:text-5xl font-bold text-font text-center">推薦商品專區</h2>
      </div>

      <!-- 商品列表 -->
      <div class="max-w-[1124px] mt-10 space-y-5">
        <VueMarquee :suggestProductList="upSuggestProductList" />
        <VueMarquee :suggestProductList="downSuggestProductList" direction="reverse" />
      </div>
    </div>

    <!-- 裝飾區塊 -->
    <img :src="left_decorate" alt="裝飾ICON" class="hidden md:block absolute left-0 top-0 -z-10" />
    <img
      :src="right_decorate"
      alt="裝飾ICON"
      class="hidden md:block absolute right-0 top-[550px] -z-10 -translate-y-1/2"
    />
  </section>
</template>
