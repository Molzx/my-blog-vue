<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-01-31 09:14:24
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-03 22:57:42
 * @FilePath     : \VueProjects\my-blog\src\components\page\user\Addition.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-card class="card-no">
    <v-window v-model="currentPage">
      <v-window-item :value="1">
        <v-card-text>
          <page-system-user-form
            ref="chirldForm"
            :formData.sync="formData"
            :otherData.sync="otherData"
          ></page-system-user-form>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <page-system-user-role
            ref="userRole"
            :formData.sync="formData"
            :roleData.sync="roleData"
            :otherData.sync="otherData"
          ></page-system-user-role>
        </v-card-text>
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
      userName: '',
      nickName: '',
      age: 20,
      password: '',
      gender: '保密',
      autograph: '',
      phone: '',
      email: '',
      state: '正常',
      status: '启用',
      roleIds: []
    },
    roleData: {
      //未拥有的角色列表
      roleItems: [],
      //添加角色列表--提交标志
      addCommit: false,
      //拥有的角色列表
      roles: [],
      //要修改的角色id，状态
      roleId: 0,
      status: '启用',
      //修改标志
      editCommit: false
    },
    otherData: {
      file: [],
      validateSuccess: false,
      loading: false
    },
    currentPage: 1,
    validateFlag: false
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
      this.getRoles()
    },

    nextPage() {
      if (this.currentPage == 2) {
        this.save()
      } else {
        //校验表单
        this.$refs.chirldForm.validate()
      }
    },
    getRoles() {
      let vm = this
      this.$api.role.toGetUserUseListInfo().then(res => {
        let data = res.data.extend
        vm.roleData.roleItems = data.data
      })
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
      let vm = this
      // setTimeout(() => {
      //   vm.otherData.loading = false
      //   vm.$refs.userRole.reset()
      //   vm.goBack()
      // }, 1000)
      setTimeout(() => {
        this.$api.user
          .toAdd(formData)
          .then(res => {
            let data = res.data.extend
            vm.$toast.success(data.data)
            vm.otherData.loading = false
            vm.$refs.userRole.reset()
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
          return '用户信息'
        default:
          return '角色信息'
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
