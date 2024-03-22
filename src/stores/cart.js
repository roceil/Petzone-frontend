import { ref } from 'vue'
import { defineStore } from 'pinia'
import { productStore } from '@/stores/product'
import { useUserStore } from '@/stores/user'
import { post_cart_api } from '@/api/ecommerce'
import { get_cart_api } from '@/api/ecommerce'
import { get_product_by_id_api } from '@/api/ecommerce'
import { update_cart_api } from '@/api/ecommerce'
import { delete_cart_api } from '@/api/ecommerce'

export const cartStore = defineStore('cartStore', () => {
  const cartList = ref([])
  const totalPrice = ref(0)
  const usePoints = ref(0)
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

    // 如為會員同時會存入會員資料
    if (userId !== '' && userId !== undefined) {
      const cart = cartList.value.map((item) => {
        return { productId: item._id, qty: item.qty }
      })
      // console.log(cart)
      post_cart_api(userId, cart)
    }

    caculate()
  }

  // 刪除購物車
  const deleteFromCart = (productId) => {
    const { userId } = useUserStore()

    const itemIndex = cartList.value.findIndex((item) => {
      return item._id === productId
    })
    cartList.value.splice(itemIndex, 1)

    if (userId !== '' && userId !== undefined) {
      delete_cart_api(userId, productId)
    }

    caculate()
  }

  // 取得會員購物車
  const getCart = async () => {
    const { userId } = useUserStore()
    const cart = await get_cart_api(userId)
    // console.log(cart)

    const { products } = productStore()
    const newCart = cart.map(async (item) => {
      let productFound = products.find((product) => {
        // console.log(item.productId, product._id)
        if (item.productId === product._id) {
          return product
        }
      })
      // console.log('productFound', productFound)

      if (productFound !== undefined) {
        const newItem = { ...productFound, qty: item.qty }
        return newItem
      } else {
        const { data } = await get_product_by_id_api(item.productId)
        const newItem = { ...data.product, qty: item.qty }
        // console.log(newItem)
        return newItem
      }
    })

    const userCartList = await Promise.all(newCart)
    const currentCartList = JSON.parse(JSON.stringify(cartList.value))

    if (currentCartList.length === 0) {
      cartList.value = userCartList
    } else {
      // 目前購物車與會員購物車中找到相同產品並將數量相加整合至會員購物車
      const productList = currentCartList.map((currentProduct) => {
        return userCartList.filter((userProduct) => {
          if (currentProduct._id === userProduct._id) {
            userProduct.qty += currentProduct.qty
          }
          return userProduct
        })
      })
      const sameProductList = productList[0]
      // console.log(sameProductList)

      // 刪除目前購物車中相同產品
      const extraProductList = currentCartList.filter((currentProduct) => {
        const index = sameProductList.findIndex(
          (sameProduct) => sameProduct._id === currentProduct._id
        )
        return index === -1
      })
      // console.log(extraProductList)

      // 整合購物車
      cartList.value = sameProductList.concat(extraProductList)
    }
    caculate()
  }

  // 更新會員購物車
  const updateCart = async (productId, quantity) => {
    const qty = Number(quantity)
    const { userId } = useUserStore()
    const cart = { productId, qty }

    if (userId !== '' && userId !== undefined) {
      update_cart_api(userId, cart)
    }

    caculate()
  }

  // 計算總金額
  const caculate = () => {
    const subTotal = cartList.value.map((item) => {
      // console.log(item)
      if (item.price) {
        return item.price * item.qty
      } else {
        return item.originPrice * item.qty
      }
    })
    totalPrice.value = subTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  }

  return {
    cartList,
    totalPrice,
    usePoints,
    finalPrice,
    addToCart,
    deleteFromCart,
    getCart,
    updateCart,
    caculate
  }
})
