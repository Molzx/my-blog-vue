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
        <v-card-text>
          <page-system-role-pdisplay
            :permissionData.sync="permissionData"
            :type="type"
          ></page-system-role-pdisplay>

          <v-container class="pa-0">
            <v-row no-gutters class="mt-3">
              <v-col cols="auto">
                <v-chip class="ma-2" label color="green lighten-5 green--text">
                  <v-icon left>mdi-label</v-icon>
                  可添加权限
                </v-chip>
              </v-col>
              <v-col>
                <page-system-role-padd
                  ref="permissionAdd"
                  v-if="permissionData.permissionItems != false"
                  :formData.sync="formData"
                  :permissionData.sync="permissionData"
                  :otherData.sync="otherData"
                  :type="type"
                  @fatherMethod="setRightBtnDisabled"
                ></page-system-role-padd>

                <v-sheet v-else color="grey lighten-4">
                  <v-chip class="ma-2" label>
                    暂无
                  </v-chip>
                </v-sheet></v-col
              >
            </v-row></v-container
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
      roleId: '',
      code: '',
      name: '',
      description: '',
      status: '启用',
      permissionIds: []
    },
    permissionData: {
      //未拥有的角色列表
      permissionItems: [],
      //添加角色列表--提交标志
      addCommit: false,
      //拥有的角色列表
      permissions: [],
      //要修改的角色id，状态
      permissionId: 0,
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
    addPermissionRefresh: false,
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
      let roleId = parent.getUseRoleId()
      this.getRoleInfo(roleId)

      this.$refs.chirldForm.setEditing(false)
    },
    getRoleInfo(roleId) {
      let vm = this
      this.$api.role
        .toGetAllInfo(roleId)
        .then(res => {
          let data = res.data.extend.data
          vm.formData = data
          //=====
          vm.initPermissionInfo()
        })
        .catch(() => {
          // this.loading = false
        })
    },
    getNotHasPermissions() {
      console.log('inin')
      let vm = this
      if (
        this.permissionData.permissionItems == false ||
        this.addPermissionRefresh
      ) {
        console.log('inin')
        this.$api.role
          .toGetNotHasPermissions(this.formData.roleId)
          .then(res => {
            let data = res.data.extend.data
            console.log(data)
            // vm.$refs.permissionAdd.selected=[]

            vm.permissionData.permissionItems = data
            vm.addPermissionRefresh = false
            vm.permissionData.addCommit = false
          })
          .catch(() => {
            // this.loading = false
          })
      }
    },
    getHasPermissions() {
      let vm = this
      console.log('inin++')
      if (this.permissionData.permissions == false || this.changeRoleRefresh) {
        console.log('inin+++')
        this.$api.role
          .toGetHasPermissions(this.formData.roleId)
          .then(res => {
            let data = res.data.extend.data
            vm.permissionData.permissions = data

            vm.changeRoleRefresh = false
            vm.permissionData.editCommit = false
          })
          .catch(() => {
            // this.loading = false
          })
      }
    },
    initPermissionInfo() {
      console.log('inin')
      this.getHasPermissions()
      this.getNotHasPermissions()
    },
    save() {
      this.otherData.loading = true
      this.$refs.chirldForm.setEditing(false)
      let vm = this

      setTimeout(() => {
        this.$api.role
          .toUpdate(this.formData)
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
      }, 1000)
    },
    addPermissions() {
      let vm = this
      let roleId = this.formData.roleId
      let permissionIds = this.formData.permissionIds
      setTimeout(() => {
        this.$api.role
          .toAddPermissions(roleId, permissionIds)
          .then(res => {
            let data = res.data.extend
            vm.$toast.success(data.data)
            vm.otherData.loading = false
            vm.initPermissionInfo()
          })
          .catch(() => {
            this.otherData.loading = false
          })
      }, 2000)
    },
    toUpdatePermission() {
      let vm = this
      let roleId = this.formData.roleId
      let permissionId = this.permissionData.permissionId
      let status = this.permissionData.status
      setTimeout(() => {
        this.$api.role
          .toUpdPermissionStatus(roleId, permissionId, status)
          .then(res => {
            let data = res.data.extend
            vm.$toast.success(data.data)
            vm.otherData.loading = false
            console.log('toUpdate')
            vm.getHasPermissions()
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

        let temp = this.$refs.permissionAdd

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
        this.$refs.permissionAdd.addRole()
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
          return '角色信息'
        default:
          return '权限信息'
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
    'permissionData.editCommit': {
      handler(newVal) {
        if (newVal == true) {
          //更改角色状态
          console.log('commit')
          this.otherData.loading = true
          this.toUpdatePermission()
          this.changeRoleRefresh = true
        }
      },
      immediate: true
    },
    'permissionData.addCommit': {
      handler(newVal) {
        if (newVal == true) {
          //添加角色
          this.otherData.loading = true
          this.addPermissions()
          this.addPermissionRefresh = true
          this.changeRoleRefresh = true
        }
      },
      immediate: true
    }
  }
}
</script>

<style></style>
