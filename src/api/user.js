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

// 取得自己的 userId
export const get_selfId_api = async () => {
  try {
    if (Cookies.get('token')) {
      return await axios.get(`${VITE_API_BASE_URL}/api/selfId`, config())
    }
    return Promise.resolve({ data: '' })
  } catch (error) {
    console.error(error)
  }
}

// 取得個人會員資料
export const get_member_data_api = async (userId) => {
  try {
    const { data } = await axios.get(`${VITE_API_BASE_URL}/api/usersInfoById/${userId}`, config())
    return data
  } catch (error) {
    console.error(error)
    alert('取得會員資料失敗')
  }
}

// 更改會員資料（不含 avatar）
export const put_user_data_api = async (userId, userData) => {
  try {
    const { data } = await axios.put(
      `${VITE_API_BASE_URL}/api/usersInfoById/${userId}`,
      userData,
      config()
    )
    if (!data) throw new Error('更新會員資料失敗')

    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 捐贈點數
export const donate_point_api = async (userId, points) => {
  try {
    const { data } = await axios.put(`${VITE_API_BASE_URL}/api/donatePointsById/${userId}`, {
      points
    }, config())
    if (!data) throw new Error('捐贈失敗')

    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
