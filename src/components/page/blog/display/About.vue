<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-04-05 21:56:35
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-07 22:45:33
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
      <page-blog-detail-about :info="info"> </page-blog-detail-about>
      <!-- <page-blog-profile-card></page-blog-profile-card> -->
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

      sideRecArticleItems: [],
      sideCategoryItems: [],
      sideTagItems: [],
      sideNewArticleItems: [],
      otherData: {
        sideRecArticleLoading: true,
        sideCategoryLoading: true,
        sideTagLoading: true,
        sideNewArticleLoading: true,

        //展示顺序
        sideListOrder: [1, 2, 3, 4],
        //展示的组件
        sideListShow: [true, false, true, true]
      },
      info: {
        parentComment: 40,
        collected: 4,
        tag: 17,
        category: 4,
        childrenComment: 30,
        article: 17,
        liked: 4
      }
    }
  },
  mounted() {
    //

    //请求后台数据
    this.requireData()
  },
  methods: {
    //
    requireData() {
      reqSideRecArticleData(this)
      reqSideTagData(this)
      reqSideNewArticleData(this)
      this.requireAuthorData()
    },
    requireAuthorData() {
      //
      console.log('send')

      const vm = this
      setTimeout(() => {
        vm.$api.blog.toGetAuthorInfo().then(res => {
          console.log('require author info ')
          let data = res.data.extend.data
          console.log(data)
          this.info = data
        })
      }, 0)
    }
  },
  computed: {
    //
  },
  watch: {
    //
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
