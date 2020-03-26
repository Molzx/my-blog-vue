<template>
  <page-system-delete-dialog ref="deleteDialog"></page-system-delete-dialog>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      articleId: ''
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
        this.$api.article
          .toDeleteById(this.articleId)
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
      this.articleId = parent.getUseArticleId()
      let obj = {}
      //打开对话框
      this.$refs.deleteDialog.openDialog(obj)
    }
  },
  components: {}
}
</script>

<style></style>
