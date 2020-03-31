<template>
  <v-card class="mx-auto no-shadow pa-3" outlined>
    <v-row class="mx-0 mb-2 align-center">
      <v-col cols="auto">
        <slot name="left-btn"> </slot>
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
      <v-chip-group v-model="selected" column multiple>
        <template v-for="(item, i) in chips">
          <v-chip
            filter
            outlined
            class="ma-2"
            :value="item[otherData.chipId]"
            v-show="item.show"
            :key="item[otherData.chipId] + i"
            >{{ item[otherData.chipText] }}</v-chip
          >
        </template>
      </v-chip-group>
    </v-sheet>
    <!-- <v-divider></v-divider> -->
    <!-- <v-card-actions>
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
          //待显示的chip列表数据
          chipItems: [],
          ///======主要标识字段=========
          chipId: 'text',
          ///======主要显示字段=========
          chipText: 'text'
        }
      }
    }
  },
  data() {
    return {
      //
      searchWidth: 150,
      //打开搜索功能
      openSearch: true,
      //搜索内容
      search: '',
      //选中的chip id数据
      selected: [],
      //选中的chip 列表数据
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

      this.otherData.selectedChipItems = this.selectedItems
      this.$emit('update:otherData', this.otherData)
    },
    setSelected(selected) {
      this.selected = selected
    }
  },
  computed: {
    //
    chips() {
      const search = this.search.toLowerCase()

      const arr = [...this.otherData.chipItems]
      if (search) {
        arr.forEach(item => {
          const text = item[this.otherData.chipText].toLowerCase()
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
      for (const selection of this.selected) {
        let index = this.otherData.chipItems.findIndex(
          item => item[this.otherData.chipId] === selection
        )
        arr.push(this.otherData.chipItems[index])
      }
      return arr
    }
  },
  watch: {
    //
    selected() {
      // console.log(this.selected)
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
        let arr = this.selectedItems

        let tmpArr = []
        arr.forEach(item => {
          tmpArr.push(item[this.otherData.chipId])
        })
        //选中数据由父组件改变，不用再提交到父组件，故
        this.selfChange = false
        this.selected = tmpArr
      }
    },
    //======更新使用===
    'otherData.selectedChipItems': {
      handler() {
        //由于提交数据时候，自身数据已更新，所以不用再次覆盖
        if (this.parentChange) {
          this.selectedItems = this.otherData.selectedChipItems
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
