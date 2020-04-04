<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-12 22:54:52
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-04 14:57:15
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\article\Footer.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-card-text class="pt-0 px-6">
    <v-container class="pt-0">
      <v-row
        class="justify-start align-center"
        v-if="footerData.copyrightStatus"
      >
        <p class="mb-0 color-sub">
          版权声明：本文为博主「Naicha」的原创文章，首发地址为「Naicha博客」
        </p>
      </v-row>
      <v-row class="justify-start align-center" v-if="footerData.reprintStatus">
        <p class="mb-0 color-sub">
          转载声明：欢迎转载，转载请附上原文出处链接及本声明。
        </p>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <v-row class="justify-start align-center">
        <p class="mb-0 color-sub">
          分类专栏：

          <!-- <a @click="filterCategory(categoryInfo)">{{
            categoryInfo.categoryName
          }}</a> -->
        </p>
        <v-chip
          class="category-bg"
          label
          small
          color="blue--text"
          @click="filterCategory(categoryInfo)"
          >{{ categoryInfo.categoryName | textLengthFormat(18) }}
        </v-chip>
      </v-row>
      <v-row class="justify-center align-center">
        <v-avatar size="96" color="grey lighten-4">
          <v-img :src="tagBg" height="64" contain></v-img>
        </v-avatar>
      </v-row>
      <v-row class="mt-4 justify-center align-center">
        <v-chip
          v-for="tag in tagItems"
          :key="tag.tagId"
          class="ma-1"
          color="teal lighten-5 teal--text"
          @click="filterTag(tag)"
          >{{ tag.tagName }}
        </v-chip>
      </v-row>
    </v-container>

    <v-divider></v-divider>
    <!-- 个人信息 -->
    <page-blog-article-author></page-blog-article-author>
  </v-card-text>
</template>

<script>
export default {
  props: {
    categoryInfo: {
      type: Object
    },
    tagItems: {
      type: Array
    },
    footerData: {
      type: Object
    }
  },
  data() {
    return {
      tagBg: require('@/assets/images/tag.svg')
    }
  },
  mounted() {
    //
  },
  methods: {
    //

    filterCategory(category) {
      let path = '/blog/categories/category'
      let params = category.categoryName
      // console.log(path)
      this.$router.push({ path: path, query: { q: params } })
    },
    filterTag(tag) {
      let path = '/blog/tags/tag'
      let params = tag.tagName
      // console.log(path)
      this.$router.push({ path: path, query: { q: params } })
    }
  },
  computed: {
    //
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
