import {Menu} from '@/@share/api/menu'
import {imports} from '@/@core/utils/import'
import router, { createRoutesInLayout, resetRouter } from '@/router'
import outRouter from '@/router/out'
import micro from "@/views/micro.vue"

export default {
  namespaced: true,
  state: {
    // 是否已经加载
    isLoaded: false,
    // 用户权限
    permissions: []
  },
  actions: {
    async load ({ state, rootState, commit, dispatch }, { to = '' }) {
      // 取消请求 - 没有登录
      if (!rootState.p8app.user.isLogged) return
      // 取消请求 - 已经加载过动态路由
      if (state.isLoaded) return
      let menu = new Menu()
      const menus = await menu.MENU_ALL({name: ''})
      // [ 菜单 ] 设置菜单
      commit('p8app/menu/set', menus, { root: true })

      if (window.__POWERED_BY_QIANKUN__) {
        // 增加了一种扩展路由
        const suffixRoute = getRoutes(menus, true)
        suffixRoute.forEach((element) => {
          router.addRoute(element)
        })
      } else {
        const routes = createRoutesInLayout(getRoutes(menus, false)).concat(outRouter)
        // [ 路由 ] 重新设置路由
        resetRouter(routes)
      }
      // 标记已经加载过动态路由
      commit('isLoadedSet', true)
      menu = null
      if (to) router.replace(to)
    }
  },
  mutations: {
    /**
     * @description 设置动态路由加载状态
     * @param {Object} state state
     * @param {Boolean} value 是否已经加载动态路由
     */
    isLoadedSet (state, value) {
      state.isLoaded = value
    }
  }
}

function getRoutes (menus, suffix) {
  // 是否有子路由
  function hasRouteChildren (item) {
    return item.children && item.children.length > 0
  }

  function options (item, path) {
    // 默认指定所有通过系统管理的菜单都需要权限
    if (!item.meta) {
      item.meta = {auth: true}
    } else {
      item.meta.auth = true
    }
    return {
      path: suffix ? item.url + 'sf' : item.url,
      name: suffix ? item.path + 'sf' : item.path,
      component: item.meta.micro ? micro : imports(path, item.path),
      children: [],
      meta: item.meta
    }
  }

  /**
   * 检验是否已经注册过此路由
   * @description 在 vue-router 中路由的 name 不允许重复
   * @param {Array} registered 已经注册的路由
   * @param {Object} sourceItem 原始数据的一项
   */
  function isUnregistered (registered, sourceItem) {
    return !registered.find(item => item.name === sourceItem.name)
  }

  /**
   * 递归生成动态路由.
   * @param menus 菜单节点.
   * @param routes 动态路由数字.
   * @param path 组件对应的系统路径.
   * @return {*}
   */
  function makerRoute (menus, routes, path) {
    menus.forEach((item) => {
      let copy = Object.assign(path)
      copy = copy + "/" + item.path
      if (hasRouteChildren(item)) {
        routes = routes.concat(makerRoute(item.children, [], copy))
      }

      // 只有没有child的才能组装路由
      if (!hasRouteChildren(item) && isUnregistered(routes, item)) {
        const route = options(item, copy)
        routes.push(route)
      }
    })
    return routes
  }
  return makerRoute(menus, [], '')
}
