<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-01-20 13:15:11
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-20 16:28:16
 * @FilePath     : \VueProjects\my-blog\src\views\main\About.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div>
    <v-btn color="deep-purple accent-4" dark @click="show">
      Show
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {}
  },
  methods: {
    show() {
      this.$toast.color('light-blue darken-4', '普通消息', true)
    }
  },
  components: {}
}
</script>

<style></style>
