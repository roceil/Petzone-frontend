<script setup>
import { ref, onMounted } from 'vue'
import { productStore } from '@/stores/product'
import { cartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const route = useRoute()
// const router = useRouter()
const productHandler = productStore()
const { product, products } = storeToRefs(productHandler)
const productReview = ref([
  {
    username: '拉拉熊',
    score: 5,
    content:
      '這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容',
    createAt: '2024/01/01'
  },
  {
    username: '拉拉熊1',
    score: 1,
    content:
      '這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容這是評價內容',
    createAt: '2024/01/01'
  }
])

const cartHandler = cartStore()

// 將商品加入購物車並導向購物車頁面
const router = useRouter()
const directToCartPage = (productId) => {
  cartHandler.addToCart(productId)
  router.push({
    name: 'cart'
  })
}

// 圖片切換
const currentIndex = ref(0)
const imgChange = (index, max) => {
  if (index < 0) {
    currentIndex.value = 0
  } else if (index >= max) {
    currentIndex.value = max
  } else {
    currentIndex.value = index
  }
  // console.log(currentIndex.value, index)
}

// 產品資料更新
const renewPage = (prodcutId) => {
  currentIndex.value = 0
  route.query.productId = prodcutId
  productHandler.userGetProduct(prodcutId)
}

onMounted(() => {
  // console.log(route.query.productId, product)
  productHandler.userGetProduct(route.query.productId)
  productHandler.userGetProducts()
})
</script>

<template>
  <div class="container text-font">
    <div class="grid grid-cols-2 m-6">
      <!-- 商品圖片 -->
      <div class="m-auto">
        <div class="carousel w-[600px] h-[400px] rounded-[10px] relative">
          <div class="carousel-item" v-for="(img, index) in product.photos" :key="img">
            <img
              class="w-[600px] h-[400px]"
              :src="img"
              alt="商品圖"
              v-show="currentIndex === index"
            />
          </div>
          <div class="absolute flex justify-between left-5 right-5 top-1/2">
            <button
              type="button"
              class="btn border-0 text-2xl"
              @click.prevent="imgChange(currentIndex - 1, product.photos.length - 1)"
            >
              ❮
            </button>
            <button
              type="button"
              class="btn border-0 text-2xl"
              @click.prevent="imgChange(currentIndex + 1, product.photos.length - 1)"
            >
              ❯
            </button>
          </div>
        </div>
        <!-- 商品小圖 -->
        <div class="grid grid-cols-4 gap-5 mt-2">
          <div v-for="(img, index) in product.photos" :key="img">
            <button type="button" @click.prevent="imgChange(index)">
              <img class="w-[150px] h-[100px] rounded-[10px]" :src="img" alt="商品圖" />
            </button>
          </div>
        </div>
      </div>

      <!-- 商品資訊 -->
      <div class="w-[420px] m-auto">
        <p class="mt-10 text-5xl font-bold">{{ product.name }}</p>
        <p class="my-4 text-2xl text-secondary">{{ product.description }}</p>
        <div class="flex justify-between mt-10 px-2 text-2xl">
          <p>庫存量： {{ product.quantity }} {{ product.unit }}</p>
          <div>
            <p v-if="!product.price">${{ product.originPrice }}</p>
            <p v-else>
              <del>${{ product.originPrice }}</del> / ${{ product.price }}
            </p>
          </div>
        </div>
        <div class="flex justify-around mt-10">
          <button
            class="btn w-[168px] h-[48px] rounded-md border-font border-2 hover:opacity-80 hover:-translate-y-1"
            @click.prevent="cartHandler.addToCart(product._id)"
          >
            <p class="font-semibold">加入購物車</p>
            <img src="../assets/ecommerce/shopping-cart.svg" alt="shopping-cart" />
          </button>
          <button
            class="btn w-[168px] h-[48px] rounded-md border-font border-2 hover:opacity-80 hover:-translate-y-1"
            @click.prevent="directToCartPage(product._id)"
          >
            <p class="font-semibold">直接購買</p>
            <img src="../assets/ecommerce/shopping-bag.svg" alt="shopping-cart" />
          </button>
        </div>
      </div>
    </div>

    <!-- 推薦商品 -->
    <p class="mx-6 text-2xl font-bold">你也許也會喜歡...</p>
    <div class="flex">
      <div class="w-[300px] m-6" v-for="product in products" :key="product._id">
        <button type="button" @click.prevent="renewPage(product._id)">
          <img
            class="w-[300px] h-[160px] rounded-[10px] object-fill"
            :src="product.photos[0]"
            alt="推薦商品圖"
          />
        </button>
        <div class="flex justify-between text-2xl">
          <p>{{ product.name }}</p>
          <div>
            <p v-if="!product.price">${{ product.originPrice }}</p>
            <p v-else>
              <del>${{ product.originPrice }}</del> / ${{ product.price }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品評論 -->
    <p class="mx-6 text-2xl font-bold">商品評論</p>
    <div class="m-6 grid place-content-center">
      <div class="w-[1060px] m-6 flex" v-for="review in productReview" :key="review.username">
        <div class="w-2/12">
          <img
            class="w-[150px] h-[150px] rounded-full object-fill"
            src="https://picsum.photos/id/235/200/300"
            alt=""
          />
        </div>
        <div class="w-10/12">
          <div class="flex m-4">
            <p>{{ review.username }}</p>
            <p class="mx-2">於{{ review.createAt }}評價</p>
            <div class="rating mx-2">
              <input
                type="radio"
                class="mask mask-star-2 bg-yellow-400"
                :checked="index === review.score"
                v-for="index in 5"
                :key="index"
              />
            </div>
          </div>
          <textarea
            class="w-10/12 p-4 border rounded-[10px] resize-none outline-none"
            v-model="review.content"
            readonly
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
