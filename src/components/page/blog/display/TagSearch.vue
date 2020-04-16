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
        :mainSize="articleList.length"
        :sideData="sideData"
      ></page-blog-side-display>
    </v-col>
  </v-row>
</template>

<script>
import { scrollToTop } from '@/assets/js/scrolling'
import { mapActions, mapGetters } from 'vuex'
import { reqArticleData, reqSideData } from '@/assets/js/blog'
export default {
  props: {
    //
  },
  data() {
    return {
      //

      breadcrumbsItems: [
        {
          text: '标签',
          disabled: false,
          to: { path: '/blog/tags' },
          exact: true
        },
        {
          text: 'Java',
          disabled: true,
          to: '/blog/tags/tag'
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
        // 文章标签名
        tName: ''
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
    //回到顶部
    scrollToTop(this)
    //获取地址栏的参数
    let flag = this.getUrlParams()
    if (flag) {
      //请求后台数据
      this.requireData()
    } else {
      this.$router.push('/blog/tags')
    }
  },
  methods: {
    //
    ...mapActions({
      //
    }),
    getUrlParams() {
      let params = this.$global.GetQueryParamOfObjEntry()
      if (params) {
        if (params.q) {
          let query = params.q
          this.pageParams.tName = query
          this.setBreadcrumbs(query)
        }
        if (params.p) {
          let page = params.p
          this.pageParams.current = page
        }
        return true
      } else {
        return false
      }
    },
    setBreadcrumbs(tag) {
      this.breadcrumbsItems[1].text = tag
    },

    requireData() {
      reqSideData(this)
      reqArticleData(this)
    },
    selfReqData() {
      this.otherData.articleListLoading = true
      //回到顶部
      scrollToTop(this)
      //获取地址栏的参数
      let flag = this.getUrlParams()
      if (flag) {
        //请求分页数据
        reqArticleData(this)
      } else {
        this.$router.push('/blog/tags')
      }
    }
  },
  computed: {
    //
    ...mapGetters({
      //
    })
  },
  watch: {
    //
    //监听路由传递的参数
    // params() {
    //   console.log('params')
    //   // console.log(this.params)
    //   this.pageParams.tName = this.params
    //   this.setBreadcrumbs(this.params)
    // },
    //监控分页参数
    // pageParams: {
    //   handler() {
    //     reqArticleData(this)
    //   },
    //   deep: true
    // }

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
