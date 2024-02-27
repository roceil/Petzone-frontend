import axios from 'axios'
import { ref } from 'vue'
import { defineStore } from 'pinia'

const { VITE_API_BASE_URL } = import.meta.env

export const productStore = defineStore('productStore', () => {
  const products = ref([])
  const categoryType = ref('')
  const productName = ref('')
  const product = ref({})

  // 取得所有產品資料
  const userGetProducts = async (search) => {
    if (!search) {
      try {
        const response = await axios.get(`${VITE_API_BASE_URL}/api/products`)
        products.value = response.data.products
      } catch (error) {
        console.error(error)
      }
    } else if (Object.keys(search)[0] === 'categoryType') {
      try {
        // console.log(search.categoryType)
        const response = await axios.get(
          `${VITE_API_BASE_URL}/api/products?category=${search.categoryType}`
        )
        products.value = response.data.products
      } catch (error) {
        console.error(error)
      }
    } else if (search === 'productName') {
      try {
        // console.log(productName.value)
        const response = await axios.get(
          `${VITE_API_BASE_URL}/api/products?name=${productName.value}`
        )
        products.value = response.data.products
      } catch (error) {
        console.error(error)
      }
    }
  }

  // 取得單一產品資料
  const userGetProduct = async (productId) => {
    // console.log(productId)

    const response = await axios.get(`${VITE_API_BASE_URL}/api/product/${productId}`)
    product.value = response.data.product[0]
  }

  return { products, categoryType, productName, product, userGetProducts, userGetProduct }
})
