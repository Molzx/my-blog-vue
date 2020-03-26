<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-01-31 09:15:03
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-03 20:53:47
 * @FilePath     : \VueProjects\my-blog\src\components\page\user\Editer.vue
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
          <page-system-user-roledisplay
            :roleData.sync="roleData"
            :type="type"
          ></page-system-user-roledisplay>

          <v-container>
            <v-row no-gutters class="mt-3">
              <v-col cols="auto">
                <v-chip class="ma-2" color="green" label text-color="white">
                  <v-icon left>mdi-label</v-icon>
                  可添加角色
                </v-chip></v-col
              ><v-col>
                <page-system-user-role
                  ref="userRole"
                  v-if="roleData.roleItems != false"
                  :formData.sync="formData"
                  :roleData.sync="roleData"
                  :otherData.sync="otherData"
                  :type="type"
                  @fatherMethod="setRightBtnDisabled"
                ></page-system-user-role>

                <v-sheet v-else color="grey lighten-4">
                  <v-chip class="ma-2" label>
                    暂无
                  </v-chip>
                </v-sheet></v-col
              ></v-row
            ></v-container
          >
        </v-card-text>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-scroll-x-transition mode="out-in">
        <v-btn
          v-if="currentPage === 2"
          :disabled="otherData.loading"
          key="1"
          color="info"
          text
          width="100"
          @click="prePage"
          ><v-icon left :key="`icon-${isEditing}`" color=" info "
            >mdi-arrow-left-bold-outline</v-icon
          >上一页
        </v-btn>

        <v-btn
          v-else
          :disabled="otherData.loading"
          key="2"
          color="info"
          text
          width="100"
          @click="changeEdit"
          >{{ isEditing ? '' : '修改'
          }}<v-icon
            :left="isEditing"
            :right="!isEditing"
            :key="`icon-${isEditing}`"
            color="info"
            v-text="
              isEditing
                ? 'mdi-arrow-left-bold-outline'
                : 'mdi-circle-edit-outline'
            "
          ></v-icon>
          {{ isEditing ? '返回' : '' }}
        </v-btn>
      </v-scroll-x-transition>
      <v-scroll-x-transition mode="out-in">
        <v-btn
          v-show="isEditing"
          :loading="otherData.loading"
          color="success"
          text
          width="100"
          @click="saveForm"
          >保存
          <v-slide-x-reverse-transition mode="out-in">
            <v-icon right :key="`icon-${isEditing}`" color=" success "
              >mdi-check-outline</v-icon
            >
          </v-slide-x-reverse-transition>
        </v-btn>
      </v-scroll-x-transition>
      <v-spacer></v-spacer>
      <v-btn
        :loading="otherData.loading && !isEditing"
        :disabled="isEditing || rightBtnDisabled"
        :color="currentPage == 1 ? 'info' : 'success'"
        text
        width="100"
        @click="nextPage"
        >{{ currentBtnText }}
        <v-slide-x-reverse-transition mode="out-in">
          <v-icon
            right
            :key="`icon-${currentPage}`"
            :color="currentPage == 1 ? 'info' : 'success'"
            v-text="
              currentPage == 1
                ? 'mdi-arrow-right-bold-outline'
                : 'mdi-check-outline'
            "
          ></v-icon>
        </v-slide-x-reverse-transition>
      </v-btn>
      <!-- <v-btn
          :loading="otherData.loading"
          :disabled="isEditing"
          color="primary"
          depressed
          @click="currentPage++"
          >{{ currentBtnText }}
        </v-btn> -->
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    formData: {
      userId: '',
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
    type: 'edit',
    isEditing: false,
    currentPage: 1,
    //=======self===
    changeRoleRefresh: false,
    addRolerefresh: false,
    rightBtnDisabled: false
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

      // 将初始状态的data复制到当前状态的data，实现重置效果
      Object.assign(this.$data, this.$options.data())
      let parent = this.getParentRefs()
      parent.goPageList()
    },
    initMethod() {
      console.log('editer组件--')
      let parent = this.getParentRefs()
      let userName = parent.getUseUserName()
      this.getUserInfo(userName)

      this.$refs.chirldForm.setEditing(false)
    },
    getUserInfo(userName) {
      let vm = this
      this.$api.user
        .toGetMoreInfo(userName)
        .then(res => {
          let data = res.data.extend.data
          vm.formData = data
          //=====
          vm.initRoleInfo()
        })
        .catch(() => {
          // this.loading = false
        })
    },
    getNotHasRoles() {
      let vm = this
      if (this.roleData.roleItems == false || this.addRolerefresh) {
        this.$api.user
          .toGetNotHasRoles(this.formData.userId)
          .then(res => {
            let data = res.data.extend.data
            console.log(data)
            // vm.$refs.userRole.selected=[]

            vm.roleData.roleItems = data
            vm.addRolerefresh = false
            vm.roleData.addCommit = false
          })
          .catch(() => {
            // this.loading = false
          })
      }
    },
    getHasRoles() {
      let vm = this
      if (this.roleData.roles == false || this.changeRoleRefresh) {
        this.$api.user
          .toGetHasRoles(this.formData.userId)
          .then(res => {
            let data = res.data.extend.data
            vm.roleData.roles = data

            vm.changeRoleRefresh = false
            vm.roleData.editCommit = false
          })
          .catch(() => {
            // this.loading = false
          })
      }
    },
    initRoleInfo() {
      this.getHasRoles()
      this.getNotHasRoles()
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

      setTimeout(() => {
        this.$api.user
          .toUpdate(formData)
          .then(res => {
            let data = res.data.extend
            vm.$toast.success(data.data)
            vm.otherData.loading = false
            vm.$refs.chirldForm.setEditing(true)
          })
          .catch(() => {
            this.otherData.loading = false
            vm.$refs.chirldForm.setEditing(true)
          })
      }, 5000)
    },
    addRoles() {
      let vm = this
      let userId = this.formData.userId
      let roleIds = this.formData.roleIds
      setTimeout(() => {
        this.$api.user
          .toAddRoles(userId, roleIds)
          .then(res => {
            let data = res.data.extend
            vm.$toast.success(data.data)
            vm.otherData.loading = false
            vm.initRoleInfo()
          })
          .catch(() => {
            this.otherData.loading = false
          })
      }, 2000)
    },
    toUpdateRole() {
      let vm = this
      let userId = this.formData.userId
      let roleId = this.roleData.roleId
      let status = this.roleData.status
      setTimeout(() => {
        this.$api.user
          .toUpdRoleStatus(userId, roleId, status)
          .then(res => {
            let data = res.data.extend
            vm.$toast.success(data.data)
            vm.otherData.loading = false
            console.log('toUpdate')
            vm.getHasRoles()
          })
          .catch(() => {
            this.otherData.loading = false
          })
      }, 1000)
    },
    saveForm() {
      //校验表单
      this.$refs.chirldForm.validate()
    },
    prePage() {
      this.currentPage--

      this.rightBtnDisabled = false
    },
    nextPage() {
      //下一页
      if (this.currentPage == 1) {
        this.currentPage++

        let temp = this.$refs.userRole

        if (typeof temp == 'undefined') {
          //第一次进入页面二，默认按钮不可点
          this.rightBtnDisabled = true
        } else {
          if (temp.selected.length != 0) {
            //选中角色不为空，按钮可点
            this.rightBtnDisabled = false
          } else {
            this.rightBtnDisabled = true
          }
        }
      } else {
        //保存角色列表
        this.$refs.userRole.addRole()
      }
    },
    changeEdit() {
      this.isEditing = !this.isEditing

      this.$refs.chirldForm.setEditing(this.isEditing)
    },
    setRightBtnDisabled(flag) {
      this.rightBtnDisabled = flag
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
          return '下一页'
        default:
          return '保存'
      }
    }
  },
  watch: {
    'otherData.validateSuccess': {
      handler(newVal) {
        if (newVal == true) {
          //校验成功，发送请求
          this.save()
          this.otherData.validateSuccess = false
        }
      },
      immediate: true
    },
    'roleData.editCommit': {
      handler(newVal) {
        if (newVal == true) {
          //更改角色状态
          console.log('commit')
          this.otherData.loading = true
          this.toUpdateRole()
          this.changeRoleRefresh = true
        }
      },
      immediate: true
    },
    'roleData.addCommit': {
      handler(newVal) {
        if (newVal == true) {
          //添加角色
          this.otherData.loading = true
          this.addRoles()
          this.addRolerefresh = true
          this.changeRoleRefresh = true
        }
      },
      immediate: true
    }
  }
}
</script>

<style></style>
