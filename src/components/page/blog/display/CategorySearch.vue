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
      <!-- 标签条件下的博客列表 -->
      <page-blog-article-list
        :showBreadcrumbs="true"
        :breadcrumbsItems="breadcrumbsItems"
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
        :sideRecArticleItems="sideRecArticleItems"
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
import {
  reqArticleData,
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

      breadcrumbsItems: [
        {
          text: '分类',
          disabled: false,
          to: { path: '/blog/categories' },
          exact: true
        },
        {
          text: 'Java',
          disabled: true,
          to: '/blog/categories/category'
        },
        {
          text: '文章',
          disabled: true,
          to: ''
        }
      ],

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
        sideListOrder: [1, 2, 3, 4],
        //展示的组件
        sideListShow: [true, false, true, true]
      }
    }
  },
  mounted() {
    //
    //回到顶部
    scrollToTop(this)
    //获取地址栏的参数
    this.getUrlParams()
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
      let params = this.$route.query.q
      this.pageParams.cName = params
      this.setBreadcrumbs(params)
      //请求后台数据
      this.requireData()
    },
    setBreadcrumbs(tag) {
      this.breadcrumbsItems[1].text = tag
    },

    requireData() {
      reqSideRecArticleData(this)
      reqSideTagData(this)
      reqSideNewArticleData(this)
      reqArticleData(this)
    },
    selfReqData() {
      //回到顶部
      scrollToTop(this)
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
    })
  },
  watch: {
    //
    //监控分页参数
    pageParams: {
      handler() {
        reqArticleData(this)
      },
      deep: true
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
