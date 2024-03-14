<script setup>
import { ref, onMounted } from 'vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { get_orders_api } from '@/api/ecommerceAdmin'

const orders = ref([])
const orderId = ref()
const account = ref()
const status = ref('0')
const pagination = ref(1)
const view = ref('orders')

const searchOrders = async (query) => {
  if (query === 'orderId') {
    const queryValue = orderId.value.value
    const { data } = await get_orders_api(query, queryValue)
    if (data.message === '查無相關訂單') {
      orders.value = []
      pagination.value = 0
    } else {
      orders.value = convert(data.data.orders)
      pagination.value = data.pagination
    }
  } else if (query === 'recipient') {
    const query = 'recipient.email'
    const queryValue = account.value.value
    const { data } = await get_orders_api(query, queryValue)
    if (data.message === '查無相關訂單') {
      orders.value = []
      pagination.value = 0
    } else {
      orders.value = convert(data.data.orders)
      pagination.value = data.pagination
    }
  }
}

const filterOrders = async (query, queryValue) => {
  if (query === 'status') {
    const { data } = await get_orders_api(query, status.value[0])
    if (data.message === '查無相關訂單') {
      orders.value = []
      pagination.value = 0
    } else {
      orders.value = convert(data.data.orders)
      pagination.value = data.pagination
    }
  } else {
    const { data } = await get_orders_api('page', queryValue)
    orders.value = convert(data.data.orders)
    pagination.value = data.pagination
  }
}

const convert = (ordersList) => {
  return ordersList.map((order) => {
    // 時間取年月日
    const createAt = order.createdAt
    const updatedAt = order.updatedAt
    order.createdAt = createAt.slice(0, 10)
    order.updatedAt = updatedAt.slice(0, 10)

    // 付款方式
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

onMounted(async () => {
  const { data } = await get_orders_api('page', 1)
  // console.log(data)
  orders.value = convert(data.data.orders)
  pagination.value = data.pagination
})
</script>
<template>
  <div class="ml-10 mt-10 flex justify-center col-span-10 text-font">
    <div>
      <!-- 頁面標題 -->
      <h1 class="text-5xl font-bold">訂單管理</h1>

      <!-- 搜尋、分類區塊 -->
      <div class="flex justify-center mt-4">
        <div class="flex items-center">
          <label for="orderId" class="mr-1 text-xl">訂單編號</label>
          <div class="relative">
            <input
              type="text"
              id="orderId"
              name="orderId"
              class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
              placeholder="請輸入訂單編號"
              ref="orderId"
            />
            <button
              class="absolute inset-y-0 right-0 mr-2 top-0 mt-1"
              @click.prevent="searchOrders('orderId')"
            >
              <img src="../../assets/search.svg" alt="search" />
            </button>
          </div>
        </div>
        <div class="flex items-center">
          <label for="account" class="mx-1 text-xl">訂購人帳號</label>
          <div class="relative">
            <input
              type="text"
              id="account"
              name="account"
              class="max-w-[170px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
              placeholder="請輸入訂購人帳號"
              ref="account"
            />
            <button
              class="absolute inset-y-0 right-0 mr-2 top-0 mt-1"
              @click.prevent="searchOrders('recipient')"
            >
              <img src="../../assets/search.svg" alt="search" />
            </button>
          </div>
        </div>
        <div class="flex items-center">
          <label for="isEnabled" class="mx-1 text-xl">訂單狀態</label>
          <select
            id="isEnabled"
            class="max-w-[150px] h-[48px] py-1.5 pl-2 border rounded-md border-font focus:outline-none"
            v-model="status"
            @change="filterOrders('status')"
          >
            <option value="0" disabled>請選擇訂單狀態</option>
            <option value="1">未付款</option>
            <option value="2">已付款</option>
            <option value="3">已完成</option>
            <option value="4">已取消</option>
          </select>
        </div>
      </div>

      <!-- 訂單列表 -->
      <div class="flex justify-center mt-4">
        <table>
          <thead class="h-[60px] bg-third text-xl">
            <th class="max-w-[200px] rounded-l-[10px] text-left px-4">訂單編號</th>
            <th class="max-w-[150px] text-left px-4">下單日期</th>
            <th class="max-w-[150px] text-left px-4">訂單金額</th>
            <th class="max-w-[150px] text-left px-4">訂購人帳號</th>
            <th class="max-w-[80px] text-left px-4">狀態</th>
            <th class="max-w-[100px] rounded-r-[10px] text-left px-4">操作</th>
          </thead>
          <tbody class="rounded-[10px] shadow">
            <tr v-for="order in orders" :key="order._id">
              <td class="p-1"># {{ order.orderId }}</td>
              <td>{{ order.createdAt }}</td>
              <td class="text-center">
                $ {{ order.finalPrice !== 0 ? order.finalPrice : order.totalPrice }}
              </td>
              <td>{{ order.recipient.email }}</td>
              <td class="text-center">
                <p>{{ order.status }}</p>
              </td>
              <td colspan="2">
                <div class="my-1 button-group">
                  <button
                    class="mr-3 btn bg-gray-200 border-0 p-0 hover:bg-gray-300"
                    @click.prevent="directToProductPage(product._id, 'check')"
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
        :view="view"
        :pagination="pagination"
        :filterOrders="filterOrders"
      ></PaginationComponent>
    </div>
  </div>
</template>
<style scoped></style>
