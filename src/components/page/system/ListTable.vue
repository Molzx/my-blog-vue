<template>
  <v-card class="card-no">
    <slot name="header">
      <slot name="header-row1">
        <v-row class="mx-0" align="center" style="height:48px;">
          <slot name="header-prepend">
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
            <!-- <div
              class="d-flex flex-row flex-stretch align-center"
              v-if="tableData.name === 'article'"
            >
              <v-btn
                class="mr-1"
                depressed
                color="primary"
                dark
                @click="showArticleCondition = !showArticleCondition"
              >
                条件筛选<v-icon ref="statusArrowIcon" right small
                  >fas fa-chevron-bottom</v-icon
                >
              </v-btn>
            </div> -->
            <div class="d-flex flex-row flex-stretch align-center" v-else>
              <v-btn
                class="mr-3"
                depressed
                color="blue lighten-5 blue--text"
                @click="showCondition = !showCondition"
              >
                条件筛选
                <v-scale-transition mode="out-in" origin="center center">
                  <v-icon
                    ref="statusArrowIcon"
                    right
                    small
                    :key="showCondition"
                    v-text="
                      showCondition
                        ? 'fas fa-chevron-left'
                        : 'fas fa-chevron-right'
                    "
                  ></v-icon>
                </v-scale-transition>
              </v-btn>
              <v-slide-x-transition>
                <v-chip-group
                  v-show="showCondition"
                  v-model="pageParams.status"
                >
                  <v-chip
                    filter
                    outlined
                    v-for="item in statusItem"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.state }}
                  </v-chip>
                </v-chip-group>
              </v-slide-x-transition>
              <!-- <v-card ref="statusCard">
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
              </v-card> -->
            </div>
          </slot>
          <v-spacer></v-spacer>
          <v-responsive
            ref="searchContainer"
            :max-width="searchWidth"
            class="transition-swing"
          >
            <v-text-field
              v-model="search"
              append-icon="search"
              @click:append="startSearch"
              @keydown.enter="startSearch"
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
          <v-btn
            class="mx-4"
            depressed
            rounded
            color="blue lighten-5 blue--text"
            @click="addItem"
          >
            添加记录
          </v-btn>
        </v-row>
      </slot>

      <slot name="header-row2">
        <!-- <v-expand-transition>
          <div
            v-if="tableData.name === 'article'"
            v-show="showArticleCondition"
          >
            <v-row>
              <v-col cols="12" md="8">
                <v-overflow-btn
                  v-model="pageParams.cid"
                  hint="文章分类"
                  placeholder="筛选"
                  :items="tableData.categoryItems"
                  item-text="categoryName"
                  item-value="categoryId"
                  persistent-hint
                  single-line
                  dense
                  disable-lookup
                  background-color="#fafafa"
                  menu-props="bottom, overflowY"
                ></v-overflow-btn>
              </v-col>
              <v-col cols="12" md="4">
                <v-overflow-btn
                  v-model="pageParams.tid"
                  hint="文章标签"
                  placeholder="筛选"
                  :items="tableData.tagItems"
                  item-text="tagName"
                  item-value="tagId"
                  persistent-hint
                  single-line
                  dense
                  disable-lookup
                  background-color="#fafafa"
                  menu-props="bottom, overflowY"
                ></v-overflow-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-overflow-btn
                  v-model="pageParams.type"
                  hint="文章类型"
                  :items="typeStatusItems"
                  item-text="state"
                  item-value="value"
                  persistent-hint
                  single-line
                  dense
                  disable-lookup
                  background-color="#fafafa"
                  menu-props="bottom, overflowY"
                ></v-overflow-btn
              ></v-col>

              <v-col cols="3">
                <v-overflow-btn
                  v-model="pageParams.status"
                  hint="文章可见状态"
                  :items="statusItems"
                  item-text="state"
                  item-value="value"
                  persistent-hint
                  single-line
                  dense
                  background-color="#fafafa"
                  menu-props="bottom"
                >
                </v-overflow-btn>
              </v-col>
              <v-col cols="3">
                <v-overflow-btn
                  v-model="pageParams.pubStatus"
                  hint="发布状态"
                  :items="pubStatusItems"
                  item-text="state"
                  item-value="value"
                  persistent-hint
                  single-line
                  dense
                  background-color="#fafafa"
                  menu-props="bottom"
                ></v-overflow-btn>
              </v-col>
              <v-col cols="3">
                <v-overflow-btn
                  v-model="pageParams.recStatus"
                  hint="推荐状态"
                  :items="recStatusItems"
                  item-text="state"
                  item-value="value"
                  persistent-hint
                  single-line
                  dense
                  background-color="#fafafa"
                  menu-props="bottom"
                ></v-overflow-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-overflow-btn
                  v-model="pageParams.admStatus"
                  hint="赞赏功能"
                  :items="switchStatusItems"
                  item-text="state"
                  item-value="value"
                  persistent-hint
                  single-line
                  dense
                  background-color="#fafafa"
                  menu-props="bottom"
                ></v-overflow-btn>
              </v-col>
              <v-col cols="3">
                <v-overflow-btn
                  v-model="pageParams.copStatus"
                  hint="版权声明"
                  :items="switchStatusItems"
                  item-text="state"
                  item-value="value"
                  persistent-hint
                  single-line
                  dense
                  background-color="#fafafa"
                  menu-props="bottom"
                ></v-overflow-btn>
              </v-col>
              <v-col cols="3">
                <v-overflow-btn
                  v-model="pageParams.repStatus"
                  hint="转载声明"
                  :items="switchStatusItems"
                  item-text="state"
                  item-value="value"
                  persistent-hint
                  single-line
                  dense
                  background-color="#fafafa"
                  menu-props="bottom"
                ></v-overflow-btn>
              </v-col>
              <v-col cols="3">
                <v-overflow-btn
                  v-model="pageParams.comStatus"
                  hint="评论功能"
                  :items="switchStatusItems"
                  item-text="state"
                  item-value="value"
                  persistent-hint
                  single-line
                  dense
                  background-color="#fafafa"
                  menu-props="bottom"
                ></v-overflow-btn>
              </v-col>
            </v-row>
          </div>
        </v-expand-transition> -->
      </slot>
    </slot>
    <v-row class="mx-0">
      <v-col cols="12" class="px-0">
        <slot name="table">
          <v-data-table
            calculate-widths
            :headers="tableData.headers"
            :items="tableData.records"
            :loading="tableData.showLoading"
            :loading-text="loadingText"
            :no-data-text="noDataText"
            :page.sync="pageParams.current"
            :items-per-page="pageParams.size"
            @page-count="getPageTotal"
            :options.sync="options"
            @pagination="updatePagination"
            hide-default-footer
          >
            <template v-slot:item.action="{ item }">
              <v-tooltip
                v-for="opt in optItems"
                :key="opt.index"
                top
                content-class="b-tooltip"
                color="white"
                light
              >
                <template v-slot:activator="{ on, value }">
                  <v-btn
                    class="opt-btn ml-1"
                    :class="value ? 'active' : ''"
                    text
                    icon
                    color="icon-color"
                    v-on="on"
                  >
                    <v-icon
                      size="20"
                      :color="value ? 'blue' : ''"
                      @click="optItem(opt.index, item)"
                    >
                      {{ opt.icon }}
                    </v-icon>
                  </v-btn>
                </template>
                <span class="icon-color">{{ opt.desc }}</span>
              </v-tooltip>
            </template>
            <template v-slot:footer> </template>
          </v-data-table>
        </slot>
      </v-col>
    </v-row>
    <v-footer app padless fixed inset class="my-footer">
      <div class=" fill-width px-10 pt-2 pb-1">
        <v-row align="center" justify="center" no-gutters class="">
          <v-col cols="3">
            <span class="table-footer">
              第 {{ pagination.pageStart + 1 }} -
              {{ pagination.pageStop }}条，共 {{ pagination.itemsLength }}条
            </span>
            <span class="table-footer">
              每页
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn dark text color="primary" class="mr-1" v-on="on">
                    {{ options.itemsPerPage }}
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
              条
            </span>
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
              :total-visible="totalVisible"
              style=""
              circle
              color="teal"
            >
            </v-pagination>
          </v-col>
          <v-col cols="3">
            <v-row align="center" justify="center" no-gutters>
              <span class="table-footer">
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
              <span class="table-footer"
                >页， 第 {{ pagination.page }} 页，共
                {{ tableData.pageTotal }}页
              </span>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-footer>
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
          status: 'all',
          //
          //文章用条件
          admStatus: 'all',
          copStatus: 'all',
          repStatus: 'all',
          comStatus: 'all',
          pubStatus: 'all',
          recStatus: 'all'
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
      sizeItems: [3, 5, 8, 10, 15],
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
      showCondition: false,
      statusItem: [
        // { state: '不筛选', value: 'all' },
        { state: '启用', value: '启用' },
        { state: '禁用', value: '禁用' }
      ],
      //由于watch触发两次，定义变量，是否立即执行方法，
      //当修改每页的记录数时，需要同时修改两个变量，watch触发两次
      isDoNow: true,
      goCurrentPage: 1,

      IndexDetail: 'detail',
      IndexEdit: 'edit',
      IndexDel: 'delete',
      IndexAdd: 'addition',
      optItems: [
        {
          icon: 'iconfont icon-zhaiyao',
          desc: '详细信息',
          index: 'detail'
        },
        {
          icon: 'iconfont icon-bianji',
          desc: '修改信息',
          index: 'edit'
        },
        {
          icon: 'iconfont icon-shanchu',
          desc: '删除记录',
          index: 'delete'
        }
      ]
    }
  },
  mounted() {
    // if (this.tableData.name !== 'article') {
    //   this.initStatusAnim()
    // }
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

    startSearch() {
      this.pageParams.search = this.search
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
      this.options.itemsPerPage = number
    },
    updateCurrentPage() {
      this.pageParams.current = parseInt(this.goCurrentPage)
    },

    //================
    optItem(index, item) {
      switch (index) {
        case this.IndexDetail:
          this.displayItem(item)
          break
        case this.IndexEdit:
          this.editItem(item)
          break
        case this.IndexDel:
          this.deleteItem(item)
          break
        case this.IndexAdd:
          this.addItem(item)
          break

        default:
          break
      }
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
            console.log('----.itemsPerPage')
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
      if (this.tableData.dataTotal < 1) {
        return 0
      }
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

<style lang="scss" scoped>
.opt-btn.active {
  opacity: 1;
  transition: opacity 0.4s ease-in-out;
}

.opt-btn {
  opacity: 0.8;
}
</style>
