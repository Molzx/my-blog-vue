<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-03-30 23:13:44
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-31 13:55:45
 * @FilePath     : \VueProjects\my-blog\src\components\page\system\TableCard.vue
 * @Description  : 这是一些注释
 -->
<template>
  <page-system-table-list
    ref="listDisplay"
    :tableData.sync="tableData"
    :pageParams.sync="pageParams"
    :cardPagination.sync="pagination"
  >
    <template slot="header">
      <slot name="header"> </slot>
    </template>
    <template slot="header-row1">
      <slot name="header-row1"> </slot>
    </template>
    <template slot="header-prepend">
      <slot name="header-prepend"> </slot>
    </template>
    <template slot="condition">
      <slot name="condition"> </slot>
    </template>
    <template slot="condition-prepend">
      <slot name="condition-prepend"> </slot>
    </template>
    <template slot="header-row2">
      <slot name="header-row2"> </slot>
    </template>
    <template slot="table">
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
        :page.sync="pageParams.current"
        :items-per-page="pageParams.size"
        @page-count="getPageTotal"
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
              v-for="(item, i) in props.items"
              :key="i"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-skeleton-loader :loading="tableData.showLoading" type="card">
                <v-hover v-slot:default="{ hover }">
                  <v-card outlined :class="hover ? '' : 'no-shadow'">
                    <!-- 传值（自定义属性） -->
                    <slot :item="item" name="card-content"> </slot>
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
                    <v-card-actions>
                      <template v-for="opt in optItems">
                        <v-tooltip
                          :key="opt.index"
                          v-if="opt.show"
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
                      <!-- <v-tooltip
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
                              :color="
                                value ? 'blue' : isEnabled(item) ? '' : ''
                              "
                              @click="optItem(opt.index, item)"
                            >
                              {{
                                isEnabled(item)
                                  ? 'iconfont icon-check-circle'
                                  : 'iconfont icon-times-circle'
                              }}
                            </v-icon>
                          </v-btn>
                        </template>
                        <span class="icon-color">{{ item.status }}</span>
                      </v-tooltip> -->

                      <v-spacer></v-spacer>
                      <!-- <v-icon
                        size="20"
                        :color="isEnabled(item) ? 'success' : 'orange'"
                        v-text="
                          isEnabled(item)
                            ? 'mdi-alpha-e-box-outline'
                            : 'mdi-alpha-d-box-outline'
                        "
                      ></v-icon> -->
                      <!-- <v-chip class="" label outlined>
                      {{ item.status }}
                    </v-chip> -->
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-skeleton-loader>
            </v-col>
          </v-row>
        </template>

        <template v-slot:footer> </template>
      </v-data-iterator>
    </template>
  </page-system-table-list>
</template>

<script>
export default {
  name: 'temp',
  props: {
    //

    pageParams: {
      type: Object,
      default: function() {
        return {
          size: 5,
          current: 1,
          sorts: [],
          orders: [],
          status: ''
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
      //
      options: '',
      loading: false,
      loadingText: '正在加载......请稍等...',
      noDataText: '暂时没有更多的数据...',
      pagination: {},

      initLoading: true,
      showDownload: false,
      IndexDetail: 'detail',
      IndexEdit: 'edit',
      IndexDel: 'delete',
      IndexAdd: 'addition',
      IndexDownload: 'download',
      IndexPreview: 'preview',
      optItems: [
        {
          icon: 'iconfont icon-invoice',
          desc: '详细信息',
          index: 'detail',
          show: true
        },
        {
          icon: 'iconfont icon-edit-alt',
          desc: '修改信息',
          index: 'edit',
          show: true
        },
        {
          icon: 'iconfont icon-trash-alt',
          desc: '删除记录',
          index: 'delete',
          show: true
        },
        {
          icon: 'iconfont icon-file-download-alt',
          desc: '下载',
          index: 'download',
          show: true
        },
        {
          icon: 'iconfont icon-file-search-alt',
          desc: '预览',
          index: 'preview',
          show: true
        }
      ]
    }
  },
  mounted() {
    //
  },
  methods: {
    //

    getPageTotal() {
      return this.tableData.pageTotal
    },
    updatePagination() {
      return this.pagination
    },
    ///
    isEnabled(item) {
      if (item.status == '启用') {
        return true
      } else {
        return false
      }
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
        case this.IndexDownload:
          this.downloadItem(item)
          break
        case this.IndexPreview:
          this.openPreview(item)
          break

        default:
          break
      }
    },
    stopInitLoading() {
      this.initLoading = false
    },
    openDownload() {
      this.showDownload = true
    },
    openPreview(item) {
      let url = this.$global.preview + item.fileName
      console.log(url)
      window.open(url, '_blank').location
      // this.showDownload = true
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
  computed: {
    //
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
  },
  watch: {
    //
    // 'pageParams.size': {
    //   handler(newVal) {
    //     if (typeof newVal != 'undefined') {
    //       console.log('new' + newVal)
    //       this.updateOptions()
    //     }
    //   },
    //   immediate: true
    //   // deep: true
    // },
  },
  components: {
    //
  }
}
</script>

<style>
/*  */
</style>
