<template>
  <page-system-list-table
    ref="listDisplay"
    :tableData.sync="tableData"
    :pageParams.sync="pageParams"
  ></page-system-list-table>
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
        status: 'all',

        //搜索内容
        search: '',
        //文章类型
        type: 'all',
        // 文章分类Id
        cid: 0,
        // 文章标签Id
        tid: 0,
        admStatus: 'all',
        copStatus: 'all',
        repStatus: 'all',
        comStatus: 'all',
        pubStatus: 'all',
        recStatus: 'all'
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
      isEndRecord: false
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
