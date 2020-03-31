<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-03 21:26:21
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-31 23:19:02
 * @FilePath     : \VueProjects\my-blog\src\components\page\system\role\Detail.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-card flat>
    <v-card-text class="px-0">
      <v-row no-gutters align="start">
        <v-col cols="auto">
          <v-chip class="ma-2" label color="green lighten-5 green--text">
            <v-icon left>mdi-label</v-icon>
            角色的资料
          </v-chip></v-col
        >
        <v-col>
          <v-row class="mx-2">
            <v-col cols="4">
              <p class="color-title">
                角色代码
                <span>：</span>
                <span class="color-content">{{ info.code }}</span>
              </p>
              <p class="color-title">
                角色名称
                <span>：</span>
                <span class="color-content">{{ info.name }}</span>
              </p>
              <p class="color-title">
                角色描述
                <span>：</span>
                <span class="color-content">{{ info.description }}</span>
              </p>
            </v-col>
            <v-col cols="4">
              <p class="color-title">
                角色状态
                <span>：</span>
                <span class="color-content">{{ info.status }}</span>
              </p>
              <p class="color-title">
                创建时间
                <span>：</span>
                <span class="color-content">{{ info.createdTime }}</span>
              </p>
              <p class="color-title">
                更新时间
                <span>：</span>
                <span class="color-content">{{ info.updatedTime }}</span>
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <page-system-role-pdisplay
        :permissionData.sync="permissionData"
      ></page-system-role-pdisplay>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      info: {
        code: '角色代码',
        name: '角色名称',
        description: '角色描述',
        createdTime: '创建时间',
        updatedTime: '更新时间',
        status: '角色状态',
        permissions: [],
        enabledpermissions: [],
        disabledpermissions: []
      },
      permissionData: {
        //拥有的角色列表
        permissions: []
      }
    }
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    getParentRefs() {
      let parent = this.$parent.$parent.$parent.$parent
      return parent
    },
    goBack() {
      let parent = this.getParentRefs()
      parent.goPageList()
    },
    initMethod() {
      console.log('detail组件--')
      let parent = this.getParentRefs()
      let roleId = parent.getUseRoleId()
      this.getRoleInfo(roleId)
    },
    getRoleInfo(roleId) {
      let vm = this
      this.$api.role
        .toGetAllInfo(roleId)
        .then(res => {
          let data = res.data.extend.data
          vm.info = data
          vm.permissionData.permissions = vm.info.permissions
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  components: {}
}
</script>

<style></style>
