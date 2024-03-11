<script setup>
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import MemberCenterDetail from '@/containers/layouts/MemberCenterDetail.vue'
import { get_order_by_user_api } from '@/api/order.js'
import { useUserStore } from '@/stores/user'

const order_history_status_buttons = ['未付款', '已付款', '已完成', '已取消']

const button_status = ref('未付款')

const button_border_position = computed(() => {
  if (button_status.value === '未付款') {
    return 'translate-x-[99px]'
  } else if (button_status.value === '已付款') {
    return 'translate-x-[351px]'
  } else if (button_status.value === '已完成') {
    return 'translate-x-[602px]'
  } else if (button_status.value === '已取消') {
    return 'translate-x-[854px]'
  }

  return 'translate-x-[99px]'
})

const change_button_status = (status) => {
  console.log(status)
  button_status.value = status
}

const table_title = ['訂單編號', '下單日期', '購買項目', '訂單金額']

const userStore = useUserStore()
const userId = userStore.userId

// 所有訂單
const allOrders = ref([])

// 取得所有訂單
const getOrders = async () => {
  const res = await get_order_by_user_api(userId)
  console.log(res.orders)
  allOrders.value = res.orders.reverse()
}

// 判斷要顯示哪種狀態的訂單
const showOrders = computed(() => {
  if (button_status.value === '未付款') {
    console.log(1)
    const filterOrders = allOrders.value.filter((order) => order.status === 'unPaid')
    return filterOrders
  } else if (button_status.value === '已付款') {
    console.log(2)
    const filterOrders = allOrders.value.filter((order) => order.status === 'hasPaid')
    return filterOrders
  } else if (button_status.value === '已完成') {
    console.log(3)
    const filterOrders = allOrders.value.filter((order) => order.status === 'done')
    return filterOrders
  } else if (button_status.value === '已取消') {
    console.log(3)
    const filterOrders = allOrders.value.filter((order) => order.status === 'cancel')
    return filterOrders
  }

  return allOrders.value
})

// 格式化日期的方法
const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

// 整理金額格式
const formatPrice = (price) => {
  return price.toLocaleString()
}

getOrders()
</script>

<template>
  <div class="OrderHistoryView">
    <MemberCenterDetail title="購買訂單">
      <div class="flex justify-center items-center mt-6">
        <div class="min-w-[1090px]">
          <!-- 按鈕 -->
          <ul class="flex justify-between px-[100px] border-b border-font relative">
            <li v-for="status in order_history_status_buttons" :key="status">
              <button
                class="text-2xl text-font font-bold w-[135px]"
                @click="change_button_status(status)"
              >
                {{ status }}
              </button>
            </li>

            <li
              class="absolute w-[137px] h-2 bg-font -bottom-2 left-0 transition-transform duration-500 ease-in-out"
              :class="button_border_position"
            ></li>
          </ul>

          <!-- 表格標題 -->
          <ul
            class="w-full h-[60px] bg-third mt-5 rounded-[10px] flex text-font text-xl items-center space-x-[240px] px-7"
          >
            <li v-for="title in table_title" :key="title">{{ title }}</li>
          </ul>

          <!-- 表格內容 -->
          <ul
            class="w-full h-[395px] rounded-[10px] px-7 py-6 border border-input_font custom-shadow overflow-y-scroll"
          >
            <template v-if="showOrders.length > 0">
              <li
                class="flex items-center py-[26px] text-font text-xl justify-between"
                v-for="order in showOrders"
                :key="order._id"
              >
                <!-- 訂單編號 -->
                <div class="mr-[118px]">
                  <RouterLink
                    :to="`/ecommerce/order/${order._id}`"
                    class="text-secondary font-semibold px-[30px] py-[9px] text-base hover:text-third"
                  >
                    # {{ order.orderId }}
                  </RouterLink>
                </div>
                <!-- 下單日期 -->
                <div class="mr-[120px]">
                  <p>{{ formatDate(order.createdAt) }}</p>
                </div>

                <!-- 購買項目 -->
                <div class="mr-[125px]">
                  <div class="w-[100px] h-[100px] bg-slate-300 rounded-[10px] overflow-hidden">
                    <img
                      :src="order.products[0].photos[0]"
                      :alt="order.products[0].name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <!-- 訂單金額 -->
                <div class="">
                  <p>
                    NT$ {{ formatPrice(order.finalPrice ? order.finalPrice : order.totalPrice) }}
                  </p>
                </div>
              </li>
            </template>

            <template v-else>
              <li class="flex justify-center items-center h-full w-full">
                <p class="text-font font-semibold text-3xl">目前尚無訂單資訊</p>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </MemberCenterDetail>
  </div>
</template>
