import { GLOBAL_DEFAULT_CONFIG } from '@/@core/data/global.config'
import _ from "lodash"

/**
 * 对chart这类非css场景下的自适应窗口转换.
 * @param 需要转换的数值.
 * @constructor
 */
export function viewport (directive) {
  //  这才是真正装饰器
  return (target, name, descriptor) => {
    const fn = descriptor.value
    descriptor.value = function (...args) {
      transform(args)
      const value = fn.apply(this, args)
      return value
    }
  }
}

/**
 * 参数转换.
 * 格式：任意数值.
 * @param args 参数.
 */
export function transform (args) {
  _(args).forEach((item, index) => {
    if (typeof (item) === "object") {
      transform(item)
    }

    // 数值.
    if (typeof (item) === "number") {
      const calc = calculate(item, window.innerWidth, GLOBAL_DEFAULT_CONFIG.viewport_width)
      args[index] = calc
    }
  })
}

/**
 * 将传入值转换为基准值下比率值.
 * @param value 转换值.
 * @param current 当前比较值.
 * @param standard 标准比较值(比如：1980下设计值就是1980).
 */
function calculate (value, current, standard) {
  const calc = Math.round(value * (current / standard) * 1000) / 1000
  return calc
}
