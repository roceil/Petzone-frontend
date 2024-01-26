<script setup>
import { ecommerceLinks, productListData } from '@/constants'
import shoppingCart from '../assets/shopping-cart.svg'
</script>

<template>
  <!-- 上方區塊 -->
  <div class="EcommerceView">
    <div class="container flex justify-between mt-[70px]">
      <!-- 頁面標題 -->
      <h1 class="text-5xl font-bold text-font">商品專區</h1>

      <!-- 專區按鈕 -->
      <ul class="flex text-2xl text-font space-x-[27px]">
        <li
          v-for="link in ecommerceLinks"
          :key="link.name"
          class="flex justify-center items-center"
        >
          <img :src="link.icon" :alt="link.name" />
          <router-link :to="link.link">{{ link.name }}</router-link>
        </li>
      </ul>

      <!-- 搜尋欄 -->
      <div class="w-[345px] h-12 border border-font rounded-md"></div>
    </div>
  </div>

  <!-- 商品列表 -->
  <ul class="container mt-[94px] mb-[291px] flex flex-wrap justify-center gap-[100px]">
    <li v-for="product in productListData" :key="product.name" class="py-4">
      <!-- 圖片 -->
      <div
        class="w-[322px] h-[185px] rounded-[10px] flex justify-center items-center font-bold text-white text-3xl"
        :class="product.image"
      >
        {{ product.name }}
      </div>

      <!-- 文字 -->
      <div class="flex justify-between py-[21px] px-[7.5px] mt-5 text-font text-2xl">
        <p class="font-bold">{{ product.name }}</p>
        <p>
          <del>＄{{ product.originalPrice }}</del> / ＄{{ product.price }}
        </p>
      </div>

      <!-- 按鈕 -->
      <button
        class="btn w-full rounded-md border-font text-font border-2 hover:opacity-80 hover:-translate-y-1"
      >
        <p class="font-semibold">加入購物車</p>
        <img :src="shoppingCart" alt="shopping-cart" />
      </button>
    </li>
  </ul>
</template>
