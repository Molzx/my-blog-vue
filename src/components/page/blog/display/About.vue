<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-04-05 21:56:35
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-05 22:02:44
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\display\About.vue
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
      <page-blog-detail-about> </page-blog-detail-about>
      <page-blog-profile-card></page-blog-profile-card>
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
        :sideRecArticleItems="sideRecArticleItems"
        :sideTagItems="sideTagItems"
        :sideNewArticleItems="sideNewArticleItems"
        :otherData="otherData"
      ></page-blog-side-display>
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'
import {
  reqSideRecArticleData,
  reqSideTagData,
  reqSideNewArticleData
} from '@/assets/js/blog'
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
        // 文章分类名
        cName: ''
      },
      articleList: [],
      sideRecArticleItems: [],
      sideCategoryItems: [],
      sideTagItems: [],
      sideNewArticleItems: [],
      otherData: {
        articleListLoading: true,
        sideRecArticleLoading: true,
        sideCategoryLoading: true,
        sideTagLoading: true,
        sideNewArticleLoading: true,

        //展示顺序
        sideListOrder: [1, 2, 3, 4],
        //展示的组件
        sideListShow: [true, false, true, true]
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
      let search = this.$route.query.search
      this.pageParams.search = search

      //请求后台数据
      // this.requireData()
    },
    requireData() {
      reqSideRecArticleData(this)
      reqSideTagData(this)
      reqSideNewArticleData(this)
    },
    requireSearchData() {
      //
      console.log('send')
    },
    toSearch(args) {
      this.pageParams = args
      console.log(args)
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
