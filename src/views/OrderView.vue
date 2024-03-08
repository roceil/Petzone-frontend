<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { orderStore } from '@/stores/order'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import EditReviewModal from '@/components/EditReviewModal.vue'
import { checkout } from '@/api/checkout';
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
      console.log(error);
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
  <div class="container">
    <h1 class="mt-10 ml-10 text-font text-5xl font-bold">訂單詳情</h1>
  </div>

  <div class="containter w-[900px] m-auto mb-10 justify-center text-font">
    <!-- 訂單編號及狀態 -->
    <p class="text-xl font-bold text-right">訂單狀態：{{ order.status }}</p>
    <div class="flex">
      <p class="w-1/2 text-xl">訂單編號：# {{ order.orderId }}</p>
      <p class="w-1/2 text-xl text-right">下單日期：{{ order.createdAt }}</p>
    </div>
    <table class="w-[900px] text-font rounded-[10px] shadow">
      <!-- 購買明細 -->
      <thead class="h-[60px] bg-third">
        <th colspan="5" class="rounded-[10px] text-xl text-center">購買明細</th>
      </thead>
      <tbody>
        <tr>
          <td colspan="5" class="pl-5 py-5 text-xl">商品明細</td>
        </tr>
        <tr v-for="product in order.products" :key="product._id">
          <td class="w-[100px]"></td>
          <td class="py-5">
            <button
              class="link"
              @click="reviewModalRef.showModal(product)"
              v-if="userId && order.status === '已完成'"
            >
              {{ product.name }}
            </button>
            <p v-else>{{ product.name }}</p>
          </td>
          <td class="py-5">
            <p v-if="product.price">NT$ {{ product.price }}</p>
            <p v-else>NT$ {{ product.originPrice }}</p>
          </td>
          <td class="py-5">x {{ product.qty }}</td>
          <td class="pr-5 py-5 text-right">
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
          <td colspan="5" class="pl-5 py-5 text-xl">折抵明細</td>
        </tr>
        <tr v-if="order.finalPrice !== 0">
          <td class="w-[100px]"></td>
          <td class="py-5" colspan="2">優惠券折扣</td>
          <td class="px-5 py-5 text-right" colspan="2">-0</td>
        </tr>
        <tr v-if="order.finalPrice !== 0">
          <td class="w-[100px]"></td>
          <td class="py-5 border-black border-b-2" colspan="2">會員積分折抵</td>
          <td class="px-5 py-5 border-black border-b-2 text-right" colspan="2">-0</td>
        </tr>
        <tr class="border-b-2">
          <td class="px-5 py-5 text-2xl font-bold" colspan="3">訂單金額</td>
          <td class="px-5 py-5 text-2xl font-bold text-right" colspan="2">
            NT$ {{ order.totalPrice }}
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
