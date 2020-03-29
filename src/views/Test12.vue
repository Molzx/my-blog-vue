<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-16 10:19:11
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-28 14:41:03
 * @FilePath     : \VueProjects\my-blog\src\views\Test12.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div>
    <!-- Something -->
    <v-btn depressed color="red" @click="loginGithub">Github</v-btn>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { openWindow, openWin } from '@/assets/js/fct'
import { afterLoginSuccess } from '@js/login'
export default {
  props: {
    //
  },
  data() {
    return {
      //
      loading: true,
      remmenber: true,
      myWindow: ''
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    loginGithub() {
      // 获取请求的地址  https://github.com/login/oauth/authorize？client_id=xxx
      let githubAuthorizeUrl =
        'http://127.0.0.1:8088/api/v1/auth/github/callback'
      let myWindow
      if (this.myWindow) {
        myWindow = this.myWindow
      }
      this.myWindow = openWin(githubAuthorizeUrl, 'Github登录', 5, 8, myWindow)
      // openWindow(githubAuthorizeUrl, 'github', 800, 640)
      window.addEventListener('message', this.loginGithubHandler, false)
    },
    loginGithubHandler(e) {
      let vm = this
      let result = e.data
      let token = result.token
      if (token) {
        // this.$store.dispatch('xxxx', e.data).then(res => {
        //   window.removeEventListener('message', this.loginGithubHandler, false)
        // })

        //整理数据
        afterLoginSuccess(vm, result)
        window.removeEventListener('message', this.loginGithubHandler, false)
      }
    }
  },
  computed: {
    //
  },
  watch: {
    //
  },
  components: {
    //
  }
}
</script>

<style>
/*  */
</style>
