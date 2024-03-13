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

// 取得所有會員資料
export const get_members_data_api = async () => {
  try {
    const { data } = await axios.get(`${VITE_API_BASE_URL}/api/usersInfo`, config())
    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 取得自己的會員資料
export const get_member_data_api = async () => {
  try {
    const { data } = await axios.get(`${VITE_API_BASE_URL}/api/userInfo`, config())
    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 取得貼文資料
export const get_post_data_api = async (id) => {
  try {
    const { data } = await axios.get(`${VITE_API_BASE_URL}/api/userInfo/${id}`)
    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 更改自己的會員資料
export const put_member_data_api = async (userData) => {
  try {
    const { data } = await axios.patch(`${VITE_API_BASE_URL}/api/userInfo`, userData, config())
    if (!data) throw new Error('更新會員資料失敗')

    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 捐贈點數
export const donate_point_api = async (points) => {
  try {
    const { data } = await axios.put(
      `${VITE_API_BASE_URL}/api/donatePoints`,
      {
        points
      },
      config()
    )
    if (!data) throw new Error('捐贈失敗')

    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// 取得當月最佳捐款者清單
export const get_monthly_donate_rank_api = async () => {
  try {
    const { data } = await axios.get(`${VITE_API_BASE_URL}/api/getBestDonator`)
    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
