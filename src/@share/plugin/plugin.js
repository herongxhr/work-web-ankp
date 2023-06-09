import Vue from 'vue'
import '@/assets/styles/index.scss'// 系统样式
import '@/assets/styles/postcss-none.scss'// 这样式文件专门用来处理那些不需要做px转换的
import '@/@share/components'
import '@/@share/filters'
import {request} from './request.plugin'
import {elementUI} from './elementUI.plugin'
import echarts from 'echarts'

// TODO: 这个地方可以用来扩展安装插件.
// 例子：[request, xx, xx1]
const Plugins = [
  request,
  elementUI
]

Plugins.map((plugin) => {
  Vue.use(plugin)
})

Vue.prototype.$bus = new Vue()
Vue.prototype.$echarts = echarts
