import User from '@/@share/api/user'
import { setCookie } from '@/@core/utils/cookies'
export default {
  /**
   * 没有登录页面，啥验证也没有.
   * 不经过请求接口来验证的.
   * @return {Promise<void>}
   */
  async userLogin (username, password) {
    setCookie('uuid', "zs")
    setCookie('token', "dsgFv33Fcmza")
    return {}
    // 设置登录状态.
    // return {
    //   userId: "zs",
    //   token: "dsgFv33Fcmza",
    //   name: "张三"
    // }
    // 登录失败抛出异常
    // throw new Error('登录失败')
  }
}
