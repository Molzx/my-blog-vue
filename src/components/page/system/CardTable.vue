<template>
  <v-card flat>
    <v-row class="mx-4 pt-2 pb-2">
      <div
        v-if="tableData.name == 'user'"
        class="d-flex flex-row flex-stretch align-center"
      >
        <v-btn
          class="mr-1"
          depressed
          color="primary"
          dark
          @click="stateClickAnim"
        >
          用户状态<v-icon ref="stateArrowIcon" right small
            >fas fa-chevron-right</v-icon
          >
        </v-btn>
        <v-card ref="stateCard">
          <v-responsive
            ref="stateRespContainer"
            :max-width="stateRespWidth"
            class="transition-swing"
          >
            <v-btn-toggle
              v-model="pageParams.state"
              color="blue accent-3"
              borderless
              dense
            >
              <v-btn value="all">
                全部
              </v-btn>
              <v-btn value="正常">
                正常
              </v-btn>

              <v-btn value="禁言">
                已禁言
              </v-btn>

              <v-btn value="冻结">
                已冻结
              </v-btn>
            </v-btn-toggle>
          </v-responsive>
        </v-card>
      </div>
      <div class="d-flex flex-row flex-stretch align-center">
        <v-btn
          class="mr-1"
          depressed
          color="primary"
          dark
          @click="statusClickAnim"
        >
          {{ tableData.nameText }}状态<v-icon ref="statusArrowIcon" right small
            >fas fa-chevron-right</v-icon
          >
        </v-btn>
        <v-card ref="statusCard">
          <v-btn-toggle
            v-model="pageParams.status"
            color="blue accent-3"
            borderless
            dense
          >
            <v-btn value="all">
              默认
            </v-btn>

            <v-btn value="启用">
              启用
            </v-btn>

            <v-btn value="禁用">
              禁用
            </v-btn>
          </v-btn-toggle>
        </v-card>
      </div>
      <v-spacer></v-spacer>
      <v-responsive
        ref="searchContainer"
        :max-width="searchWidth"
        class="transition-swing"
      >
        <v-text-field
          v-model="search"
          append-icon="search"
          label="搜索..."
          single-line
          hide-details
          dense
          solo
          flat
          rounded
          background-color="#f5f5f5"
          @focus="searchWidth = 200"
          @blur="searchWidth = 130"
        ></v-text-field>
      </v-responsive>
      <v-btn class="mx-4" depressed color="primary" @click="addItem"
        >添加{{ tableData.nameText }}</v-btn
      >
    </v-row>
    <v-container fluid>
      <v-row v-if="initLoading">
        <v-col
          v-for="index in [1, 2, 3, 4]"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-data-iterator
        v-else
        :items="tableData.records"
        :loading="tableData.showLoading"
        :search="search"
        :page.sync="pageParams.current"
        :items-per-page="pageParams.size"
        @page-count="getPageTotal"
        :options.sync="options"
        @pagination="updatePagination"
        hide-default-footer
      >
        <template v-slot:no-data>
          <div class="align-center text-center" v-text="noDataText"></div>
        </template>
        <template v-slot:loading>
          <v-container style="height: 100px;">
            <v-row class="fill-height" align-content="center" justify="center">
              <v-col class="subtitle-1 text-center" cols="12">
                {{ loadingText }}
              </v-col>
              <v-col cols="6">
                <v-progress-linear
                  color="green accent-4"
                  indeterminate
                  rounded
                  height="8"
                ></v-progress-linear>
              </v-col>
            </v-row>
          </v-container>
          <!-- <div class="align-center text-center" 
          v-text="loadingText"></div> -->
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.permissionId"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-skeleton-loader :loading="tableData.showLoading" type="card">
                <v-card>
                  <v-card-title class="subheading font-weight-bold">{{
                    item[showTitleKey]
                  }}</v-card-title>
                  <v-card-subtitle>
                    {{ item[showSubTitleKey] }}
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-text>
                    <p class="text-justify">{{ item['description'] }}</p>
                  </v-card-text>
                  <!-- <v-list dense>
                    <v-list-item
                      v-for="(key, index) in filteredKeys"
                      :key="index"
                    >
                      <v-list-item-content
                        :class="{ 'blue--text': sortBy === key }"
                        >{{ key.text }}:</v-list-item-content
                      >
                      <v-list-item-content
                        class="align-end"
                        :class="{ 'blue--text': sortBy === key }"
                        >{{ item[key.value] }}</v-list-item-content
                      > 
                    </v-list-item>
                  </v-list>-->
                  <v-divider></v-divider>
                  <v-card-actions
                    ><v-hover v-slot:default="{ hover }">
                      <v-btn class="" text icon color="blue lighten-2">
                        <v-icon
                          small
                          :color="hover ? 'green  darken-2' : ''"
                          @click="displayItem(item)"
                        >
                          mdi-comment-alert-outline
                          <!-- iconfont icon-eye -->
                        </v-icon>
                      </v-btn>
                    </v-hover>
                    <v-hover v-slot:default="{ hover }">
                      <v-btn class="" text icon color="blue lighten-2">
                        <v-icon
                          small
                          :color="hover ? 'green  darken-2' : ''"
                          @click="editItem(item)"
                          >mdi-circle-edit-outline
                          <!-- iconfont icon-edit- -->
                        </v-icon>
                      </v-btn>
                    </v-hover>
                    <v-hover v-slot:default="{ hover }">
                      <v-btn class="" text icon color="blue lighten-2">
                        <v-icon
                          size="20"
                          :color="hover ? 'green  darken-2' : ''"
                          @click="deleteItem(item)"
                          >mdi-delete-sweep-outline
                          <!-- iconfont icon-trash -->
                        </v-icon>
                      </v-btn>
                    </v-hover>
                    <v-hover v-slot:default="{ hover }" v-if="showDownload">
                      <v-btn class="" text icon color="blue lighten-2">
                        <v-icon
                          size="20"
                          :color="hover ? 'green  darken-2' : ''"
                          @click="downloadItem(item)"
                          >mdi-download-outline
                        </v-icon>
                      </v-btn>
                    </v-hover>

                    <v-spacer></v-spacer>
                    <v-icon
                      size="20"
                      :color="isEnabled(item) ? 'success' : 'orange'"
                      v-text="
                        isEnabled(item)
                          ? 'mdi-alpha-e-box-outline'
                          : 'mdi-alpha-d-box-outline'
                      "
                    ></v-icon>
                    <!-- <v-chip class="" label outlined>
                      {{ item.status }}
                    </v-chip> -->
                  </v-card-actions>
                </v-card>
              </v-skeleton-loader>
            </v-col>
          </v-row>
        </template>

        <template v-slot:footer>
          <v-container class="mx-0 pa-0">
            <v-row align="center" justify="center" no-gutters>
              <v-col cols="3">
                <span class="grey--text body-2">
                  第 {{ pagination.pageStart + 1 }} -
                  {{ pagination.pageStop }}条，共 {{ pagination.itemsLength }}条
                </span>
                <span class="grey--text body-2">每页记录数</span>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn dark text color="primary" class="ml-2" v-on="on">
                      {{ pagination.itemsPerPage }}
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(number, index) in sizeItems"
                      :key="index"
                      @click="updateItemsPerPage(number)"
                    >
                      <v-list-item-title>{{ number }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>

              <v-col>
                <v-pagination
                  class="align-self-center align-center"
                  ref="pagination"
                  v-model="pageParams.current"
                  :length="tableData.pageTotal"
                  :next-icon="nextIcon"
                  :prev-icon="prevIcon"
                  :page="pageParams.current"
                  :dataTotal-visible="totalVisible"
                  style=""
                ></v-pagination
              ></v-col>
              <v-col cols="3">
                <v-row align="center" justify="center" no-gutters>
                  <span
                    class="
            grey--text body-2"
                  >
                    跳转到
                  </span>
                  <v-col cols="3">
                    <div class="ma-1">
                      <v-text-field
                        v-model="goCurrentPage"
                        :label="goCurrentPage + ''"
                        single-line
                        hide-details
                        dense
                        full-width
                        type="number"
                        @keydown.enter="updateCurrentPage"
                      ></v-text-field>
                    </div>
                  </v-col>
                  <span
                    class="
            grey--text body-2"
                    >页， 第 {{ pagination.page }} 页，共
                    {{ tableData.pageTotal }}页
                  </span>
                </v-row></v-col
              >
            </v-row></v-container
          >
        </template>
      </v-data-iterator>
    </v-container>
  </v-card>
</template>

<script>
import { TweenLite } from '@common/tweenmax/all'
export default {
  props: {
    pageParams: {
      type: Object,
      default: function() {
        return {
          size: 5,
          current: 1,
          sorts: [],
          orders: [],
          state: 'all',
          status: 'all'
        }
      }
    },
    tableData: {
      type: Object,
      default: function() {
        return {
          name: '',
          pageTotal: 0,
          dataTotal: 0,
          headers: [],
          records: [],
          showLoading: false,
          isUpdatePagination: false,
          isGetTableData: false
        }
      }
    }
  },
  data() {
    return {
      stateRespFlag: false,
      statusRespFlag: false,
      stateRespWidth: 0,
      search: '',
      searchWidth: 130,
      loading: false,
      loadingText: '正在加载......请稍等...',
      noDataText: '暂时没有更多的数据...',
      sizeItems: [3, 4, 6, 8, 12],
      nextIcon: 'navigate_next',
      prevIcon: 'navigate_before',
      totalVisible: 7,

      options: {},
      pagination: {
        page: 0,
        itemsPerPage: 0,
        pageStart: -1,
        pageStop: 0,
        pageTotal: 0,
        itemsLength: 0
      },

      //由于watch触发两次，定义变量，是否立即执行方法，
      //当修改每页的记录数时，需要同时修改两个变量，watch触发两次
      isDoNow: true,
      goCurrentPage: 1,

      itemsPerPageArray: [4, 8, 12],
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',
      keys: ['Name', 'Calories', 'Fat', 'Carbs'],
      items: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65
        }
      ],
      initLoading: true,
      showDownload: false
    }
  },
  mounted() {
    this.initStatusAnim()
  },
  methods: {
    initStatusAnim() {
      const card = this.$refs.statusCard.$el
      TweenLite.set(card, {
        css: {
          width: 0,
          // width: 0
          scale: 0.4,
          autoAlpha: 0,
          transformOrigin: 'left'
        }
      })
    },
    statusClickAnim() {
      const card = this.$refs.statusCard.$el
      const icon = this.$refs.statusArrowIcon.$el
      if (this.statusRespFlag) {
        TweenLite.to(card, 0.2, {
          css: {
            scale: 0.6,
            autoAlpha: 0,
            transformOrigin: 'left'
          },
          onComplete: function() {
            TweenLite.set([card], {
              width: 0
            })
          }
        })
        TweenLite.to(icon, 0.2, { x: 0, autoAlpha: 1 })
      } else {
        TweenLite.set(card, {
          width: 192
        })
        TweenLite.to(card, 0.2, {
          css: {
            // x: 0,
            // width: 192
            scale: 1,
            autoAlpha: 1,
            transformOrigin: 'left'
          }
        })
        TweenLite.to(icon, 0.2, { x: 15, autoAlpha: 0 })
      }

      this.statusRespFlag = !this.statusRespFlag
    },
    stateClickAnim() {
      const card = this.$refs.stateRespContainer.$parent.$el
      const resp = this.$refs.stateRespContainer.$el
      const icon = this.$refs.stateArrowIcon.$el
      if (this.stateRespFlag) {
        TweenLite.to(resp, 0, {
          css: {
            maxWidth: 0
          }
        })
        TweenLite.to(card, 0.4, {
          css: {
            marginRight: 0
          }
        })
        TweenLite.to(icon, 0.2, { x: 0, autoAlpha: 1 })
      } else {
        TweenLite.to(resp, 0, {
          css: {
            maxWidth: 383
          }
        })
        TweenLite.to(card, 0.2, {
          css: {
            marginRight: 8
          }
        })
        TweenLite.to(icon, 0.2, { x: 15, autoAlpha: 0 })
      }
      this.stateRespFlag = !this.stateRespFlag
    },
    searchClick(e) {
      this.searchWidth = 300
      console.log(e)
    },
    requireTableData() {
      // console.log(this.pageParams)
      this.tableData.isGetTableData = true
      this.$emit('update:pageParams', this.pageParams)
      this.$emit('update:tableData', this.tableData)
    },
    getPageTotal() {
      return this.tableData.pageTotal
    },
    updatePagination() {
      this.pagination = {
        page: this.pageParams.current,
        itemsPerPage: this.pageParams.size,
        pageStart: this.getPageStart,
        pageStop: this.getPageStop,
        pageTotal: this.tableData.pageTotal,
        itemsLength: this.tableData.dataTotal
      }
      this.goCurrentPage = this.pageParams.current

      return this.pagination
    },
    updateOptions() {
      this.options = {
        page: this.pageParams.current,
        itemsPerPage: this.pageParams.size,
        sortBy: [],
        sortDesc: [],
        groupBy: [],
        groupDesc: [],
        multiSort: false,
        mustSort: false
      }
      return this.options
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
      this.pageParams.size = number
    },
    updateCurrentPage() {
      this.pageParams.current = parseInt(this.goCurrentPage)
    },
    isEnabled(item) {
      if (item.status == '启用') {
        return true
      } else {
        return false
      }
    },
    //================
    stopInitLoading() {
      this.initLoading = false
    },
    openDownload() {
      this.showDownload = true
    },
    displayItem(item) {
      this.$parent.displayItem(item)
    },
    editItem(item) {
      this.$parent.editItem(item)
    },
    addItem() {
      this.$parent.addItem()
    },
    deleteItem(item) {
      //==如果删除的是最后一页的唯一一条记录，删除后需要更新页数
      //操作的是否为最后一页的唯一一条记录，即开始记录数等于结尾记录数
      let start = this.pagination.pageStart + 1
      let end = this.pagination.pageStop
      let isEndRecord = eval(start) == eval(end) ? true : false
      console.log(isEndRecord)
      this.$parent.deleteItem(item, isEndRecord)
    },
    downloadItem(item) {
      this.$parent.downloadItem(item)
    }
  },
  components: {},
  watch: {
    pageParams: {
      handler() {
        if (this.isDoNow == true) {
          this.requireTableData()
        }
      },
      deep: true
    },
    'options.itemsPerPage': {
      handler(newVal) {
        if (typeof newVal != 'undefined') {
          // console.log('new' + newVal)

          // this.pageParams.current = current
          if (this.pageParams.size == newVal) {
            //初始化页面
            // console.log('initOptions.itemsPerPage')
          } else {
            // console.log('----.itemsPerPage')
            this.isDoNow = false
            this.pageParams.size = newVal

            this.isDoNow = true

            let start = this.getPageStart + 1
            let current = Math.ceil(start / this.pageParams.size)
            //设置计算后的新页数
            this.pageParams.current = current
          }
        }
      },
      immediate: true
      // deep: true
    },
    'options.sortBy': {
      handler(newVal) {
        if (typeof newVal != 'undefined') {
          console.log('new' + newVal)
        }
      },
      immediate: true
      // deep: true
    },
    'options.sortDesc': {
      handler(newVal) {
        if (typeof newVal != 'undefined') {
          console.log('newsortDesc:' + newVal)
        }
      },
      immediate: true
      // deep: true
    },

    'tableData.isUpdatePagination': {
      handler(newVal) {
        if (newVal == true) {
          //更新页面总记录数
          this.updatePagination()
          this.tableData.isUpdatePagination = false
          this.$emit('update:tableData', this.tableData)
        }
      },
      immediate: true
      // deep: true
    }
  },
  computed: {
    getPageStart() {
      let oldPageStart = this.pagination.pageStart
      let newPageStart = (this.pageParams.current - 1) * this.pageParams.size
      return newPageStart > this.tableData.dataTotal - 1
        ? oldPageStart
        : newPageStart
    },
    getPageStop() {
      let value =
        this.pageParams.current * this.pageParams.size >
        this.tableData.dataTotal
          ? this.tableData.dataTotal
          : this.pageParams.current * this.pageParams.size

      return value
    },

    filteredKeys() {
      return this.tableData.headers.filter(header => header.show === true)
    },
    showTitleKey() {
      let key
      for (let temp of this.tableData.headers) {
        if (temp.title === true) {
          key = temp.value
        }
      }
      return key
    },
    showSubTitleKey() {
      let key
      for (let temp of this.tableData.headers) {
        if (temp.subTitle === true) {
          key = temp.value
        }
      }
      return key
    }
  }
}
</script>

<style></style>
