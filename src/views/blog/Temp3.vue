<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-10 11:58:24
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-10 16:34:42
 * @FilePath     : \VueProjects\my-blog\src\views\blog\Temp3.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div class="body" ref="body">
    <div class="nav-but-wrap">
      <div class="menu-icon hover-target" @click="change" ref="icon">
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

    <div class="section full-height over-hide">
      <div class="switch-wrap">
        <h1>Drop-down menu</h1>
        <div id="switch" class="hover-target" @click="switchTheme" ref="switch">
          <div id="circle"></div>
        </div>
        <p><span>dark</span> - <span>light</span></p>
      </div>
      <div class="wrapper">
        <h1>Hamburger Icons Animations</h1>
        <div class="icon nav-icon-1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="icon nav-icon-2">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="icon nav-icon-3">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="icon nav-icon-4">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="icon nav-icon-5">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="icon nav-icon-6">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="icon nav-icon-7">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="icon nav-icon-8">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <!-- <v-btn absolute left top @click="change"></v-btn> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //NavMenu相关
      activeNavMenu: 0,
      navMenuShadow: false
    }
  },
  mounted() {
    this.init()
    this.iconClick()
  },
  methods: {
    init() {},
    change() {
      //
      let el = this.$refs.body
      console.log(el)
      this.toggleClass(el, 'nav-active')
      this.toggleClass(this.$refs.icon, 'open')
      // .classList.toggle('open')
    },
    switchTheme() {
      let body = this.$refs.body
      let switchEl = this.$refs.switch
      let stringClass = 'light'
      if (body.classList.contains(stringClass)) {
        body.classList.remove(stringClass)
        switchEl.classList.remove('switched')
      } else {
        body.classList.add(stringClass)
        switchEl.classList.add('switched')
      }
    },
    iconClick() {
      //
      // const icons = document.querySelectorAll('.icon')
      // icons.forEach(icon => {
      //   icon.addEventListener('click', () => {
      //     icon.classList.toggle('open')
      //   })
      // })
    },
    toggleClass(el, stringClass) {
      if (el.classList.contains(stringClass)) {
        el.classList.remove(stringClass)
      } else {
        el.classList.add(stringClass)
      }
    },
    openMenu() {
      let menu = this.$refs.menu
      let iconMenu = this.$refs.iconMenuSwitch
      if (menu.classList.contains('open')) {
        menu.classList.add('close')
        iconMenu.classList.remove('icon-closed')

        setTimeout(function() {
          menu.classList.remove('open')
        }, 1300)
      } else {
        menu.classList.remove('close')
        menu.classList.add('open')
        iconMenu.classList.add('icon-closed')
      }
    },
    openSubmenu(event) {
      if (event.currentTarget.classList.contains('active')) {
        event.currentTarget.classList.remove('active')
      } else {
        event.currentTarget.classList.add('active')
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped src="@styles/blog/_mobile_menu.scss"></style>
<style lang="scss" scoped src="@styles/blog/_hamburger_icons.scss"></style>
<style></style>
