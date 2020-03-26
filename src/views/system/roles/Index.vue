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
      <v-window class="card__window" v-model="currentPage" reverse>
        <v-window-item
          :value="0"
          reverse-transition="slide-y-transition"
          transition="scale-transition"
        >
          <page-system-role-display ref="page0"></page-system-role-display>
        </v-window-item>

        <v-window-item
          :value="1"
          reverse-transition="slide-y-transition"
          transition="scale-transition"
        >
          <page-system-role-detail ref="page1"></page-system-role-detail>
        </v-window-item>

        <v-window-item
          :value="2"
          reverse-transition="slide-y-transition"
          transition="scale-transition"
        >
          <page-system-role-editer ref="page2"></page-system-role-editer>
        </v-window-item>
        <v-window-item
          :value="3"
          reverse-transition="slide-y-transition"
          transition="scale-transition"
        >
          <page-system-role-addition ref="page3"></page-system-role-addition>
        </v-window-item>
      </v-window>
      <page-system-role-delete ref="delete"></page-system-role-delete>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'role-display',
  data() {
    return {
      currentPage: 0,
      titleText: '',
      toolbarColor: ''
    }
  },
  created() {
    //
    // console.log('create')
    let current = this.getCurrentSubPage
    let oldName = current.name
    let newName = 'role'
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
      let page
      switch (this.currentPage) {
        case 0:
          page = this.$refs.page0
          break
        case 1:
          page = this.$refs.page1
          break
        case 2:
          page = this.$refs.page2
          break
        case 3:
          page = this.$refs.page3
          break

        default:
          break
      }
      return page
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
    getUseRoleId() {
      return this.getUseRecordId
    },
    setUseRoleId(id) {
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
      // console.log('toPageList')
      this.setSubPageCurrentPage('list')
    },
    goPageDetail() {
      // console.log('toPageDetail')
      this.setSubPageCurrentPage('detail')
    },
    goPageEdit() {
      // console.log('toPageEdit')
      this.setSubPageCurrentPage('edit')
    },
    goPageAdd() {
      // console.log('toPageAdd')
      this.setSubPageCurrentPage('add')
    },
    goPageDelete() {
      // console.log('toPageDelete')
      this.$refs.delete.openDialog()
    },
    closePageDelete() {
      // console.log('need refresh')
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
