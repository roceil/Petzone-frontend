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
export const get_posts_api = async (nickName) => {
  try {
    let url = `${VITE_API_BASE_URL}/api/posts`
    if (nickName) {
      url = `${url}?nickName=${nickName}`
    }
    return await axios.get(url)
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

// 點讚貼文
export const post_post_like_api = async (postId) => {
  try {
    return await axios.post(`${VITE_API_BASE_URL}/api/post/${postId}/like`, {}, config())
  } catch (error) {
    console.error(error)
  }
}

// 更新點讚貼文
export const put_post_like_api = async (postId, data) => {
  try {
    return await axios.put(`${VITE_API_BASE_URL}/api/post/${postId}/like`, data, config())
  } catch (error) {
    console.error(error)
  }
}

// 留言貼文
export const post_post_comment_api = async (postId, data) => {
  try {
    return await axios.post(`${VITE_API_BASE_URL}/api/post/${postId}/comment`, data, config())
  } catch (error) {
    console.error(error)
  }
}

// 更新留言貼文
export const put_post_comment_api = async (params, data) => {
  try {
    return await axios.put(
      `${VITE_API_BASE_URL}/api/post/${params.postId}/comment/${params.commentId}`,
      data,
      config()
    )
  } catch (error) {
    console.error(error)
  }
}

export const delete_post_comment_api = async (params) => {
  try {
    return await axios.delete(
      `${VITE_API_BASE_URL}/api/post/${params.postId}/comment/${params.commentId}`,
      config()
    )
  } catch (error) {
    console.error(error)
  }
}
