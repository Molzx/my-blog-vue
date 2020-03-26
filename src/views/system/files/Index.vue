<template>
  <div class="content">
    <v-card flat class="card-1">
      <v-alert tile colored-border class="mb-0 pb-0">
        <!-- <div class="status-green mb-4"></div> -->
        <div class="d-flex align-center">
          <v-alert text dense border="left" class="mb-0" :color="toolbarColor">
            {{ titleText }}
          </v-alert>
          <v-spacer></v-spacer>
          <div>
            <v-slide-x-transition>
              <v-btn
                key="a1"
                v-if="currentPage != 0"
                fab
                depressed
                small
                class="close-btn"
                @click="goBack"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-slide-x-transition>
          </div>
        </div>
      </v-alert>
      <page-system-file-display
        ref="list"
        class=" px-6 pt-4 pb-2"
      ></page-system-file-display>

      <page-system-file-detail ref="detail"></page-system-file-detail>
      <page-system-file-editer ref="edit"></page-system-file-editer>
      <page-system-file-addition ref="add"></page-system-file-addition>
      <page-system-file-delete ref="delete"></page-system-file-delete>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'file-display',
  data() {
    return {
      currentPage: 0,
      titleText: '',
      toolbarColor: ''
    }
  },
  created() {
    console.log(this.$route)
    //
    // console.log('create')
    let current = this.getCurrentSubPage
    let oldName = current.name
    let newName = 'file'
    if (oldName !== newName) {
      //首次进入页面，设置当前使用的是哪个模块的页面
      this.setCurrentSubPage(newName)
    } else {
      //已在当前页面，进行刷新操作
      this.changeData(current)

      //当前组件视图更新完后，获取到正确的ref
      this.$nextTick(() => {
        //运行子组件的方法
        this.runSubMethod()
      })
    }
  },
  updated() {
    // console.log('视图更新--update')
    //当前组件视图更新完后，获取到正确的ref
    this.$nextTick(() => {
      //运行子组件的方法
      this.runSubMethod()
    })
  },
  computed: {
    ...mapGetters({
      isFirstInitSubPage: 'isFirstInitSubPageFun',
      getCurrentSubPage: 'getCurrentSubPageFun',
      getSubPageCurrentPage: 'getSubPageCurrentPageFun',
      getUseRecordId: 'getUseRecordIdFun'
    }),
    //获取子组件ref的引用
    getPageRefs() {
      return this.$refs.list
    }
  },
  mounted() {},
  methods: {
    ...mapActions({
      setCurrentSubPage: 'setCurrentSubPageFun',
      setSubPageCurrentPage: 'setSubPageCurrentPageFun',
      setUseRecordId: 'setUseRecordIdFun'
    }),
    changeData(value) {
      this.currentPage = value.currentPage
      this.titleText = value.title[this.currentPage]
      this.toolbarColor = value.toolbarColor[this.currentPage]
    },
    runSubMethod() {
      //当子组件渲染完成后
      this.$nextTick(() => {
        // console.log('diaoyong')
        //获取子组件的引用
        let sub = this.getPageRefs
        // 调用子组件初始化方法
        sub.initMethod()
      })
    },
    //=========子组件用的方法==========

    //===获取需要的数据方法===
    getUseFileId() {
      return this.getUseRecordId
    },
    setUseFileId(id) {
      this.setUseRecordId(id)
    },

    //===页面切换方法===

    goBack() {
      //获取子组件的引用
      let sub = this.getPageRefs
      // 调用子组件初始化方法
      sub.goBack()
    },
    goPageList() {
      console.log('toPageList')
      // this.setSubPageCurrentPage('list')
      this.runSubMethod()
    },
    goPageDetail() {
      // console.log('toPageDetail')
      // this.setSubPageCurrentPage('detail')
      this.$refs.detail.openDialog()
    },
    goPageEdit() {
      // console.log('toPageEdit')
      // this.setSubPageCurrentPage('edit')
      this.$refs.edit.openDialog()
    },
    goPageAdd() {
      // console.log('toPageAdd')
      // this.setSubPageCurrentPage('add')
      this.$refs.add.openDialog()
    },
    goPageDelete() {
      // console.log('toPageDelete')
      this.$refs.delete.openDialog()
    },
    refresh() {
      console.log('need refresh')
      //运行子组件的方法
      this.runSubMethod()
    }
  },
  components: {},
  watch: {
    getCurrentSubPage: {
      handler(newVal) {
        this.changeData(newVal)
      },
      deep: true
    }
  }
}
</script>

<style></style>
