<template>
  <v-card class="card-no">
    <v-window v-model="currentPage">
      <v-window-item :value="1">
        <v-card-text>
          <page-system-role-form
            ref="chirldForm"
            :formData.sync="formData"
            :otherData.sync="otherData"
          ></page-system-role-form>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>Nothing </v-card-text>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :disabled="currentPage === 1 || otherData.loading"
        text
        @click="currentPage--"
      >
        后退
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :loading="otherData.loading"
        color="primary"
        depressed
        @click="nextPage"
        >{{ currentBtnText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    formData: {
      code: '',
      name: '',
      description: '',
      status: '启用',
      permissionIds: []
    },
    otherData: {
      file: [],
      validateSuccess: false,
      loading: false
    },
    currentPage: 1
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
      this.currentPage = 1
      let parent = this.getParentRefs()
      parent.goPageList()
    },
    initMethod() {
      console.log('detail组件--')
    },
    nextPage() {
      if (this.currentPage == 2) {
        this.save()
      } else {
        //校验表单
        this.$refs.chirldForm.validate()
      }
    },
    getPermissions() {
      let vm = this
      this.$api.permission.toGetUserUseListInfo().then(res => {
        let data = res.data.extend
        vm.roleData.roleItems = data.data
      })
    },
    save() {
      this.otherData.loading = true
      let vm = this
      // setTimeout(() => {
      //   vm.otherData.loading = false
      //   vm.goBack()
      // }, 1000)
      setTimeout(() => {
        this.$api.role
          .toAddition(this.formData)
          .then(res => {
            let data = res.data.extend
            vm.$toast.success(data.data)
            vm.otherData.loading = false
            vm.goBack()
          })
          .catch(() => {
            this.otherData.loading = false
          })
      }, 1000)
    }
  },
  computed: {
    currentTitle() {
      switch (this.currentPage) {
        case 1:
          return '角色信息'
        default:
          return '权限信息'
      }
    },
    currentBtnText() {
      switch (this.currentPage) {
        case 1:
          return '下一步'
        default:
          return '确认'
      }
    }
  },

  watch: {
    'otherData.validateSuccess': {
      handler(newVal) {
        if (newVal == true) {
          //校验成功，发送请求
          this.currentPage++
          this.otherData.validateSuccess = false
        }
      },
      immediate: true
    }
  }
}
</script>

<style></style>
