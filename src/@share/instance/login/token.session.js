/**
 * @description 拿到单点登录的token值,
 * @TODO  具体的实现过程需要根据单点登录的sessionStorage的情况而定
 * @param {String} name token name
 */
export function getSession (name = 'token') {
  const token = sessionStorage.getItem(name)
  return token
}
