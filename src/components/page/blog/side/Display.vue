<template>
  <v-row
    class="flex-column ma-0"
    align="center"
    v-scroll="onScroll"
    v-resize="onResize"
  >
    <!-- ====推荐文章内容开始== -->
    <v-col
      class="px-0"
      v-if="isArticleDetailPage"
      ref="sideCatolog"
      :class="isfixed['sideCatolog'] ? 'js-fixed' : ''"
    >
      <v-slide-y-transition>
        <page-blog-side-catolog
          v-show="getArticleFloatGroup"
        ></page-blog-side-catolog>
      </v-slide-y-transition>

      <page-blog-side-article
        type="recommand"
        :sideArticleItems="sideRecArticleItems"
        :loading="otherData.sideRecArticleLoading"
      ></page-blog-side-article>
    </v-col>
    <!-- ====推荐文章内容开始== -->
    <v-col
      class="px-0"
      v-if="sideListShow[0]"
      :order="otherData.sideListOrder[0]"
    >
      <page-blog-side-article
        type="recommand"
        :sideArticleItems="sideRecArticleItems"
        :loading="otherData.sideRecArticleLoading"
      ></page-blog-side-article>
    </v-col>
    <!-- 分类内容开始 -->
    <v-col
      class="px-0"
      v-if="sideListShow[1]"
      :order="otherData.sideListOrder[1]"
    >
      <page-blog-side-category
        :sideCategoryItems="sideCategoryItems"
        :otherData="otherData"
      ></page-blog-side-category>
    </v-col>

    <!-- ====分类结束，标签内容开始== -->
    <v-col
      class="px-0"
      v-if="sideListShow[2]"
      :order="otherData.sideListOrder[2]"
    >
      <page-blog-side-tag
        :sideTagItems="sideTagItems"
        :otherData="otherData"
      ></page-blog-side-tag>
    </v-col>

    <!-- ====标签内容结束，最新文章内容开始== -->
    <v-col
      v-if="sideListShow[3]"
      :order="otherData.sideListOrder[3]"
      class="px-0"
      ref="sideRecArticle"
      :class="fixedRecArticle ? 'js-fixed' : ''"
    >
      <page-blog-side-article
        type="new"
        :sideArticleItems="sideNewArticleItems"
        :loading="otherData.sideNewArticleLoading"
      ></page-blog-side-article>
      <!-- <page-blog-side-new-article></page-blog-side-new-article> -->
    </v-col>
    <!-- ====公告内容开始== -->
    <v-col
      class="px-0"
      v-if="sideListShow[4]"
      :order="otherData.sideListOrder[4]"
    >
      <page-blog-side-announcement
        type="announcement"
      ></page-blog-side-announcement>
    </v-col>

    <!-- ====最高浏览量文章内容开始== -->
    <v-col
      class="px-0"
      v-if="sideListShow[5]"
      :order="otherData.sideListOrder[5]"
    >
      <page-blog-side-article
        type="top-view"
        :sideArticleItems="sideTopViewArticleItems"
        :loading="otherData.sideTopViewArticleLoading"
      ></page-blog-side-article>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    //

    //主栏当前页记录数
    mainSize: {
      type: Number
    },
    sideRecArticleItems: {
      type: Array
    },
    sideCategoryItems: {
      type: Array
    },
    sideTagItems: {
      type: Array
    },
    sideNewArticleItems: {
      type: Array
    },
    sideTopViewArticleItems: {
      type: Array
    },
    otherData: {
      type: Object,
      default: () => {
        return {
          sideRecArticleLoading: true,
          sideCategoryLoading: true,
          sideTagLoading: true,
          sideNewArticleLoading: true,
          sideTopViewArticleLoading: true,

          //展示顺序
          sideListOrder: [5, 10, 15, 20, 2, 1],
          //展示的组件
          sideListShow: [true, true, true, true, true, true]
        }
      }
    }
  },
  data() {
    return {
      //,
      windowSize: {
        x: 0,
        y: 0
      },
      isfixed: {
        sideCatolog: false,
        sideRecArticle: false
      },
      // isfixed: false,
      top: 0,
      width: 0,

      //展示的组件
      sideListShow: [true, true, true, true],

      //waypoint 配置
      //默认waypoint 会触发两次
      pointTopCount: 0,
      pointBottomCount: 1,
      intersectionOptions: {
        //用作视口的元素，用于检查目标的可见性。必须是目标的祖先。如果未指定，则默认为浏览器视口null
        root: null,
        //范围为 0-1: 阈值为1.0意味着当100％的目标在root选项指定的元素中可见时，将调用回调
        rootMargin: '0px 0px 0px 0px',
        threshold: [0.4] // [0.25, 0.75] if you want a 25% offset!
      } // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    }
  },
  mounted() {
    //
    this.onResize()
  },
  methods: {
    //屏幕窗口大小变化
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    //屏幕滚动方法
    // eslint-disable-next-line no-unused-vars
    onScroll(e) {
      let top = e.target.scrollingElement.scrollTop
      // let pd=this.$refs.sideArticle.offsetTop
      var optEl
      var optFixed
      if (this.isArticleDetailPage) {
        optEl = this.$refs.sideCatolog
        // console.log(optEl)
        optFixed = 'sideCatolog'
      } else {
        optEl = this.$refs.sideRecArticle
        optFixed = 'sideRecArticle'
      }
      let pd =
        optEl.getBoundingClientRect().top + document.documentElement.scrollTop
      // console.log(top)
      // console.log(pd)
      if (this.isfixed[optFixed] == false) {
        if (top < pd) {
          this.isfixed[optFixed] = false
          // console.log('pd')
        } else {
          // console.log('hh')
          this.top = pd
          this.width = optEl.offsetWidth
          optEl.style.width = this.width + 'px'
          // this.$refs.sideRecArticle.style.width = this.width + 'px'
          this.isfixed[optFixed] = true
          // console.log(ths.isfixed)
        }
      } else {
        // console.log('innn')
        if (top < this.top) {
          this.isfixed[optFixed] = false
        }
      }
    },

    //评论区域位置监听
    // eslint-disable-next-line no-unused-vars
    onWaypoint({ el, going, direction, _entry }) {
      // going: in, out
      // direction: top, right, bottom, left
      if (going === this.$waypointMap.GOING_IN) {
        console.log('waypoint going in!') //激活-出现了
      }
      if (going === this.$waypointMap.GOING_OUT) {
        console.log('waypoint going out!')
      }
      if (direction === this.$waypointMap.DIRECTION_TOP) {
        // console.log('waypoint going top!')
        let count = ++this.pointTopCount
        console.log('top:' + count)

        //第一次出现隐藏
        // this.setArticleFloatGroup(false)
        if (count == 1) {
          //第一次出现隐藏
          this.pointBottomCount = 1

          let optEl = this.$refs.sideCatolog
          let optFixed = 'sideCatolog'

          this.width = optEl.offsetWidth
          optEl.style.width = this.width + 'px'
          this.isfixed[optFixed] = true
        } else {
          this.pointTopCount = count % 2
          this.pointBottomCount = 0
        }
      }
      if (direction === this.$waypointMap.DIRECTION_BOTTOM) {
        // console.log('waypoint going bottom!')
        // this.setArticleFloatGroup(true)
        let count = ++this.pointBottomCount
        console.log('bottom:' + count)
        //第二次出现显示
        // this.setArticleFloatGroup(true)
        if (count == 2) {
          //第二次出现显示

          this.isfixed['sideCatolog'] = false

          this.pointBottomCount = count % 2
          this.pointTopCount = 0
        }
      }
      // if (direction === this.$waypointMap.DIRECTION_LEFT) {
      //   console.log('waypoint going left!')
      // }
    }
  },
  computed: {
    //

    ...mapGetters({
      getArticleFloatGroup: 'getArticleFloatGroupFun'
    }),
    //判断是否为文章详情前端界面
    isArticleDetailPage() {
      var path = this.$route.fullPath
      if (path.indexOf('articles') != -1) {
        return true
      } else {
        return false
      }
    },
    //判断是否为时间线前端界面
    isTimelinePage() {
      var path = this.$route.fullPath
      if (path.indexOf('archive') != -1) {
        return true
      } else {
        return false
      }
    },
    //判断是否为分类前端界面
    isCategoryPage() {
      var path = this.$route.fullPath
      if (path.indexOf('categories') != -1) {
        return true
      } else {
        return false
      }
    },
    //判断是否为标签前端界面
    isTagPage() {
      var path = this.$route.fullPath
      if (path.indexOf('tags') != -1) {
        return true
      } else {
        return false
      }
    },
    fixedRecArticle() {
      return this.isfixed['sideRecArticle']
    }
  },
  watch: {
    //
    'otherData.sideListShow': {
      handler(newVal) {
        this.sideListShow = newVal
      },

      immediate: true
    },
    mainSize(newVal) {
      console.log(newVal)
      console.log('newVal:' + this.windowSize.x)
      if (newVal) {
        //
        if (this.windowSize.x > 1111) {
          let count = 0
          this.otherData.sideListShow.forEach(el => {
            if (el) {
              count = count + 1
            }
          })
          let arr = this.otherData.sideListShow
          let length = arr.length
          this.sideListShow = arr
          if (newVal < 3) {
            //最多显示一个组件

            if (count > 1) {
              this.sideListShow = [false, false, false, false]
              let i
              for (let j = 0; j < length; j++) {
                if (arr[j]) {
                  i = j
                  break
                }
              }
              this.sideListShow[i] = true
            }
          } else if (newVal < 4) {
            //最多显示二个组件

            if (count > 2) {
              this.sideListShow = [false, false, false, false]
              let i = []
              let tmp = 0

              for (let j = 0; j < length; j++) {
                if (arr[j]) {
                  i[tmp] = j
                  tmp++
                  if (tmp == 2) {
                    break
                  }
                }
              }
              this.sideListShow[i[0]] = true
              this.sideListShow[i[1]] = true
            }
          } else if (newVal < 6) {
            //最多显示三个组件

            if (count > 3) {
              this.sideListShow = [true, true, true, true]
              let i

              for (let j = 0; j < length; j++) {
                if (!arr[j]) {
                  i = j
                  break
                }
              }
              this.sideListShow[i] = false
            }
          }
        }
      }
    }
  },
  components: {
    //
  }
}
</script>

<style>
/*  */
</style>
