<template>
  <v-card class="card-no">
    <v-card-text>
      <page-system-permission-form
        ref="chirldForm"
        :formData.sync="formData"
        :otherData.sync="otherData"
      ></page-system-permission-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :loading="otherData.loading"
        color="primary"
        depressed
        @click="doSave"
        >保存
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    formData: {
      url: '',
      path: '',
      type: '',
      name: '',
      description: '',
      component: '',
      status: '启用'
    },
    otherData: {
      file: [],
      validateSuccess: false,
      loading: false
    }
  }),
  mounted() {},
  methods: {
    getParentRefs() {
      let parent = this.$parent.$parent.$parent.$parent
      return parent
    },
    goBack() {
      //重设校验状态
      this.$refs.chirldForm.reset()
      // 重置表单数据
      Object.assign(this.$data.formData, this.$options.data().formData)

      let parent = this.getParentRefs()
      parent.goPageList()
    },
    initMethod() {
      console.log('detail组件--')
    },
    doSave() {
      //校验表单
      this.$refs.chirldForm.validate()
    },
    save() {
      this.otherData.loading = true
      let vm = this
      // setTimeout(() => {
      //   vm.otherData.loading = false
      //   vm.goBack()
      // }, 1000)
      setTimeout(() => {
        this.$api.permission
          .toAddition(this.formData)
          .then(res => {
            let data = res.data.extend
            vm.$toast.success(data.data)
            vm.otherData.loading = false
            vm.goBack()
          })
          .catch(() => {
            vm.otherData.loading = false
          })
      }, 1000)
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
