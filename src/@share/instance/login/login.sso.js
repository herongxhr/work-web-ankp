import User from '@/@share/api/user'
import { setCookie } from '@/@core/utils/cookies'
import { getSession } from '@/@share/instance/login/token.session'

/**
 * 单点登录例子：
 *      1、在单点登录时，默认使用sessionStorage来获取单点登录需要的凭证
 *      2、sessionStorage.getItem("token")  这个方法是根据具体的单点登录给定存储方式获取
 */
export default {
  async userLogin () {
    const token = getSession("token")
    const user = new User()
    const data = await user.USER_INFO()
    setCookie('uuid', data.userId)
    setCookie('token', token)
    return data
  }
}
