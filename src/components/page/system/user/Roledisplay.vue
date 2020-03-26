<template>
  <v-container class="pa-0">
    <v-row no-gutters class="mt-3">
      <v-col cols="auto">
        <v-chip class="ma-2" color="green" label text-color="white">
          <v-icon left>mdi-label</v-icon>
          启用的角色
        </v-chip></v-col
      >
      <v-col>
        <v-sheet color="grey lighten-4">
          <v-menu
            v-for="(item, i) in enabledRoles"
            :key="i"
            v-model="item.show"
            bottom
            right
            transition="slide-y-transition"
            origin="top left"
          >
            <template v-slot:activator="{ on }">
              <v-chip class="ma-2" color="green" label outlined v-on="on"
                ><v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
                {{ item.name }}
              </v-chip>
            </template>
            <v-card width="300">
              <v-list dark>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.code }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="item.show = false">
                      <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-card-text>
                {{ item.description }}
              </v-card-text>
              <v-card-actions v-if="type == 'edit'">
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  depressed
                  @click="changeStatus(item)"
                  v-text="disabledStatus"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
          <v-chip v-if="!showEnabledRoles" class="ma-2" label>
            暂无
          </v-chip>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-3">
      <v-col cols="auto">
        <v-chip class="ma-2" color="orange" label text-color="white">
          <v-icon left>mdi-label</v-icon>
          禁用的角色
        </v-chip></v-col
      >
      <v-col>
        <v-sheet color="grey lighten-4">
          <v-menu
            v-for="(item, i) in disabledRoles"
            :key="i"
            v-model="item.show"
            bottom
            right
            transition="slide-y-transition"
            origin="top left"
          >
            <template v-slot:activator="{ on }">
              <v-chip class="ma-2" color="orange" label outlined v-on="on">
                {{ item.name }}
              </v-chip>
            </template>
            <v-card width="300">
              <v-list dark>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.code }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="item.show = false">
                      <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-card-text>
                {{ item.description }}
              </v-card-text>
              <v-card-actions v-if="type == 'edit'">
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  depressed
                  @click="changeStatus(item)"
                  v-text="enabledStatus"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
          <v-chip v-if="!showDisabledRoles" class="ma-2" label>
            暂无
          </v-chip>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    roleData: {
      type: Object
      //拥有的角色列表
      // roles: [],
      //要修改的角色id，状态
      // roleId: 0,
      // status: '启用',
      // 修改标志
      // editCommit: false
    },
    type: {
      type: String,
      default: 'show'
    }
  },
  data() {
    return {
      roleArr: [],
      showEnabledRoles: false,
      showDisabledRoles: false,
      enabledStatus: '启用',
      disabledStatus: '禁用',
      enabledRoles: [],
      disabledRoles: []
    }
  },
  mounted() {},
  computed: {},
  watch: {
    'roleData.roles': {
      handler() {
        console.log('watch')
        this.initData()
        this.getStatusArr()
      },
      immediate: true
      // deep: true
    }
  },
  methods: {
    updateParentData() {
      this.roleData.editCommit = true
      this.$emit('update:roleData', this.roleData)
    },
    changeStatus(item) {
      this.roleData.roleId = item.roleId
      if (item.status == this.enabledStatus) {
        this.roleData.status = this.disabledStatus
      } else {
        this.roleData.status = this.enabledStatus
      }
      console.log('-----')
      console.log(this.roleData)
      this.updateParentData()
    },
    initData() {
      ;(this.roleArr = []), (this.roleArr = this.roleData.roles)
      ;(this.showEnabledRoles = false),
        (this.showDisabledRoles = false),
        (this.disabledRoles = []),
        (this.enabledRoles = [])
    },
    getStatusArr() {
      let roles = this.roleData.roles
      let arr = this.splitStatus(roles)
      if (arr[0]) {
        let status = arr[0].status
        if (status == '启用') {
          this.enabledRoles = arr[0].List

          if (arr[1]) {
            this.disabledRoles = arr[1].List
          }
        } else {
          this.disabledRoles = arr[0].List

          if (arr[1]) {
            this.enabledRoles = arr[1].List
          }
        }
        if (this.enabledRoles != false) {
          this.showEnabledRoles = true
        }
        if (this.disabledRoles != false) {
          this.showDisabledRoles = true
        }
      }
    },
    changeData(item) {
      Object.assign(item, { show: false })
      if (item.description == null) {
        Object.assign(item, { description: '暂无' })
      }
      return item
    },
    splitStatus(arr) {
      let dataArr = []
      arr.map(mapItem => {
        if (dataArr.length == 0) {
          let Item = mapItem
          this.changeData(Item)
          dataArr.push({ status: mapItem.status, List: [Item] })
        } else {
          let res = dataArr.some(item => {
            //判断相同状态，有就添加到当前项
            if (item.status == mapItem.status) {
              // 添加属性
              let Item = mapItem
              this.changeData(Item)

              item.List.push(Item)
              return true
            }
          })
          if (!res) {
            //如果没找相同状态添加一个新对象
            let Item = mapItem
            this.changeData(Item)
            dataArr.push({ status: mapItem.status, List: [Item] })
          }
        }
      })
      return dataArr
    }
  },
  components: {}
}
</script>

<style></style>
