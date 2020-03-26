<template>
  <v-dialog
    v-model="show"
    width="500"
    scrollable
    transition="scroll-x-transition"
    origin="center right"
  >
    <v-card class="mx-auto">
      <v-alert tile colored-border class="mb-0 pb-0">
        <div class="d-flex align-center">
          <v-alert text dense border="left" class="mb-0" color="info">
            添加文件
          </v-alert>
          <v-spacer></v-spacer>
          <v-btn fab depressed small class="close-btn" @click="goBack">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-alert>
      <v-card-text>
        <page-system-file-form
          ref="chirldForm"
          :formData.sync="formData"
          :otherData.sync="otherData"
        ></page-system-file-form>
      </v-card-text>

      <v-divider></v-divider>

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
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    formData: {
      category: '',
      name: '',
      description: '',
      status: '启用'
    },
    otherData: {
      file: [],
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
      //重设校验状态
      this.$refs.chirldForm.reset()
      // 重置表单数据
      Object.assign(this.$data.formData, this.$options.data().formData)
      this.otherData.file = []

      this.show = false
      let parent = this.getParentRefs()
      parent.goPageList()
    },
    initMethod() {
      console.log('add组件--')
      //打开对话框
      this.show = true
    },
    save() {
      let formData = new FormData()
      //这里将表单数据封装成json保存到formData中
      formData.append(
        'formData',
        new Blob([JSON.stringify(this.formData)], { type: 'application/json' })
      )
      formData.append('file', this.otherData.file)

      this.otherData.loading = true
      this.$refs.chirldForm.setEditing(false)
      let vm = this
      // setTimeout(() => {
      //   vm.otherData.loading = false
      //   vm.show = false
      //   vm.goBack()
      // }, 1000)
      setTimeout(() => {
        this.$api.file
          .toAddition(formData)
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
