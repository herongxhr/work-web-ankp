import { GLOBAL_DEFAULT_CONFIG } from '@/@core/data/global.config'
import notify from '@/@core/utils/notify'

/**
 * 请求服务数据.
 * @param directive: {
 *    localePath?: string; 本地数据路径.
 *    servicePath?: string; 服务器接口路径.
 *    visitLocale?: boolean; 是否强制使用本地数据源.
 *    index?: number; 后台接口项目地址索引（对应于web_base_url配置项的数值索引）
 *  }
 * @constructor
 */
export function LoadData (directive) {
  //  这才是真正装饰器
  return (target, name, descriptor) => {
    const fn = descriptor.value
    descriptor.value = function (...args) {
      args = [...arguments]
      const dataSource = confirmDataSource(directive)
      const i = directive.index ? directive.index : 0
      args[args.length] = dataSource ? GLOBAL_DEFAULT_CONFIG.web_base_url[i] + directive.servicePath
        : ((process.env.VUE_APP_PUBLIC_PATH || '') + directive.localPath)
      const value = fn.apply(this, args)

      // 服务器数据源的处理交给服务器接口自己处理
      if (dataSource) {
        return value
      } else {
        // 处理本地数据源的返回结果.
        return pipeLocalDate(name, value)
      }
    }
  }
}

/**
 * 根据配置信息确认数据源.
 * @param directive directive.
 * @return 返回当前使用的数据源 true: 服务器数据源  false： 本地数据源
 */
function confirmDataSource (directive) {
  if (GLOBAL_DEFAULT_CONFIG.local_data_source || directive.visitLocale) { return false }
  if (directive.servicePath && directive.servicePath !== '') { return true }
  return false
}

/**
 * 处理本地数据.
 * @param name
 * @param localDate
 */
async function pipeLocalDate (name, localDate) {
  let data = {}
  // 同步等待数据处理完成
  await localDate.then(res => {
    const error = {
      title: '格式错误',
      message: '本地数据源文件配置错误，请按照正确的方式配置{"page":{"' + name + '":{"return":[]}}}'
    }
    if (!res[name]) { notify.warning(error); return }
    data = res[name]
  })
  return data
}
