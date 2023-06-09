const CONFIG_URL = "/config.json"

/**
 * 处理get请求方式下的本地和远程接口数据源.
 * @param http vue上下文.
 * @param key 接口key.
 * @param params 参数.
 * @return {Promise<*>}
 */
export async function $get (http, key, params) {
  const local = "/data/" + http.$options.name + CONFIG_URL

  // 如果配置了接口路径
  if (http.paths && http.paths[key]) {
    const data = await http.$get(http.paths[key], params)
    return data
  } else {
    // 没有配置接口，默认使用本地json文件数据.
    // 情况一：npm安装方式
    // 情况二：路由import导入
    const url = http.$options._componentTag ? local : http.config.web_component_url + http.$options.name + CONFIG_URL
    const data = await http.$get(url, params)
    return data[key].data
  }
}
