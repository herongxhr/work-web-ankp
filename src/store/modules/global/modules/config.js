export default {
  namespaced: true,
  state: {
    // 配置信息
    config: {}
  },
  actions: {
  },
  mutations: {
    /**
     * @description 设置全局配置信息
     * @param {Object} state state
     * @param {Boolean} value 配置信息
     */
    configSet (state, value) {
      state.config = value
    }
  }
}
