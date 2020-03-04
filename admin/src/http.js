import axios from 'axios'
import { message } from 'antd'

import history from './history'

const http = axios.create({
  baseURL: 'http://localhost:3001/admin/api'
})

http.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  res => {
    return res
  },
  err => {
    if (err.response.data.message) {
      message.error(err.response.data.message)
      if (err.response.status === 401) {
        // 路由界面需使用<Router history={}>，需要使用同一个history对象才能实现跳转
        history.push('/login')
        // window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

export default http
