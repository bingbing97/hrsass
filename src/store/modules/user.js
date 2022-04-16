import { getToken, setToken, removeToken, setTime } from '@/utils/auth'
import { getLogin, getUserInfo, getUserDetailById } from '@/api/user'

// 状态
const state = {
  token: getToken(),
  UserInfo: {} // TODO:定义一个空的对象 不是null 因为如果设置为null，则会引起异常和报错
}
// 修改状态
const mutations = {
  setVux_Token(state, token) {
    state.token = token // 数据设置给vuex
    setToken(token) // 同步至本地
  },
  removeVux_Token() {
    state.token = null // 先清空vuex
    removeToken()
  },
  setUserInfo(state, data) {
    // state.UserInfo = data // 整体覆盖
    state.UserInfo = { ...data } // 使用浅拷贝的方法实现响应式数据
  },
  removeUserInfo(state) {
    state.UserInfo = {}
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    const res = await getLogin(data)
    context.commit('setVux_Token', res)
    // 在缓存中存入当前时间戳
    setTime()
    // eslint-disable-next-line no-empty
  },

  async UserInfo(context) {
    // 获取用户基本信息
    const res = await getUserInfo()
    // 获取用户头像
    const UserDetail = await getUserDetailById(res.userId)
    // 合并两项数据
    context.commit('setUserInfo', { ...res, ...UserDetail })
    return res // 后续只需要用户信息，不需要头像
  },
  // 退出登录
  logout(context) {
    // 清空vuex和缓存中的token
    context.commit('removeVux_Token')
    // 清空vuex的用户信息
    context.commit('removeUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
