import router from '@/router/index'
import store from '@/store/index'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whitelist = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 并不是每次进入页面都需要发送请求，当有用户信息的情况下，直接进入页面，无需再次发送请求
      if (!store.getters.userId) {
        await store.dispatch('user/UserInfo')
      }
      next()
      // 报401是由于token超时 需要手动清除本地缓存再重新进入页面
    }
  } else {
    if (whitelist.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done() // 关闭进度条
})

router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
