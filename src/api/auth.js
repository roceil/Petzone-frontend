import axios from 'axios'

const { VITE_API_BASE_URL } = import.meta.env

// 登入 API
export const login_api = async (email, password) => {
  try {
    const { data } = await axios.post(`${VITE_API_BASE_URL}/auth/signin`, {
      email: email,
      password: password
    })
    if (data.accessToken) {
      return data.accessToken
    }
  } catch (error) {
    console.error(error)
  }
}

// 註冊 API
export const sign_up_api = async (email, password, name, nickname, phone, address) => {
  try {
    const { data } = await axios.post(`${VITE_API_BASE_URL}/auth/signup`, {
      email,
      password,
      name,
      nickname,
      phone,
      address
    })
    return data.status
  } catch (error) {
    console.error(error)
  }
}
