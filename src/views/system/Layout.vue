<template>
  <v-sheet
    id="scrolling-system"
    v-resize="onResize"
    ref="sheet"
    color="transprant"
    class="overflow-y-auto"
    :max-height="windowSize.y - 1"
  >
    <!-- :max-height="windowSize.y - 1" -->
    <div ref="container" class="main-body ">
      <router-view></router-view>
    </div>
  </v-sheet>
</template>
<script>
// import { sidebarData, sidebarAnim, groupItemAnim } from '@js/sidebar'
import imgLocalUrl from '@static/images/avatar.jpg'
import styles from '@styles/color'
export default {
  name: 'system',
  data() {
    return {
      windowSize: {
        x: 0,
        y: 0
      },
      sheetBgColor: styles.bgcolor,
      drawer: true,
      sidebarOpen: true,
      sidebarOpenCount: 0,
      //设置列表的expand参数，为true时，列表不会自动折叠
      listExpand: true,
      itemActiveColor: 'side-list-item-active',
      groupActiveColor: 'side-list-item-active',
      mini: false,
      // routes: sidebarData,
      // imgUrl:'https://randomuser.me/api/portraits/men/85.jpg',
      imgUrl: imgLocalUrl
    }
  },
  mounted() {
    // console.log(styles)
    // this.$refs.sheet.color = styles.bgcolor
    //挂载浏览器高度获取方法
    this.onResize()
    // sidebarAnim(this)
  },
  methods: {
    //获取浏览器窗口大小，浏览器窗口发生改变时触发该函数
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight - 60 }
      // console.log(this.windowSize)
    },
    groupClick(event) {
      if (!this.sidebarOpen) {
        //获取点击对象
        var el = event.currentTarget
        if (el.getAttribute('aria-expanded') == 'false') {
          //侧栏关闭状态下，其列表处于关闭状态，点击打开时，开启动画
          // groupItemAnim(true, this)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" src="@styles/nav_sidebar.scss" scoped></style>
<style lang="scss" scoped>
>>> .side-ripple-color {
  color: #f57c00 !important;
  caret-color: #f57c00 !important;
}
</style>
