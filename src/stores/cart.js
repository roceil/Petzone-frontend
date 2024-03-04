import { ref } from 'vue'
import { defineStore } from 'pinia'
import { productStore } from '@/stores/product'
import { useUserStore } from '@/stores/user'
import { post_cart_api } from '@/api/ecommerce'
import { get_cart_api } from '@/api/ecommerce'

export const cartStore = defineStore('cartStore', () => {
  const cartList = ref([])
  const totalPrice = ref(0)
  const finalPrice = ref(0)

  // 加入購物車
  const addToCart = (productId, qty = 1) => {
    const { products } = productStore()
    const { userId } = useUserStore()
    // console.log(userId)

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
    if (userId != '') {
      const cart = cartList.value.map((item) => {
        return { productId: item._id, qty: item.qty }
      })
      // console.log(cart)
      post_cart_api(userId, cart)
    }
  }

  // 刪除購物車
  const deleteFromCart = (productId) => {
    const itemIndex = cartList.value.findIndex((item) => {
      return item._id === productId
    })
    cartList.value.splice(itemIndex, 1)
  }

  // 取得會員購物車
  const getCart = async () => {
    const { userId } = useUserStore()
    const cart = await get_cart_api(userId)

    console.log(cart)
  }

  return { cartList, totalPrice, finalPrice, addToCart, deleteFromCart, getCart }
})
