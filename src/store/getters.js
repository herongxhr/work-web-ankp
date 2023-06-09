const getters = {
  isLogged: state => state.p8app.user.isLogged,
  globalConfig: state => state.global.config.config,
  themeConfig: state => state.global.theme.config
}
export default getters
