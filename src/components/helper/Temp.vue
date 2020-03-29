<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-03-29 17:51:31
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-29 18:24:32
 * @FilePath     : \VueProjects\my-blog\src\components\helper\Temp.vue
 * @Description  : 这是一些注释
 -->
<template>
  <helper-dialog
    :show.sync="show"
    width="500"
    headerTitle="添加文件"
    headerColor="info"
    :limitCardTextHeight="false"
    @cancel="cancel"
  >
    <template slot="content.card-text">
      <!--  -->
    </template>
    <template slot="footer">
      <!--  -->
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
