<script setup>
import { ref, defineProps } from 'vue'
import { storeToRefs } from 'pinia'
import close from '@/assets/header/close-btn.svg'
import { useUserStore } from '@/stores/user'
import { post_product_review_api } from '@/api/ecommerce'
import {useAlertStore} from '@/stores/alert'

const userStore = useUserStore()
const alertStore = useAlertStore()
const { userId } = storeToRefs(userStore)

const props = defineProps(['orderId'])
const productId = ref('')
const productImg = ref('')
const review = ref({
  userId: '',
  orderId: '',
  score: 5,
  content: '我覺得很棒!'
})

const dialogRef = ref()
const showModal = (product) => {
  // console.log(product)

  productId.value = product._id
  productImg.value = product.photos[0]
  // console.log(userId.value, props.orderId, productId.value, productImg.value)

  review.value.userId = userId.value
  review.value.orderId = props.orderId

  dialogRef.value.showModal()
}
const hideModal = () => {
  dialogRef.value.close()
}
const postReview = async () => {
  const message = await post_product_review_api(productId.value, review.value)
  if (message) {
    alertStore.openAlert('success', message.message)
  }
  hideModal()
}
defineExpose({ showModal })
</script>
<template>
  <dialog ref="dialogRef" class="modal">
    <div class="modal-box relative flex flex-col items-center px-[75px]">
      <!-- 關閉按鈕 -->
      <div class="absolute right-[29px] top-[33px]">
        <button @click="hideModal"><img :src="close" alt="close-btn" /></button>
      </div>

      <!-- 標題 -->
      <h3 class="font-bold text-5xl text-font text-center mt-[46px]">評論商品</h3>

      <!-- 商品首圖 -->
      <img
        class="mt-8 w-full h-[200px] rounded-[10px] object-cover"
        :src="productImg"
        alt="商品圖"
      />

      <!-- 評價分數 -->
      <div class="my-4 w-full rating">
        <input
          type="radio"
          class="mask mask-star-2 bg-yellow-400"
          :value="index"
          v-for="index in 5"
          :key="index"
          :checked="index === review.score"
          v-model="review.score"
        />
      </div>

      <!-- 評論 -->
      <textarea
        class="w-full border rounded-[10px] resize-none p-4 text-font"
        placeholder="請輸入您對該商品的評價"
        v-model="review.content"
      ></textarea>

      <!-- 按鈕 -->
      <div class="my-4 w-full flex justify-end">
        <button
          class="btn bg-secondary hover:bg-font text-white rounded text-base font-normal"
          @click="postReview()"
        >
          發佈
        </button>
      </div>
    </div>
  </dialog>
</template>

