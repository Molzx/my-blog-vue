<template>
  <page-system-table-list
    ref="listDisplay"
    :tableData.sync="tableData"
    :pageParams.sync="pageParams"
  >
    <template slot="condition-prepend">
      <v-chip-group v-model="pageParams.handledStatus">
        <v-chip
          filter
          outlined
          v-for="item in handledStatusItem"
          :key="item.value"
          :value="item.value"
        >
          {{ item.state }}
        </v-chip>
      </v-chip-group>
      <v-divider class="mx-4" inset vertical></v-divider>
    </template>
  </page-system-table-list>
</template>

<script>
import { report as headers } from '@/assets/data/table-header'

export default {
  data() {
    return {
      pageParams: {
        size: 8,
        current: 1,
        sorts: [],
        orders: [],
        search: '',
        handledStatus: '',
        status: ''
      },
      tableData: {
        name: 'report',
        nameText: '举报信息',
        pageTotal: 0,
        dataTotal: 0,
        headers: headers,
        records: [],
        showLoading: false,
        isUpdatePagination: false,
        isGetTableData: false
      },
      //操作的是否为最后一页的唯一一条记录
      isEndRecord: false,

      handledStatusItem: [
        // { state: '不筛选', value: 'all' },
        { state: '待处理', value: '待处理' },
        { state: '处理中', value: '处理中' },
        { state: '已解决', value: '已解决' }
      ]
    }
  },
  mounted() {},
  methods: {
    getTableData() {
      const vm = this
      this.tableData.showLoading = true
      setTimeout(() => {
        vm.$api.report.toGetPageListInfo(this.pageParams).then(res => {
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
    setUseReportId(item) {
      let parent = this.getParentRefs()
      let reportId = item.id
      parent.setUseReportId(reportId)
    },
    displayItem(item) {
      this.setUseReportId(item)
      this.getParentRefs().goPageDetail()
    },
    editItem(item) {
      this.setUseReportId(item)
      this.getParentRefs().goPageEdit()
    },
    addItem() {
      this.getParentRefs().goPageAdd()
    },
    deleteItem(item, isEndRecord) {
      this.isEndRecord = isEndRecord
      this.setUseReportId(item)
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
