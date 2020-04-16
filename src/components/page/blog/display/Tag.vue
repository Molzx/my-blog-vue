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
      <!-- 标签详情 -->
      <page-blog-detail-tag
        :tagInfo="tagInfo"
        :otherData="otherData"
      ></page-blog-detail-tag>
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
import { mapActions, mapGetters } from 'vuex'
import { reqTagData, reqSideData } from '@/assets/js/blog'
export default {
  data() {
    return {
      //
      tagInfo: [],
      otherData: {
        tagInfoLoading: true
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
    this.requireData()
  },
  methods: {
    //
    ...mapActions({
      //
    }),
    requireData() {
      reqTagData(this)

      reqSideData(this)
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
  },
  components: {
    //
  }
}
</script>

<style>
/*  */
</style>
