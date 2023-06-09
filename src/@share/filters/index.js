import Vue from 'vue'

const files = require.context('./modules', false, /\.js$/)
files.keys().forEach(key => {
  const filterModule = files(key).default
  for (const filterName in filterModule) {
    // filterModule.hasOwnProperty(filterName)
    if (Object.prototype.hasOwnProperty.call(filterModule, filterName)) {
      Vue.filter(filterName, filterModule[filterName])
    }
  }
})
