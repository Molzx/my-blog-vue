<!--
 * @Author       : xuzhenghao
 * @Date         : 2019-12-08 16:50:21
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-18 21:05:39
 * @FilePath     : \VueProjects\blog\src\views\Home.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-content class="myBackground">
    <v-app-bar
      color="white"
      class="navShadow mx-auto"
      height="60"
      light
      scroll
      style="padding: 0px 16px;"
    >
      <v-layout row wrap align-center justify-center fill-height class="mx-12">
        <core-navmenu
          :shadow="navMenuShadow"
          :active="activeNavMenu"
        ></core-navmenu>

        <div v-if="isLogin">
          <v-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </div>
        <div v-else>
          <a class="nav-link" href="#">登录</a>
        </div>
      </v-layout>
    </v-app-bar>
    <v-container class="pt-10" style="height: 1000px;">
      <v-sheet
        class="d-flex myCard"
        color="grey lighten-3"
        height="424"
      ></v-sheet>
    </v-container>
  </v-content>
</template>

<script>
// @ is an alias to /src
// import NavMenu from '@/components/NavMenu.vue'

export default {
  name: 'home',

  data() {
    return {
      //NavMenu相关
      activeNavMenu: 0,
      navMenuShadow: false,
      //本页面
      isLogin: false
    }
  },
  components: {
    // NavMenu
  }
}
</script>
