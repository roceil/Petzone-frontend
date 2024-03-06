<script setup>
// import axios from 'axios'
import { watch, onMounted } from 'vue'
import { productStore } from '@/stores/product'
import { cartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ecommerceLinks } from '@/constants'

const productHandler = productStore()
const { products, categoryType, productName } = storeToRefs(productHandler)

const cartHandler = cartStore()

// 重新刷新頁面後params參數會遺失，Vue router 4.0 以上版本已經將params參數傳遞移除改用query
const router = useRouter()
const directToProductPage = (productId) => {
  router.push({
    name: 'product',
    query: {
      productId
    }
  })
}

watch(categoryType, async (Type) => {
  // console.log(Type)
  const category = { categoryType: Type }
  productHandler.userGetProducts(category)
})

onMounted(() => {
  productHandler.userGetProducts()
})
</script>

<template>
  <!-- 上方區塊 -->
  <div class="container mt-10 text-font grid grid-cols-3">
    <!-- 頁面標題 -->
    <div>
      <h1 class="mx-10 text-5xl font-bold">商品專區</h1>
    </div>

    <!-- 專區按鈕 -->
    <div class="flex justify-evenly text-2xl font-bold">
      <div v-for="link in ecommerceLinks" :key="link.name" class="flex justify-center items-center">
        <img :src="link.icon" :alt="link.name" />
        <button @click.prevent="categoryType = link.type">{{ link.name }}</button>
      </div>
    </div>

    <!-- 搜尋欄 -->
    <div class="flex justify-end">
      <div class="relative">
        <input
          type="text"
          id="name"
          name="name"
          class="w-[200px] h-[48px] py-1.5 pl-2 border rounded-md border-font placeholder:text-gray-400 focus:outline-none"
          placeholder="請輸入商品名稱"
          v-model="productName"
        />
        <button
          class="absolute inset-y-0 right-0 mr-2 top-0 mt-1"
          @click.prevent="productHandler.userGetProducts('name')"
        >
          <img src="../assets/search.svg" alt="search" />
        </button>
      </div>
    </div>
  </div>

  <!-- 商品列表 -->
  <div class="container mt-10 text-font grid grid-cols-3 gap-8">
    <div class="w-full" v-for="product in products" :key="product.name">
      <a class="cursor-pointer" @click.prevent="directToProductPage(product._id)">
        <img
          class="w-full h-[300px] rounded-[10px] object-cover"
          :src="product.photos[0]"
          alt="商品圖"
        />
      </a>
      <div class="flex justify-between my-4 text-2xl">
        <p class="mx-2 font-bold">{{ product.name }}</p>
        <div>
          <p v-if="!product.price">${{ product.originPrice }}</p>
          <p v-else>
            <del>${{ product.originPrice }}</del> / ${{ product.price }}
          </p>
        </div>
      </div>
      <button
        class="w-full rounded-md btn border-2 border-font hover:opacity-80 hover:-translate-y-1"
        @click.prevent="cartHandler.addToCart(product._id)"
      >
        <p class="font-semibold">加入購物車</p>
        <img src="../assets/ecommerce/shopping-cart.svg" alt="shopping-cart" />
      </button>
    </div>
  </div>
</template>
