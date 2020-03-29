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
        :sideRecArticleItems="sideRecArticleItems"
        :sideCategoryItems="sideCategoryItems"
        :sideTagItems="sideTagItems"
        :sideNewArticleItems="sideNewArticleItems"
        :otherData="otherData"
      ></page-blog-side-display>
    </v-col>
  </v-row>
</template>

<script>
import { scrollToTop } from '@/assets/js/scrolling'
import { mapActions, mapGetters } from 'vuex'
import testData from '@/assets/data/article'
import {
  reqArticleData,
  reqSideRecArticleData,
  reqSideCategoryData,
  reqSideTagData,
  reqSideNewArticleData
} from '@/assets/js/blog'
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
      articleInfo: '',
      categoryInfo: [],
      tagInfo: [],
      sideRecArticleItems: [],
      sideCategoryItems: [],
      sideTagItems: [],
      sideNewArticleItems: [],
      otherData: {
        articleListLoading: true,
        articleInfoLoading: true,
        categoryInfoLoading: true,
        tagInfoLoading: true,
        sideRecArticleLoading: true,
        sideCategoryLoading: true,
        sideTagLoading: true,
        sideNewArticleLoading: true,

        //展示顺序
        sideListOrder: [2, 3, 4, 5, 1],
        //展示的组件
        sideListShow: [true, true, true, true, true]
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
      setRecArticleItems: 'setRecArticleItemsFun',
      setCategoryItems: 'setCategoryItemsFun',
      setTagItems: 'setTagItemsFun',
      setNewArticleItems: 'setNewArticleItemsFun'
    }),
    getUrlParams() {
      let params = this.$route.query.p
      if (params) {
        this.pageParams.current = params
      }
    },
    requireData() {
      reqArticleData(this)
      reqSideRecArticleData(this)
      reqSideCategoryData(this)
      reqSideTagData(this)
      reqSideNewArticleData(this)
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
      //获取  侧边栏的最新推荐文章数据
      getRecArticleItems: 'getRecArticleItemsFun',
      //获取  侧边栏的分类数据
      getCategoryItems: 'getCategoryItemsFun',
      //获取  侧边栏的标签数据
      getTagItems: 'getTagItemsFun',
      //获取  侧边栏的最新发布文章数据
      getNewArticleItems: 'getNewArticleItemsFun'
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
