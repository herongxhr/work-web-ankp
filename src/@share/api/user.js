import { LoadData } from '@/@core/decorator/loadData.decorator'
import http from '@/@core/services/http.service'
import axios from 'axios'

export default class User {
  /**
   * 注销.
   */
  @LoadData({
    localPath: '',
    servicePath: '/IPRT/pub/logout.do',
    index: 1
  })
  USER_LOGOUT (url = '') {
    return http.get(url, {})
  }

  /**
   * 验证用户登录状态.
   */
  @LoadData({
    localPath: '/data/page/user/user.check.json'
  })
  USER_CHECK_TOKEN (url = '') {
    return http.get(url, {})
  }

  // 获取登录信息.
  @LoadData({
    localPath: '/data/page/user/user.model.json'
  })
  USER_LOGIN (username, password, url = '') {
    return http.get(url, {})
  }

  // 获取用户信息.
  @LoadData({
    localPath: '/data/page/user/user.check.json'
  })
  USER_INFO (url = '') {
    return http.getBySession(url, {})
  }

  async THEME_CONFIG (name) {
    const config = await axios.get((process.env.VUE_APP_PUBLIC_PATH || '') + '/data/theme/' + name + ".json")
    if (config && config.data) {
      return config.data
    }
    return {}
  }
}
