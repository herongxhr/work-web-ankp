import http from '@/@core/services/http.service'
import { LoadData } from '@/@core/decorator/loadData.decorator'

export class Menu {
  /**
   * @description 菜单列表
   * @description 获取所有菜单的层级关系
   */
  @LoadData({
    localPath: '/data/page/menu/header-menu.model.json',
    servicePath: '/getMenu',
    visitLocale: true
  })
  MENU_ALL (query = {}, url = '') {
    return http.get(url, {})
  }
}
