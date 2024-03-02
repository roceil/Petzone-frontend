import axios from 'axios'
import { defineStore } from 'pinia'
import { cartStore } from '@/stores/cart'

const { VITE_API_BASE_URL } = import.meta.env

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
    try {
      await axios
        .post(`${VITE_API_BASE_URL}/api/order`, neworder)
        .then((res) => {
          console.log(res.data)
          cartList.value = []
        })
        .catch(() => {})
    } catch (error) {
      console.error(error)
    }
  }

  return { addOrder }
})
