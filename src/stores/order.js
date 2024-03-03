import { ref } from 'vue'
import { defineStore } from 'pinia'
import { post_new_order_api } from '@/api/ecommerce'
import { get_order_by_id_api } from '@/api/ecommerce'

export const orderStore = defineStore('orderStore', () => {
  const order = ref({
    recipient: {
      name: '',
      email: '',
      phone: '',
      address: ''
    }
  })

  // 建立訂單
  const addOrder = async (neworder) => {
    // console.log(neworder)
    const message = await post_new_order_api(neworder)
    if (message.message === '訂單新增成功') {
      return message
    } else {
      return '新增訂單失敗'
    }
  }

  // 取得單一產品資料
  const GetOrder = async (orderId) => {
    const { data } = await get_order_by_id_api(orderId)
    // console.log(data)
    order.value = JSON.parse(JSON.stringify(data.order[0]))
    order.value.createdAt = order.value.createdAt.slice(0, 10)
    order.value.updatedAt = order.value.updatedAt.slice(0, 10)
  }

  return { order, addOrder, GetOrder }
})
