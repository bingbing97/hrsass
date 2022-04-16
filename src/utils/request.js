import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTime } from '@/utils/auth'
import router from '@/router/index'
const timeout = 3600 // 秒为单位
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
  // timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 判断token是否存在
    if (store.getters.token) {
      // 前端主动检查
      // 判断token是否超时 超时为真 没有超时为假
      if (IsCheckTimeOut()) {
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('Token超时,请重新登录'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))

      // return Promise.reject(message)
      // new Error(message)
    }
  },
  (error) => {
    // 后端检查token 前端被动接收
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 10002
    ) {
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
      // console.dir(error)
    }
    return Promise.reject(error)
  }
)

function IsCheckTimeOut() {
  const nowtime = Date.now()
  const getTokentime = getTime()
  return (nowtime - getTokentime) / 1000 > timeout // 毫秒转为秒
}

export default service
