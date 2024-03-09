import axios from 'axios'

const { VITE_API_BASE_URL } = import.meta.env

// 登入 API
export const login_api = async (email, password) => {
  try {
    const { data } = await axios.post(`${VITE_API_BASE_URL}/auth/signin`, {
      email: email,
      password: password
    })
    if (data) {
      return data
    }
    throw new Error('登入失敗')
  } catch (error) {
    console.error(error)
    return {
      accessToken: '',
    }
  }
}

// 註冊 API
export const sign_up_api = async (email, password, name, nickName, phone, address) => {
  try {
    const { data } = await axios.post(`${VITE_API_BASE_URL}/auth/signup`, {
      email,
      password,
      name,
      nickName,
      phone,
      address
    })
    return data.status
  } catch (error) {
    console.error(error)
  }
}

// 檢查用戶是否存在
export const check_user_api = async () => {
  try {
    const res = await axios.get(`${VITE_API_BASE_URL}/auth/login/success`,{
      withCredentials: true,
    })
    console.log(res)
    return res
  } catch (error) {
    console.error(error)
  }
}