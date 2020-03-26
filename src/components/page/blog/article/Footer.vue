<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-12 22:54:52
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-12 22:57:17
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\article\Footer.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-card-text>
    <div class="mb-3">
      <a>首发链接</a>
    </div>
    <v-container>
      <v-row class="justify-center">
        <v-icon left color="info">mdi-tag</v-icon>
        <v-chip
          v-for="tag in tagItems"
          :key="tag.tagId"
          class="ma-1"
          color="grey lighten-3"
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
    tagItems: {
      type: Array
    }
  },
  data() {
    return {
      tags: [
        'Work',
        'Home Improvement',
        'Vacation',
        'Food',
        'Drawers',
        'Shopping',
        'Art',
        'Tech',
        'Creative Writing'
      ]
    }
  },
  methods: {},
  components: {}
}
</script>

<style></style>
