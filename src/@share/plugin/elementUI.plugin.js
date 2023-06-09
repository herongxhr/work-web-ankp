import ElementUI from 'element-ui'
import i18n from '@/@share/lang'

export const elementUI = {
  install (Vue) {
    // Element
    Vue.use(ElementUI, {
      i18n: (key, value) => i18n.t(key, value)
    })
  }
}
