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
    if(Cookies.get('token')) {
      return await axios.get(`${VITE_API_BASE_URL}/api/selfId`, config())
    }
    return Promise.resolve({data: ''})
  } catch (error) {
    console.error(error)
  }
}