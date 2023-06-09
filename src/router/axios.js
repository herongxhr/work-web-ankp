import axios from 'axios'
import { Message, Notification } from 'element-ui';
import store from '@/store'
import { GLOBAL_DEFAULT_CONFIG } from '@/@core/data/global.config'
import requires from '@/@share/instance/response/require'

// import require from '@/@core/utils/require'

const service = axios.create({
  // baseURL: GLOBAL_DEFAULT_CONFIG.web_base_url,
  timeout: 30000,
  withCredentials: true,
  validateStatus (status) {
    // 200 外的状态码都认定为失败
    return status >= 200 && status <= 500 // 默认的
  }
})

service.interceptors.response.use(async response => {
  const handlerArr = [null]
  for (const item of GLOBAL_DEFAULT_CONFIG.instance_axios) {
    const Handler = requires(item)
    const handler = new Handler()
    handler.setHandler(handlerArr[handlerArr.length - 1])
    handlerArr.push(handler)
  }

  const resHandler = handlerArr[handlerArr.length - 1]
  const result = resHandler.response(response)

  if (result.status === 1) {
    return result.data
  }

  if (result.status === 2) {
    Notification.error({
      title: '身份验证失败',
      message: '请重新登录'
    })
    await store.dispatch('p8app/user/logout', { focus: true, remote: false, back: true })
    return Promise.reject(new Error(result.msg))
  }

  if (result.status === 3) {
    const error = new Error(result.msg)
    log(error)
    return Promise.reject(error)
  }

  // 默认情况下
  if ([1, 2, 3].indexOf(result.status) === -1) {
    if (response.status === 200) {
      return response.data
    } else {
      const error = new Error('服务器内部错误')
      log(error)
      return Promise.reject(error)
    }
  }
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400: error.message = '请求错误'; break
      case 401: error.message = '未授权，请登录'
        store.dispatch('p8app/user/logout', { focus: true, remote: false, back: true })
        break
      case 403: error.message = '拒绝访问'; break
      case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
      case 408: error.message = '请求超时'; break
      case 500: error.message = '服务器内部错误'; break
      case 501: error.message = '服务未实现'; break
      case 502: error.message = '网关错误'; break
      case 503: error.message = '服务不可用'; break
      case 504: error.message = '网关超时'; break
      case 505: error.message = 'HTTP版本不受支持'; break
      default: break
    }
  } else {
    error.message = "系统错误"
  }
  log(error)
  return Promise.reject(error)
})

service.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 记录和显示错误
function log (error) {
  // 是否显示消息提示可以配置.
  if (!GLOBAL_DEFAULT_CONFIG.hidden_message) {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    console.error(error)
  }
}

export default service
