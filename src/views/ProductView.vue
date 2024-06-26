<script setup>
import { ref, watch, onMounted } from 'vue'
import { productStore } from '@/stores/product'
import { cartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { update_product_review_api, delete_product_review_api } from '@/api/ecommerce'
import { useAlertStore } from '@/stores/alert'

const alertStore = useAlertStore()
const route = useRoute()
const router = useRouter()

const productHandler = productStore()
const { product, products, productReviews } = storeToRefs(productHandler)

const cartHandler = cartStore()

const userStore = useUserStore()
const { userId } = storeToRefs(userStore)

// 商品圖片切換
const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

// 取得四樣推薦商品
const recommendProduct = ref([])
const getRecommendProduct = () => {
  const tempProduct = products.value
  recommendProduct.value = tempProduct.slice(0, 4)
}

// 點擊推薦商品商品資料更新
const productId = ref('')
watch(productId, async (newId) => {
  router.push({ name: 'product', query: { productId: newId } })
  await productHandler.userGetProduct(newId)
  await productHandler.getProductReviews(productId.value)
})

// watch(userId, async (newUserId) => {
//   productHandler.CurrentUserReviewOnTop(newUserId)
// })

// 將商品加入購物車並導向購物車頁面
const directToCartPage = (productId) => {
  cartHandler.addToCart(productId)
  router.push({
    name: 'cart'
  })
}

// 編輯、刪除目前登入會員自己的評論
const editMode = ref(false)
const updateReview = async (score, content) => {
  const newReview = { score, content }
  const message = await update_product_review_api(productId.value, userId.value, newReview)
  alertStore.openAlert('success', message.message)
  editMode.value = false
}

const deleteReview = async () => {
  const message = await delete_product_review_api(productId.value, userId.value)
  alertStore.openAlert('success', message.message)
  productHandler.getProductReviews(productId.value)
}

onMounted(() => {
  productId.value = route.query.productId
  productHandler.userGetProduct(productId.value)
  getRecommendProduct()
  productHandler.getProductReviews(productId.value)
})
</script>

<template>
  <div class="container mt-10 mb-20 text-font">
    <div class="md:flex md:flex-nowrap">
      <!-- 商品圖片 -->
      <div class="md:mt-10 md:w-6/12 md:mr-10">
        <Swiper
          class="w-full rounded-[10px] overflow-hidden"
          :navigation="true"
          :spaceBetween="10"
          :thumbs="{ swiper: thumbsSwiper }"
          :modules="[FreeMode, Navigation, Thumbs]"
        >
          <SwiperSlide v-for="img in product.photos" :key="img">
            <div class="rounded-[10px] bg-third group overflow-hidden">
              <img class="w-full object-cover" :src="img" alt="商品圖" />
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
        >
          <swiper-slide v-for="img in product.photos" :key="img"
            ><img class="rounded-[10px] cursor-pointer object-cover" :src="img" alt="商品圖"
          /></swiper-slide>
        </swiper>
      </div>

      <!-- 商品資訊 -->
      <div class="md:w-6/12">
        <p class="mt-6 text-xl font-bold md:mt-10 md:text-5xl">{{ product.name }}</p>
        <p class="mt-3 text-xs text-secondary md:mt-10 md:text-xl">{{ product.description }}</p>
        <div class="flex justify-between mt-3 text-xs md:mt-10 md:text-2xl">
          <p>庫存量： {{ product.quantity }} {{ product.unit }}</p>
          <div>
            <p v-if="!product.price">${{ product.originPrice }}</p>
            <p v-else>
              <del>${{ product.originPrice }}</del> / ${{ product.price }}
            </p>
          </div>
        </div>

        <!-- 按鈕區塊 -->
        <div class="hidden md:flex md:justify-between md:mt-20">
          <button
            type="button"
            class="btn w-[45%] h-[48px] rounded-md border-font border-2"
            @click.prevent="cartHandler.addToCart(product._id)"
          >
            <p class="font-semibold">加入購物車</p>
            <img src="../assets/ecommerce/shopping-cart.svg" alt="shopping-cart" />
          </button>
          <button
            type="button"
            class="btn w-[45%] h-[48px] rounded-md text-white bg-secondary border-2 hover:bg-font"
            @click.prevent="directToCartPage(product._id)"
          >
            <p class="font-semibold">直接購買</p>
            <img src="../assets/ecommerce/shopping-bag.svg" alt="shopping-cart" />
          </button>
        </div>
      </div>
    </div>

    <!-- 商品評論 -->
    <p class="mt-6 text-xl font-bold md:text-2xl md:mt-10" v-if="productReviews.length !== 0">
      商品評論
    </p>
    <div class="grid justify-items-center md:mx-40">
      <div class="flex md:w-full md:mt-10" v-for="review in productReviews" :key="review">
        <div class="w-[50px] h-[50px] rounded-full md:w-[150px] md:h-[150px]">
          <img
            class="w-[50px] h-[50px] rounded-full object-cover md:w-[150px] md:h-[150px]"
            :src="review.photo"
            alt="會員大頭照"
          />
        </div>
        <div class="relative">
          <div class="flex m-4 text-xs md:text-base">
            <p>{{ review.nickName }}</p>
            <p class="mx-2">於{{ review.createAt }}評價</p>
            <div class="rating mx-2">
              <input
                type="radio"
                class="w-[12px] h-[12px] mask mask-star-2 bg-yellow-400 md:w-[24px] md:h-[24px]"
                :checked="index === review.score"
                v-for="index in 5"
                :key="index"
                :value="index"
                v-model="review.score"
                :disabled="review.userId !== userId || !editMode"
              />
            </div>
          </div>
          <textarea
            class="w-[240px] ml-4 p-4 border rounded-[10px] text-xs resize-none outline-none md:w-[500px] md:text-base xl:w-[800px]"
            v-model="review.content"
            :readonly="review.userId !== userId || !editMode"
            v-if="review.content || editMode"
          ></textarea>
          <div class="hidden md:flex md:absolute md:right-10">
            <button
              type="button"
              class="link m-2"
              @click.prevent="editMode = true"
              v-if="review.userId === userId && !editMode"
            >
              編輯
            </button>
            <button
              type="button"
              class="link m-2"
              @click.prevent="updateReview(review.score, review.content)"
              v-if="review.userId === userId && editMode"
            >
              送出
            </button>
            <button
              type="button"
              class="link m-2"
              @click.prevent="deleteReview"
              v-if="review.userId === userId"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 推薦商品 -->
    <p class="hidden md:block md:font-bold md:text-2xl md:mt-10">你也許也會喜歡...</p>
    <div class="hidden md:flex md:mt-10">
      <div class="max-w-[350px] mr-4" v-for="product in recommendProduct" :key="product._id">
        <button type="button" @click="productId = product._id">
          <img
            class="w-[350px] h-[160px] rounded-[10px] object-cover"
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

    <!-- 手機版按鈕 -->
    <button
      type="button"
      class="btn bg-white fixed bottom-4 left-8 right-8 z-10 max-w-[900px] rounded-md border-font hover:opacity-80 hover:-translate-y-1 md:hidden"
      @click.prevent="cartHandler.addToCart(product._id)"
    >
      <p class="font-semibold">加入購物車</p>
      <img src="../assets/ecommerce/shopping-cart.svg" alt="shopping-cart" />
    </button>
  </div>
</template>
