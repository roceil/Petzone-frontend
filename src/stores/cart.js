import { ref } from 'vue'
import { defineStore } from 'pinia'
import { productStore } from '@/stores/product'

export const cartStore = defineStore('cartStore', () => {
  const cartList = ref([])
  const totalPrice = ref(0)
  const finalPrice = ref(0)

  const addToCart = (productId, qty = 1) => {
    const { products } = productStore()

    if (cartList.value.length === 0) {
      products.forEach((item) => {
        if (item._id === productId) {
          cartList.value.push({ ...item, qty })
        }
      })
    } else {
      const existItem = cartList.value.find((item) => {
        return item._id === productId
      })
      // console.log(existItem)
      if (existItem) {
        existItem.qty += 1
      } else {
        const newItem = products.find((product) => {
          return product._id === productId
        })
        cartList.value.push({ ...newItem, qty })
      }
    }
    // console.log(cartList.value)
  }

  return { cartList, totalPrice, finalPrice, addToCart }
})
