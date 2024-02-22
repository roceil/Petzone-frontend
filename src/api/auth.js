import axios from 'axios'

// 登入 API
export const login_api = async (email, password) => {
  try {
    const { data } = await axios.post('/api/auth/signin', {
      email: email,
      password: password
    })
    if (data.accessToken) {
      return true
    }
  } catch (error) {
    console.error(error)
  }
}

// 註冊 API
export const sign_up_api = async (email, password, name, nickname, phone, address) => {
  try {
    const { data } = await axios.post('/api/auth/signup', {
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
