<template>
  <page-system-table-card
    ref="listDisplay"
    :tableData.sync="tableData"
    :pageParams.sync="pageParams"
  ></page-system-table-card>
</template>

<script>
import { file as headers } from '@/assets/data/table-header'

export default {
  data() {
    return {
      pageParams: {
        size: 4,
        current: 1,
        sorts: [],
        orders: [],
        search: '',
        status: 'all'
      },
      tableData: {
        name: 'file',
        nameText: '文件',
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
        vm.$api.file.toGetPageListInfo(this.pageParams).then(res => {
          let data = res.data.extend
          console.log(data)
          //关闭初始化加载动画
          vm.$refs.listDisplay.stopInitLoading()
          //开启下载功能
          vm.$refs.listDisplay.openDownload()
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
    downloadFile(item) {
      console.log('inin')
      const vm = this

      let fileName = item.originName
      let params = item.id
      // let name = 'FL_fOMMe708XB3bvsOYb.png'
      // window.location.href = 'localhost:8088/api/v1/resources/download/FL_fOMMe708XB3bvsOYb.png'
      vm.$api.file.toDownloadById(params).then(res => {
        const content = res.data //返回的内容
        vm.download(content, fileName)
      })
    },
    //处理下载流
    download(content, fileName) {
      const blob = new Blob([content])
      if (window.navigator.msSaveOrOpenBlob) {
        // 兼容IE10
        navigator.msSaveBlob(blob, fileName)
      } else {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `${fileName}`)
        document.body.appendChild(link)
        link.click()
      }
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
    setUseFileId(item) {
      let parent = this.getParentRefs()
      let fileId = item.id
      parent.setUseFileId(fileId)
    },
    displayItem(item) {
      this.setUseFileId(item)
      this.getParentRefs().goPageDetail()
    },
    editItem(item) {
      this.setUseFileId(item)
      this.getParentRefs().goPageEdit()
    },
    addItem() {
      this.getParentRefs().goPageAdd()
    },
    deleteItem(item, isEndRecord) {
      this.isEndRecord = isEndRecord
      this.setUseFileId(item)
      this.getParentRefs().goPageDelete()
    },
    downloadItem(item) {
      this.setUseFileId(item)
      this.downloadFile(item)
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
