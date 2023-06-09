module.exports = [
  // 生产模式下
  [
    { name: 'vue', library: 'Vue', js: 'cdn/vue/2.6.14/vue.min.js', css: '' },
    { name: 'vue-router', library: 'VueRouter', js: 'cdn/vue-router/3.5.3/vue-router.min.js', css: '' },
    { name: 'vuex', library: 'Vuex', js: 'cdn/vuex/3.6.2/vuex.min.js', css: '' },
    { name: 'axios', library: 'axios', js: 'cdn/axios/0.19.2/axios.min.js', css: '' },
    { name: 'lodash', library: '_', js: 'cdn/lodash/lodash.min.js', css: '' },
    { name: 'lowdb', library: 'low', js: 'cdn/lowdb/1.0.0/low.min.js', css: '' },
    { name: 'lowdb/adapters/LocalStorage', library: 'LocalStorage', js: 'cdn/lowdb/1.0.0/LocalStorage.min.js', css: '' },
    { name: 'element-ui', library: 'ELEMENT', js: 'cdn/element-ui/2.15.6/index.js', css: 'cdn/element-ui/2.15.6/theme-chalk/index.css' },
    { name: 'vue-i18n', library: 'VueI18n', js: 'cdn/vue-i18n/8.15.1/vue-i18n.min.js', css: '' },
    { name: 'js-cookie', library: 'Cookies', js: 'cdn/cookie/cookie.min.js', css: '' },
    { name: 'nprogress', library: 'NProgress', js: 'cdn/nprogress/nprogress.min.js', css: 'cdn/nprogress/nprogress.css' },
    { name: 'dayjs', library: 'dayjs', js: 'cdn/dayjs/dayjs.min.js', css: '' },
    { name: 'echarts', library: 'echarts', js: 'cdn/echarts/4.9.0/echarts.min.js', css: '' },
    { name: 'crypto-js', library: 'CryptoJS', js: 'cdn/crypto/crypto-js.js', css: '' },
    { name: '', library: '', js: 'cdn/system/system.min.js', css: '' },
    { name: '', library: '', js: 'cdn/system/load.js', css: '' },
    { name: '', library: '', js: 'cdn/recorder/recorder.min.js', css: '' }
  ],
  // 开发模式和生产模式都需要
  [
    { name: 'vuex', library: 'Vuex', js: 'cdn/vuex/3.6.2/vuex.min.js', css: '' },
    { name: '', library: '', js: 'cdn/system/system.min.js', css: '' },
    { name: '', library: '', js: 'cdn/system/load.js', css: '' },
    { name: '', library: '', js: 'cdn/recorder/recorder.min.js', css: '' }
  ]
]
