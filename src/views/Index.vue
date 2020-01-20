<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 15:46:54
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-18 16:09:04
 * @FilePath     : \VueProjects\my-blog\src\views\Index.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-content class="myBackground">
    <v-app-bar
      color="white"
      class="myShadow mx-auto"
      height="64"
      light
      hide-on-scroll
    >
      <v-layout row wrap align-center justify-center fill-height class="mx-12">
        <header>
          <div class="bar"></div>
          <div class="overlay"></div>
          <nav>
            <a href="#" class="brand">Brand</a>
            <ul>
              <li class="nav-item">
                <a href="#" class="nav-link" data-text="Home">Home</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" data-text="About">About</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" data-text="Portfolio">Portfolio</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" data-text="Services">Services</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" data-text="Contact">Contact</a>
              </li>
            </ul>
          </nav>
        </header>
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
export default {
  name: 'index',
  data() {
    return {}
  },
  methods: {},
  mounted() {
    let dm = document.querySelector('.menu')
    let dh = document.querySelector('header')
    let ddo = document.querySelector('.overlay')
    dm.addEventListener('click', function() {
      this.classList.toggle('open')
      dh.classList.toggle('open')
      ddo.classList.toggle('open')
    })
  },
  components: {}
}
</script>

<style lang="scss" scoped src="@styles/nav.scss"></style>
<style lang="scss" scoped>
.myCard {
  background: #fff;
  box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.05) !important;
  border-radius: 12px;
  box-sizing: border-box;
}
</style>
