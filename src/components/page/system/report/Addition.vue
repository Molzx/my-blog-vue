<template>
  <helper-dialog
    :show.sync="show"
    width="500"
    headerTitle="添加举报信息"
    headerColor="info"
    cardTextHeight="400"
    @cancel="cancel"
  >
    <template slot="content.card-text">
      <page-system-report-form
        ref="chirldForm"
        :formData.sync="formData"
        :otherData.sync="otherData"
      ></page-system-report-form>
    </template>
    <template slot="footer">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancel">
          取消
        </v-btn>
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
  props: {
    //
  },
  data: () => ({
    formData: {
      // 举报人的帐号ID，前台新增不传
      reporter: 0,
      // 被举报人的帐号ID
      accusedUser: 0,
      // 举报理由
      reason: '',
      // 状态标记 { 0：启用，1：禁用 }，前台新增不传
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

      //如果是当前管理功能页面调用，则直接返回index.vue
      let parent = this.getParentRefs()
      parent.goPageList()
    },
    initMethod() {
      console.log('add组件--')
      //打开对话框
      this.show = true
    },
    save() {
      this.otherData.loading = true
      this.$refs.chirldForm.setEditing(false)
      let vm = this
      // setTimeout(() => {
      //   vm.otherData.loading = false
      //   vm.show = false
      //   vm.goBack()
      // }, 1000)
      setTimeout(() => {
        this.$api.report
          .toAddition(this.formData)
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
      //重设校验状态
      this.$refs.chirldForm.reset()
      // 重置表单数据
      Object.assign(this.$data.formData, this.$options.data().formData)
      this.otherData.file = []

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
