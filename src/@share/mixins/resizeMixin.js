// 屏幕适配 mixin 函数
import throttle from 'lodash/throttle'
import {GLOBAL_DEFAULT_CONFIG} from '@/@core/data/global.config'

const scale = {
  width: '1',
  height: '1'
}

export default {
  mounted () {
    window.addEventListener('resize', throttle(() => {
      this.calcRate()
    }, 200))
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcRate())
  },
  methods: {
    calcRate () {
      const scaleRef = this.$refs["scaleRef"]
      const viewRef = this.$refs["viewRef"]
      if (!scaleRef) return

      // 换算：换算的原则是
      const baseProportion = parseFloat((GLOBAL_DEFAULT_CONFIG.viewport_width / GLOBAL_DEFAULT_CONFIG.viewport_height).toFixed(5))
      scale.height = parseFloat(((window.innerWidth / baseProportion) / GLOBAL_DEFAULT_CONFIG.viewport_height).toFixed(5))
      scale.width = parseFloat((window.innerWidth / GLOBAL_DEFAULT_CONFIG.viewport_width).toFixed(5))
      scaleRef.style.transform = `scale(${scale.width}, ${scale.height})`
      viewRef.style.height = `${scaleRef.offsetHeight * scale.height}px`
    }
  }
}
