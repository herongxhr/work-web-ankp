import Cookies from 'js-cookie'

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
export function setCookie (name = 'default', value = '', cookieSetting = {}) {
  const currentCookieSetting = {
    expires: 1
  }
  Object.assign(currentCookieSetting, cookieSetting)
  Cookies.set(`p8app-${name}`, value, currentCookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
export function getCookie (name = 'default') {
  return Cookies.get(`p8app-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
export function getAll () {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
export function removeCookie (name = 'default') {
  return Cookies.remove(`p8app-${name}`)
}
