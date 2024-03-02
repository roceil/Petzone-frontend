<script setup>
import crown from '@/assets/home/crown.svg'
import donor_bg from '@/assets/home/donor_bg.svg'
</script>

<template class="">
  <section class="relative">
    <div class="container mt-[323px] flex flex-col items-center justify-center">
      <!-- 標題區塊 -->
      <div class="flex justify-center items-center space-x-2">
        <img :src="crown" alt="裝飾ICON" />
        <h2 class="text-5xl font-bold text-font text-center">本月最佳慈善捐款者</h2>
      </div>

      <!-- 文字區塊 -->
      <p class="mt-6 text-2xl leading-8 max-w-[945px] text-secondary">
        在PetZone你可以透過社群互動獲得積分，並選擇捐贈積分給可愛的毛寶寶們，捐贈的積分將提供給XX平台為流浪的毛小孩們提供必要的食物、醫療照護。您的善舉不僅提供了關懷也為牠們點燃了希望的燈火。
      </p>

      <!-- 捐款者清單 -->
      <ul class="flex items-center justify-center space-x-[100px] mt-6">
        <li v-for="img in 4" :key="img">
          <div class="w-[200px] h-[200px] bg-red-300 rounded-full" />
        </li>
      </ul>

      <!-- 累積金額 -->
      <p class="mt-6 text-2xl font-bold text-font text-end w-full max-w-[1124px]">
        平台總累積捐贈金額：<span class="">NT$ 100,000</span>
      </p>
    </div>

    <!-- 背景裝飾 -->
    <img
      :src="donor_bg"
      alt="裝飾ICON"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
    />
  </section>
</template>
