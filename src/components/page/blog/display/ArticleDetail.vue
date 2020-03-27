<template>
  <v-row class="pa-4">
    <!-- <v-col cols="1">
    </v-col> -->
    <v-slide-y-transition>
      <page-blog-article-float-group
        v-show="getArticleFloatGroup"
        :floatGroupData.sync="floatGroupData"
      ></page-blog-article-float-group>
    </v-slide-y-transition>
    <v-col
      class="wrapper-col"
      cols="12"
      lg="8"
      md="8"
      order-md="1"
      order-sm="1"
    >
      <!-- 博客详情 -->
      <page-blog-detail-article
        :articleInfo="articleInfo"
      ></page-blog-detail-article>
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
        :sideCategoryItems="sideCategoryItems"
        :sideTagItems="sideTagItems"
        :otherData="otherData"
      ></page-blog-side-display>
    </v-col>
  </v-row>
</template>

<script>
import { scrollToTop } from '@/assets/js/scrolling'
import { mapActions, mapGetters } from 'vuex'
import {
  reqArticleDetailData,
  reqSideRecArticleData,
  reqSideCategoryData,
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
      articleId: '',
      articleInfo: {
        //文章主键ID
        articleId: '',
        //发布的用户帐号ID
        userId: '',
        //所属类别信息ID
        categoryId: '',
        //所属类别名称
        categoryName: '',
        //拥有的标签 信息 {tagId:'',tagName''}
        tags: [],
        //文章类型
        type: '原创',
        //文章标题
        title: '',
        //文章描述
        description: '',
        //文章封面路径
        cover: '',
        //文章内容
        content: '',
        //文章md格式内容
        mdContent: '',
        //赞赏功能
        admirationStatus: '开启',
        //版权声明
        copyrightStatus: '开启',
        //转载声明
        reprintStatus: '开启',
        //评论功能
        commentStatus: '开启',
        //发布状态
        publishedStatus: '已发布',
        //推荐状态
        recommendStatus: '推荐',
        //状态标记
        status: '启用',

        //评论数量
        commentTotal: 0,
        //点赞状态
        likedStatus: false,
        //收藏状态
        collectedStatus: false
      },
      articleList: [],
      // articleInfo: '',
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
        sideListShow: [false, false, false, false]
      },
      floatGroupData: {
        likeCount: 0,
        collectCount: 0,
        commentCount: 0,
        shareCount: 0,
        isLiked: false,
        isCollected: false,
        isShared: false
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
      this.articleId = params

      //请求后台数据
      this.requireData()
    },
    requireData() {
      reqArticleDetailData(this)
      reqSideRecArticleData(this)
      reqSideCategoryData(this)
      reqSideTagData(this)
      reqSideNewArticleData(this)
    }
  },
  computed: {
    //
    ...mapGetters({
      getArticleFloatGroup: 'getArticleFloatGroupFun',

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
    // eslint-disable-next-line no-unused-vars
    getArticleFloatGroup(newVal) {
      // console.log(newVal)
    },
    articleInfo(newVal) {
      if (newVal) {
        this.floatGroupData = {
          likeCount: newVal.liked,
          collectCount: newVal.collected,
          commentCount: newVal.commentTotal,
          shareCount: newVal.shared,
          isLiked: newVal.likedStatus,
          isCollected: newVal.collectedStatus,
          isShared: false
        }
      }
    }
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped>
/*  */
</style>
