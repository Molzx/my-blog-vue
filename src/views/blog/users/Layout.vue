<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-03-04 22:35:19
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-26 22:12:41
 * @FilePath     : \VueProjects\my-blog\src\views\blog\users\Layout.vue
 * @Description  : 这是一些注释
 -->
<template>
  <page-blog-display-user></page-blog-display-user>
</template>

<script>
export default {
  data() {
    return {
      //
    }
  },
  mounted() {
    //
    let path = this.$route.fullPath
    if (path == '/blog/users' || path == '/blog/users/') {
      this.$router.push('/blog/home')
    }
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
