import http from '@/@core/services/http.service'
import { LoadData } from '@/@core/decorator/loadData.decorator'
import { viewport } from '@/@core/decorator/viewport.decorator'

export class MainService {
  /**
   * @description 菜单列表
   * @description 获取所有菜单的层级关系
   */
  @LoadData({
    localPath: '/data/page/menu/header-menu.model.json'
  })
  MENU_ALL (query = {}, url = '') {
    return http.get(url, {})
  }

  @viewport()
  chartFor (value, geometry) {
    console.log(value)
  }

  @LoadData({
    localPath: '',
    servicePath: '/IPRT/pub/getUse.do',
    index: 1
  })
  getUserInfo(url = '') {
    return http.get(url, {})
  }

  @LoadData({
    localPath: '',
    servicePath: '/IPRT/pub/logout.do'
  })
  outSys (url = '') {
    return http.get(url, {})
  }

  @LoadData({
    localPath: '/data/page/main/main.json',
    servicePath: '/big/bigscreen/gateway/sfhhList.do'
  })
  getXFHH(params, path = '') {
    return http.get(path, {})
  }

  @LoadData({
    localPath: '',
    servicePath: '/big/bigscreen/getmiscellaneousdata.do'
  })
  getmiscellaneousdata(params, path = '') {
    return http.get(path, params)
  }

  @LoadData({
    localPath: '',
    servicePath: '/big/bigscreen/gateway/getReportList.do'
  })
  getMessageList(params, path = '') {
    return http.get(path, params)
  }

  // 大屏统计水库蓄水量
  @LoadData({
    localPath: '',
    servicePath: '/big/bigscreen/hhdt/getallResW.do'
  })
  getallResW(params, path = '') {
    if (params.AD_CD == '') {
      Reflect.deleteProperty(params,"AD_CD")
      return http.get(path, params)
    } else {
      return http.get(path, params)
    }
  }

  // 河湖动态
  @LoadData({
    localPath: '',
    servicePath: '/big/bigscreen/hhdt/statisticHLSZ.do'
  })
  statisticHLSZ(params, path = '') {
    if (params.AD_CD == '') {
      Reflect.deleteProperty(params,"AD_CD")
      return http.get(path, params)
    } else {
      return http.get(path, params)
    }
  }

  @LoadData({
    localPath: '',
    servicePath: '/big/bigscreen/gateway/getYinghusz.do'
  })
  getQuota(params, path = '') {
    return http.get(path, params)
  }
  // 河流面信息(小钢桥、羊尾、界牌沟)
  @LoadData({
    localPath: '',
    servicePath: '/big/bigscreen/hhdt/getRyBasicDm.do'
  })
  getRyBasicDm(params, path = '') {
    if (params.AD_CD == '') {
      Reflect.deleteProperty(params,"AD_CD")
      return http.get(path, params)
    } else {
      return http.get(path, params)
    }
  }
}
