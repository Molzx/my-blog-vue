<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-03-26 15:06:42
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-26 15:22:12
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\comment\Tip.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div>
    <!-- Something -->

    <v-row class="justify-center align-center no-gutters" v-if="isEmpty">
      <v-col cols="12" class="justify-center align-center">
        <v-img :src="emptyBg" height="150" contain></v-img>
      </v-col>
      <v-col cols="12">
        <p class="mb-0 mt-2 text-center">来做第一个留言的人吧！</p>
      </v-col>
    </v-row>
    <v-row class="justify-center align-center no-gutters" v-else>
      <v-col cols="12" class="justify-center align-center">
        <v-img :src="lockBg" height="100" contain></v-img>
      </v-col>
      <v-col cols="12">
        <p class="mb-0 mt-2 text-center">评论功能已关闭！</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    //是否显示评论空的提示，false显示评论已关闭的提示
    isEmpty: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      //
      emptyBg: require('@/assets/images/comment/No_Comment.svg'),
      lockBg: require('@/assets/images/comment/Default-MomentComment-icon.svg')
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
