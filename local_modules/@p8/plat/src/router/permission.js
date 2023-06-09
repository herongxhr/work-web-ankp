import store from '@/store'
import NProgress from 'nprogress'
import User from '@/@share/api/user'
import {getCookie} from '@/@core/utils/cookies'
import {GLOBAL_DEFAULT_CONFIG} from '@/@core/data/global.config'

const permission = {
  beforeEach (router) {
    router.beforeEach(async (to, from, next) => {
      NProgress.start()
      let user = new User()
      try {
        await store.dispatch('p8app/permission/load', { to: to.fullPath })
        // 验证当前路由所有的匹配中是否需要有验证的 由于在网络请求的钩子里有对 token 异常的判断，所以在这里不处理异常重定向
        // 未登录
        if (to.matched.some(r => r.meta.auth) && !getCookie("token") && !GLOBAL_DEFAULT_CONFIG.is_sso) {
          await user.USER_CHECK_TOKEN()
        }
        next()
        user = null
      } catch (error) {
        next(false)
      }
      NProgress.done()
    })
  },

  afterEach (router) {
    router.afterEach((to, from, next) => {
      // 进度条
      NProgress.done()
    })
  }
}

export default permission
