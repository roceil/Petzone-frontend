<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ecommerceLinks } from '@/constants'

const { VITE_API_BASE_URL } = import.meta.env
const products = ref()

const userGetProducts = async () => {
  await axios
    .get(`${VITE_API_BASE_URL}/api/products`)
    .then((res) => {
      // console.log(res.data.products)
      products.value = res.data.products
      return products
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  userGetProducts()
  console.log(products)
})
</script>

<template>
  <!-- 上方區塊 -->
  <div class="container flex text-font">
    <!-- 頁面標題 -->
    <div>
      <h1 class="mt-10 mx-10 text-5xl font-bold">商品管理</h1>
    </div>

    <!-- 專區按鈕 -->
    <ul class="flex mt-10 mx-20 space-x-[100px] text-2xl font-bold">
      <li v-for="link in ecommerceLinks" :key="link.name" class="flex justify-center items-center">
        <img :src="link.icon" :alt="link.name" />
        <router-link :to="link.link">{{ link.name }}</router-link>
      </li>
    </ul>

    <!-- 搜尋欄 -->
    <div class="relative flex mt-10 ml-48">
      <button class="absolute inset-y-0 right-2 flex items-center pr-2"></button>
      <input
        type="text"
        id="name"
        name="name"
        class="w-[200px] py-1.5 pl-2 border rounded-md border-font placeholder:text-gray-40 focus:outline-none"
        placeholder="請輸入商品名稱"
      />
      <button class="absolute inset-y-0 right-0 mr-2">
        <img src="../assets/search.svg" alt="search" />
      </button>
    </div>
  </div>

  <!-- 商品列表 -->
  <div class="container grid grid-cols-3">
    <div class="m-10 w-[320px]" v-for="product in products" :key="product.name">
      <a href="#">
        <img class="rounded-[10px]" :src="product.photos" alt="商品圖" />
      </a>
      <div>
        <div class="flex my-4 text-font text-2xl">
          <p class="mx-2 font-bold">{{ product.name }}</p>
          <p>
            <del>＄{{ product.originPrice }}</del> / ＄{{ product.price }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="btn w-full rounded-md border-font text-font border-2 hover:opacity-80 hover:-translate-y-1"
          >
            <p class="font-semibold">加入購物車</p>
            <img src="../assets/shopping-cart.svg" alt="shopping-cart" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
