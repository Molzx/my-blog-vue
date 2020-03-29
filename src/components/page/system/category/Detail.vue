<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-05 14:10:05
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-29 18:18:00
 * @FilePath     : \VueProjects\my-blog\src\components\page\system\category\Detail.vue
 * @Description  : 这是一些注释
 -->
<template>
  <helper-dialog
    :show.sync="show"
    width="500"
    headerTitle="分类信息"
    headerColor="info"
    :limitCardTextHeight="false"
    @cancel="cancel"
  >
    <template slot="content.card-text">
      <!--  -->
    </template>
    <template slot="footer">
      <!--  -->
      <p class="font-weight-medium">分类名称：{{ info.categoryName }}</p>
      <p class="font-weight-medium">分类状态：{{ info.status }}</p>
      <p class="font-weight-medium">创建时间：{{ info.createdTime }}</p>
      <p class="font-weight-medium">更新时间：{{ info.updatedTime }}</p>
    </template>
  </helper-dialog>
</template>

<script>
export default {
  data() {
    return {
      info: {
        categoryName: '分类名称',
        createdTime: '创建时间',
        updatedTime: '更新时间',
        status: '分类状态'
      },
      show: false
    }
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    getParentRefs() {
      let parent = this.$parent.$parent
      return parent
    },
    goBack() {
      let parent = this.getParentRefs()
      parent.goPageList()
    },
    initMethod() {
      console.log('detail组件--')
      let parent = this.getParentRefs()
      let categoryId = parent.getUseCategoryId()
      //打开对话框
      this.show = true
      this.getCategoryInfo(categoryId)
    },
    getCategoryInfo(categoryId) {
      let vm = this
      this.$api.category
        .toGetAllInfo(categoryId)
        .then(res => {
          let data = res.data.extend.data
          vm.info = data
          // vm.roleData.roles = vm.info.roles
        })
        .catch(() => {
          this.loading = false
        })
    },
    cancel() {
      this.show = false
    },
    openDialog() {
      this.initMethod()
    }
  },
  components: {}
}
</script>

<style></style>
