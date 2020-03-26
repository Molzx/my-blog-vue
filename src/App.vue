<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 14:01:53
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-13 17:36:52
 * @FilePath     : \VueProjects\my-blog\src\App.vue
 * @Description  : 主页应用
 -->
<template>
  <!-- <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div> -->
  <router-view></router-view>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'app',
  components: {},
  created() {},

  mounted() {
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('unload', () => {
      this.saveData()
      // sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
  methods: {
    ...mapActions({
      saveCurrentSubPage: 'saveCurrentSubPageFun',
      saveCurrentBlogData: 'saveCurrentBlogDataFun'
    }),
    saveData() {
      this.saveCurrentSubPage()
      this.saveCurrentBlogData()
    }
  },
  computed: {}
}
</script>

<style lang="scss">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
