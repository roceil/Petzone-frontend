import axios from 'axios'
import Cookies from 'js-cookie'

const { VITE_API_BASE_URL } = import.meta.env
const config = (order) => {
  return {
    headers: {
      authorization: `Bearer ${Cookies.get('token')}`
    },
    body: {
      order
    }
  }
}

export const checkout = async (orderId, order) => {
  try {
    const { data } = await axios.post(
      `${VITE_API_BASE_URL}/api/checkout-session/${orderId}`,
      config(order)
    )
    console.log('🚀 ~ checkout ~ data:', data)
    return data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
