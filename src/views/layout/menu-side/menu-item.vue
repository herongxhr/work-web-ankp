<template>
  <div class="menu-wrapper">
    <template v-for="(item, index) in menuItem">
      <el-menu-item v-if="!item.children || item.children.length < 1"
                    :index="item.id"
                    :key="index">
        <i :class="item.icon"></i>
        <span slot="title"
              :alt="item.path">
          {{item.name}}
        </span>
      </el-menu-item>
      <el-submenu v-else :index="item.id" :key="index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <template>
          <menu-item :menu-item="item.children"></menu-item>
        </template>
      </el-submenu>
    </template>
  </div>

</template>

<script>

export default {
  name: "MenuItem",
  props: {
    menuItem: {
      type: Array
    }
  }
}
</script>

<style scoped lang="scss">

</style>
