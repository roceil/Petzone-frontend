<script setup>
// import axios from 'axios'
import { watch, onMounted } from 'vue'
import { productStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ecommerceLinks } from '@/constants'

const productHandler = productStore()
const { products, categoryType, productName } = storeToRefs(productHandler)

// 重新刷新頁面後params參數會遺失，Vue router 4.0 以上版本已經將params參數傳遞移除改用query
const router = useRouter()
const redirectToProductPage = (productId) => {
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
  <div class="container flex text-font">
    <!-- 頁面標題 -->
    <div>
      <h1 class="mt-10 mx-10 text-5xl font-bold">商品專區</h1>
    </div>

    <!-- 專區按鈕 -->
    <div class="flex mt-10 mx-20 space-x-[100px] text-2xl font-bold">
      <div v-for="link in ecommerceLinks" :key="link.name" class="flex justify-center items-center">
        <img :src="link.icon" :alt="link.name" />
        <button @click.prevent="categoryType = link.type">{{ link.name }}</button>
      </div>
    </div>

    <!-- 搜尋欄 -->
    <div class="relative flex mt-10 ml-48">
      <button class="absolute inset-y-0 right-2 flex items-center pr-2"></button>
      <input
        type="text"
        id="name"
        name="name"
        class="w-[200px] py-1.5 pl-2 border rounded-md border-font placeholder:text-gray-40 focus:outline-none"
        placeholder="請輸入商品名稱"
        v-model="productName"
      />
      <button
        class="absolute inset-y-0 right-0 mr-2"
        @click.prevent="productHandler.userGetProducts('productName')"
      >
        <img src="../assets/search.svg" alt="search" />
      </button>
    </div>
  </div>

  <!-- 商品列表 -->
  <div class="container grid grid-cols-3">
    <div class="w-[320px] m-10" v-for="product in products" :key="product.name">
      <button @click.prevent="redirectToProductPage(product._id)">
        <img
          class="w-[320px] h-[180px] rounded-[10px] object-cover"
          :src="product.photos"
          alt="商品圖"
        />
      </button>
      <div>
        <div class="flex my-4 text-font text-2xl justify-between">
          <p class="mx-2 font-bold">{{ product.name }}</p>
          <div>
            <p v-if="!product.price">${{ product.originPrice }}</p>
            <p v-else>
              <del>${{ product.originPrice }}</del> / ${{ product.price }}
            </p>
          </div>
        </div>
        <div class="flex items-center">
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
