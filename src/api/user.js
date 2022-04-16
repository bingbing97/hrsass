import request from '@/utils/request'

export function getLogin(data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data
  })
}

// 获取用户基本资料
export function getUserInfo() {
  return request({
    method: 'POST',
    url: '/sys/profile'
  })
}

// 根据用户id获取用户详情
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
export function logout() {}
