<template>
  <v-card class="card-no">
    <v-container>
      <v-row class=" pb-2">
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
        <div
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
        </div>
        <div class="d-flex flex-row flex-stretch align-center" v-else>
          <v-btn
            class="mr-1"
            depressed
            color="primary"
            dark
            @click="statusClickAnim"
          >
            {{ tableData.nameText }}状态<v-icon
              ref="statusArrowIcon"
              right
              small
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
        <v-btn class="mx-4" depressed color="diy-1" @click="addItem"
          >添加{{ tableData.nameText }}</v-btn
        >
      </v-row>

      <v-expand-transition>
        <div v-if="tableData.name === 'article'" v-show="showArticleCondition">
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
      </v-expand-transition>
      <v-row>
        <v-col cols="12" class="px-0">
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
              <v-hover v-slot:default="{ hover }">
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
            </template>
            <template v-slot:footer>
              <v-container class="mx-0 pa-0">
                <v-row align="center" justify="center" no-gutters>
                  <v-col cols="3">
                    <span class="table-footer">
                      第 {{ pagination.pageStart + 1 }} -
                      {{ pagination.pageStop }}条，共
                      {{ pagination.itemsLength }}条
                    </span>
                    <span class="table-footer"
                      >每页
                      <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            dark
                            text
                            color="primary"
                            class="mr-1"
                            v-on="on"
                          >
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
                        </v-list> </v-menu
                      >条</span
                    >
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
              </v-container>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
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

      //由于watch触发两次，定义变量，是否立即执行方法，
      //当修改每页的记录数时，需要同时修改两个变量，watch触发两次
      isDoNow: true,
      goCurrentPage: 1,
      //===========文章状态筛选
      //是否展开文章状态筛选
      showArticleCondition: false,
      typeStatusItems: [
        { state: '不筛选', value: 'all' },
        { state: '原创', value: '原创' },
        { state: '翻译', value: '翻译' },
        { state: '转载', value: '转载' }
      ],
      switchStatusItems: [
        { state: '不筛选', value: 'all' },
        { state: '开启', value: '开启' },
        { state: '关闭', value: '关闭' }
      ],
      recStatusItems: [
        { state: '不筛选', value: 'all' },
        { state: '推荐', value: '推荐' },
        { state: '不推荐', value: '不推荐' }
      ],
      pubStatusItems: [
        { state: '不筛选', value: 'all' },
        { state: '已发布', value: '已发布' },
        { state: '草稿', value: '草稿' }
      ],
      statusItems: [
        { state: '不筛选', value: 'all' },
        { state: '所有人可见', value: '启用' },
        { state: '仅个人可见', value: '禁用' }
      ]
    }
  },
  mounted() {
    if (this.tableData.name !== 'article') {
      this.initStatusAnim()
    }
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
      this.pageParams.size = number
    },
    updateCurrentPage() {
      this.pageParams.current = parseInt(this.goCurrentPage)
    },

    //================
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
