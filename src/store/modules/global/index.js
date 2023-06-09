// 简化导出的模块类，避免过多的模块导出和扩展.
export default () => {
  const files = require.context('./modules', false, /\.js$/)
  const modules = {}

  files.keys().forEach(key => {
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
  })
  return {
    namespaced: true,
    modules
  }
}
