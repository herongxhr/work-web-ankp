import { danger, primary } from '../utils/log'
import axios from 'axios'
import {GLOBAL_DEFAULT_CONFIG} from '../data/global.config'
import { LoadData } from '@/@core/decorator/loadData.decorator'

class AppInit {
  constructor () {
    this.env = process.env.NODE_ENV
  }

  // 同步等待系统初始化完成.
  async initWebApp () {
    primary('****************************************\n' +
      '*\t\t\t\t\t\t\t\t\t   *\n' +
      '*\t     ☆东华水利系统启动☆\t\t\t   *\n' +
      '*\t\t\t\t\t\t\t\t\t   *\n' +
      '****************************************')
    const theme = this.loadTheme()
    return this.loadConfig(theme)
  }

  @LoadData({
    localPath: '/data/page/user/user.model.json'
  })
  async loadTheme (url = '') {
    const theme = await axios.get(url)
    if (theme.status === 200 && theme.data.result) {
      return theme.data.result
    } else {
      return GLOBAL_DEFAULT_CONFIG.web_global_theme
    }
  }

  /**
   * 读取系统配置信息，所以的配置信息都放到json的配置文件中.
   * @return {Promise<void>}
   */
  async loadConfig (theme) {
    let response = {}
    try {
      response = await axios.get((process.env.VUE_APP_PUBLIC_PATH || '') + '/environment/' + this.env + '.json?date=' + new Date().getTime())
    } catch (error) {
      danger('%*%*%*%*%*%*系统初始化失败%*%*%*%*%*%*')
    }

    if (response && response.data) {
      // TODO: 配置文件暂时只有相对简单的配置信息，如果后面配置信息需要分类別拆分的话，可以使用多模块导入來處理
      Object.keys(response.data.config).forEach(key => {
        // 设置配置文件为只读，不可在程序中修改.
        Object.defineProperty(GLOBAL_DEFAULT_CONFIG, key, {
          writable: false,
          value: response.data.config[key]
        })
      })
      // 设置全局主题变量
      Object.defineProperty(GLOBAL_DEFAULT_CONFIG, 'web_global_theme', {
        writable: false,
        value: await theme
      })
    }
    return response.data
  }
}

const app = new AppInit()
export default app
