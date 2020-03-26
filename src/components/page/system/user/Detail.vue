<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-01-31 09:14:45
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-07 17:18:08
 * @FilePath     : \VueProjects\my-blog\src\components\page\user\Detail.vue
 * @Description  : 这是一些注释
 -->
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
            用户的资料
          </v-chip></v-col
        >
        <v-col>
          <v-sheet color="grey lighten-4">
            <v-container>
              <v-row>
                <v-col cols="2" class="d-flex justify-center">
                  <div class="d-flex align-center align-self-center">
                    <v-avatar size="72" class="shadow-5">
                      <img :src="info.avatar" />
                    </v-avatar>
                  </div>
                </v-col>

                <v-col cols="4">
                  <p class="font-weight-medium">帐号：{{ info.userName }}</p>
                  <p class="font-weight-medium">昵称：{{ info.nickName }}</p>
                  <p class="font-weight-medium">性别：{{ info.gender }}</p>
                  <p class="font-weight-medium">年龄：{{ info.age }}</p>
                  <p class="font-weight-medium">
                    个性签名：{{ info.autograph }}
                  </p>
                </v-col>
                <v-col cols="4">
                  <p class="font-weight-medium">手机号码：{{ info.phone }}</p>
                  <p class="font-weight-medium">邮箱帐号：{{ info.email }}</p>
                  <p class="font-weight-medium">用户状态：{{ info.state }}</p>
                  <p class="font-weight-medium">帐号状态：{{ info.status }}</p>
                  <p class="font-weight-medium">
                    首次加入时间：{{ info.createdTime }}
                  </p>
                  <p class="font-weight-medium">
                    上次登录时间：{{ info.loginedTime }}
                  </p>
                  <p class="font-weight-medium">
                    上次更新时间：{{ info.updatedTime }}
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-col>
      </v-row>
      <page-system-user-roledisplay
        :roleData.sync="roleData"
      ></page-system-user-roledisplay>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      info: {
        userName: '账号',
        nickName: '昵称',
        avatar: '',
        autograph: '个性签名',

        age: '年龄',
        gender: '性别',
        phone: '手机号码',
        email: '邮箱',
        loginedTime: '上次登录时间',
        state: '用户状态',
        createdTime: '创建时间',
        updatedTime: '更新时间',
        status: '状态标记',
        roles: [],
        enabledRoles: [],
        disabledRoles: []
      },
      roleData: {
        //拥有的角色列表
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
      let userName = parent.getUseUserName()
      this.getUserInfo(userName)
    },
    getUserInfo(userName) {
      let vm = this
      this.$api.user
        .toGetAllInfo(userName)
        .then(res => {
          let data = res.data.extend.data
          vm.info = data
          vm.roleData.roles = vm.info.roles
          vm.info.avatar =
            'http://localhost:8088/api/v1/resources/preview?fileName=' +
            vm.info.avatar
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
