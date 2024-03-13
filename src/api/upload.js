import axios from 'axios'

const { VITE_API_BASE_URL } = import.meta.env

// 上傳圖片到 Firebase
export const upload_image_api = async (uploadFile) => {
  try {
    const formData = new FormData()
    formData.append('file', uploadFile)
    const { data } = await axios.post(`${VITE_API_BASE_URL}/api/upload/image`, formData)
    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
