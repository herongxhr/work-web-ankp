import Vue from 'vue'
import Vuex from 'vuex'
import generator from '$@/store/modules/p8app'
import transform from './modules/global'
import getters from '@/store/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    p8app: generator(),
    global: transform()
  },
  getters
})
