<template>
  <page-system-list-table
    ref="listDisplay"
    :tableData.sync="tableData"
    :pageParams.sync="pageParams"
  >
  </page-system-list-table>
</template>

<script>
import { comment as headers } from '@/assets/data/table-header'

import testData from '@/assets/data/article'
export default {
  data() {
    return {
      pageParams: {
        size: 5,
        current: 1,
        sorts: [],
        orders: [],
        status: 'all',
        //评论类型
        type: 'all',
        // 评论所属的资源id
        ownerId: 0,
        // 一级评论，或二级评论
        searchParent: '',
        // 发送评论的用户id
        fromUid: 0,
        // 被回复的用户id
        toUid: 0,
        // 搜索模糊查询字符串
        search: '',
        // 置顶
        sticky: 'all'
      },
      tableData: {
        name: 'comment',
        nameText: '评论',
        pageTotal: 0,
        dataTotal: 0,
        headers: headers,
        records: [],
        showLoading: false,
        isUpdatePagination: false,
        isGetTableData: false
      },
      //操作的是否为最后一页的唯一一条记录
      isEndRecord: false
    }
  },
  mounted() {},
  methods: {
    getTestData() {
      const vm = this
      this.tableData.showLoading = true
      var arr = testData.comment.records
      var arr2 = []

      arr2.push(...arr)
      arr2.push(...arr)
      arr2.push(...arr)
      arr2.push(...arr)

      vm.tableData.records = arr2
      vm.tableData.dataTotal = parseInt(arr2.length)
      vm.tableData.pageTotal = vm.getPageTotal()
      vm.tableData.showLoading = false
      vm.tableData.isUpdatePagination = true
      vm.tableData.isGetTableData = false
    },
    getTableData() {
      const vm = this
      this.tableData.showLoading = true

      setTimeout(() => {
        vm.$api.comment.toGetPageListInfoForSys(this.pageParams).then(res => {
          let data = res.data.extend.data
          // console.log(data)

          vm.tableData.records = data.records
          vm.tableData.dataTotal = parseInt(data.total)
          vm.tableData.pageTotal = vm.getPageTotal()
          console.log(vm.tableData.pageTotal)
          vm.tableData.showLoading = false
          vm.tableData.isUpdatePagination = true
          vm.tableData.isGetTableData = false
          console.log('send')
        })
      }, 200)
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
      let parent = this.$parent.$parent
      return parent
    },
    setUseCommentId(item) {
      let parent = this.getParentRefs()
      let commentId = item.commentId
      parent.setUseCommentId(commentId)
    },
    displayItem(item) {
      this.setUseCommentId(item)
      this.getParentRefs().goPageDetail()
    },
    editItem(item) {
      this.setUseCommentId(item)
      this.getParentRefs().goPageEdit()
    },
    addItem() {
      this.getParentRefs().goPageAdd()
    },
    deleteItem(item, isEndRecord) {
      this.isEndRecord = isEndRecord
      this.setUseCommentId(item)
      this.getParentRefs().goPageDelete()
    }
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
    }
  },
  computed: {}
}
</script>

<style></style>
