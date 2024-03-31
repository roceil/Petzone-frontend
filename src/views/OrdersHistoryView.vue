<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import MemberCenterDetail from '@/containers/layouts/MemberCenterDetail.vue'
import { get_order_by_user_api } from '@/api/order.js'
import { useUserStore } from '@/stores/user'

const order_history_status_buttons = ['未付款', '已付款', '已完成', '已取消']

const button_status = ref('未付款')

const table_title = ['訂單編號', '下單日期', '購買項目', '訂單金額']

const userStore = useUserStore()
const userId = userStore.userId

// 所有訂單
const allOrders = ref([])

// 取得所有訂單
const getOrders = async () => {
  const res = await get_order_by_user_api(userId)
  allOrders.value = res.orders.reverse()
}

// 判斷要顯示哪種狀態的訂單
const showOrders = computed(() => {
  if (button_status.value === '未付款') {
    const filterOrders = allOrders.value.filter((order) => order.status === 'unPaid')
    return filterOrders
  } else if (button_status.value === '已付款') {
    const filterOrders = allOrders.value.filter((order) => order.status === 'hasPaid')
    return filterOrders
  } else if (button_status.value === '已完成') {
    const filterOrders = allOrders.value.filter((order) => order.status === 'done')
    return filterOrders
  } else if (button_status.value === '已取消') {
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

const selectedIndex = ref(0)
const buttonBorderStyle = ref({})
const buttonsRefs = ref([]) // 用於存儲按鈕的refs

// 監聽selectedIndex的變化
watch(selectedIndex, (newIndex) => {
  const selectedButton = buttonsRefs.value[newIndex]
  if (selectedButton) {
    buttonBorderStyle.value = {
      width: `${selectedButton.offsetWidth}px`,
      transform: `translateX(${selectedButton.offsetLeft}px)`
    }
  }
})

const change_button_status = (status, index) => {
  selectedIndex.value = index
  button_status.value = status
}

const setButtonRef = (el, index) => {
  // 確保 refs 數組與按鈕列表大小一致
  buttonsRefs.value[index] = el
}

// 在組件掛載後設置初始底線樣式
onMounted(() => {
  if (buttonsRefs.value.length > selectedIndex.value) {
    const selectedButton = buttonsRefs.value[selectedIndex.value]
    buttonBorderStyle.value = {
      width: `${selectedButton.offsetWidth}px`,
      transform: `translateX(${selectedButton.offsetLeft}px)`
    }
  }
})

// 重新计算装饰线样式的方法
const recalculateButtonBorderStyle = () => {
  const selectedButton = buttonsRefs.value[selectedIndex.value]
  if (selectedButton) {
    buttonBorderStyle.value = {
      width: `${selectedButton.offsetWidth}px`,
      transform: `translateX(${selectedButton.offsetLeft}px)`
    }
  }
}

// 在组件挂载时设置和监听resize事件
onMounted(() => {
  recalculateButtonBorderStyle() // 初始设置
  window.addEventListener('resize', recalculateButtonBorderStyle)
})

// 在组件卸载时移除resize事件监听
onUnmounted(() => {
  window.removeEventListener('resize', recalculateButtonBorderStyle)
})
</script>

<template>
  <div class="OrderHistoryView">
    <MemberCenterDetail title="購買訂單">
      <div class="flex justify-center items-center mt-10 w-full">
        <div class="w-full">
          <!-- 按鈕 -->
          <ul class="flex justify-between border-b border-font relative">
            <li
              v-for="(status, index) in order_history_status_buttons"
              :key="status"
              class="w-1/4 flex justify-center"
            >
              <button
                type="button"
                :ref="(el) => setButtonRef(el, index)"
                class="text-base md:text-2xl text-font font-bold w-full"
                @click="change_button_status(status, index)"
              >
                {{ status }}
              </button>
            </li>

            <li
              class="absolute h-2 bg-font -bottom-2 transition-transform duration-500 ease-in-out"
              :style="buttonBorderStyle"
            ></li>
          </ul>

          <!-- 表格標題 -->
          <ul
            class="w-full h-[60px] bg-third mt-5 rounded-[10px] flex text-font text-xs md:text-xl items-center"
          >
            <li v-for="title in table_title" :key="title" class="w-1/4 text-center">{{ title }}</li>
          </ul>

          <!-- 表格內容 -->
          <ul
            class="w-full h-[395px] rounded-[10px] py-6 border border-input_font custom-shadow overflow-y-scroll"
          >
            <template v-if="showOrders.length > 0">
              <li
                class="flex items-center py-[26px] text-font text-xs md:text-xl text-center"
                v-for="order in showOrders"
                :key="order._id"
              >
                <!-- 訂單編號 -->
                <div class="w-1/4">
                  <RouterLink
                    :to="`/ecommerce/order/${order._id}`"
                    class="text-secondary font-semibold text-xs md:text-base hover:text-third w-full block duration-300 ease-in-out"
                  >
                    # {{ order.orderId }}
                  </RouterLink>
                </div>
                <!-- 下單日期 -->
                <div class="w-1/4">
                  <p>{{ formatDate(order.createdAt) }}</p>
                </div>

                <!-- 購買項目 -->
                <div class="w-1/4 flex justify-center">
                  <div
                    class="w-[50px] h-[50px] md:w-[100px] md:h-[100px] bg-slate-300 rounded-[10px] overflow-hidden"
                  >
                    <img
                      :src="order.products[0].photos[0]"
                      :alt="order.products[0].name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <!-- 訂單金額 -->
                <div class="w-1/4">
                  <p>
                    NT$ {{ formatPrice(order.finalPrice ? order.finalPrice : order.totalPrice) }}
                  </p>
                </div>
              </li>
            </template>

            <template v-else>
              <li class="flex justify-center items-center h-full w-full">
                <p class="text-font font-semibold text-base md:text-3xl">目前尚無訂單資訊</p>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </MemberCenterDetail>
  </div>
</template>
