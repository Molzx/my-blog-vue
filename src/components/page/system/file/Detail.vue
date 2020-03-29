<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-05 14:10:05
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-29 17:54:56
 * @FilePath     : \VueProjects\my-blog\src\components\page\system\file\Detail.vue
 * @Description  : 这是一些注释
 -->
<template>
  <helper-dialog
    :show.sync="show"
    width="500"
    headerTitle="文件信息"
    headerColor="info"
    :limitCardTextHeight="false"
    @cancel="cancel"
  >
    <template slot="content.card-text">
      <!--  -->
      <p class="font-weight-medium">文件链接：{{ info.url }}</p>
      <p class="font-weight-medium">文件类型：{{ info.type }}</p>
      <p class="font-weight-medium">文件名称：{{ info.name }}</p>
      <p class="font-weight-medium">文件描述：{{ info.description }}</p>
      <p class="font-weight-medium">文件状态：{{ info.status }}</p>
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
        url: '文件链接',
        path: '文件路径',
        type: '文件类型',
        size: '文件大小',
        name: '文件名称',
        description: '文件描述',
        createdTime: '创建时间',
        updatedTime: '更新时间',
        status: '文件状态'
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
      let fileId = parent.getUseFileId()
      //打开对话框
      this.show = true
      this.getFileInfo(fileId)
    },
    getFileInfo(fileId) {
      let vm = this
      this.$api.file
        .toGetAllInfo(fileId)
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
