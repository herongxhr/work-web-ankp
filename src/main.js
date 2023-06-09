import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import '@/@share/plugin/plugin'
import app from '@/@core/services/appInit.service'
import { GLOBAL_DEFAULT_CONFIG } from '@/@core/data/global.config'

Vue.config.productionTip = false

app.initWebApp().then(res => {
  new Vue({
    router,
    store,
    async created () {
      this.$store.commit('global/config/configSet', GLOBAL_DEFAULT_CONFIG)
      // 登录并获取用户信息：这个逻辑是根据不同的系统集成的场景来调用,此处就是标识没有登录页时的默认登录.
      // 此处是处理没有登录页时的外部集成（单点集成）
      if (GLOBAL_DEFAULT_CONFIG.integration_mode === "outside" && !this.$store.state.p8app.user.isLogged) {
        this.$store.dispatch('p8app/user/login', {})
      }
      await this.$store.dispatch('global/theme/global')
    },
    render: h => h(App)
  }).$mount('#app')
})
