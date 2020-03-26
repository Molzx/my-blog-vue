<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-03-26 21:44:55
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-26 22:22:33
 * @FilePath     : \VueProjects\my-blog\src\views\blog\users\other\Layout.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-scale-transition>
    <router-view v-wechat-title="webTitle"></router-view>
  </v-scale-transition>
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
    if (path == '/blog/users/other' || path == '/blog/users/other/') {
      this.$router.push('/blog/users/other/info')
    }
  },
  methods: {
    //
  },
  computed: {
    //
    webTitle() {
      let title = this.$route.meta.title
      let data = this.$route.query.params
      if (data) {
        title = title + ' : ' + data
      }
      return title
    }
  },
  watch: {
    //
    $route(to) {
      let linkTo = to.fullPath
      let path = linkTo
      if (path == '/blog/users/other' || path == '/blog/users/other/') {
        this.$router.push('/blog/users/other/info')
      }
    }
  },
  components: {
    //
  }
}
</script>

<style>
/*  */
</style>
