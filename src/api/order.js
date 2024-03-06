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

export const get_order_by_user_api = async (userId) => {
  try {
    const { data } = await axios.get(`${VITE_API_BASE_URL}/api/order/user/${userId}`, config())
    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
