<template>
  <v-row class="pa-4">
    <v-col
      class="wrapper-col"
      cols="12"
      lg="8"
      md="8"
      order-md="1"
      order-sm="1"
    >
      <page-blog-article-list
        :articleList="articleList"
        :otherData="otherData"
        :pageParams="pageParams"
        @changePage="selfReqData"
      ></page-blog-article-list>
    </v-col>
    <v-col
      class="wrapper-col"
      cols="12"
      lg="4"
      md="4"
      order-md="2"
      order-sm="2"
    >
      <page-blog-side-display
        :mainSize="articleList.length"
        :sideData="sideData"
      ></page-blog-side-display>
    </v-col>
  </v-row>
</template>

<script>
import { scrollToTop } from '@/assets/js/scrolling'
import { mapActions, mapGetters } from 'vuex'
import testData from '@/assets/data/article'
import { reqArticleData, reqSideData } from '@/assets/js/blog'
export default {
  data() {
    return {
      //
      pageParams: {
        size: 8,
        current: 1,
        total: 0
      },
      articleList: [],
      otherData: {
        articleListLoading: true
      },
      sideData: {
        recArticleItems: [],
        categoryItems: [],
        tagItems: [],
        newArticleItems: [],
        topViewArticleItems: [],
        recArticleLoading: true,
        categoryLoading: true,
        tagLoading: true,
        newArticleLoading: true,
        topViewArticleLoading: true,

        //展示顺序
        listOrder: [1, 2, 3, 4, 5, 6],
        //展示的组件
        listShow: [true, true, true, true, true, true]
      },
      items: testData.article.items
    }
  },
  mounted() {
    //回到顶部
    scrollToTop(this)
    //获取当前页数
    this.getUrlParams()
    this.requireData()
  },
  methods: {
    //
    ...mapActions({
      //
    }),
    getUrlParams() {
      let params = this.$global.GetQueryParamOfObjEntry()
      if (params && params.p) {
        this.pageParams.current = parseInt(params.p)
      }
    },
    requireData() {
      reqArticleData(this)
      reqSideData(this)
    },
    selfReqData() {
      this.otherData.articleListLoading = true
      //回到顶部
      scrollToTop(this)
      //获取分页参数
      this.getUrlParams()
      //请求分页数据
      reqArticleData(this)
    }
  },
  computed: {
    //
    ...mapGetters({
      //
    }),
    getItems() {
      var arr = this.items
      var arr2 = []

      arr2.push(...arr)
      arr2.push(...arr2)
      // arr2.push(...arr2)
      return arr2
    }
  },
  watch: {
    //
    // 监听路由变化，随时获取新的列表信息
    $route: 'selfReqData'
  },
  components: {
    //
  }
}
</script>

<style>
/*  */
</style>
