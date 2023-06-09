import service from '@/router/axios'
import { getSession } from '@/@share/instance/login/token.session'

const request = {
  /**
   * 普通的get请求.
   *
   * @param url 请求地址.
   * @param params 请求参数: {xx: xx, xx1: xx1}.
   * @return {*}
   */
  get (url, params) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      _params = '?'
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return service.get(`${url}${_params}`)
  },

  /**
   * 带token头的get请求.
   *
   * @param url 请求地址.
   * @param params 请求参数: {xx: xx, xx1: xx1}.
   * @return {*}
   */
  getBySession (url, params) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      _params = '?'
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return service.get(`${url}${_params}`, {
      headers: {
        Authorization: getSession("token")
      }
    })
  },

  /**
   * 普通post请求.
   *
   * @param url 请求地址.
   * @param params 请求参数: {xx: xx, xx1: xx1}.
   * @return {*}
   */
  post (url, params) {
    const contentType = (url.indexOf('login') > -1) || (url.indexOf('regist') > -1) ? 'application/x-www-form-urlencoded' : 'application/json'
    return service.post(url, params, {
      headers: {
        'Content-Type': contentType
      }
    })
  }
}

export default request
