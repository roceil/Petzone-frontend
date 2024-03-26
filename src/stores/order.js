import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAlertStore } from '@/stores/alert'
import { post_new_order_api } from '@/api/ecommerce'
import { get_order_by_id_api } from '@/api/ecommerce'

export const orderStore = defineStore('orderStore', () => {
  // 加入千分位
  const addThousandSeparator = (num, separator = ',') => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  }

  const alertStore = useAlertStore()
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
    const data = await post_new_order_api(neworder)
    if (data.message === '訂單新增成功') {
      alertStore.openAlert('success', data.message)
      return data
    }
  }

  // 取得訂單資料
  const GetOrder = async (orderId) => {
    const { data } = await get_order_by_id_api(orderId)
    order.value = data.order
    order.value.totalPrice = addThousandSeparator(order.value.totalPrice)
    if (order.value.finalPrice) {
      order.value.finalPrice = addThousandSeparator(order.value.finalPrice)
    }
    order.value.createdAt = order.value.createdAt.slice(0, 10)
    order.value.updatedAt = order.value.updatedAt.slice(0, 10)
  }

  return { order, addOrder, GetOrder }
})
