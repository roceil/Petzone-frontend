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

// 取得所有 tags
export const get_tags_api = async () => {
  try {
    return await axios.get(`${VITE_API_BASE_URL}/api/tags`)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 取得所有貼文
export const get_posts_api = async (params) => {
  try {
    return await axios.get(`${VITE_API_BASE_URL}/api/posts`, { params })
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 取得單一貼文詳情
export const get_post_api = async (postId) => {
  try {
    return await axios.get(`${VITE_API_BASE_URL}/api/post/${postId}`)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 建立貼文
export const post_post_api = async (data) => {
  try {
    return await axios.post(`${VITE_API_BASE_URL}/api/post`, data, config())
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 更新貼文
export const put_post_api = async (postId, data) => {
  try {
    return await axios.put(`${VITE_API_BASE_URL}/api/post/${postId}`, data, config())
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 刪除貼文
export const delete_post_api = async (postId) => {
  try {
    return await axios.delete(`${VITE_API_BASE_URL}/api/post/${postId}`, config())
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 點讚貼文
export const post_post_like_api = async (postId) => {
  try {
    return await axios.post(`${VITE_API_BASE_URL}/api/post/${postId}/like`, {}, config())
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 更新點讚貼文
export const put_post_like_api = async (postId, data) => {
  try {
    return await axios.put(`${VITE_API_BASE_URL}/api/post/${postId}/like`, data, config())
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 新增留言
export const post_post_comment_api = async (postId, data) => {
  try {
    return await axios.post(`${VITE_API_BASE_URL}/api/post/${postId}/comment`, data, config())
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 更新留言
export const put_post_comment_api = async (params, data) => {
  try {
    return await axios.put(
      `${VITE_API_BASE_URL}/api/post/${params.postId}/comment/${params.commentId}`,
      data,
      config()
    )
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 刪除留言
export const delete_post_comment_api = async (params) => {
  try {
    return await axios.delete(
      `${VITE_API_BASE_URL}/api/post/${params.postId}/comment/${params.commentId}`,
      config()
    )
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 隨機取得 20 篇貼文
export const get_random_posts_api = async () => {
  try {
    return await axios.get(`${VITE_API_BASE_URL}/api/posts/random`)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 取得使用者單一貼文詳情
export const get_user_posts_api = async (userId) => {
  try {
    return await axios.get(`${VITE_API_BASE_URL}/api/posts/user/${userId}`)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 後台取得所有貼文
export const get_posts_api_admin = async (params) => {
  try {
    return await axios.get(`${VITE_API_BASE_URL}/api/admin/posts`, config(params))
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 後台取得單一貼文詳情
export const get_post_api_admin = async (postId) => {
  try {
    return await axios.get(`${VITE_API_BASE_URL}/api/admin/post/${postId}`, config())
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 後台刪除貼文
export const delete_post_api_admin = async (postId) => {
  try {
    return await axios.delete(`${VITE_API_BASE_URL}/api/admin/post/${postId}`, config())
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 後台刪除留言
export const delete_post_comment_api_admin = async (params) => {
  try {
    return await axios.delete(
      `${VITE_API_BASE_URL}/api/admin/post/${params.postId}/comment/${params.commentId}`,
      config()
    )
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
