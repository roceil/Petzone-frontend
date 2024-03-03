import { defineStore } from 'pinia'
import { cartStore } from '@/stores/cart'
import { post_new_order_api } from '@/api/ecommerce'

export const orderStore = defineStore('orderStore', () => {
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
  return { addOrder }
})
