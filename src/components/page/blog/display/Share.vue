<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-03-19 16:20:30
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-20 16:53:49
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\display\Share.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div v-if="loading">
    <v-row>
      <v-col v-for="i in 4" :key="i" cols="3">
        <v-card
          class="shadow-1"
          style="border-radius: 8px !important;"
          min-width="240px"
        >
          <v-skeleton-loader tile type="image" max-height="150px">
          </v-skeleton-loader>
          <v-skeleton-loader type="card-heading"> </v-skeleton-loader>

          <v-skeleton-loader
            type="list-item-three-line"
            class="mt-0"
            width="100%"
          >
          </v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <helper-tip-dialog :show="show"> </helper-tip-dialog>
    <v-row>
      <v-col v-for="(record, i) in records" :key="i" cols="3">
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="shadow-1"
            style="border-radius: 8px !important;"
            min-width="240px"
          >
            <v-card-text>
              <v-row class="align-start ml-3 mr-0 mb-3">
                <div class=" file-bg">
                  <v-img :src="$fileBg(record.type)">
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out white v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >
                        <v-tooltip
                          top
                          content-class="b-tooltip"
                          color="white"
                          light
                          open-on-hover
                        >
                          <template v-slot:activator="{ on }">
                            <v-btn
                              fab
                              class="toast-btn"
                              v-on="on"
                              @click="downloadFile(record)"
                            >
                              <v-icon color="green"
                                >iconfont icon-download</v-icon
                              >
                              <!-- <v-avatar size="68">
                                <img :src="downloadBg" />
                              </v-avatar> -->
                            </v-btn>
                          </template>
                          <span class="grey--text text--darken-3">下载</span>
                        </v-tooltip>
                      </div>
                    </v-expand-transition>
                  </v-img>
                </div>
                <v-spacer></v-spacer>
                <div class="float-right my-auto">
                  <div class="d-flex justify-end">
                    <v-chip
                      small
                      class="grey  lighten-4"
                      text-color="blue-grey"
                      color="transparent"
                    >
                      <Timeago
                        class="an-time"
                        :datetime="record.updatedTime"
                        :autoUpdate="true"
                      >
                      </Timeago>
                    </v-chip>
                  </div>
                  <div class="d-flex justify-end mt-2">
                    <v-chip
                      small
                      class="grey  lighten-4 mt-0 mr-1"
                      text-color="blue-grey"
                      color="transparent"
                      >{{ record.size | getFileSize }}
                    </v-chip>
                  </div>
                  <!-- <div class="d-flex justify-end mt-1">
                    <v-btn
                      depressed
                      rounded
                      small
                      color="light-blue lighten-5 teal--text"
                      @click="downloadFile"
                      >下载</v-btn
                    >
                  </div> -->
                </div>
              </v-row>
              <p class="an-title">{{ record.name }}</p>
              <p class="an-content">
                {{ record.description }}
              </p>
              <!-- <p class="text-right mt-3 mb-0">3天前</p> -->
            </v-card-text>

            <!-- <v-tooltip
              top
              content-class="b-tooltip"
              color="white"
              light
              open-on-hover
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  v-show="hover"
                  fab
                  class="toast-btn"
                  v-on="on"
                  @click="downloadFile(record)"
                >
                  <v-icon color="green">mdi-bell</v-icon>
                </v-btn>
              </template>
              <span class="grey--text text--darken-3">下载</span>
            </v-tooltip> -->
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    //
  },
  data() {
    return {
      //
      pageParams: {
        size: 12,
        current: 1
      },
      pageTotal: 0,
      total: 0,
      loading: false,
      records: [],

      show: false,
      fileBg: require('@/assets/images/files/file3.svg'),
      downloadBg: require('@/assets/images/download.svg'),
      warnBg: require('@/assets/images/permission/no_permission2.svg')
    }
  },
  mounted() {
    //
    let test = false
    if (test) {
      let record = {
        name: 'C++开发大全',
        description:
          '对技术充满热情，对未知领域充满好奇，热爱各种折腾,对多个领域略知一二，时常苦于不求甚解，博而不专.',
        url: '',
        updatedTime: '2018-20-11 20:20:12',
        size: 234231,
        type: 'zip'
      }
      let arr = []
      arr.push(record)
      arr.push(...arr)
      arr.push(...arr)
      arr.push(...arr)
      this.records = arr
    } else {
      this.getTableData()
    }
  },
  methods: {
    //
    getTableData() {
      const vm = this
      this.loading = true
      setTimeout(() => {
        vm.$api.file.toGetPageListForBlog(this.pageParams).then(res => {
          let data = res.data.extend
          console.log(data)
          vm.records = data.records
          vm.total = parseInt(data.total)
          vm.pageTotal = parseInt(data.page)
          vm.loading = false
          console.log('send')
        })
      }, 200)
    },

    // eslint-disable-next-line no-unused-vars
    downloadFile(item) {
      console.log('inin')
      if (this.isLogin) {
        const vm = this

        let fileName = item.originName
        let params = item.id
        // let name = 'FL_fOMMe708XB3bvsOYb.png'
        // window.location.href = 'localhost:8088/api/v1/resources/download/FL_fOMMe708XB3bvsOYb.png'
        vm.$api.file.toDownloadById(params).then(res => {
          const content = res.data //返回的内容
          vm.download(content, fileName)
        })
      } else {
        this.openDialog()
      }
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

    cancel() {
      this.show = false
    },
    openDialog() {
      // this.$tipDialog.login()
      this.show = true
    }
  },
  computed: {
    //
    ...mapGetters({
      //判断是否本地有token ，有返回 true
      isLogin: 'getLoginStatusFun'
    }),
    getFileType() {
      //传值
      return type => {
        if (type == 'image') {
          return this.$global.filesTypeBgs.img
        } else {
          return this.$global.filesTypeBgs.zip
        }
      }
    }
  },
  watch: {
    //
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped>
.an-title {
  color: #4a4a4a;
  font-size: 1.125rem;
  margin-bottom: 4px;
}
.an-content {
  color: #616161;
  font-size: 0.895rem;
  margin-bottom: 8px;
}
.an-time {
  font-size: 0.8rem !important;
}
.toast-btn {
  // position: absolute !important;
  // top: -21px !important;
  // right: -21px !important;
  // // bottom: -21px !important;
  // // left: calc(50% - 21px) !important;
  width: 68px !important;
  height: 68px !important;
  background: white !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08) !important;
  // &.bottom.left {
  //   bottom: -21px !important;
  //   left: 21px !important;
  // }
  &.disabled {
    pointer-events: none;
  }
}
.file-bg {
  //
  width: 80px;
  height: 80px;
  background: white;
  border: 6px solid #f8f8f8;
  border-radius: 100%;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  > div,
  img {
    // width: 100%;
    // height: 100%;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    border-radius: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  // opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
