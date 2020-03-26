<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-04 14:35:20
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-04 14:39:03
 * @FilePath     : \VueProjects\my-blog\src\components\page\permission\Delete.vue
 * @Description  : 这是一些注释
 -->
<template>
  <page-system-delete-dialog ref="deleteDialog"></page-system-delete-dialog>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      permissionId: 0
    }
  },
  computed: {},
  watch: {
    //
  },
  methods: {
    getParentRefs() {
      let parent = this.$parent.$parent
      return parent
    },
    delete() {
      //
      setTimeout(() => {
        let vm = this
        this.$api.permission
          .toDeleteById(this.permissionId)
          .then(res => {
            let data = res.data
            vm.$toast.success(data.extend.data)
            //关闭对话框
            vm.$refs.deleteDialog.closeDialog()
            //请求更新数据
            vm.getParentRefs().closePageDelete()
          })
          .catch(() => {
            //关闭对话框
            vm.$refs.deleteDialog.closeDialog()
          })
      }, 1000)
    },
    openDialog() {
      let parent = this.getParentRefs()
      this.permissionId = parent.getUsePermissionId()
      let obj = {}
      //打开对话框
      this.$refs.deleteDialog.openDialog(obj)
    }
  },
  components: {}
}
</script>

<style></style>
