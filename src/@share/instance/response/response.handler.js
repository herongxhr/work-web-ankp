// 模拟抽象父类Handler.
export default class ResponseHandler {
  // handler = ResponseHandler
  handler = null

  // 返回结果（不像ts会把这个对象做抽象）
  result = {
    // 状态 0: 初始状态  1: 正常返回数据  2: 接口权限错误  3: 接口其他错误
    status: 0,
    msg: '',
    data: null
  }

  // 设置处理对象.
  setHandler (responseHandler) {
    this.handler = responseHandler
  }

  // 事实上的抽象方法.
  response (axios) {}
}
