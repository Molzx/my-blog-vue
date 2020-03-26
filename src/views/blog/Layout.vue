<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 20:40:58
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-13 15:19:06
 * @FilePath     : \VueProjects\my-blog\src\views\blog\Layout.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-container
    fluid
    grid-list-xl
    class="py-6 px-0"
    style="width:1111px"
    v-scroll="onScroll"
  >
    <!-- 浮动按钮组 -->
    <!-- <v-fab-transition>
      <page-blog-right-float-group
        v-show="!rightFloatHidden"
      ></page-blog-right-float-group>
    </v-fab-transition> -->
    <!-- 浮动按钮组 -->
    <v-fab-transition>
      <core-back-to-top-button
        v-show="!rightFloatHidden"
      ></core-back-to-top-button>
    </v-fab-transition>
    <v-slide-x-reverse-transition mode="out-in">
      <router-view v-wechat-title="webTitle"></router-view>
    </v-slide-x-reverse-transition>
  </v-container>
</template>

<script>
export default {
  name: 'blog-page',
  data() {
    return {
      rightFloatHidden: true
    }
  },
  methods: {
    //屏幕滚动方法
    onScroll(e) {
      let top = e.target.scrollingElement.scrollTop
      let show = parseInt(top) >= 150
      if (show) {
        this.rightFloatHidden = false
      } else {
        this.rightFloatHidden = true
      }
    }
  },
  computed: {
    //
    webTitle() {
      let title = this.$route.meta.title
      let data = this.$route.query.params
      if (data) {
        title = title + ' : ' + data
      }
      return title
    }
  },
  watch: {
    //
  },
  components: {}
}
</script>

<style></style>
