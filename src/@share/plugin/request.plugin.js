import REQUEST from '@/@core/services/http.service'

// 将http的请求方法赋给Vue原型.
export const request = {
  install (Vue) {
    Object.keys(REQUEST).forEach(key => {
      Vue.prototype['$' + key] = REQUEST[key]
    })
  }
}
