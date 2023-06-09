import storage from '@/@core/utils/storage'
import {Notification} from 'element-ui'
import _ from 'lodash'

const notify = {
  error (options) {
    const warn = {
      title: '错误',
      message: '系统错误',
      position: 'bottom-right',
      onClose: res => {
        storage.remove("notify")
      }
    }
    const option = _.defaults(options || {}, warn)
    const notify = storage.get("notify")
    if (!notify) {
      storage.save("notify", true)
      Notification.error(option)
    }
  },
  warning (options) {
    const warn = {
      title: '警告',
      message: '系统问题',
      position: 'bottom-right',
      onClose: res => {
        storage.remove("notify")
      }
    }
    const option = _.defaults(options || {}, warn)
    const notify = storage.get("notify")
    if (!notify) {
      storage.save("notify", true)
      Notification.warning(option)
    }
  },
  success () {}
}

export default notify
