import { ref } from 'vue'
import { defineStore } from 'pinia'
import { get_products_api } from '@/api/ecommerce'
import { get_products_by_type_api } from '@/api/ecommerce'
import { get_products_by_name_api } from '@/api/ecommerce'
import { get_product_by_id_api } from '@/api/ecommerce'

export const productStore = defineStore('productStore', () => {
  const products = ref([])
  const categoryType = ref('')
  const productName = ref('')
  const product = ref({})

  // 取得所有產品資料
  const userGetProducts = async (search) => {
    if (!search) {
      const { data } = await get_products_api()
      // console.log(data)
      products.value = data.products
    } else if (Object.keys(search)[0] === 'categoryType') {
      // console.log(search.categoryType)
      const categoryType = search.categoryType
      const { data } = await get_products_by_type_api(categoryType)
      // console.log(data)
      products.value = data.products
    } else if (search === 'name') {
      const { data } = await get_products_by_name_api(productName)
      // console.log(data)
      products.value = data.products
    }
  }

  // 取得單一產品資料
  const userGetProduct = async (productId) => {
    const { data } = await get_product_by_id_api(productId)
    // console.log(data)
    product.value = data.product
  }

  return { products, categoryType, productName, product, userGetProducts, userGetProduct }
})
