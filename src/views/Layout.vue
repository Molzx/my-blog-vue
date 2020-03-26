<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 15:46:54
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-13 19:46:27
 * @FilePath     : \VueProjects\my-blog\src\views\Layout.vue
 * @Description  : 这是一些注释
 -->
<template>
  <!-- App.vue -->

  <v-app :class="getMainClass + ' ' + activeClass" class="app-container">
    <!-- <core-drawer v-if="isSystemPage"></core-drawer> -->
    <core-sidebar v-if="isSystemPage"></core-sidebar>
    <core-appbar-system v-if="isSystemPage"></core-appbar-system>
    <core-appbar-blog v-if="isBlogPage"></core-appbar-blog>

    <!-- <core-mobile-menu></core-mobile-menu> -->

    <!-- <core-bar></core-bar> -->
    <!-- Sizes your content based upon application components -->
    <v-content :class="getMainBackground" id="scrolling-1" class="app-content">
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="main-container fill-height">
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>
    <!-- 页脚 -->
    <core-footer v-if="isBlogPage"></core-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'blog',
  data() {
    return {
      drawerWidth: 250,
      activeClass: '',

      overlay: false,
      zIndex: 97,
      forbiddenScroll: false
    }
  },
  methods: {
    isActive() {
      console.log('hhh')
      if (this.drawerWidth == 250) {
        console.log('in')
        this.activeClass = ''
      } else {
        this.activeClass = 'active'
      }
    },
    changeOverlay() {
      this.overlay = !this.overlay
      this.forbiddenScroll = !this.forbiddenScroll
    }
  },
  computed: {
    ...mapGetters({
      getDrawerWidth: 'getDrawerWidthFun'
    }),

    //判断是否为system后台界面
    isSystemPage() {
      var path = this.$route.fullPath
      if (path.indexOf('system') != -1) {
        return true
      } else {
        return false
      }
    },

    //判断是否为Blog前端界面
    isBlogPage() {
      var path = this.$route.fullPath
      if (path.indexOf('blog') != -1) {
        return true
      } else {
        return false
      }
    },
    //判断是否为login 登录前端界面
    isLoginPage() {
      var path = this.$route.fullPath
      if (path.indexOf('login') != -1) {
        return true
      } else {
        return false
      }
    },
    getMainClass() {
      var mainClass = ''
      if (this.isBlogPage) {
        mainClass = 'blog'
      }
      if (this.isSystemPage) {
        mainClass = 'system'
      }
      return mainClass
    },
    getMainBackground() {
      var mainClass = ''
      if (this.isBlogPage) {
        mainClass = 'bg-6'
      }
      if (this.isSystemPage) {
        mainClass = 'bg-color-2'
      }
      if (this.isLoginPage) {
        mainClass = 'bg-13'
      }
      return mainClass
    }
  },
  components: {},
  watch: {
    getDrawerWidth: {
      handler(newVal) {
        console.log(newVal)
        this.drawerWidth = newVal
        this.isActive()
      },
      deep: true
    },

    forbiddenScroll(newVal) {
      if (newVal == true) {
        console.log('gaibian l ')

        let cssStr = 'overflow-y: hidden; height: 100%;'
        document.getElementsByTagName('html')[0].style.cssText = cssStr
        document.body.style.cssText = cssStr
      } else {
        let cssStr = 'overflow-y: auto; height: auto;'
        document.getElementsByTagName('html')[0].style.cssText = cssStr
        document.body.style.cssText = cssStr
      }

      // 下面需要这两行代码，兼容不同浏览器
      document.body.scrollTop = this.pageScrollYoffset
      window.scroll(0, this.pageScrollYoffset)
    }
  }
}
</script>

<style lang="scss">
@import '@/scss/variables.scss';
</style>
