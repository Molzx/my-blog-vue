<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-01-31 09:21:58
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-03 22:01:43
 * @FilePath     : \VueProjects\my-blog\src\components\page\user\Display.vue
 * @Description  : 这是一些注释
 -->
<template>
  <page-system-list-table
    ref="listDisplay"
    :tableData.sync="tableData"
    :pageParams.sync="pageParams"
  ></page-system-list-table>
</template>

<script>
import { user as headers } from '@/assets/data/table-header'

export default {
  data() {
    return {
      pageParams: {
        size: 5,
        current: 1,
        sorts: [],
        orders: [],
        search: '',
        state: 'all',
        status: 'all'
      },
      tableData: {
        name: 'user',
        nameText: '帐号',
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
    getPageTotal() {
      let count = Math.ceil(this.tableData.dataTotal / this.pageParams.size)
      return count
    },
    getTableData() {
      const vm = this
      this.tableData.showLoading = true
      setTimeout(() => {
        vm.$api.user.toGetPageListInfo(this.pageParams).then(res => {
          let data = res.data.extend
          vm.tableData.records = data.records
          vm.tableData.dataTotal = parseInt(data.total)
          vm.tableData.pageTotal = vm.getPageTotal()

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
    getParentRefs() {
      let parent = this.$parent.$parent.$parent.$parent
      return parent
    },
    setUseUserName(item) {
      let parent = this.getParentRefs()
      let userName = item.userName
      parent.setUseUserName(userName)
    },
    displayItem(item) {
      this.setUseUserName(item)
      this.getParentRefs().goPageDetail()
    },
    editItem(item) {
      this.setUseUserName(item)
      this.getParentRefs().goPageEdit()
    },
    addItem() {
      this.getParentRefs().goPageAdd()
    },
    deleteItem(item, isEndRecord) {
      this.isEndRecord = isEndRecord
      this.setUseUserName(item)
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
