<template>
  <page-system-delete-dialog ref="deleteDialog"></page-system-delete-dialog>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      reportId: 0
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
        this.$api.report
          .toDeleteById(this.reportId)
          .then(res => {
            let data = res.data
            vm.$toast.success(data.extend.data)
            //关闭对话框
            vm.$refs.deleteDialog.closeDialog()
            //请求更新数据
            vm.getParentRefs().refresh()
          })
          .catch(() => {
            //关闭对话框
            vm.$refs.deleteDialog.closeDialog()
          })
      }, 1000)
    },
    openDialog() {
      let parent = this.getParentRefs()
      this.reportId = parent.getUseReportId()
      let obj = {}
      //打开对话框
      this.$refs.deleteDialog.openDialog(obj)
    }
  },
  components: {}
}
</script>

<style></style>
