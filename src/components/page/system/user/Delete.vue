<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-04 14:22:03
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-04 14:42:10
 * @FilePath     : \VueProjects\my-blog\src\components\page\user\Delete.vue
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
      userName: ''
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
        this.$api.user
          .toDeleteByUserName(this.userName)
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
      this.userName = parent.getUseUserName()
      let obj = {}
      //打开对话框
      this.$refs.deleteDialog.openDialog(obj)
    }
  },
  components: {}
}
</script>

<style></style>
