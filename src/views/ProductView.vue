<script setup>
import { ref, onMounted } from 'vue'
import { productStore } from '@/stores/product'
import { cartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

const route = useRoute()
// const router = useRouter()
const productHandler = productStore()
const { product, products } = storeToRefs(productHandler)

const cartHandler = cartStore()

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

// 將商品加入購物車並導向購物車頁面
const router = useRouter()
const directToCartPage = (productId) => {
  cartHandler.addToCart(productId)
  router.push({
    name: 'cart'
  })
}

// 圖片切換
const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

// 產品資料更新
const renewPage = (prodcutId) => {
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
  <div class="container mt-5 text-font">
    <div class="flex flex-nowrap">
      <!-- 商品圖片 -->
      <div class="w-6/12 ml-10">
        <Swiper
          class="w-full rounded-[10px] overflow-hidden"
          :navigation="true"
          :spaceBetween="10"
          :thumbs="{ swiper: thumbsSwiper }"
          :modules="[FreeMode, Navigation, Thumbs]"
        >
          <SwiperSlide v-for="(img, index) in product.photos" :key="img">
            <div class="rounded-[10px] bg-third group overflow-hidden">
              <img class="w-full" :src="img" alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
        <swiper
          class="mt-4"
          @swiper="setThumbsSwiper"
          :spaceBetween="10"
          :slidesPerView="4"
          :freeMode="true"
          :watchSlidesProgress="true"
          :modules="modules"
        >
          <swiper-slide v-for="(img, index) in product.photos" :key="img"
            ><img class="rounded-[10px]" :src="img"
          /></swiper-slide>
        </swiper>
      </div>

      <!-- 商品資訊 -->
      <div class="w-6/12 px-10 mt-10 mr-10">
        <p class="text-5xl font-bold">{{ product.name }}</p>
        <p class="text-2xl text-secondary mt-10">{{ product.description }}</p>
        <div class="flex justify-between mt-10 text-2xl">
          <p>庫存量： {{ product.quantity }} {{ product.unit }}</p>
          <div>
            <p v-if="!product.price">${{ product.originPrice }}</p>
            <p v-else>
              <del>${{ product.originPrice }}</del> / ${{ product.price }}
            </p>
          </div>
        </div>
        <!-- 按鈕區塊 -->
        <div class="flex justify-evenly mt-20">
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
    <p class="text-2xl font-bold mt-10 ml-10">你也許也會喜歡...</p>
    <div class="flex mt-10 ml-10">
      <div class="w-[300px] mr-4" v-for="product in products" :key="product._id">
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
    <p class="text-2xl font-bold mt-10 ml-10">商品評論</p>
    <div class="grid justify-items-center my-10 ml-10">
      <div class="flex w-[1024px] mt-10" v-for="review in productReview" :key="review.username">
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
<style scoped></style>
