import requires from '@/@core/utils/require'
import { GLOBAL_DEFAULT_CONFIG } from '@/@core/data/global.config'
import User from '@/@share/api/user'
import {getCookie, removeCookie} from '@/@core/utils/cookies'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    // 用户登录状态
    isLogged: !!getCookie("token"),
    // 用户信息
    info: {}
  },
  actions: {
    /**
     * @description 登录
     * @param {Object} vuex context
     * @param {Object} payload username {String} 用户账号
     * @param {Object} user user {} 用户信息
     */
    async login ({ state, commit, dispatch }, user) {
      try {
        const data = await requires(GLOBAL_DEFAULT_CONFIG.instance_login).userLogin(user)
        // 设置 vuex 用户信息
        await dispatch('p8app/user/set', data, { root: true })
        commit('isLoggedSet', true)
        commit('p8app/permission/isLoadedSet', false, { root: true })
        // 加载权限
        await dispatch('p8app/permission/load', { focus: true, to: user.to ? user.to : '/' }, { root: true })
        return Promise.resolve(data)
      } catch (error) {
        // 结束
        return Promise.reject(error)
      }
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} vuex context
     * @param {Object} payload focus {Boolean} 强制登出 没有任何提示
     * @param {Object} payload remote {Boolean} 需要服务端登出
     * @param {Object} payload back {Boolean} 返回当前页面
     */
    async logout ({ commit, dispatch }, { focus = false, remote = true, back = false } = {}) {
      // 设置用户登陆状态
      commit('isLoggedSet', false)
      const user = new User()
      // 请求登出接口 不管成功与否都要进行下一步，所以不用 await 了
      if (remote) user.USER_LOGOUT()
      // 删除 cookie
      removeCookie('token')
      removeCookie('uuid')
      // 本地清空用户信息
      await dispatch('p8app/user/set', {}, { root: true })
      // 清空菜单加载信息
      commit('p8app/permission/isLoadedSet', false, { root: true })
      // TODO 后期看是否需要指定在登陆之后是否需要跳转回原来的页面
      if (!GLOBAL_DEFAULT_CONFIG.is_sso) {
        router.replace({
          name: 'login',
          query: {}
        })
      } else {
        window.location.replace(GLOBAL_DEFAULT_CONFIG.single_point)
      }
    },
    /**
     * @description 设置用户数据
     * @param {Object} vuex context
     * @param {*} info info
     */
    async set ({ state, dispatch }, info) {
      // store 赋值
      state.info = info
      // 持久化
      await dispatch('p8app/db/set', {
        dbName: 'sys',
        path: 'user.info',
        value: info,
        user: true
      }, { root: true })
    },
    /**
     * @description 从本地数据库取用户数据
     * @param {Object} vuex context
     */
    async load ({ state, dispatch }) {
      // store 赋值
      state.info = await dispatch('p8app/db/get', {
        dbName: 'sys',
        path: 'user.info',
        defaultValue: {},
        user: true
      }, { root: true })
    }
  },
  mutations: {
    /**
     * @description 设置用户登陆状态
     * @param {Object} state state
     * @param {Boolean} value 是否登录
     */
    isLoggedSet (state, value) {
      state.isLogged = value
    }
  }
}
