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
  },
  components: {
    //
  }
}
</script>

<style>
/*  */
</style>
