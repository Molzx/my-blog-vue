<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-04-04 22:17:46
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-16 15:17:12
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\display\Search.vue
 * @Description  : 这是一些注释
 -->
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
      <!-- 搜索条件下的博客列表 -->
      <page-blog-search-card
        :loading="otherData.articleListLoading"
        :noRecord="articleList && articleList.length < 1"
      >
      </page-blog-search-card>

      <!-- 标签条件下的博客列表 -->
      <page-blog-article-list
        v-if="articleList.length > 0"
        :articleList="articleList"
        :otherData="otherData"
        :pageParams="pageParams"
        @changePage="requireSearchData"
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
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'
import { reqSearchArticleData, reqSideData } from '@/assets/js/blog'
export default {
  props: {
    //
  },
  data() {
    return {
      //

      pageParams: {
        size: 5,
        current: 1,
        total: 0,

        //搜索内容
        search: '',
        // 文章分类ID
        cid: '',
        // 文章分类名
        cName: ''
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
      }
    }
  },
  mounted() {
    //
    //获取地址栏的参数
    this.getUrlParams()
  },
  methods: {
    //
    getUrlParams() {
      let params = this.$global.GetQueryParamOfObjEntry()
      if (params && params.search) {
        let currentPage = params.p
        let search = params.search
        this.pageParams.current = currentPage || 1
        this.pageParams.search = search
        //请求后台数据
        this.requireData()
      } else {
        //如果没有搜索关键字
        this.otherData.articleListLoading = false
      }
    },
    requireData() {
      reqSideData(this)
      reqSearchArticleData(this)
    },
    requireSearchData() {
      //
      this.otherData.articleListLoading = true
      //回到顶部
      this.$scrollTop(this)
      //获取分页参数
      this.getUrlParams()
      reqSearchArticleData(this)
    }
  },
  computed: {
    //
  },
  watch: {
    //
    //监控分页参数
    // pageParams: {
    //   handler() {
    //     // reqArticleData(this)
    //   },
    //   deep: true
    // }

    // 监听路由变化，参数改变，随时获取新的列表信息
    $route: 'requireSearchData'
  },
  filters: {
    //
  },
  components: {
    //
  }
}
</script>

<style>
/*  */
</style>
