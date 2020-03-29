<template>
  <helper-dialog
    :show.sync="show"
    width="500"
    headerTitle="修改评论信息"
    headerColor="info"
    :limitCardTextHeight="false"
    @cancel="cancel"
  >
    <template slot="content.card-text">
      <!--  -->
      <page-system-comment-form
        ref="chirldForm"
        :formData.sync="formData"
        :otherData.sync="otherData"
      ></page-system-comment-form>
    </template>
    <template slot="footer">
      <!--  -->
      <v-divider></v-divider>

      <v-card-actions class="d-flex justify-center">
        <v-btn
          :loading="otherData.loading"
          color="primary"
          text
          @click="confirm"
        >
          确认
        </v-btn>
      </v-card-actions>
    </template>
  </helper-dialog>
</template>

<script>
export default {
  data: () => ({
    formData: {
      commentId: 0,
      //被评论的资源id，可以是文章，文件等
      ownerId: '',
      //父评论ID：为空则为父评论，不为空则为子评论
      parentId: '',
      //评论类型 { 0：文章，1：文件 }
      type: '文章',
      //被评论的用户ID
      toUid: '',
      //评论内容
      content: '',
      sticky: '置顶',
      status: '启用'
    },
    otherData: {
      validateSuccess: false,
      loading: false
    },
    show: false
  }),
  mounted() {},
  methods: {
    getParentRefs() {
      let parent = this.$parent.$parent
      return parent
    },
    goBack() {
      this.cancel()
      let parent = this.getParentRefs()
      parent.goPageList()
    },
    initMethod() {
      console.log('editer组件--')
      let parent = this.getParentRefs()
      this.commentId = parent.getUseCommentId()
      //打开对话框
      this.show = true

      this.getCommentInfo(this.commentId)
    },
    getCommentInfo(commentId) {
      let vm = this
      this.$api.comment
        .toGetAllInfo(commentId)
        .then(res => {
          let data = res.data.extend.data
          vm.formData = data
        })
        .catch(() => {
          this.loading = false
        })
    },
    save() {
      this.otherData.loading = true
      this.$refs.chirldForm.setEditing(false)
      let vm = this
      // setTimeout(() => {
      //   vm.otherData.loading = false
      //   vm.goBack()
      // }, 1000)
      setTimeout(() => {
        this.$api.comment
          .toUpdate(this.formData)
          .then(res => {
            let data = res.data.extend
            vm.$toast.success(data.data)
            vm.otherData.loading = false
            vm.$refs.chirldForm.setEditing(true)
            vm.show = false
            //请求更新数据
            vm.goBack()
          })
          .catch(() => {
            vm.otherData.loading = false
            vm.$refs.chirldForm.setEditing(true)
            vm.show = false
          })
      }, 1000)
    },
    confirm() {
      //
      //校验表单
      this.$refs.chirldForm.validate()
    },
    cancel() {
      //取消返回

      //重设校验状态
      this.$refs.chirldForm.reset()
      // 重置表单数据
      Object.assign(this.$data.formData, this.$options.data().formData)

      this.show = false
    },
    openDialog() {
      this.initMethod()
    }
  },
  computed: {},

  watch: {
    'otherData.validateSuccess': {
      handler(newVal) {
        if (newVal == true) {
          //校验成功，发送请求
          this.otherData.validateSuccess = false
          this.save()
        }
      },
      immediate: true
    }
  }
}
</script>

<style></style>
