<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-row>
      <el-button type="primary" @click="submit">用户登录</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'Login',
  created () {
    // this.logout()
    // this.isLoadedSet(false)
  },
  methods: {
    ...mapActions('p8app/user', [
      'login',
      'logout'
    ]),
    ...mapMutations('p8app/permission', [
      'isLoadedSet'
    ]),
    submit () {
      this.login({
        username: "",
        password: "",
        to: this.$route.query.redirect || '/'
      })
    }
  }
}
</script>
