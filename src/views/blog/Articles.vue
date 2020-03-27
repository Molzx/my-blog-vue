<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-12 20:17:08
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-27 16:15:20
 * @FilePath     : \VueProjects\my-blog\src\views\blog\Articles.vue
 * @Description  : 这是一些注释
 -->
<template>
  <page-blog-display-article-detail
    :params="params"
  ></page-blog-display-article-detail>
</template>

<script>
export default {
  title: '博客详情',
  name: 'blog-articles',
  data() {
    return {
      //
      params: ''
    }
  },
  mounted() {
    //
    let params = this.$route.query.q
    // console.log(params)
    this.params = params
  },
  methods: {
    //
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
