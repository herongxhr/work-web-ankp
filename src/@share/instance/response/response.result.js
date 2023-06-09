import ResponseHandler from '@/@share/instance/response/response.handler'

/**
 * 模拟抽象父类Handler.
 */
export default class ResponseResult extends ResponseHandler {
  // 事实上的抽象方法.
  response (axios) {
    const dataAxios = axios.data

    // 判断当前接口的返回格式，只有符合下面这种情况的才放行(请确保这个判断是唯一的).
    if (axios.status === 200 && dataAxios.status) {
      // 正常状态
      if (dataAxios.status === 200 || dataAxios.status === '200') {
        this.result.status = 1
        this.result.data = dataAxios.result
      } else if ([401].indexOf(dataAxios.code) >= 0) { // 权限问题
        this.result.status = 2
        this.result.msg = "身份验证失败"
      } else {
        this.result.status = 3
        this.result.msg = dataAxios.msg || "服务出错"
      }
      return this.result
    } else {
      return this.handler ? this.handler.response(axios) : {}
    }
  }
}
