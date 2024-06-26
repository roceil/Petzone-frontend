<script setup>
import { watch, onMounted, ref } from 'vue'
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

const selected = ref(null)
const select = (index) => {
  selected.value = index
}

watch(categoryType, async (Type) => {
  const category = { categoryType: Type }
  productHandler.userGetProducts(category)
})

onMounted(() => {
  productHandler.userGetProducts()
})
</script>

<template>
  <div class="container my-10 text-font">
    <div class="md:grid md:grid-cols-3 md:gap-8">
      <!-- 頁面標題 -->
      <div>
        <h1 class="text-xl font-bold md:text-5xl">商品專區</h1>
      </div>

      <!-- 專區按鈕 -->
      <div class="font-bold hidden md:flex md:justify-evenly md:text-2xl">
        <div v-for="(link, index) in ecommerceLinks" :key="link.name">
          <button
            type="button"
            class="flex items-center relative"
            @click.prevent="categoryType = link.type"
            @click="select(index)"
          >
            <img
              :src="link.icon"
              :alt="link.name"
              class="mx-2"
              :class="{ selected: selected === index }"
            />
            <div
              class="w-14 h-14 bg-third rounded-full absolute left-1/2 -z-10"
              v-if="selected === index"
            ></div>
            {{ link.name }}
          </button>
        </div>
      </div>

      <!-- 搜尋欄 -->
      <div class="my-5 md:flex md:justify-end md:my-0">
        <div class="relative">
          <input
            type="text"
            id="name"
            name="name"
            class="w-full md:w-[200px] h-[48px] py-1.5 pl-2 border rounded-md border-font placeholder:text-gray-400 focus:outline-none"
            placeholder="請輸入商品名稱"
            v-model="productName"
            @keydown.enter="productHandler.userGetProducts('name')"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 mr-2 top-0 mt-1"
            @click="productHandler.userGetProducts('name')"
          >
            <img src="../assets/search.svg" alt="search" />
          </button>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="grid grid-cols-2 gap-6 md:mt-10 md:grid md:grid-cols-3 md:gap-8">
      <div v-if="products.length === 0" class="text-center h-screen">載入中...</div>

      <div class="w-full" v-for="product in products" :key="product.name">
        <a class="cursor-pointer" @click.prevent="directToProductPage(product._id)">
          <img
            class="rounded-[10px] object-cover w-full h-[100px] md:h-[300px]"
            :src="product.photos[0]"
            alt="商品圖"
          />
        </a>
        <div class="flex justify-between my-3 text-xs md:my-4 md:text-2xl">
          <p class="mx-2 font-bold">{{ product.name }}</p>
          <div>
            <p v-if="!product.price">
              ${{ product.originPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
            </p>
            <p v-else>
              <del>${{ product.originPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</del>
              / ${{ product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
            </p>
          </div>
        </div>
        <div class="hidden md:block">
          <button
            type="button"
            class="btn w-full rounded-md border-2 border-font text-base hover:opacity-80 hover:-translate-y-1"
            @click.prevent="cartHandler.addToCart(product._id)"
          >
            <p class="font-semibold">加入購物車</p>
            <img src="../assets/ecommerce/shopping-cart.svg" alt="shopping-cart" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
