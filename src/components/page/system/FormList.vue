<template>
  <!-- Something -->
  <v-card class="mx-auto no-shadow pa-3" outlined>
    <v-row class="mx-0 mb-2 align-center">
      <v-col cols="auto">
        <!-- <v-btn depressed color="grey lighten-5 blue grey--text" class="mr-2">
          上一页
        </v-btn> -->
        <v-btn
          depressed
          color="green lighten-5 green--text"
          @click="clickAdd"
          class="mr-2"
          width="100"
        >
          添加
          <!-- <v-icon right>mdi-plus</v-icon> -->
        </v-btn>
        <!-- <v-btn icon @click="clickSearch">
          <v-icon>iconfont icon-search-alt</v-icon>
        </v-btn> -->
      </v-col>
      <v-slide-x-transition>
        <v-col cols="5" v-if="openSearch" key="g1"> </v-col>
      </v-slide-x-transition>
      <v-spacer></v-spacer>
      <v-responsive
        ref="searchContainer"
        :max-width="searchWidth"
        class="transition-swing mx-2"
      >
        <v-text-field
          ref="search"
          v-model="search"
          full-width
          label="搜索..."
          single-line
          hide-details
          dense
          solo
          flat
          rounded
          background-color="#f5f5f5"
          append-icon="iconfont icon-search-alt"
          @click:append="clickSearch"
          @keydown.enter="clickSearch"
          @focus="searchWidth = 200"
          @blur="searchWidth = 150"
        >
        </v-text-field>
      </v-responsive>
      <slot name="right-btn">
        <!-- <v-btn depressed color="green lighten-5 green--text" class="">
          下一页
        </v-btn> -->
      </slot>
    </v-row>
    <v-sheet
      color="transparent"
      class="overflow-y-auto"
      :max-height="maxHeight"
    >
      <v-list nav>
        <v-list-item-group
          v-model="selected"
          active-class="border"
          color="blue"
          :mandatory="mandatory"
          :multiple="multiple"
        >
          <template v-for="(item, i) in showItems">
            <v-list-item
              v-show="item.show"
              :key="i"
              :value="item[otherData.listId]"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title
                  v-text="item[otherData.listText]"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-sheet>
    <!-- <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!selected" color="green" text @click="complete"
          >确认</v-btn
        >
      </v-card-actions> -->
  </v-card>
</template>

<script>
export default {
  props: {
    //列表可显示的最大高度
    maxHeight: {
      type: [String, Number],
      default: '100%'
    },
    otherData: {
      type: Object,
      default: () => {
        return {
          //添加展示分类标签使用====
          //待显示的list列表数据
          listItems: [],
          //已选中的list列表数据(修改时父组件传入使用)
          selectedListItems: [],
          ///======主要标识字段=========
          listId: 'text',
          ///======主要显示字段=========
          listText: 'text'
        }
      }
    },
    //========list 内部变量===
    //是否至少选中一个
    mandatory: {
      type: Boolean,
      default: false
    },
    //是否可以多选
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //搜索框宽度
      searchWidth: 150,
      openSearch: true,
      search: '',
      //选中的list列表数据
      selected: [],
      //选中的list 列表数据
      selectedItems: [],
      //是否为当前组件改变数据
      selfChange: true,
      //是否为父组件改变数据
      parentChange: true
    }
  },
  mounted() {
    //
  },
  methods: {
    //

    //添加列表
    clickAdd() {
      //
      //调用父组件方法
      this.$emit('fatherMethod')
    },
    clickSearch() {
      this.openSearch = !this.openSearch
      if (this.openSearch) {
        // this.$refs.search.focus()
      }
    },
    complete() {
      //

      //自身 更改数据，设置父组件更新数据为false
      this.parentChange = false
      this.selectedItems = this.getSelections

      this.otherData.selectedListItems = this.selectedItems
      this.$emit('update:otherData', this.otherData)
    }
  },
  computed: {
    //
    showItems() {
      const search = this.search.toLowerCase()

      const arr = [...this.otherData.listItems]
      if (search) {
        arr.forEach(item => {
          const text = item[this.otherData.listText].toLowerCase()
          if (text.indexOf(search) > -1) {
            item.show = true
          } else {
            item.show = false
          }
        })
      } else {
        arr.forEach(item => {
          item.show = true
        })
      }

      return arr
    },
    getSelections() {
      const arr = []
      if (this.multiple) {
        for (const selection of this.selected) {
          let index = this.otherData.listItems.findIndex(
            item => item[this.otherData.listId] == selection
          )
          arr.push(this.otherData.listItems[index])
        }
      } else {
        //单选的时候
        let arr2 = this.otherData.listItems
        arr2.forEach(item => {
          //当是单选的时候，this.selected 是一个数字
          if (item[this.otherData.listId] == this.selected) {
            arr.push(item)
          }
        })
      }
      return arr
    }
  },
  watch: {
    //
    selected() {
      //如果是当前组件改变的数据，提交数据到父父组件
      if (this.selfChange) {
        this.complete()
      } else {
        this.selfChange = true
      }
    },
    selectedItems() {
      //如果是父组件改变的数据，则更新数据
      if (this.parentChange) {
        //选中数据由父组件改变，不用再提交到父组件，故
        this.selfChange = false

        if (this.multiple) {
          let arr = this.selectedItems
          let tmpArr = []
          arr.forEach(item => {
            tmpArr.push(item[this.otherData.listId])
          })

          this.selected = tmpArr
        } else {
          this.selected = this.selectedItems[0][this.otherData.listId]
        }
      }
    },

    //================

    //======更新使用===
    'otherData.selectedListItems': {
      handler(newVal) {
        //由于提交数据时候，自身数据已更新，所以不用再次覆盖
        if (this.parentChange) {
          if (newVal.length > 0) {
            this.selectedItems = this.otherData.selectedListItems
          }
        } else {
          //自身数据更新完成，设置父组件更新标记为true，防止父组件更新数据无效
          this.parentChange = true
        }
      },
      immediate: true
    }
  },
  components: {
    //
  }
}
</script>

<style>
/*  */
</style>
