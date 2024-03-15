<script setup>
import { ref, onMounted } from 'vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { get_orders_api } from '@/api/ecommerceAdmin'
import { useRouter } from 'vue-router'

const orders = ref([])
const orderId = ref('')
const account = ref('')
const status = ref('1')
const pagination = ref({
  totalPage: 1,
  nowPage: 1
})

const changePage = (page) => {
  pagination.value.nowPage = page
  searchOrders()
}
const resetSearch = () => {
  orderId.value = ''
  account.value = ''
  status.value = '1'
  pagination.value.nowPage = 1
  searchOrders()
}

const searchOrders = async () => {
  const params = {
    page: pagination.value.nowPage,
    orderId: orderId.value || null,
    recipient: account.value || null,
    status: status.value
  }
  const { data } = await get_orders_api(params)
  if (data.message === '查無相關訂單') {
    orders.value = []
    pagination.value.totalPage = 0
  } else {
    orders.value = convert(data.data.orders)
    pagination.value.totalPage = data.pagination
  }
}

const convert = (ordersList) => {
  return ordersList.map((order) => {
    // 時間取年月日
    const createAt = order.createdAt
    order.createdAt = createAt.slice(0, 10)

    // 訂單狀態
    switch (order.status) {
      case 'unPaid':
        order.status = '未付款'
        break
      case 'hasPaid':
        order.status = '已付款'
        break
      case 'done':
        order.status = '已完成'
        break
      case 'cancel':
        order.status = '已取消'
        break
    }
    return order
  })
}

const router = useRouter()
const directToOrderPage = (orderId) => {
  router.push({ name: 'adminorder', query: { orderId } })
}

onMounted(() => {
  searchOrders()
})
</script>
<template>
  <div class="ml-10 mt-10 col-span-10 text-font">
    <div>
      <!-- 頁面標題 -->
      <h1 class="text-5xl font-bold">訂單管理</h1>

      <!-- 搜尋、分類區塊 -->
      <div class="flex space-x-2 mt-4">
        <div class="flex items-center">
          <label for="orderId" class="mr-1 text-xl">訂單編號</label>
          <div class="relative">
            <input
              type="text"
              id="orderId"
              name="orderId"
              class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
              placeholder="請輸入訂單編號"
              v-model="orderId"
            />
          </div>
        </div>
        <div class="flex items-center">
          <label for="account" class="mx-1 text-xl">訂購人帳號</label>
          <div class="relative">
            <input
              type="text"
              id="account"
              name="account"
              class="max-w-[160px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
              placeholder="請輸入訂購人帳號"
              v-model="account"
            />
          </div>
        </div>
        <div class="flex items-center">
          <label for="status" class="mx-1 text-xl">訂單狀態</label>
          <select
            id="status"
            class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
            v-model="status"
          >
            <option value="0" disabled>請選擇訂單狀態</option>
            <option value="1">未付款</option>
            <option value="2">已付款</option>
            <option value="3">已完成</option>
            <option value="4">已取消</option>
          </select>
        </div>
      </div>
      <div class="flex space-x-2 justify-end">
        <button class="btn btn-sm mt-4" @click="resetSearch">清除</button>
        <button class="btn btn-sm mt-4" @click="searchOrders">搜尋</button>
      </div>

      <!-- 訂單列表 -->
      <div class="mt-4 overflow-x-auto">
        <table class="table">
          <thead class="h-[60px] bg-third text-xl">
            <th class="rounded-l-[10px]">訂單編號</th>
            <th>下單日期</th>
            <th>訂單金額</th>
            <th>訂購人帳號</th>
            <th>狀態</th>
            <th class="rounded-r-[10px]">操作</th>
          </thead>
          <tbody class="rounded-[10px] shadow">
            <tr v-for="order in orders" :key="order._id">
              <td># {{ order.orderId }}</td>
              <td>{{ order.createdAt }}</td>
              <td class="text-center">
                $ {{ order.finalPrice !== 0 ? order.finalPrice : order.totalPrice }}
              </td>
              <td>{{ order.recipient.email }}</td>
              <td class="text-center">
                <p>{{ order.status }}</p>
              </td>
              <td>
                <div
                  class="button-group flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2"
                >
                  <button
                    class="btn btn-sm bg-gray-200 border-0 hover:bg-gray-300"
                    @click="directToOrderPage(order._id)"
                  >
                    查看詳情
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PaginationComponent
        :totalPage="pagination.totalPage"
        :nowPage="pagination.nowPage"
        @changePage="changePage"
      ></PaginationComponent>
    </div>
  </div>
</template>
<style scoped></style>
