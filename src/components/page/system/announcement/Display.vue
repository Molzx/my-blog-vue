<template>
  <page-system-table-list
    ref="listDisplay"
    :tableData.sync="tableData"
    :pageParams.sync="pageParams"
  ></page-system-table-list>
</template>

<script>
import { announcement as headers } from '@/assets/data/table-header'

export default {
  data() {
    return {
      pageParams: {
        size: 8,
        current: 1,
        sorts: [],
        orders: [],
        search: '',
        status: ''
      },
      tableData: {
        name: 'announcement',
        nameText: '公告信息',
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
    getTableData() {
      const vm = this
      this.tableData.showLoading = true
      setTimeout(() => {
        vm.$api.announcement.toGetPageListInfo(this.pageParams).then(res => {
          let data = res.data.extend
          // console.log(data)

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
    getPageTotal() {
      let count = Math.ceil(this.tableData.dataTotal / this.pageParams.size)
      return count
    },
    getParentRefs() {
      let parent = this.$parent.$parent
      return parent
    },
    setUseAnnouncementId(item) {
      let parent = this.getParentRefs()
      let announcementId = item.id
      parent.setUseAnnouncementId(announcementId)
    },
    displayItem(item) {
      this.setUseAnnouncementId(item)
      this.getParentRefs().goPageDetail()
    },
    editItem(item) {
      this.setUseAnnouncementId(item)
      this.getParentRefs().goPageEdit()
    },
    addItem() {
      this.getParentRefs().goPageAdd()
    },
    deleteItem(item, isEndRecord) {
      this.isEndRecord = isEndRecord
      this.setUseAnnouncementId(item)
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
