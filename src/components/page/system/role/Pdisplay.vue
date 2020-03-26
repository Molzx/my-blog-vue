<template>
  <v-container class="pa-0">
    <v-row no-gutters class="mt-3">
      <v-col cols="auto">
        <v-chip class="ma-2" color="green" label text-color="white">
          <v-icon left>mdi-label</v-icon>
          启用的权限
        </v-chip></v-col
      >
      <v-col>
        <v-sheet color="grey lighten-4">
          <v-menu
            v-for="(item, i) in enabledPermissions"
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
                    <v-list-item-subtitle>{{ item.url }}</v-list-item-subtitle>
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
          <v-chip v-if="!showEnabledPermissions" class="ma-2" label>
            暂无
          </v-chip>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-3">
      <v-col cols="auto">
        <v-chip class="ma-2" color="orange" label text-color="white">
          <v-icon left>mdi-label</v-icon>
          禁用的权限
        </v-chip></v-col
      >
      <v-col>
        <v-sheet color="grey lighten-4">
          <v-menu
            v-for="(item, i) in disabledPermissions"
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
                    <v-list-item-subtitle>{{ item.url }}</v-list-item-subtitle>
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
          <v-chip v-if="!showDisabledPermissions" class="ma-2" label>
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
    permissionData: {
      type: Object
      //拥有的权限列表
      // Permissions: [],
      //要修改的权限id，状态
      // permissionId: 0,
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
      permissionArr: [],
      showEnabledPermissions: false,
      showDisabledPermissions: false,
      enabledStatus: '启用',
      disabledStatus: '禁用',
      enabledPermissions: [],
      disabledPermissions: []
    }
  },
  mounted() {},
  computed: {},
  watch: {
    'permissionData.permissions': {
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
      this.permissionData.editCommit = true
      this.$emit('update:permissionData', this.permissionData)
    },
    changeStatus(item) {
      this.permissionData.permissionId = item.permissionId
      if (item.status == this.enabledStatus) {
        this.permissionData.status = this.disabledStatus
      } else {
        this.permissionData.status = this.enabledStatus
      }
      console.log('-----')
      console.log(this.permissionData)
      this.updateParentData()
    },
    initData() {
      ;(this.permissionArr = []),
        (this.permissionArr = this.permissionData.permissions)
      ;(this.showEnabledPermissions = false),
        (this.showDisabledPermissions = false),
        (this.disabledPermissions = []),
        (this.enabledPermissions = [])
    },
    getStatusArr() {
      let Permissions = this.permissionData.permissions
      let arr = this.splitStatus(Permissions)
      if (arr[0]) {
        let status = arr[0].status
        if (status == '启用') {
          this.enabledPermissions = arr[0].List

          if (arr[1]) {
            this.disabledPermissions = arr[1].List
          }
        } else {
          this.disabledPermissions = arr[0].List

          if (arr[1]) {
            this.enabledPermissions = arr[1].List
          }
        }
        if (this.enabledPermissions != false) {
          this.showEnabledPermissions = true
        }
        if (this.disabledPermissions != false) {
          this.showDisabledPermissions = true
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
