<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-03-26 21:44:58
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-26 22:39:56
 * @FilePath     : \VueProjects\my-blog\src\views\blog\users\owner\Layout.vue
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
    if (path == '/blog/users/owner' || path == '/blog/users/owner/') {
      this.$router.push('/blog/users/owner/info')
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
      if (path == '/blog/users/owner' || path == '/blog/users/owner/') {
        this.$router.push('/blog/users/owner/info')
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
