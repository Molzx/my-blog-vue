<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 14:01:53
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-19 23:09:52
 * @FilePath     : \VueProjects\my-blog\src\App.vue
 * @Description  : 主页应用
 -->
<template>
  <!-- <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div> -->

  <v-app>
    <v-content class="myBackground">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  components: {}
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
