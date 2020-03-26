<template>
  <div>
    <v-sheet color="grey lighten-4">
      <v-container class="py-0">
        <v-row align="center" justify="start">
          <v-col
            v-for="(selection, i) in selections"
            :key="selection.name"
            class="shrink"
          >
            <v-chip
              :disabled="otherData.loading"
              close
              label
              @click:close="selected.splice(i, 1)"
            >
              <!-- <v-icon left v-text="selection.icon"></v-icon> -->
              {{ selection.name }}
            </v-chip>
          </v-col>
          <v-col v-if="!allSelected" cols="12">
            <v-text-field
              ref="search"
              v-model="search"
              full-width
              hide-details
              label="Search"
              single-line
              dense
              :disabled="otherData.loading"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-divider v-if="!allSelected"></v-divider>

    <v-list
      color="grey lighten-4"
      class="overflow-y-auto mt-2"
      max-height="240"
      v-show="!allSelected"
    >
      <v-skeleton-loader
        :loading="otherData.loading"
        height="240"
        type="list-item@5"
      >
        <template v-for="(item, i) in roleList">
          <v-list-item
            v-if="!selected.includes(i)"
            :key="i"
            :disabled="otherData.loading"
            @click="selected.push(i)"
          >
            <!-- <v-list-item-avatar>
                  <v-icon :disabled="loading" v-text="item.icon"></v-icon>
                </v-list-item-avatar> -->
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item>
        </template>
      </v-skeleton-loader>
    </v-list>
    <!-- <v-divider v-if="type == 'edit'">></v-divider>

    <v-card-actions v-if="type == 'edit'">
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!selected.length"
        :loading="otherData.loading"
        color="purple"
        text
        @click="addRole"
        >确认</v-btn
      >
    </v-card-actions> -->
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object
      // roleIds: []
    },
    roleData: {
      type: Object,
      default: () => ({
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
      })
    },
    otherData: {
      type: Object,
      default: () => ({
        // file: [],
        // validateSuccess: false,
        loading: false
      })
    },
    type: {
      type: String,
      default: 'show'
    }
  },
  data() {
    return {
      roleItems: [],
      search: '',
      selected: [],
      dataArr: []
    }
  },
  mounted() {},
  methods: {
    reset() {
      // 将初始状态的data复制到当前状态的data，实现重置效果
      // Object.assign(this.$data, this.$options.data())
      this.otherData.loading = false
      this.selected = []
    },
    updateParentData() {
      this.formData.roleIds = this.dataArr
      this.$emit('update:formData', this.formData)
      // this.$emit('update:otherData', this.otherData)
    },
    addRole() {
      if (this.selected.length != 0) {
        this.roleData.addCommit = true
        this.$emit('update:otherData', this.otherData)
        this.selected = []
      }
    }
  },
  computed: {
    allSelected() {
      return this.selected.length === this.roleItems.length
    },
    roleList() {
      const search = this.search.toLowerCase()

      if (!search) return this.roleItems

      return this.roleItems.filter(item => {
        const text = item.name.toLowerCase()

        return text.indexOf(search) > -1
      })
    },
    selections() {
      const selections = []

      for (const selection of this.selected) {
        selections.push(this.roleItems[selection])
      }

      return selections
    }
  },

  watch: {
    'otherData.loading': {
      handler() {
        console.log(this.otherData.loading)
      },
      immediate: true
      // deep: true
    },
    'roleData.roleItems': {
      handler() {
        this.roleItems = this.roleData.roleItems
      },
      immediate: true
      // deep: true
    },
    selected() {
      this.search = ''
      let arr = []
      for (let i = 0; i < this.selected.length; i++) {
        let index = this.selected[i]
        let item = this.roleItems[index].roleId
        arr.push(item)
      }
      this.dataArr = arr
      if (this.selected.length != 0) {
        this.$emit('fatherMethod', false)
      } else {
        this.$emit('fatherMethod', true)
      }
      this.updateParentData()
    }
  }
}
</script>

<style></style>
