<template>
  <v-card>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <div class="d-flex align-center">
          <v-btn icon color="primary" small class="mb-2 mr-3" @click="goBack">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-row>
      <v-row no-gutters>
        <v-col cols="auto">
          <v-chip class="ma-2" color="green" label text-color="white">
            <v-icon left>mdi-label</v-icon>
            角色的资料
          </v-chip></v-col
        >
        <v-col>
          <v-sheet color="grey lighten-4">
            <v-container>
              <v-row>
                <v-col cols="4">
                  <p class="font-weight-medium">角色代码：{{ info.code }}</p>
                  <p class="font-weight-medium">角色名称：{{ info.name }}</p>
                  <p class="font-weight-medium">
                    角色描述：{{ info.description }}
                  </p>
                </v-col>
                <v-col cols="4">
                  <p class="font-weight-medium">角色状态：{{ info.status }}</p>
                  <p class="font-weight-medium">
                    创建时间：{{ info.createdTime }}
                  </p>
                  <p class="font-weight-medium">
                    更新时间：{{ info.updatedTime }}
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-col>
      </v-row>
      <page-system-role-pdisplay
        :permissionData.sync="permissionData"
      ></page-system-role-pdisplay>
    </v-container>
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
