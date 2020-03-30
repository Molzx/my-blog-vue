<template>
  <page-system-list-table
    ref="listDisplay"
    :tableData.sync="tableData"
    :pageParams.sync="pageParams"
  >
    <template slot="header-prepend">
      <!--  -->

      <div class="d-flex flex-row flex-stretch align-center">
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
    </template>
    <template slot="header-row2">
      <!--  -->

      <helper-dialog
        :show.sync="showArticleCondition"
        width="600"
        headerTitle="条件筛选"
        headerColor="info"
        :limitCardTextHeight="false"
        :persistent="false"
        @cancel="showArticleCondition = !showArticleCondition"
      >
        <template slot="content.card-text">
          <!--  -->
          <!-- <v-row align="center" dense justify="space-between">
            <v-col cols="auto">
            </v-col>
            <v-col cols="auto">
            </v-col>
          </v-row> -->
          <v-row dense align="center">
            <v-chip label outlined class="mr-2">
              文章类别
            </v-chip>
            <v-overflow-btn
              v-model="pageParams.cid"
              placeholder="筛选"
              :items="tableData.categoryItems"
              item-text="categoryName"
              item-value="categoryId"
              single-line
              dense
              disable-lookup
              background-color="#fafafa"
              menu-props="bottom, overflowY"
            ></v-overflow-btn>
          </v-row>
          <v-row dense align="center">
            <v-chip label outlined class="mr-2">
              文章标签
            </v-chip>

            <v-overflow-btn
              v-model="pageParams.tid"
              placeholder="筛选"
              :items="tableData.tagItems"
              item-text="tagName"
              item-value="tagId"
              single-line
              dense
              disable-lookup
              background-color="#fafafa"
              menu-props="bottom, overflowY"
            ></v-overflow-btn>
          </v-row>
          <!-- <v-row>
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
          </!-->
          <v-row align="center" dense justify="space-between" class="pb-3">
            <v-col
              cols="auto"
              v-for="condition in conditionObject"
              :key="condition.key"
            >
              <v-row align="center" class="mx-0">
                <v-chip label outlined class="mr-2">
                  {{ condition.name }}
                </v-chip>
                <v-chip-group v-model="pageParams[condition.key]" column>
                  <v-chip
                    filter
                    outlined
                    v-for="item in condition.value"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.state }}
                  </v-chip>
                </v-chip-group>
              </v-row>
            </v-col>
          </v-row>

          <!-- <v-row align="center"> -->
          <!-- <v-col cols="3">
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
                ></v-col> -->

          <!-- <v-col cols="12">
                  <v-chip label outlined>
                    可见状态
                  </v-chip>
                  <v-chip-group v-model="pageParams.status" column>
                    <v-chip
                      filter
                      outlined
                      v-for="item in statusItems"
                      :key="item.value"
                      :value="item.value"
                    >
                      {{ item.state }}
                    </v-chip>
                  </v-chip-group>
                </v-col> -->
          <!-- <v-col cols="3">
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
                </v-col> -->
          <!-- <v-col cols="3">
                  <v-overflow-btn
                    v-model="pageParams.publishedStatus"
                    hint="发布状态"
                    :items="publishedStatusItems"
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
                    v-model="pageParams.recommendStatus"
                    hint="推荐状态"
                    :items="recommendStatusItems"
                    item-text="state"
                    item-value="value"
                    persistent-hint
                    single-line
                    dense
                    background-color="#fafafa"
                    menu-props="bottom"
                  ></v-overflow-btn>
                </v-col>
              </v-row> -->
          <!-- <v-row>
                <v-col cols="3">
                  <v-overflow-btn
                    v-model="pageParams.admirationStatus"
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
                    v-model="pageParams.copyrightStatus"
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
                    v-model="pageParams.reprintStatus"
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
                    v-model="pageParams.commentStatus"
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
              </v-row> -->
        </template>
        <template slot="footer">
          <!--  -->
        </template>
      </helper-dialog>
    </template>
  </page-system-list-table>
</template>

<script>
import { article as headers } from '@/assets/data/table-header'

import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      pageParams: {
        size: 5,
        current: 1,
        sorts: [],
        orders: [],
        status: '',

        //搜索内容
        search: '',
        //文章类型
        type: '',
        // 文章分类Id
        cid: 0,
        // 文章标签Id
        tid: 0,
        admirationStatus: '',
        copyrightStatus: '',
        reprintStatus: '',
        commentStatus: '',
        publishedStatus: '',
        recommendStatus: ''
      },
      tableData: {
        name: 'article',
        nameText: '文章',
        pageTotal: 0,
        dataTotal: 0,
        headers: headers,
        records: [],
        showLoading: false,
        isUpdatePagination: false,
        isGetTableData: false,

        //文章使用中的分类列表,
        categoryItems: [],
        //请求获取分类数据
        requireCategoryItems: true,
        //文章使用中的标签列表,
        tagItems: [],
        //请求获取标签数据
        requireTagItems: true
      },
      //操作的是否为最后一页的唯一一条记录
      isEndRecord: false,

      //
      //===========文章状态筛选
      //是否展开文章状态筛选
      showArticleCondition: false,
      conditionObject: {
        type: {
          key: 'type',
          name: '文章类型',
          value: [
            // { state: '不筛选', value: 'all' },
            { state: '原创', value: '原创' },
            { state: '翻译', value: '翻译' },
            { state: '转载', value: '转载' }
          ]
        },
        admirationStatus: {
          key: 'admirationStatus',
          name: '赞赏功能',
          value: [
            // { state: '不筛选', value: 'all' },
            { state: '开启', value: '开启' },
            { state: '关闭', value: '关闭' }
          ]
        },
        recommendStatus: {
          key: 'recommendStatus',
          name: '推荐状态',
          value: [
            // { state: '不筛选', value: 'all' },
            { state: '推荐', value: '推荐' },
            { state: '不推荐', value: '不推荐' }
          ]
        },
        copyrightStatus: {
          key: 'copyrightStatus',
          name: '版权声明',
          value: [
            // { state: '不筛选', value: 'all' },
            { state: '开启', value: '开启' },
            { state: '关闭', value: '关闭' }
          ]
        },
        publishedStatus: {
          key: 'publishedStatus',
          name: '发布状态',
          value: [
            // { state: '不筛选', value: 'all' },
            { state: '已发布', value: '已发布' },
            { state: '草稿', value: '草稿' }
          ]
        },
        reprintStatus: {
          key: 'reprintStatus',
          name: '转载声明',
          value: [
            // { state: '不筛选', value: 'all' },
            { state: '开启', value: '开启' },
            { state: '关闭', value: '关闭' }
          ]
        },
        status: {
          key: 'status',
          name: '可见状态',
          value: [
            // { state: '不筛选', value: 'all' },
            { state: '所有人可见', value: '启用' },
            { state: '仅个人可见', value: '禁用' }
          ]
        },
        commentStatus: {
          key: 'commentStatus',
          name: '评论状态',
          value: [
            // { state: '不筛选', value: 'all' },
            { state: '开启', value: '开启' },
            { state: '关闭', value: '关闭' }
          ]
        }
      }
      // switchStatusItems: [
      //   // { state: '不筛选', value: 'all' },
      //   { state: '开启', value: '开启' },
      //   { state: '关闭', value: '关闭' }
      // ],
      // recommendStatusItems: [
      //   // { state: '不筛选', value: 'all' },
      //   { state: '推荐', value: '推荐' },
      //   { state: '不推荐', value: '不推荐' }
      // ],
      // publishedStatusItems: [
      //   // { state: '不筛选', value: 'all' },
      //   { state: '已发布', value: '已发布' },
      //   { state: '草稿', value: '草稿' }
      // ],
      // statusItems: [
      //   // { state: '不筛选', value: 'all' },
      //   { state: '所有人可见', value: '启用' },
      //   { state: '仅个人可见', value: '禁用' }
      // ]
    }
  },
  mounted() {},
  methods: {
    getTableData() {
      const vm = this
      this.tableData.showLoading = true
      // console.log(this.pageParams)
      setTimeout(() => {
        vm.$api.article.toGetPageListInfo(this.pageParams).then(res => {
          let data = res.data.extend
          data.records.forEach(el => {
            if (el.status === '启用') {
              el.status = '所有人可见'
            } else {
              el.status = '仅自己可见'
            }
          })
          vm.tableData.records = data.records
          vm.tableData.dataTotal = parseInt(data.total)
          vm.tableData.pageTotal = vm.getPageTotal()
          vm.tableData.showLoading = false
          vm.tableData.isUpdatePagination = true
          vm.tableData.isGetTableData = false
          console.log('send')
          //获取正在使用中的分类列表信息，条件查询需要
          vm.getCategoryItems()
          //获取正在使用中的标签列表信息，条件查询需要
          vm.getTagItems()
        })
      }, 200)
    },
    //获取正在使用中的分类列表信息，每次进入此功能模块
    //执行一次，只有新添加或修改文章使用了新分类，再重新获取数据
    getCategoryItems() {
      if (this.tableData.requireCategoryItems) {
        let vm = this
        this.$api.category.toGetListLessInfoByUse().then(res => {
          let data = res.data.extend
          let arr = data.data
          arr.push({
            categoryId: 0,
            categoryName: '不筛选'
          })
          vm.tableData.categoryItems = arr
          vm.tableData.requireCategoryItems = false
        })
      }
    },
    //获取正在使用中的分类列表信息，每次进入此功能模块
    //执行一次，只有新添加或修改文章使用了新分类，再重新获取数据
    getTagItems() {
      if (this.tableData.requireCategoryItems) {
        let vm = this
        this.$api.tag.toGetListLessInfoByUse().then(res => {
          let data = res.data.extend
          let arr = data.data
          arr.push({
            tagId: 0,
            tagName: '不筛选'
          })
          vm.tableData.tagItems = arr
          vm.tableData.requireTagItems = false
        })
      }
    },
    //父组件调用，当新增了文章，重新获取一次条件筛选中的数据
    setRequireConditionData() {
      this.tableData.requireCategoryItems = true
      this.tableData.requireTagItems = true
    },
    initMethod() {
      console.log('display')
      if (this.isEndRecord) {
        //如果操作的是最后一条记录，不用直接更新表格，
        //由于更改了pageParams的数据，子页面会再次请求更新数据
        this.pageParams.current--
        this.isEndRecord = false
      } else {
        this.getTableData()
      }
    },
    getPageTotal() {
      let count = Math.ceil(this.tableData.dataTotal / this.pageParams.size)
      return count
    },
    getParentRefs() {
      let parent = this.$parent.$parent.$parent.$parent
      return parent
    },
    setUseArticleId(item) {
      let parent = this.getParentRefs()
      let articleId = item.articleId
      parent.setUseArticleId(articleId)
    },
    displayItem(item) {
      this.setUseArticleId(item)
      this.getParentRefs().goPageDetail()
    },
    editItem(item) {
      this.setUseArticleId(item)
      this.getParentRefs().goPageEdit()
    },
    addItem() {
      this.getParentRefs().goPageAdd()
    },
    deleteItem(item, isEndRecord) {
      this.isEndRecord = isEndRecord
      this.setUseArticleId(item)
      this.getParentRefs().goPageDelete()
    }
  },
  computed: {
    ...mapGetters({
      getArticleConditionRefresh: 'getArticleConditionRefreshFun'
    })
  },
  components: {},
  watch: {
    'tableData.isGetTableData': {
      handler(newVal) {
        // console.log('option')
        if (newVal == true) {
          this.getTableData()
        }
      },
      immediate: true
    },
    getArticleConditionRefresh(newVal) {
      if (newVal) {
        this.setRequireConditionData()
      }
    }
  }
}
</script>

<style></style>
