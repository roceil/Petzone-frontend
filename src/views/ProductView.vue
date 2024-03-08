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
  // console.log(newId)
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
  // console.log(productId.value, userId.value)
  const newReview = { score, content }
  // console.log(newReview)
  const message = await update_product_review_api(productId.value, userId.value, newReview)
  alert(message.message)
  editMode.value = false
}

const deleteReview = async () => {
  const message = await delete_product_review_api(productId.value, userId.value)
  alert(message.message)
  productHandler.getProductReviews(productId.value)
}

onMounted(() => {
  // console.log(route.query.productId, product)
  productId.value = route.query.productId
  productHandler.userGetProduct(productId.value)
  getRecommendProduct()
  productHandler.getProductReviews(productId.value)
})
</script>

<template>
  <div class="container mt-5 text-font">
    <div class="flex flex-nowrap">
      <!-- 商品圖片 -->
      <div class="w-6/12 m-10">
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
            ><img class="rounded-[10px] cursor-pointer" :src="img"
          /></swiper-slide>
        </swiper>
      </div>

      <!-- 商品資訊 -->
      <div class="w-6/12 mt-10">
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

    <!-- 商品評論 -->
    <p class="text-2xl font-bold mt-10 ml-10" v-if="productReviews.length !== 0">商品評論</p>
    <div class="grid justify-items-center ml-10">
      <div class="flex w-[1024px] mt-10" v-for="review in productReviews" :key="review">
        <div class="w-2/12">
          <img
            class="w-[150px] h-[150px] rounded-full object-fill"
            :src="review.photo"
            alt="會員大頭照"
          />
        </div>
        <div class="w-10/12 relative">
          <div class="flex m-4">
            <p>{{ review.nickName }}</p>
            <p class="mx-2">於{{ review.createAt }}評價</p>
            <div class="rating mx-2">
              <input
                type="radio"
                class="mask mask-star-2 bg-yellow-400"
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
            class="w-10/12 p-4 border rounded-[10px] resize-none outline-none"
            v-model="review.content"
            :readonly="review.userId !== userId || !editMode"
            v-if="review.content || editMode"
          ></textarea>
          <div class="flex absolute right-36">
            <button
              class="link m-2"
              @click.prevent="editMode = true"
              v-if="review.userId === userId && !editMode"
            >
              編輯
            </button>
            <button
              class="link m-2"
              @click.prevent="updateReview(review.score, review.content)"
              v-if="review.userId === userId && editMode"
            >
              送出
            </button>
            <button class="link m-2" @click.prevent="deleteReview" v-if="review.userId === userId">
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
