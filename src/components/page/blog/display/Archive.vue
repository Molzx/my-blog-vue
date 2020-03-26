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
      <!-- 时间线归档详情 -->
      <page-blog-detail-archive
        :articleList="articleList"
        :otherData="otherData"
      ></page-blog-detail-archive>
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
  reqTimelineArticleData,
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
      pageParams: {
        current: 1
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
        sideListShow: [true, true, true, true],

        recordTotal: 0
      }
    }
  },
  mounted() {
    //
    //回到顶部
    scrollToTop(this)
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
    requireData() {
      reqTimelineArticleData(this)
      reqSideRecArticleData(this)
      reqSideCategoryData(this)
      reqSideTagData(this)
      reqSideNewArticleData(this)
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
  },
  components: {
    //
  }
}
</script>

<style>
/*  */
</style>
