<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-03-17 16:34:42
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-18 21:45:51
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\side\Announcement.vue
 * @Description  : 这是一些注释
 -->
<template>
  <page-blog-detail-announcement
    :side="true"
    :record="record"
    :loading="loading"
  ></page-blog-detail-announcement>
</template>

<script>
export default {
  name: 'temp',
  props: {
    //
  },
  data() {
    return {
      //
      loading: true,
      record: {}
    }
  },
  mounted() {
    //
    this.requireData()
  },
  methods: {
    //
    requireData() {
      //
      let vm = this
      this.$api.blog
        .toGetSideAnnouncement()
        .then(res => {
          let data = res.data.extend.data
          vm.record = data
          vm.loading = false
        })
        .catch(() => {
          // vm.loading = false
        })
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

<style lang="scss" scoped>
.an-title {
  color: #4a4a4a;
  font-size: 1.1rem;
  margin-bottom: 4px;
}
.toast-btn {
  position: absolute !important;
  // top: -21px !important;
  // right: -21px !important;
  bottom: -21px !important;
  left: calc(50% - 21px) !important;
  width: 42px !important;
  height: 42px !important;
  background: white !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08) !important;
}
</style>
