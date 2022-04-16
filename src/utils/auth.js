import Cookies from 'js-cookie'

const timeKey = 'hrsaas-timestamp-key' // 设置一个独一无二的key

const TokenKey = 'hrsaas-ihrm-token' // 设置一个独一无二的token

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 获取当前时间戳
export function getTime() {
  return Cookies.get(timeKey)
}

// 设置当前时间戳
export function setTime() {
  return Cookies.set(timeKey, Date.now())
}
