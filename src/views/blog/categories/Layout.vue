<template>
  <!-- <v-slide-x-reverse-transition mode="out-in">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </v-slide-x-reverse-transition> -->
  <router-view v-wechat-title="webTitle"></router-view>
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
  },
  methods: {
    //
  },
  computed: {
    //

    webTitle() {
      let title = this.$route.meta.title
      // let data = this.$route.query.params

      let params = this.$global.GetQueryParamOfObjEntry()

      if (params && params.q) {
        title = title + ' : ' + params.q
      }
      return title
    }
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
