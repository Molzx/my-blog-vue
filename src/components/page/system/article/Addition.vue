<template>
  <v-card class="card-no">
    <!-- <v-row class="mx-0 pt-2">
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-btn icon color="primary" small class="mb-2 mr-3" @click="goBack">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-row> -->
    <v-window v-model="currentPage" vertical reverse>
      <v-window-item :value="1">
        <page-system-article-form1
          ref="chirldForm1"
          :formData.sync="formData"
          :otherData.sync="otherData"
        ></page-system-article-form1>
      </v-window-item>
      <v-window-item :value="2">
        <page-system-article-form2
          ref="chirldForm2"
          :formData.sync="formData"
          :otherData.sync="otherData"
        ></page-system-article-form2>
      </v-window-item>
    </v-window>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :disabled="currentPage === 1 || otherData.loading"
        text
        @click="currentPage--"
      >
        后退
      </v-btn>
      <v-spacer></v-spacer>
      <v-slide-x-transition>
        <v-btn
          v-if="currentPage == 2"
          :loading="otherData.loading && formData.publishedStatus == '草稿'"
          :disabled="canSave"
          color="info"
          depressed
          @click="saveNotPublish"
          >草稿
        </v-btn>
      </v-slide-x-transition>
      <v-btn
        :loading="otherData.loading && formData.publishedStatus == '已发布'"
        :disabled="canSave"
        color="success"
        depressed
        @click="nextPage"
        >{{ currentPage == 2 ? '发布' : '下一页' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      //

      formData: {
        //发布的用户帐号ID
        userId: '',
        //所属类别信息ID
        categoryId: '',
        //所属标签信息ID列表
        tagIds: [],
        //文章类型
        type: '原创',
        //文章标题
        title: '',
        //文章描述
        description: '',
        //文章封面路径
        cover: '',
        //文章内容
        content: '',
        //文章md格式内容
        mdContent: '',
        //赞赏功能
        admirationStatus: '开启',
        //版权声明
        copyrightStatus: '开启',
        //转载声明
        reprintStatus: '开启',
        //评论功能
        commentStatus: '开启',
        //发布状态
        publishedStatus: '已发布',
        //推荐状态
        recommendStatus: '推荐',
        //状态标记
        status: '启用'
      },
      otherData: {
        file: [],
        validateSuccess: false,
        loading: false,
        //是否修改表单二里面的附加选项数据
        changeForm2OptData: false,

        //添加展示分类标签使用====
        //待显示的list列表数据
        listItems: [],
        //请求更新list列表信息
        requireListItems: false,
        //已选中的list列表数据
        selectedListItems: [],
        ///======主要标识字段=========
        listId: 'categoryId',
        ///======主要显示字段=========
        listText: 'categoryName',

        //待显示的chip列表数据
        chipItems: [],

        //请求更新chip列表信息
        requireChipItems: false,
        //已选中的chip列表数据
        selectedChipItems: [],
        ///======主要标识字段=========
        chipId: 'tagId',
        ///======主要显示字段=========
        chipText: 'tagName'
      },
      //当前页面
      currentPage: 1
    }
  },
  mounted() {
    //
    // this.initItems()
  },
  methods: {
    //

    initItems() {
      let items = [
        {
          text: 'Nature',
          icon: 'mdi-nature'
        },
        {
          text: 'Nightlife',
          icon: 'mdi-glass-wine'
        },
        {
          text: 'November',
          icon: 'mdi-calendar-range'
        },
        {
          text: 'Portland',
          icon: 'mdi-map-marker'
        },
        {
          text: 'Biking',
          icon: 'mdi-bike'
        }
      ]
      for (let i = 0; i < 20; i++) {
        let item = {
          text: 'test' + i,
          icon: 'mdi-bike'
        }
        this.otherData.chipItems.push(item)
      }
      this.otherData.chipItems = this.otherData.chipItems.concat(items)
      this.otherData.chipItems.forEach(tem => {
        tem.show = true
      })
      this.otherData.chipItems.push(...this.otherData.chipItems)
      this.otherData.listItems = this.otherData.chipItems
    },
    getCategoryInfo() {
      let vm = this
      this.$api.category.toGetListLessInfo().then(res => {
        let data = res.data.extend
        vm.otherData.listItems = data.data
      })
    },
    getTagInfo() {
      let vm = this
      this.$api.tag.toGetListLessInfo().then(res => {
        let data = res.data.extend
        vm.otherData.chipItems = data.data
      })
    },
    save() {
      let formData = new FormData()
      //这里将表单数据封装成json保存到formData中
      formData.append(
        'formData',
        new Blob([JSON.stringify(this.formData)], { type: 'application/json' })
      )
      formData.append('file', this.otherData.file)

      this.otherData.loading = true
      let vm = this
      // setTimeout(() => {
      //   vm.otherData.loading = false
      //   vm.$refs.userRole.reset()
      //   vm.goBack()
      // }, 1000)
      setTimeout(() => {
        this.$api.article
          .toAdd(formData)
          .then(res => {
            let data = res.data.extend
            vm.$toast.success(data.data)
            vm.otherData.loading = false
            // vm.$refs.userRole.reset()
            vm.goBack()
          })
          .catch(() => {
            this.otherData.loading = false
          })
      }, 1000)
    },
    //================

    getParentRefs() {
      let parent = this.$parent.$parent.$parent.$parent
      return parent
    },
    goBack() {
      //重设校验状态
      this.$refs.chirldForm1.reset()
      if (this.$refs.chirldForm2) {
        this.$refs.chirldForm2.goInit()
      }
      // 重置表单数据
      // Object.assign(this.$data.formData, this.$options.data().formData)
      // 将初始状态的data复制到当前状态的data，实现重置效果
      Object.assign(this.$data, this.$options.data())
      // console.log(this.$data)
      let parent = this.getParentRefs()
      parent.goPageList()
    },
    initMethod() {
      console.log('add组件--')
      // this.getRoles()
      // console.log(this.formData)
    },
    nextPage() {
      if (this.currentPage == 2) {
        this.$refs.chirldForm2.updateParentData()
        console.log(this.formData)
        this.save()
      } else {
        //校验表单
        this.$refs.chirldForm1.validate()
      }
    },
    saveNotPublish() {
      //更改状态为草稿
      this.formData.publishedStatus = '草稿'
      this.nextPage()
    }
  },
  computed: {
    //
    //判断是否选择了分类，选择后可提交
    canSave() {
      // console.log(this.formData.categoryId)
      if (this.currentPage == 2 && !this.formData.categoryId) {
        // console.log('----')
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    //
    'otherData.validateSuccess': {
      handler(newVal) {
        if (newVal == true) {
          //校验成功，发送请求
          //获取分类数据
          this.getCategoryInfo()
          //获取标签数据
          this.getTagInfo()
          //跳到下一页
          this.currentPage++
          this.otherData.validateSuccess = false
          console.log('onnonon')
          console.log(this.formData)
          //设置修改附加数据
          this.otherData.changeForm2OptData = true
        }
      },
      immediate: true
    },
    'otherData.requireListItems': {
      handler(newVal) {
        if (newVal == true) {
          //请求更新list列表信息
          this.getCategoryInfo()
          this.otherData.requireListItems = false
        }
      },
      immediate: true
    },
    'otherData.requireChipItems': {
      handler(newVal) {
        if (newVal == true) {
          //请求更新chip列表信息
          //获取标签数据
          this.getTagInfo()
          this.otherData.requireChipItems = false
        }
      },
      immediate: true
    }
  },
  components: {
    //
  }
}
</script>

<style>
/*  */
</style>
