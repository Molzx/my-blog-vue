<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-12 20:09:16
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-28 18:47:11
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\Detail\Article.vue
 * @Description  : 这是一些注释
 -->
<template>
  <!-- 位置监听 -->
  <div>
    <v-card style="border-radius:12px" class="shadow-1  mb-6">
      <v-skeleton-loader
        v-if="loading"
        type="image"
        height="380"
        class="none-b-radius"
      ></v-skeleton-loader>
      <v-img
        v-else
        class="white--text align-end lighten-2"
        height="380px"
        :src="$cover(articleInfo.cover)"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="green lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-card-text :class="loading ? '' : 'pt-0'">
        <div v-if="loading">
          <v-skeleton-loader type="article"></v-skeleton-loader>

          <v-skeleton-loader type="list-item"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
          <v-skeleton-loader type="card-heading"></v-skeleton-loader>

          <v-skeleton-loader type="list-item"></v-skeleton-loader>
          <v-skeleton-loader type="list-item"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
        </div>
        <div>
          <mavon-editor
            v-if="article"
            v-model="article.mdContent"
            :subfield="false"
            :defaultOpen="'preview'"
            :toolbarsFlag="false"
            :editable="false"
            :scrollStyle="true"
            :ishljs="true"
            :boxShadow="false"
            codeStyle="atom-one-light"
            previewBackground="#fff"
            @change="change"
            class="article-wrapper"
          />
          <!-- <div data-toc="#toc" class="html-text-wrapper">
            <div v-html="articleContent"></div>
          </div> -->
        </div>
      </v-card-text>
      <!-- 页脚信息 -->
      <page-blog-article-footer
        :categoryInfo="categoryInfo"
        :tagItems="articleInfo.tags"
        :footerData="footerData"
      ></page-blog-article-footer>
    </v-card>
    <!-- 赞赏信息 -->
    <page-blog-article-donate></page-blog-article-donate>

    <!-- 添加评论 -->
    <page-blog-detail-comment
      :commentData="commentData"
      v-waypoint="{
        active: true,
        callback: onWaypoint,
        options: intersectionOptions
      }"
    ></page-blog-detail-comment>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

//加载toc-helper
import 'toc-helper/css/toc-helper.min.css'
import TocHelper from 'toc-helper'
export default {
  props: {
    articleInfo: {
      type: Object
    }
  },
  data() {
    return {
      article: '',
      articleContent: '',
      loading: true,
      //评论相关信息
      commentData: {},
      //分类信息
      categoryInfo: {},
      //页脚信息
      footerData: {},
      //waypoint 配置
      //默认waypoint 会触发两次
      pointTopCount: 0,
      pointBottomCount: 1,
      intersectionOptions: {
        //用作视口的元素，用于检查目标的可见性。必须是目标的祖先。如果未指定，则默认为浏览器视口null
        root: null,
        //范围为 0-1: 阈值为1.0意味着当100％的目标在root选项指定的元素中可见时，将调用回调
        rootMargin: '0px 0px 0px 0px',
        threshold: [0.3] // [0.25, 0.75] if you want a 25% offset!
      } // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    }
  },
  mounted() {
    //
    // this.initCatolog()
    this.setArticleFloatGroup(true)
  },
  methods: {
    ...mapActions({
      setArticleFloatGroup: 'setArticleFloatGroupFun',

      //设置文章是否加载完毕
      setArticlePreviewSuccess: 'setArticlePreviewSuccessFun'
    }),
    //评论区域位置监听
    // eslint-disable-next-line no-unused-vars
    onWaypoint({ el, going, direction, _entry }) {
      // going: in, out
      // direction: top, right, bottom, left
      // if (going === this.$waypointMap.GOING_IN) {
      //   console.log('waypoint going in!') //激活-出现了
      // }
      // if (going === this.$waypointMap.GOING_OUT) {
      //   console.log('waypoint going out!')
      // }
      if (direction === this.$waypointMap.DIRECTION_TOP) {
        // console.log('waypoint going top!')
        let count = ++this.pointTopCount
        // console.log('top:' + count)

        //第一次出现隐藏
        // this.setArticleFloatGroup(false)
        if (count == 1) {
          //第一次出现隐藏
          this.setArticleFloatGroup(false)
          this.pointBottomCount = 1
        } else {
          this.pointTopCount = count % 2
          this.pointBottomCount = 0
        }
      }
      if (direction === this.$waypointMap.DIRECTION_BOTTOM) {
        // console.log('waypoint going bottom!')
        // this.setArticleFloatGroup(true)
        let count = ++this.pointBottomCount
        // console.log('bottom:' + count)
        //第二次出现显示
        // this.setArticleFloatGroup(true)
        if (count == 2) {
          //第二次出现显示
          this.setArticleFloatGroup(true)
          this.pointBottomCount = count % 2
          this.pointTopCount = 0
        }
      }
      // if (direction === this.$waypointMap.DIRECTION_LEFT) {
      //   console.log('waypoint going left!')
      // }
    },
    initCatolog() {
      //
      new TocHelper().reset()
    },

    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.articleContent = render
      let el = document.getElementsByClassName('v-show-content')[0]
      el.setAttribute('data-toc', '#toc')
      let count = 1
      for (let i = 0; i < el.children.length; i++) {
        let element = el.children[i]
        let nodeName = element.nodeName
        if (nodeName.indexOf('H') != -1) {
          //
          let id = 'toc-heading-' + count
          element.setAttribute('id', id)
          count++
        }
      }
      console.log(el)
      console.log('el')

      setTimeout(() => {
        //文章加载完成
        this.loading = false
        this.setArticlePreviewSuccess(true)
      }, 800)
    }
  },
  components: {},
  watch: {
    //
    articleInfo: {
      // eslint-disable-next-line no-unused-vars
      handler(newVal, oldVal) {
        //
        if (newVal) {
          this.article = newVal
          this.commentData = {
            commentStatus: newVal.commentStatus == '开启'
          }
          this.categoryInfo = {
            categoryId: newVal.categoryId,
            categoryName: newVal.categoryName
          }

          this.footerData = {
            //版权声明
            copyrightStatus: newVal.copyrightStatus == '开启',
            //转载声明
            reprintStatus: newVal.reprintStatus == '开启'
          }
        }
      },
      deep: true
    }
    // 'otherData.sideListShow': {
    //   handler(newVal) {
    //     this.sideListShow = newVal
    //   },

    //   immediate: true
    // },
  },
  //截断超出一定数量的字符
  filters: {
    //
  }
}
</script>

<style lang="scss" scoped>
.v-note-wrapper {
  border: none;
  z-index: 800 !important;
}
/deep/ .markdown-body {
  color: #4f4f4f;
  h1,
  h2,
  h3,
  h4,
  h5 {
    color: #4d4d4d;
  }
  code {
    font-size: 90%;
  }
  .hljs code {
    font-size: 100%;
  }
}
/deep/ .v-note-wrapper .v-note-panel .v-note-show .v-show-content,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  width: 100%;
  height: 100%;
  padding: 8px 10px 0px 10px;
  overflow-y: auto;
  box-sizing: border-box;
  overflow-x: hidden;
}
/deep/ .v-skeleton-loader__image {
  height: 380px;
}
.none-b-radius {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.relative-wrapper {
  position: relative;
}
</style>
