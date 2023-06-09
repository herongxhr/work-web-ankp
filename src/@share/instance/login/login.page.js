import User from '@/@share/api/user'
import { setCookie } from '@/@core/utils/cookies'

export default {
  async userLogin (username, password) {
    const user = new User()
    const data = await user.USER_LOGIN(username, password)
    setCookie('uuid', data.userId)
    setCookie('token', data.token)
    return data
  }
}
