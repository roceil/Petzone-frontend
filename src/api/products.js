import axios from 'axios'

const { VITE_API_BASE_URL } = import.meta.env

// 取得推薦商品
export const get_recommend_product_api = async () => {
  try {
    const { data } = await axios.get(`${VITE_API_BASE_URL}/api/products`)
    return data
  } catch (error) {
    console.error(error)
  }
}

// 上傳多個圖檔
export const post_upload_images = async (files) => {
  try {
    const { data } = await axios.post(`${VITE_API_BASE_URL}/api/upload/images`, files, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data
  } catch (error) {
    console.error(error)
  }
}
