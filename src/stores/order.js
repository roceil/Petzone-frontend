import { defineStore } from 'pinia'
import { cartStore } from '@/stores/cart'
import { post_new_order_api } from '@/api/ecommerce'

export const orderStore = defineStore('orderStore', () => {
  const { cartList } = cartStore()

  // 建立訂單
  const addOrder = async (recipient, paymentType, totalPrice) => {
    const neworder = {
      products: cartList,
      recipient: recipient,
      totalPrice: totalPrice,
      paymentType: paymentType
    }
    // console.log(neworder)
    await post_new_order_api(neworder)
  }

  return { addOrder }
})
