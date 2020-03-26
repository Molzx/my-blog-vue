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

    <v-data-table
      calculate-widths
      :headers="tableData.headers"
      :items="tableData.records"
      :loading="tableData.showLoading"
      :loading-text="loadingText"
      :no-data-text="noDataText"
      :search="search"
      :page.sync="pageParams.current"
      :items-per-page="pageParams.size"
      @page-count="getPageTotal"
      :options.sync="options"
      @pagination="updatePagination"
      hide-default-footer
    >
      <template v-slot:item.action="{ item }">
        <v-hover v-slot:default="{ hover }">
          <v-btn class="btn-icon-diy" text icon color="blue lighten-2">
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
          <v-btn class="btn-icon-diy" text icon color="blue lighten-2">
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
          <v-btn class="btn-icon-diy" text icon color="blue lighten-2">
            <v-icon
              size="20"
              :color="hover ? 'green  darken-2' : ''"
              @click="deleteItem(item)"
              >mdi-delete-sweep-outline
              <!-- iconfont icon-trash -->
            </v-icon>
          </v-btn>
        </v-hover>
      </template>
      <template v-slot:footer>
        <div class="diy-data-footer d-flex flex-row  justify-center">
          <v-pagination
            ref="pagination"
            v-model="pageParams.current"
            :length="tableData.pageTotal"
            :next-icon="nextIcon"
            :prev-icon="prevIcon"
            :page="pageParams.current"
            :dataTotal-visible="totalVisible"
            style="width:400px;margin-left:300px"
          ></v-pagination>
          <v-data-footer
            disable-pagination
            :options.sync="options"
            :pagination.sync="pagination"
            :items-per-page-options="sizeItems"
            style="width:300px"
          >
          </v-data-footer>
        </div>
      </template>
    </v-data-table>
    <!-- <div class="text-center pt-2 pb-4">
      <v-pagination
        v-model="pageParams.current"
        :length="pageTotal"
        :next-icon="nextIcon"
        :prev-icon="prevIcon"
        :page="pageParams.current"
        :dataTotal-visible="totalVisible"
      ></v-pagination>
    </div> -->
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
      sizeItems: [3, 5, 8, 10, 15, -1],
      nextIcon: 'navigate_next',
      prevIcon: 'navigate_before',
      totalVisible: 7,

      options: {},
      pagination: {},

      //由于watch触发两次，定义变量，是否立即执行方法，
      //当修改每页的记录数时，需要同时修改两个变量，watch触发两次
      isDoNow: true
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
    }
  }
}
</script>

<style></style>
