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

// 取得所有貼文
export const get_posts_api = async () => {
  try {
    return await axios.get(`${VITE_API_BASE_URL}/api/posts`)
  } catch (error) {
    console.error(error)
  }
}

// 取得單一貼文詳情
export const get_post_api = async (postId) => {
  try {
    return axios.get(`${VITE_API_BASE_URL}/api/post/${postId}`)
  } catch (error) {
    console.error(error)
  }
}

// 建立貼文
export const post_post_api = async (data) => {
  try {
    return await axios.post(`${VITE_API_BASE_URL}/api/post`, data, config())
  } catch (error) {
    console.error(error)
  }
}

// 更新貼文
export const put_post_api = async (postId, data) => {
  try {
    return await axios.put(`${VITE_API_BASE_URL}/api/post/${postId}`, data, config())
  } catch (error) {
    console.error(error)
  }
}

// 刪除貼文
export const delete_post_api = async (postId) => {
  try {
    return await axios.delete(`${VITE_API_BASE_URL}/api/post/${postId}`, config())
  } catch (error) {
    console.error(error)
  }
}
