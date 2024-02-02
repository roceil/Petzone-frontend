<script setup>
import { ecommerceLinks, productListData } from '@/constants'
import shoppingCart from '../assets/shopping-cart.svg'
</script>

<template>
  <!-- 上方區塊 -->
  <div class="EcommerceView m-10">
    <div class="container flex justify-around">
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
      <div class="w-[200px] h-12 border border-font rounded-md relative">
        <button class="absolute inset-y-0 right-2 flex items-center pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- 商品列表 -->
  <ul class="container m-10 flex flex-wrap justify-center gap-[50px]">
    <li v-for="product in productListData" :key="product.name">
      <!-- 圖片 -->
      <div
        class="w-[322px] h-[185px] rounded-[10px] flex justify-center items-center font-bold text-white text-3xl"
        :class="product.image"
      >
        {{ product.name }}
      </div>

      <!-- 文字 -->
      <div class="flex justify-between py-[21px] px-[7.5px] text-font text-2xl">
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
