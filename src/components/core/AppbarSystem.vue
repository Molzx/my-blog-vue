<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-08 10:44:30
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-08 16:00:04
 * @FilePath     : \VueProjects\my-blog\src\components\core\Appbar.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-app-bar height="60" app scroll-target="#scrolling-system" class="appbar">
    <!-- <div class="appbar__logo d-flex justify-center">
      <router-link to="/system">
        <img height="50" src="../../assets/images/logo.svg" />
      </router-link>

      <v-app-bar-nav-icon
        class="ml-3"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
    </div>
    <div class="d-flex align-center">
      <div
        class="hamburger-wrapper-1"
        style="width:20px;height:20px"
        @click="clickHamburger($event)"
      >
        <div class="line-menu half start"></div>
        <div class="line-menu"></div>
        <div class="line-menu half end"></div>
      </div>
    </div> -->
    <!-- <div class="wrapper">
      <div class="top-navbar">
        <div class="logo">
          <a href="#">Nai Cha</a>
        </div>
        <div class="top-menu">
          <div class="home-link">
            <a href="#">
              <span class="icon"><i class="fas fa-home"></i></span>
              <span>Home</span>
            </a>
          </div>
          <v-spacer></v-spacer>
          <div class="right-info">
            <div class="test">nihao</div>
            <div class="icon-wrap">
              <div class="icon">
                <i class="fas fa-bell"></i>
              </div>
            </div>
            <div class="icon-wrap">
              <div class="icon">
                <i class="fas fa-cog"></i>
              </div>
            </div>
          </div>
          <v-avatar size="40">
            <img :src="imgUrl" alt="John" />
          </v-avatar>
        </div>
      </div>
    </div> -->
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    clickHamburger(event) {
      //
      var el = event.currentTarget
      el.classList.toggle('open')
      // console.log(el)
    }
  },
  components: {}
}
</script>

<style lang="scss" src="@styles/other/hamburger.scss" scoped></style>
<style></style>
