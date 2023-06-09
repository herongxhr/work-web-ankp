import Vue from 'vue'
import VueRouter from 'vue-router'
import permission from '$@/router/permission'
import viewRouter from '@/router/views'
import outRouter from '@/router/out'

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 默认的配置路由: 后面可以扩展
export function createRoutesInLayout (routes = []) {
  return viewRouter(routes)
}

const createRouter = (routes = []) => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

// 导出路由在 main.js 里使用
const router = createRouter(createRoutesInLayout([]).concat(outRouter))

/**
 * 重新设置路由.
 * @param {Array} routes 额外追加的路由
 */
export function resetRouter (routes = []) {
  router.matcher = createRouter(routes).matcher
}

// 路由控制守卫.
permission.beforeEach(router)
permission.afterEach(router)

export default router
