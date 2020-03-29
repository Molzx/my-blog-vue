<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-03-17 19:48:39
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-29 13:44:49
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\display\Announcement.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-row class="pa-4">
    <v-col cols="4" v-for="(item, i) in getRecords" :key="i">
      <page-blog-detail-announcement
        :record="item"
        :loading="loading"
      ></page-blog-detail-announcement>
    </v-col>
  </v-row>
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
      record: {
        title: '大家好啊，这是一条测试信息。',
        content:
          '对技术充满热情，对未知领域充满好奇，热爱各种折腾,对多个领域略知一二，时常苦于不求甚解，博而不专.',
        url: '',
        updatedTime: '2018-20-11 20:20:12'
      },
      record1: {
        title: '技术充满热情，充满好奇，热爱各种折腾。',
        content:
          '对技术充满热情，对技术充满热情，对未知领域充满好奇，热爱各种折腾对未知领域充满好奇，热爱各种折腾,对多个领域略知一二，时常苦于不求甚解，博而不专.',
        url: '',
        updatedTime: '2020-20-11 20:20:12'
      },
      records: [],
      loading: true
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
        .toGetAnnouncements()
        .then(res => {
          let data = res.data.extend.data
          vm.records = data
          vm.loading = false
        })
        .catch(() => {
          vm.loading = false
        })
    }
  },
  computed: {
    //
    getRecords() {
      if (this.loading) {
        // arr.push(...arr)
        // arr.push(...arr)
        // arr.push(...arr)
        return 3
      } else {
        // let arr = []

        // arr.push(this.record)
        // arr.push(this.record1)
        // arr.push(this.record)
        // return arr
        return this.records
      }
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
