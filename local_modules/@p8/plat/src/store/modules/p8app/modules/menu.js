export default {
  namespaced: true,
  state: {
    // 菜单.
    menu: [],
    // 选中侧边栏菜单.
    aside: [],
    // 是否显示侧边栏.
    show: false
  },
  actions: {
    /**
     *  设置选择侧边栏菜单.
     * @param state
     * @param dispatch
     * @param value
     */
    asideSet ({ state, dispatch }, value) {
      state.aside = value
    },
    /**
     *  设置侧边栏显示.
     * @param state
     * @param dispatch
     * @param value
     */
    showSet ({ state, dispatch }, value) {
      state.show = value
    }
  },
  mutations: {
    /**
     * 设置菜单
     * @param {Object} state state
     * @param {Array} menu menu setting
     */
    set (state, menu) {
      // store 赋值
      state.menu = menu
    }
  }
}
