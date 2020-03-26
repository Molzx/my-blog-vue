<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-09 19:42:38
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-13 09:58:03
 * @FilePath     : \VueProjects\my-blog\src\components\core\RightFloatButton.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div>
    <div class="elevator">
      <div class="d-flex flex-column">
        <v-btn class="b-btn" tile text color="green">dd</v-btn>

        <v-divider class="mx-4"></v-divider>
        <v-tooltip
          left
          content-class="b-tooltip"
          color="white"
          light
          close-delay="0"
        >
          <template v-slot:activator="{ on }">
            <v-btn text style="" v-on="on" class="b-btn">
              <v-icon class="grey--text text--darken-3">fab fa-weixin</v-icon>
            </v-btn>
          </template>
          <div>
            <span class=" pt-2 text-center grey--text text--darken-3"
              >扫描关注我</span
            >
            <v-img
              class="my-4"
              height="150"
              width="150"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            ></v-img>
          </div>
        </v-tooltip>
        <v-divider class="mx-4"></v-divider>
        <v-tooltip
          left
          content-class="b-tooltip"
          color="white"
          light
          close-delay="0"
        >
          <template v-slot:activator="{ on }">
            <v-btn text style="" v-on="on" class="b-btn" @click="scrollToTop">
              <v-icon class="grey--text text--darken-3">fas fa-angle-up</v-icon>
            </v-btn>
          </template>
          <span class="grey--text text--darken-3">返回顶部</span>
        </v-tooltip>
        <!-- <v-btn class="" tile text color="green">dd</v-btn> -->
      </div>
    </div>
  </div>
</template>

<script>
import { scrollToTop } from '@/assets/js/scrolling'
export default {
  data() {
    return {
      initShowCatolog: true,
      showCatolog: false,
      toc: {
        dom: '*[data-toc]', // 文章内容元素 选择器 或 HTMLElement
        classNames: {
          // class选择器
          toc: 'toc',
          fxied: 'toc-fixed',
          brand: 'toc-brand',
          navbar: 'toc-navbar',
          hightlight: 'toc-hightlight',
          nav: 'toc-nav',
          link: 'toc-link',
          active: 'active',
          marginLeft1: 'ml-1',
          marginLeft2: 'ml-2',
          marginLeft3: 'ml-3',
          marginLeft4: 'ml-4',
          marginLeft5: 'ml-5',
          marginLeft6: 'ml-6'
        },
        brand: '目录',
        tocFixed: false,
        maxDepth: 6,
        autoScroll: true
      }
    }
  },
  mounted() {
    //
    this.showCatolog = true
  },
  methods: {
    scrollToTop() {
      scrollToTop(this)
    }
  },
  components: {},
  computed: {},

  watch: {
    // showCatolog() {
    //   if (this.showCatolog) {
    //     if (this.initShowCatolog) {
    //       //当子组件渲染完成后
    //       this.$nextTick(() => {
    //         this.initCatolog()
    //       })
    //       this.initShowCatolog = false
    //       console.log('in')
    //     } else {
    //       console.log('ins')
    //       //当子组件渲染完成后
    //       this.$nextTick(() => {
    //         this.reloadCatolog()
    //       })
    //     }
    //   } else {
    //     console.log('infalse')
    //   }
    // }
  }
}
</script>

<style>
.menuClass {
  /* height: 600px; */
  /* width: 300px; */
  /* overflow: hidden !important; */
  box-shadow: none !important;
}
.menu-toc-wrapper {
  width: 400px;
  height: 300px;
  /* overflow-y: auto; */
}
</style>
