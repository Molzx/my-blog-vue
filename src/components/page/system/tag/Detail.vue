<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-05 14:10:05
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-29 19:47:33
 * @FilePath     : \VueProjects\my-blog\src\components\page\system\tag\Detail.vue
 * @Description  : 这是一些注释
 -->
<template>
  <helper-dialog
    :show.sync="show"
    width="500"
    headerTitle="标签信息"
    headerColor="info"
    :limitCardTextHeight="false"
    @cancel="cancel"
  >
    <template slot="content.card-text">
      <!--  -->

      <p class="font-weight-medium">标签名称：{{ info.tagName }}</p>
      <p class="font-weight-medium">标签状态：{{ info.status }}</p>
      <p class="font-weight-medium">创建时间：{{ info.createdTime }}</p>
      <p class="font-weight-medium">更新时间：{{ info.updatedTime }}</p>
    </template>
    <template slot="footer">
      <!--  -->
    </template>
  </helper-dialog>
</template>

<script>
export default {
  data() {
    return {
      info: {
        tagName: '标签名称',
        createdTime: '创建时间',
        updatedTime: '更新时间',
        status: '标签状态'
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
      let tagId = parent.getUseTagId()
      //打开对话框
      this.show = true
      this.getTagInfo(tagId)
    },
    getTagInfo(tagId) {
      let vm = this
      this.$api.tag
        .toGetAllInfo(tagId)
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
