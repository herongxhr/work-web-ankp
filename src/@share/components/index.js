import Vue from 'vue'

const vueFiles = require.context('./global', true, /\.vue$/)
vueFiles.keys().forEach(key => {
  const component = vueFiles(key).default
  Vue.component(component.name, component)
})
