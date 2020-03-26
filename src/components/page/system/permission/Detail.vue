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
            权限资料
          </v-chip></v-col
        >
        <v-col>
          <v-sheet color="grey lighten-4">
            <v-container>
              <v-row>
                <v-col cols="4">
                  <p class="font-weight-medium">接口链接：{{ info.url }}</p>
                  <p class="font-weight-medium">接口路径：{{ info.path }}</p>
                  <p class="font-weight-medium">接口类型：{{ info.type }}</p>
                  <p class="font-weight-medium">权限名称：{{ info.name }}</p>
                  <p class="font-weight-medium">
                    权限描述：{{ info.description }}
                  </p>
                </v-col>
                <v-col cols="4">
                  <p class="font-weight-medium">权限状态：{{ info.status }}</p>
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
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      info: {
        url: '接口链接',
        path: '接口路径',
        type: '接口类型',
        name: '权限名称',
        description: '权限描述',
        createdTime: '创建时间',
        updatedTime: '更新时间',
        status: '权限状态',
        roles: [],
        enabledRoles: [],
        disabledRoles: []
      },
      roleData: {
        //拥有的权限列表
        roles: []
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
      let permissionId = parent.getUsePermissionId()
      this.getPermissionInfo(permissionId)
    },
    getPermissionInfo(permissionId) {
      let vm = this
      this.$api.permission
        .toGetAllInfo(permissionId)
        .then(res => {
          let data = res.data.extend.data
          vm.info = data
          // vm.roleData.roles = vm.info.roles
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
