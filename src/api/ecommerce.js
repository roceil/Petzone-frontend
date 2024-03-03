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
    return await axios
      .post(`${VITE_API_BASE_URL}/api/order`, neworder)
      .then((res) => {
        console.log(res.data)
      })
      .catch(() => {})
  } catch (error) {
    console.error(error)
  }
}
