<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-03-25 23:07:13
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-25 23:09:40
 * @FilePath     : \VueProjects\my-blog\src\components\helper\LoaderDialog.vue
 * @Description  : 这是一些注释
 -->
<template>
  <helper-dialog
    :show.sync="isShowDialog"
    width="500"
    headerTitle="登录提示"
    headerColor="info"
    cardTextHeight="200"
    @cancel="cancel"
  >
    <template slot="content.card-text">
      <v-row justify="space-around">
        <v-img :src="warnBg" height="150" contain></v-img>
      </v-row>
      <p class="text-center mt-2" style="color:#99a4b0;">
        需要登录才可以下载！
      </p>
    </template>
  </helper-dialog>
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
      isShowDialog: false,
      warnBg: require('@/assets/images/permission/no_permission2.svg')
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
