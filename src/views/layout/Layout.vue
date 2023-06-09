<template>
  <el-container>
    <!--<el-header height="4.167vw">-->
      <!--<menu-header @select="menuSelect"></menu-header>-->
    <!--</el-header>-->
    <el-container v-if="!show">
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-container v-if="show">
      <!--<el-aside width="13.417vw">-->
        <!--<menu-side></menu-side>-->
      <!--</el-aside>-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuHeader from './menu-header/menu-header'
import MenuSide from './menu-side/menu-side'
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  components: {
    MenuHeader,
    MenuSide
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('p8app/menu', [
      'show'
    ])
  },
  methods: {
    menuSelect (show) {
      this.show = show
    }
  }
}
</script>

<style lang="scss">
  .el-header {
    padding: 0;
    display: flex;
    align-items: center;
  }

  .el-aside {
    text-align: center;
    height: calc(100vh - 60px);
  }

  .el-main {
    height: calc(100vh);
    padding: 0;
    &::-webkit-scrollbar {
      width: 0;
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(42, 59, 156, 1);
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }
</style>
