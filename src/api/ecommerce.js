import axios from 'axios'

const { VITE_API_BASE_URL } = import.meta.env

// 取得所有產品資料
export const get_products_api = async () => {
  try {
    return axios.get(`${VITE_API_BASE_URL}/api/products`)
  } catch (error) {
    console.error(error)
  }
}

// 取得特定分類產品資料
export const get_products_by_type_api = async (categoryType) => {
  try {
    return axios.get(`${VITE_API_BASE_URL}/api/products?category=${categoryType}`)
  } catch (error) {
    console.error(error)
  }
}

// 取得特定名稱產品資料
export const get_products_by_name_api = async (search) => {
  try {
    return axios.get(`${VITE_API_BASE_URL}/api/products?category=${search}`)
  } catch (error) {
    console.error(error)
  }
}

// 取得單一產品資料
export const get_product_by_id_api = async (productId) => {
  try {
    return axios.get(`${VITE_API_BASE_URL}/api/product/${productId}`)
  } catch (error) {
    console.error(error)
  }
}

// 建立訂單
export const post_new_order_api = async (neworder) => {
  try {
    return await axios.post(`${VITE_API_BASE_URL}/api/order`, neworder).then((res) => {
      return res.data
    })
  } catch (error) {
    console.error(error)
  }
}

// 取得單一訂單資料
export const get_order_by_id_api = async (orderId) => {
  try {
    return await axios.get(`${VITE_API_BASE_URL}/api/order/${orderId}`)
  } catch (error) {
    console.error(error)
  }
}

// 購物車資料存入會員資料
export const post_cart_api = async (userId, cart) => {
  try {
    // console.log(userId, cart)
    return await axios.post(`${VITE_API_BASE_URL}/api/cart/${userId}`, cart).then((res) => {
      return res.data
    })
  } catch (error) {
    console.error(error)
  }
}

// 取得會員購物車資料
export const get_cart_api = async (userId) => {
  // console.log(userId)
  try {
    return await axios.get(`${VITE_API_BASE_URL}/api/cart/${userId}`).then((res) => {
      return res.data
    })
  } catch (error) {
    console.error(error)
  }
}

// 更新會員購物車數量
export const update_cart_api = async (userId, cart) => {
  // console.log(userId, cart)
  try {
    return await axios.put(`${VITE_API_BASE_URL}/api/cart/${userId}`, cart).then((res) => {
      console.log(res.data)
    })
  } catch (error) {
    console.error(error)
  }
}
