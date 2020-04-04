<template>
  <page-system-table-card
    ref="listDisplay"
    :tableData.sync="tableData"
    :pageParams.sync="pageParams"
  >
    <template slot="condition">
      <v-menu
        v-model="showCondition"
        :close-on-content-click="false"
        top
        :nudge-top="14"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <div>
            <v-btn
              v-on="on"
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
            <template v-for="(value, key, index) in conditionItem">
              <v-chip
                :key="value + index"
                v-if="pageParams[value]"
                label
                outlined
                color="green"
                class="mr-2"
                close
                close-icon="iconfont icon-guanbi"
                @click:close="pageParams[value] = ''"
              >
                {{ pageParams[value] }}
              </v-chip>
            </template>
          </div>
        </template>

        <v-card class="" outlined>
          <v-card-text>
            <v-row align="center">
              <v-chip label color="blue lighten-5 blue--text" class="mr-2">
                文件类型
              </v-chip>
              <v-chip-group v-model="pageParams.category">
                <v-chip
                  filter
                  outlined
                  v-for="item in fileCategoryItem"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.state }}
                </v-chip>
              </v-chip-group>
            </v-row>
            <v-row align="center">
              <v-chip label color="blue lighten-5 blue--text" class="mr-2">
                记录状态
              </v-chip>
              <v-chip-group v-model="pageParams.status">
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
            </v-row>
          </v-card-text>
        </v-card>
      </v-menu>
    </template>
    <!-- val接收到的值为一个对象 -->
    <template slot="card-content" slot-scope="val">
      <!-- <li>{{ val.item }}</li> -->
      <v-card-title class="color-title">{{ val.item['name'] }}</v-card-title>
      <v-card-text>
        <p class="text-justify color-sub">{{ val.item.description }}</p>
        <v-chip label color="" class="ma-1">{{ val.item.category }}</v-chip>
        <v-chip label color="" class="ma-1">{{ val.item.status }}</v-chip>
        <v-chip label color="" class="ma-1">{{ val.item.createdTime }}</v-chip>
        <v-chip label color="" class="ma-1">{{ val.item.updatedTime }}</v-chip>
      </v-card-text>
    </template>
  </page-system-table-card>
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
        category: '',
        search: '',
        status: ''
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
      isEndRecord: false,

      showCondition: false,
      conditionItem: {
        category: 'category',
        status: 'status'
      },
      fileCategoryItem: [
        { state: '未定义', value: '未定义' },
        { state: '头像', value: '头像' },
        { state: '封面', value: '封面' },
        { state: '文章图片', value: '文章图片' },
        { state: '共享文件', value: '共享文件' },
        { state: '其他文件', value: '其他文件' }
      ],
      statusItem: [
        // { state: '不筛选', value: 'all' },
        { state: '启用', value: '启用' },
        { state: '禁用', value: '禁用' }
      ]
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
