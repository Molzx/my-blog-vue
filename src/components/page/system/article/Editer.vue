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
        //文章主键ID
        articleId: '',
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
        status: '启用',

        //======新添加的字段
        //待删除的标签ID数组
        delTagIds: []
      },
      otherData: {
        file: [],
        validateSuccess: false,
        loading: false,
        //是否为编辑页面
        isEditingPage: true,
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
      currentPage: 1,
      //中间变量，由于获取全部分类和标签数据不是和获取文章信息的分类标签
      //同时返回的，故需要中间变量暂时存储，待子组件数据加载好后，再设置选中的值
      tmp_selectedListItems: [],
      tmp_selectedChipItems: [],
      //保存修改前的标签id数组
      oldTagIds: []
    }
  },
  mounted() {
    //
    // this.initItems()
  },
  methods: {
    //
    getCategoryInfo() {
      let vm = this
      this.$api.category.toGetListLessInfo().then(res => {
        let data = res.data.extend
        vm.otherData.listItems = data.data
        vm.otherData.selectedListItems = vm.tmp_selectedListItems
      })
    },
    getTagInfo() {
      let vm = this
      this.$api.tag.toGetListLessInfo().then(res => {
        let data = res.data.extend
        vm.otherData.chipItems = data.data
        vm.otherData.selectedChipItems = vm.tmp_selectedChipItems
      })
    },
    getArticleInfo(articleId) {
      let vm = this
      this.$api.article
        .toGetSomeInfoById(articleId)
        .then(res => {
          let data = res.data.extend.data
          // console.log(data)
          vm.formData = data
          vm.tmp_selectedListItems = [
            { categoryId: data.categoryId, categoryName: data.categoryName }
          ]
          vm.tmp_selectedChipItems = data.tags
          //=====
          // vm.initRoleInfo()
        })
        .catch(() => {
          // this.loading = false
        })
    },
    changeTagDataBeforeSave() {
      //由于修改标签的不确定性，需要划分为两部分，一部分存储新添加的标签id数组
      //另一部分存储需要删除的标签id数组
      let arr_old = []
      //从标签列表中取出标签id
      this.tmp_selectedChipItems.forEach(el => {
        arr_old.push(el[this.otherData.chipId])
      })
      let arr_new = this.formData.tagIds
      let arr_add = []
      let arr_del = []
      //遍历原来的标签id，如果在修改后的标签列表中没有，则为需要删除
      arr_old.forEach(el => {
        if (!arr_new.includes(el)) {
          arr_del.push(el)
        }
      })
      arr_new.forEach(el => {
        if (!arr_old.includes(el)) {
          arr_add.push(el)
        }
      })
      this.formData.tagIds = arr_add
      this.formData.delTagIds = arr_del
      //更改数据完成，保存数据到数据库
      this.save()
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
          .toUpdate(formData)
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

    initMethod() {
      console.log('editer组件--')
      let parent = this.getParentRefs()
      let articleId = parent.getUseArticleId()
      this.formData.articleId = articleId
      this.getArticleInfo(articleId)
    },
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
      let parent = this.getParentRefs()
      parent.goPageList()
    },
    nextPage() {
      if (this.currentPage == 2) {
        this.$refs.chirldForm2.updateParentData()
        this.changeTagDataBeforeSave()
        console.log(this.formData)
        // this.save()
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
