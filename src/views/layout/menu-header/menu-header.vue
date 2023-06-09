<template>
  <el-menu :default-active="activeIndex"
           class="el-menu-demo"
           mode="horizontal"
           @select="handleSelect">
    <template v-for="(item, index) in menuList">
      <el-menu-item v-if="item.levels === 1 || item.levels > 2"
                    :index="item.id"
                    :key="index">
        {{item.name}}
      </el-menu-item>
      <el-submenu v-if="item.levels === 2"
                  :index="item.id"
                  :key="index">
        <template slot="title">
          <i :class="item.icon"></i>{{item.name}}
        </template>
        <el-menu-item v-for="(child, index) in item.children"
                      :index="child.id"
                      :key="index">
          <i :class="child.icon"></i>{{child.name}}
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "MenuHeader",
  data () {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    ...mapState('p8app/menu', [
      'menu'
    ]),
    menuList () {
      return this.menuEach(this.menu)
    }
  },
  watch: {
    $route: {
      // 处理通过地址栏输入时头部菜单选中及相关.
      handler (newVal, oldVal) {
        if (!oldVal) {
          const path = newVal.path.split('/').filter(value => value !== "")
          if (path.length > 2) {
            const menu = this.menuList.find(item => item.path === path[0])
            this.asideSet(menu.children)
            this.$store.dispatch('p8app/menu/showSet', true)
          } else {
            this.$store.dispatch('p8app/menu/showSet', false)
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('p8app/menu',
      ['asideSet', 'showSet']
    ),
    handleSelect (key, path) {
      // 二级菜单时
      if (path.length > 1) {
        const parent = this.menuList.find(item => item.id === path[0]).children
        const menu = parent.find(item => item.id === key)
        this.showSet(false)
        this.$router.push(menu.url)
        return
      }

      // 一级菜单和有侧边栏菜单处理
      const menu = this.menuList.find(item => item.id === key)
      if (menu.levels > 2) {
        this.asideSet(menu.children)
        this.showSet(true)
      } else {
        this.showSet(false)
        this.$router.push(menu.url)
      }
    },

    /**
     * 检查设置菜单的级别.
     * @param menuList 系统菜单.
     */
    menuEach (menuList) {
      menuList.forEach((item, index) => {
        // 说明有子菜单: 2级 和 3级
        if (item.children.length > 0) {
          // 是否是3级菜单.
          if (this.menuThree(item.children)) {
            item.levels = 3
          } else {
            item.levels = 2
          }
        } else {
          item.levels = 1
        }
      })
      return menuList
    },

    menuThree (menuList) {
      const three = menuList.some((item) => {
        return item.children.length > 0
      })
      return three
    }
  }
}
</script>

<style scoped>
  .el-menu-item {
    padding: 0;
    margin: 0 10px;
  }
  .el-submenu {
    margin: 0 10px;
  }
  /deep/ .el-submenu__title {
    padding: 0;
  }
</style>
