import { ref } from 'vue'
import { defineStore } from 'pinia'
import { productStore } from '@/stores/product'
import { useUserStore } from '@/stores/user'
import { useAlertStore } from '@/stores/alert'
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
  const alertStore = useAlertStore()

  // 加入購物車
  const addToCart = (productId, qty = 1) => {
    const { products } = productStore()
    const { userId } = useUserStore()

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

      if (existItem) {
        existItem.qty += 1
      } else {
        const newItem = products.find((product) => {
          return product._id === productId
        })
        cartList.value.push({ ...newItem, qty })
      }
    }

    const cart = cartList.value.map((item) => {
      return { productId: item._id, qty: item.qty }
    })

    if (userId !== '' && userId !== undefined) {
      // 如為會員存入會員資料
      const cart = cartList.value.map((item) => {
        return { productId: item._id, qty: item.qty }
      })

      post_cart_api(userId, cart)
    } else {
      // 如為訪客存入localStorage
      localStorage.setItem('cart', JSON.stringify(cart))
    }

    alertStore.openAlert('success', '成功加入購物車')
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
      // 會員刪除購物車
      delete_cart_api(userId, productId)
    } else {
      // 訪客刪除購物車
      localStorage.setItem('cart', [])
      const cart = cartList.value.map((item) => {
        return { productId: item._id, qty: item.qty }
      })
      localStorage.setItem('cart', JSON.stringify(cart))
    }

    caculate()
  }

  // 取得購物車
  const getCart = async () => {
    const { userId } = useUserStore()
    if (userId !== '' && userId !== undefined) {
      // 會員取得購物車
      const cart = await get_cart_api(userId)
      const { products } = productStore()
      const newCart = cart.map(async (item) => {
        let productFound = products.find((product) => {
          if (item.productId === product._id) {
            return product
          }
        })

        if (productFound !== undefined) {
          const newItem = { ...productFound, qty: item.qty }
          return newItem
        } else {
          const { data } = await get_product_by_id_api(item.productId)
          const newItem = { ...data.product, qty: item.qty }
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

        // 刪除目前購物車中相同產品
        const extraProductList = currentCartList.filter((currentProduct) => {
          const index = sameProductList.findIndex(
            (sameProduct) => sameProduct._id === currentProduct._id
          )
          return index === -1
        })

        // 整合購物車
        cartList.value = sameProductList.concat(extraProductList)
      }
    } else {
      // 訪客取得購物車
      const cart = JSON.parse(localStorage.getItem('cart'))
      if (cart.length !== 0) {
        const newCart = cart.map(async (item) => {
          const { data } = await get_product_by_id_api(item.productId)
          const newItem = { ...data.product, qty: item.qty }
          return newItem
        })

        const userCartList = await Promise.all(newCart)
        cartList.value = userCartList
      }
    }
    caculate()
  }

  // 更新購物車
  const updateCart = async (productId, quantity) => {
    const qty = Number(quantity)
    const { userId } = useUserStore()
    const cart = { productId, qty }

    if (userId !== '' && userId !== undefined) {
      // 會員更新購物車
      update_cart_api(userId, cart)
    } else {
      // 訪客更新購物車
      localStorage.setItem('cart', [])
      const cart = cartList.value.map((item) => {
        return { productId: item._id, qty: item.qty }
      })
      localStorage.setItem('cart', JSON.stringify(cart))
    }

    caculate()
  }

  // 計算總金額
  const caculate = () => {
    const subTotal = cartList.value.map((item) => {
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
