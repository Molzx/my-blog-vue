<template>
  <v-row class="pa-4">
    <!-- <v-col cols="1">
    </v-col> -->
    <v-slide-y-transition>
      <page-blog-article-float-group
        v-show="getArticleFloatGroup && floatGroupReady"
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
      <page-blog-side-display :sideData="sideData"></page-blog-side-display>
    </v-col>
  </v-row>
</template>

<script>
import { scrollToTop } from '@/assets/js/scrolling'
import { copy } from '@/assets/js/fct'
import { mapActions, mapGetters } from 'vuex'
import { reqArticleDetailData, reqSideData } from '@/assets/js/blog'
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
        listShow: [false, false, false, false, false, true]
      },
      otherData: {
        articleInfoLoading: true
      },
      floatGroupData: {
        likeCount: 0,
        collectCount: 0,
        commentCount: 0,
        shareCount: 0,
        isLiked: false,
        isCollected: false,
        isShared: false
      },
      floatGroupReady: false
    }
  },
  mounted() {
    //复制添加版权信息

    document.body.addEventListener('copy', copy, false)
    //回到顶部
    scrollToTop(this)
    //获取地址栏的参数
    this.getUrlParams()
  },
  beforeDestroy() {
    document.body.removeEventListener('copy', copy)
  },
  methods: {
    //
    ...mapActions({
      //
    }),
    getUrlParams() {
      let params = this.$global.GetQueryParamOfObjEntry()

      if (params && params.q) {
        this.articleId = params.q
        //请求后台数据
        this.requireData()
      } else {
        this.$router.push('/blog/home')
      }
    },
    requireData() {
      reqArticleDetailData(this)

      reqSideData(this)
    }
  },
  computed: {
    //
    ...mapGetters({
      getArticleFloatGroup: 'getArticleFloatGroupFun',
      //文章是否加载完毕
      isArticleLoadingSuccess: 'getArticlePreviewSuccessFun'
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

        console.log(this.floatGroupData)
      }
    },
    isArticleLoadingSuccess(newVal) {
      if (newVal) {
        //文章内容渲染完成，显示浮动按钮组
        this.floatGroupReady = true
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
