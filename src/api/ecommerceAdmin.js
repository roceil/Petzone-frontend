import axios from 'axios'
import Cookies from 'js-cookie'

const { VITE_API_BASE_URL } = import.meta.env
const config = (params = null) => {
  const config = {
    headers: {
      authorization: `Bearer ${Cookies.get('token')}`
    },
    params
  }
  if (params) {
    config.params = params
  }
  return config
}

// 後台取得所有產品資料
export const get_products_api = async (params) => {
  try {
    return axios.get(`${VITE_API_BASE_URL}/api/products/admin`, config(params))
  } catch (error) {
    console.error(error)
  }
}

// 後台取得單一產品資料
export const get_product_api = async (productId) => {
  try {
    return axios.get(`${VITE_API_BASE_URL}/api/product/admin/${productId}`, config())
  } catch (error) {
    console.error(error)
  }
}

// 後台新增產品
export const post_product_api = async (newProduct) => {
  try {
    return axios.post(`${VITE_API_BASE_URL}/api/product`, newProduct, config())
  } catch (error) {
    console.error(error)
  }
}

// 後台修改產品資料
export const put_product_api = async (productId, product) => {
  try {
    return axios.put(`${VITE_API_BASE_URL}/api/product/${productId}`, product, config())
  } catch (error) {
    console.error(error)
  }
}

// 後台刪除產品評論
export const delete_product_review_api = async (productId, userId) => {
  try {
    return await axios
      .delete(`${VITE_API_BASE_URL}/api/product/admin/review/${productId}/${userId}`, config())
      .then((res) => {
        return res.data
      })
  } catch (error) {
    console.error(error)
  }
}

// 後台取得所有訂單資料
export const get_orders_api = async (params) => {
  try {
    return axios.get(`${VITE_API_BASE_URL}/api/orders`, config(params))
  } catch (error) {
    console.error(error)
  }
}

// 後台修改訂單資料
export const update_order_api = async (orderId, orderInfo) => {
  try {
    return axios.put(`${VITE_API_BASE_URL}/api/order/${orderId}`, orderInfo, config())
  } catch (error) {
    console.error(error)
  }
}

// 後台修改訂單狀態
export const update_order_status_api = async (orderId, status) => {
  try {
    return axios.put(
      `${VITE_API_BASE_URL}/api/order/${orderId}/status`,
      { status: status },
      config()
    )
  } catch (error) {
    console.error(error)
  }
}
