<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-10 18:03:11
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-10 19:08:00
 * @FilePath     : \VueProjects\my-blog\src\components\core\mobileMenu.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div class="body light" ref="body">
    <div class="nav-but-wrap">
      <div class="menu-icon hover-target" @click="showMenu" ref="icon">
        <span class="menu-icon__line menu-icon__line-left"></span>
        <span class="menu-icon__line"></span>
        <!-- <span class="menu-icon__line"></span> -->
        <span class="menu-icon__line menu-icon__line-right"></span>
      </div>
    </div>
    <div class="nav">
      <div class="nav__content">
        <ul class="nav__list">
          <li class="nav__list-item active-nav">
            <a href="#" class="hover-target">Home</a>
          </li>
          <li class="nav__list-item">
            <a href="#" class="hover-target">Portfolio</a>
          </li>
          <li class="nav__list-item">
            <a href="#" class="hover-target">Studio</a>
          </li>
          <li class="nav__list-item">
            <a href="#" class="hover-target">News</a>
          </li>
          <li class="nav__list-item">
            <a href="#" class="hover-target">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    showMenu() {
      //
      // console.log(this.$parent.$parent.changeOverlay)
      let el = this.$refs.body
      // console.log(el)
      // this.toggleClass(el, 'nav-active')
      // this.toggleClass(this.$refs.icon, 'open')
      // .classList.toggle('open')
      el.classList.toggle('nav-active')
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped src="@styles/blog/_mobile_menu.scss"></style>
<style></style>
