<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { orderStore } from '@/stores/order'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import EditReviewModal from '@/components/EditReviewModal.vue'
import { checkout } from '@/api/checkout'
import { useAlertStore } from '@/stores/alert'

const alertStore = useAlertStore()
const route = useRoute()
const router = useRouter()

const orderHandler = orderStore()
const { order } = storeToRefs(orderHandler)

const orderId = route.params.id

const userStore = useUserStore()
const { userId } = storeToRefs(userStore)
const reviewModalRef = ref()

const handlePayment = async (order) => {
  try {
    const url = await checkout(orderId, order)
    window.location.href = url?.url
  } catch (error) {
    console.error(error)
    alertStore.openAlert('error', '付款失敗')
  }
}

onMounted(async () => {
  // console.log(route.params.id)
  await orderHandler.GetOrder(route.params.id)
  // console.log(order.value)
  switch (order.value.status) {
    case 'unPaid':
      order.value.status = '未付款'
      break
    case 'hasPaid':
      order.value.status = '已付款'
      break
    case 'done':
      order.value.status = '已完成'
      break
    case 'cancel':
      order.value.status = '已取消'
      break
  }

  if (order.value.paymentType === 'cash') {
    order.value.paymentType = '現金'
  } else {
    order.value.paymentType = '信用卡'
  }
})
</script>
<template>
  <!-- 頁面標題 -->
  <div class="container mt-10 text-font relative">
    <h1 class="text-xl font-bold md:text-5xl">訂單詳情</h1>
  </div>

  <div class="container w-[360px] m-auto my-10 text-xs text-font md:text-base md:w-[900px]">
    <!-- 訂單編號及狀態 -->
    <p class="text-xs font-bold text-right md:text-xl">訂單狀態：{{ order.status }}</p>
    <div class="grid grid-cols-2">
      <p class="text-xs md:text-xl">訂單編號：# {{ order.orderId }}</p>
      <p class="text-xs text-right md:text-xl">下單日期：{{ order.createdAt }}</p>
    </div>
    <table class="w-[328px] text-font rounded-[10px] shadow md:w-[868px]">
      <!-- 購買明細 -->
      <thead class="h-[60px] bg-third">
        <th colspan="5" class="rounded-[10px] text-base text-center md:text-xl">購買明細</th>
      </thead>
      <tbody>
        <tr>
          <td colspan="5" class="p-3 text-base md:pl-5 md:py-5 md:text-xl">商品明細</td>
        </tr>
        <tr v-for="product in order.products" :key="product._id">
          <td class="md:w-[120px]"></td>
          <td class="py-3 md:py-5">
            <button
              class="link"
              @click="reviewModalRef.showModal(product)"
              v-if="userId && order.status === '已完成'"
            >
              {{ product.name }}
            </button>
            <p v-else>{{ product.name }}</p>
          </td>
          <td class="py-3 md:py-5">
            <p v-if="product.price">NT$ {{ product.price }}</p>
            <p v-else>NT$ {{ product.originPrice }}</p>
          </td>
          <td class="py-3 md:py-5">x {{ product.qty }}</td>
          <td class="text-right pr-5 md:py-5">
            <p v-if="product.price">NT$ {{ product.price * product.qty }}</p>
            <p v-else>NT$ {{ product.originPrice * product.qty }}</p>
          </td>
        </tr>
        <tr>
          <td class="w-[100px]"></td>
          <td class="py-5 border-black border-t-2 text-left" colspan="2">小計</td>
          <td class="px-5 py-5 border-black border-t-2 text-right" colspan="2">
            NT$ {{ order.totalPrice }}
          </td>
        </tr>
        <tr v-if="order.finalPrice !== 0">
          <td colspan="5" class="p-3 text-base md:pl-5 md:py-5 md:text-xl">折抵明細</td>
        </tr>
        <tr v-if="order.couponDiscount != 0">
          <td class="w-[100px]"></td>
          <td class="py-3 md:py-5" colspan="2">優惠券折扣</td>
          <td class="px-5 py-3 md:py-5 text-right" colspan="2">-0</td>
        </tr>
        <tr v-if="order.pointsDiscount != 0">
          <td class="w-[100px]"></td>
          <td class="py-3 border-black border-b-2 md:py-5" colspan="2">會員積分折抵</td>
          <td class="border-black border-b-2 text-right px-5 py-3 md:py-5" colspan="2">
            {{ order.pointsDiscount }}
          </td>
        </tr>
        <tr class="border-b-2">
          <td class="text-base font-bold px-5 py-3 md:py-5 md:text-2xl" colspan="3">訂單金額</td>
          <td class="text-base font-bold text-right px-5 py-3 md:py-5 md:text-2xl" colspan="2">
            NT$ {{ order.finalPrice ? order.finalPrice : order.totalPrice }}
          </td>
        </tr>
      </tbody>

      <!-- 收件人資訊 -->
      <thead class="h-[60px] bg-third">
        <th colspan="5" class="rounded-[10px] text-xl text-center">收件人資訊</th>
      </thead>
      <tbody>
        <tr>
          <td colspan="5" class="pl-5 py-5">姓名：{{ order.recipient.name }}</td>
        </tr>
        <tr>
          <td colspan="5" class="pl-5 py-5">信箱：{{ order.recipient.email }}</td>
        </tr>
        <tr>
          <td colspan="5" class="pl-5 py-5">電話：{{ order.recipient.phone }}</td>
        </tr>
        <tr>
          <td colspan="5" class="pl-5 py-5">地址：{{ order.recipient.address }}</td>
        </tr>
      </tbody>
      <thead class="h-[60px] bg-third">
        <th colspan="5" class="rounded-[10px] text-xl text-center">付款資訊</th>
      </thead>
      <tbody>
        <tr>
          <td colspan="5" class="pl-5 py-5">付款方式：{{ order.paymentType }}</td>
        </tr>
      </tbody>
      <tr>
        <td colspan="5">
          <div class="flex justify-end">
            <button
              type="button"
              class="w-[80px] h-[40px] my-5 bg-third rounded-md text-secondary"
              @click="router.push(`/ecommerce`)"
            >
              返回商店
            </button>
            <button
              type="button"
              @click="handlePayment(order)"
              class="w-[80px] h-[40px] m-5 bg-secondary rounded-md text-primary"
            >
              前往付款
            </button>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <EditReviewModal ref="reviewModalRef" :order-id="orderId"></EditReviewModal>
</template>
