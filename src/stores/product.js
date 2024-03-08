import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/user'
import { get_products_api } from '@/api/ecommerce'
import { get_products_by_type_api } from '@/api/ecommerce'
import { get_products_by_name_api } from '@/api/ecommerce'
import { get_product_by_id_api } from '@/api/ecommerce'
import { get_product_reviews_api } from '@/api/ecommerce'


export const productStore = defineStore('productStore', () => {
  // 取得所有產品資料
  const products = ref([])
  const categoryType = ref('')
  const productName = ref('')
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

      if (data.message === '查無此商品') {
        // alertStore.openAlert('error', '查無此商品')
        alert('查無此商品')
        return
      }

      products.value = data.products
    }
  }

  // 取得單一產品資料
  const product = ref({})
  const userGetProduct = async (productId) => {
    const { data } = await get_product_by_id_api(productId)
    // console.log(data)
    product.value = data.product
  }

  // 取得商品評論
  const productReviews = ref([])
  const getProductReviews = async (productId) => {
    const data = await get_product_reviews_api(productId)
    // 時間取年月日
    // console.log(data)
    const reviewData = data.map((review) => {
      const createAt = review.createAt
      const updatedAt = review.updatedAt
      review.createAt = createAt.slice(0, 10)
      review.updatedAt = updatedAt.slice(0, 10)
      return review
    })

    productReviews.value = CurrentUserReviewOnTop(reviewData)
    // console.log(productReviews.value)
  }

  // 將目前登入會員自己的評論放到最上方
  const CurrentUserReviewOnTop = (reviewData) => {
    const { userId } = useUserStore()
    const currentUserReview = reviewData.find((item) => item.userId === userId)
    // console.log(currentUserReview)

    if (currentUserReview) {
      const currentUserReviewIndex = reviewData.findIndex((item) => item.userId === userId)
      if (currentUserReviewIndex !== 0) {
        reviewData.splice(currentUserReviewIndex, 1)
        reviewData.unshift(currentUserReview)
      }
    }
    return reviewData
  }

  return {
    products,
    categoryType,
    productName,
    product,
    productReviews,
    userGetProducts,
    userGetProduct,
    getProductReviews,
    CurrentUserReviewOnTop
  }
})
