<script setup>
import { ref, defineProps } from 'vue'
import close from '@/assets/header/close-btn.svg'
import { get_product_reviews_api } from '@/api/ecommerce'
import { delete_product_review_api } from '@/api/ecommerceAdmin'
import { useAlertStore } from '@/stores/alert'

const props = defineProps(['productId'])
const reviews = ref([])
const alertStore = useAlertStore()

const dialogRef = ref()
const showModal = async () => {
  // console.log(props.productId)
  const data = await get_product_reviews_api(props.productId)
  // console.log(data)
  // 時間取年月日
  const reviewData = data.map((review) => {
    const createAt = review.createAt
    const updatedAt = review.updatedAt
    review.createAt = createAt.slice(0, 10)
    review.updatedAt = updatedAt.slice(0, 10)
    return review
  })
  reviews.value = reviewData
  // console.log(reviews.value)
  dialogRef.value.showModal()
}
const hideModal = () => {
  dialogRef.value.close()
}

defineExpose({ showModal })

const deleteReview = async (userId) => {
  const message = await delete_product_review_api(props.productId, userId)
  if (message) {
    alertStore.openAlert('success', message.message)
  }
  hideModal()
}
</script>
<template>
  <dialog ref="dialogRef" class="modal">
    <div class="modal-box flex flex-col items-center relative">
      <!-- 關閉按鈕 -->
      <div class="absolute right-[29px] top-[33px]">
        <button @click="hideModal"><img :src="close" alt="close-btn" /></button>
      </div>

      <!-- 標題 -->
      <h3 class="font-bold text-5xl text-font text-center mt-[46px]">商品評論</h3>

      <!-- 商品評論 -->
      <div class="mt-6">
        <div class="flex relative" v-for="review in reviews" :key="review">
          <!-- 會員資料 -->
          <div class="flex items-center">
            <img
              class="w-[50px] h-[50px] rounded-full object-fill"
              :src="review.photo"
              alt="會員大頭照"
            />
            <p class="w-[80px] leading-[50px]">{{ review.nickName }}</p>
          </div>

          <!-- 會員評論 -->
          <div class="flex flex-col my-3">
            <p>評價分數： {{ review.score }}</p>
            <p class="my-1">{{ review.content }}</p>
            <div class="flex justify-between">
              <p class="text-xs">評價日期：{{ review.createAt }}</p>
              <p class="text-xs">更新日期：{{ review.updatedAt }}</p>
            </div>
          </div>

          <!-- 刪除按鈕 -->
          <button
            type="button"
            class="w-[24px] h-[24px] absolute top-[50%] right-[-30px]"
            @click.prevent="deleteReview(review.userId)"
          >
            <img src="../assets/ecommerce/delete-button.svg" alt="刪除按鈕" />
          </button>
        </div>
      </div>
    </div>
  </dialog>
</template>
