<template>
  <div class="menu-side">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :unique-opened="unique"
      @select="handleSelect">
      <menu-item :menu-item="aside"></menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuItem from './menu-item'
import _ from 'lodash'
import { GLOBAL_DEFAULT_CONFIG } from '@/@core/data/global.config'
export default {
  name: "MenuSide",
  components: {MenuItem},
  data () {
    return {
      unique: true
    }
  },
  computed: {
    ...mapState('p8app/menu', [
      'aside'
    ])
  },
  created () {
    this.$router.push(this.pageSide())
  },
  methods: {
    handleSelect (key, keyPath) {
      const menu = this.findMenuByID(key, keyPath, this.menuList)
      if (menu.children < 1) {
        this.$router.push(menu.url)
      }
    },
    findMenuByID (key, keyPath) {
      let currentMenu = this.aside
      keyPath.forEach(function (value) {
        const current = _.find(currentMenu, ["id", value])
        currentMenu = current.children && current.children.length > 0 ? current.children : current
      })
      return currentMenu
    },
    // 侧边栏首栏路由地址.
    pageSide () {
      let option = ['0']
      let item = {}
      for (let i = 0; i < GLOBAL_DEFAULT_CONFIG.side_levels; i++) {
        option = option.concat(['children', '0'])
        const each = _.get(this.aside, option)
        if (!each) {
          break
        }
        item = each
      }

      if (Object.keys(item).length < 1) {
        item = _.get(this.aside, ['0'])
      }
      return item.url
    }
  }
}
</script>

<style scoped>
  >>> .el-submenu__title:hover {
    background-color: rgb(67, 74, 80);
  }
</style>
