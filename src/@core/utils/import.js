/**
 * 动态导入组件.
 * @param path 路径.
 * @param url 路由地址.
 * @return {Function}
 */
export function imports (path, name) {
  return (resolve) => {
    import('@/views' + path + '/' + name + '.component.vue').then(mod => {
      resolve(mod)
    })
  }
}

/**
 * 动态导入外部组件.
 * @param url 外部组件地址.
 * @return {Function}
 */
export function loadJs (url) {
  return async (resolve) => {
    const mark = await LoadJs(url)
    return mark.default.default
  }
}
