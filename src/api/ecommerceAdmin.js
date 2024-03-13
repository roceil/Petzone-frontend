import axios from 'axios'
import Cookies from 'js-cookie'

const { VITE_API_BASE_URL } = import.meta.env
const config = () => {
  return {
    headers: {
      authorization: `Bearer ${Cookies.get('token')}`
    }
  }
}

// 取得所有產品資料
export const get_products_api = async (query, queryValue) => {
  try {
    return axios.get(`${VITE_API_BASE_URL}/api/products/admin?${query}=${queryValue}`, config())
  } catch (error) {
    console.error(error)
  }
}

// 取得單一產品資料
export const get_product_api = async (productId) => {
  try {
    return axios.get(`${VITE_API_BASE_URL}/api/product/admin/${productId}`, config())
  } catch (error) {
    console.error(error)
  }
}

// 新增產品
export const post_product_api = async (newProduct) => {
  try {
    return axios.post(`${VITE_API_BASE_URL}/api/product`, newProduct, config())
  } catch (error) {
    console.error(error)
  }
}
