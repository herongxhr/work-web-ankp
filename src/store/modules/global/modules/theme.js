import User from '@/@share/api/user'
import { GLOBAL_DEFAULT_CONFIG } from '@/@core/data/global.config'

export default {
  namespaced: true,
  state: {
    // 配置信息
    config: {}
  },
  actions: {
    // 设置全局主题样式类
    async global ({ state, commit, dispatch }) {
      // 设置全局样式
      document.body.setAttribute("class", "p8-theme-" + GLOBAL_DEFAULT_CONFIG.web_global_theme)
      const conf = await new User().THEME_CONFIG(GLOBAL_DEFAULT_CONFIG.web_global_theme)
      commit('configSet', conf)
    }
  },
  mutations: {
    /**
     * @description 设置
     * @param {Object} state state
     * @param {Boolean} value 主题.
     */
    configSet (state, value) {
      state.config = value
    }
  }
}
