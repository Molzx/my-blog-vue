<template>
  <div>
    <v-stepper v-model="step" :editable="editable" style="box-shadow:none">
      <v-stepper-header style="box-shadow:none">
        <v-stepper-step step="1" :editable="editable">
          添加分类
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2" :editable="editable">
          添加标签
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" :editable="editable">
          文章信息
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <!-- 分类选择 -->
        <v-stepper-content step="1">
          <v-sheet color="white" min-height="400px">
            <!-- <v-row class="mx-0 mt-4 step-group">
            </v-row> -->
            <!-- 选择列表 -->
            <page-system-form-list
              ref="listItemForm"
              :maxHeight="300"
              :otherData.sync="otherData"
              @fatherMethod="addCategory"
            >
              <template slot="right-btn">
                <v-btn
                  class="mx-2"
                  depressed
                  color="blue lighten-5 blue--text"
                  @click="addListItemComplete"
                >
                  下一步
                </v-btn>
              </template>
            </page-system-form-list>

            <!-- 加入添加分类 -->

            <page-system-category-addition
              :selfUse="categoryAdd"
              ref="categoryAdd"
            ></page-system-category-addition>
          </v-sheet>
        </v-stepper-content>
        <!-- 标签选择 -->
        <v-stepper-content step="2">
          <v-sheet color="white" min-height="400px">
            <!-- <v-row class="mx-0 mt-4 step-group"> </v-row> -->
            <page-system-form-chip
              ref="chipForm"
              :maxHeight="300"
              :otherData.sync="otherData"
              @fatherMethod="addTag"
            >
              <template slot="left-btn">
                <v-btn
                  class="mx-2"
                  depressed
                  color="grey lighten-4 blue color-sub"
                  @click="step--"
                  >上一步</v-btn
                >
              </template>
              <template slot="right-btn">
                <v-btn
                  class="mx-2"
                  depressed
                  color="blue lighten-5 blue--text"
                  @click="addChipComplete"
                >
                  下一步
                </v-btn>
              </template>
            </page-system-form-chip>

            <!-- 加入添加标签-->
            <page-system-tag-addition
              :selfUse="tagAdd"
              ref="tagAdd"
            ></page-system-tag-addition>
          </v-sheet>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-sheet color="white" min-height="400px">
            <v-card class="mx-auto no-shadow pa-3" outlined>
              <v-row class="mx-0 mb-2 align-center justify-start">
                <v-col cols="auto">
                  <v-btn
                    depressed
                    color="grey lighten-5 blue grey--text"
                    class="mr-2"
                    @click="step--"
                  >
                    上一页
                  </v-btn>
                </v-col>
              </v-row>
              <!-- 分类选项 -->
              <v-divider></v-divider>
              <v-row class="mx-0 align-center">
                <v-col cols="auto" class="px-0">
                  <v-chip
                    class="ma-2"
                    color="green lighten-5 green--text"
                    label
                    @click="step = step - 2"
                  >
                    所属分类
                  </v-chip>
                </v-col>
                <v-col>
                  <v-chip
                    class="ma-2"
                    color="grey lighten-4 blue grey--text text--darken-1"
                    label
                  >
                    {{ otherData.selectedListItems[0][otherData.listText] }}
                  </v-chip>
                  <!-- <v-list>
                    <v-list-item-group active-class="border" color="indigo">
                      <template
                        v-for="(item, i) in otherData.selectedListItems"
                      >
                        <v-list-item :key="i" :value="item[otherData.listId]">
                          <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title
                              v-text="item[otherData.listText]"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list-item-group>
                  </v-list> -->
                </v-col>
              </v-row>
              <!-- 标签选项 -->
              <v-divider></v-divider>
              <v-row class="mx-0 align-start">
                <v-col cols="auto" class="px-0">
                  <v-chip
                    class="ma-2"
                    color="green lighten-5 green--text"
                    label
                    @click="step--"
                  >
                    拥有标签
                  </v-chip>
                </v-col>
                <v-col>
                  <template v-for="(item, i) in otherData.selectedChipItems">
                    <v-chip
                      :key="i"
                      class="ma-2"
                      color="grey lighten-4 blue grey--text text--darken-1"
                      label
                      close
                      @click:close="deleteItems(i)"
                    >
                      <v-icon left>mdi-label</v-icon>
                      {{ item[otherData.chipText] }}
                    </v-chip>
                  </template>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <!-- 功能选项 -->
              <v-row class="mx-0 align-center">
                <v-col cols="auto" class="px-0">
                  <v-chip
                    class="ma-2"
                    color="green lighten-5 green--text"
                    label
                  >
                    附加选项
                  </v-chip>
                </v-col>
                <v-col>
                  <v-chip-group v-model="selectedOpts" column multiple>
                    <template v-for="(item, i) in switchOpt">
                      <v-chip
                        filter
                        outlined
                        class="ma-2"
                        :value="item.id"
                        :key="item.id + i"
                        >{{ item.text }}</v-chip
                      >
                    </template>
                  </v-chip-group>
                </v-col>
              </v-row>
            </v-card>
            <!-- <v-row class="mx-0 mt-0 float-right">
              <v-btn class="mx-2" text @click="step--">回到标签</v-btn>
              <v-btn class="mx-2" text @click="step = step - 2">回到分类</v-btn>
            </v-row> -->
          </v-sheet>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      // required: true,
      default: () => {
        return {
          //发布的用户帐号ID
          userId: 0,
          //所属类别信息ID
          categoryId: 1,
          //所属标签信息ID列表
          tagIds: [1],
          //文章标题
          title: '',
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
        }
      }
    },
    otherData: {
      type: Object,
      // required: true,
      default: () => {
        return {
          //
          loading: false,

          //添加展示分类标签使用====
          //待显示的list列表数据
          listItems: [],
          //已选中的list列表数据(修改时父组件传入使用)
          selectedListItems: [],
          ///======主要标识字段=========
          listId: 'text',
          ///======主要显示字段=========
          listText: 'text',

          //添加展示标签使用
          //待显示的chip列表数据
          chipItems: [],
          //已选中的chip列表数据(修改时父组件传入使用)
          selectedChipItems: [],
          ///======主要标识字段=========
          chipId: 'text',
          ///======主要显示字段=========
          chipText: 'text'
        }
      }
    }
  },
  data() {
    return {
      //
      //=========本页面相关======
      step: 1,
      editable: false,
      //是否为本页面重置数据，默认为true，当修改了附加选项的信息后，设为false
      returnInitData: true,
      //=============分类添加==========
      categoryAdd: {
        //自身调用设为false
        status: false,
        //添加成功标记
        success: false
      },
      //=============标签添加==========
      tagAdd: {
        //自身调用设为false
        status: false,
        //添加成功标记
        success: false
      },

      //==========文章功能=================
      //开关功能
      switchOpt: [
        {
          id: 'admirationStatus',
          text: '赞赏功能'
        },
        {
          id: 'copyrightStatus',
          text: '版权声明'
        },
        {
          id: 'reprintStatus',
          text: '转载声明'
        },
        {
          id: 'commentStatus',
          text: '评论功能'
        },
        {
          id: 'recommendStatus',
          text: '推荐文章'
        },
        {
          id: 'status',
          text: '所有人可见'
        }
      ],
      //选中的功能
      selectedOpts: ['status']
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    //更新数据到父组件
    updateParentData() {
      this.$emit('update:formData', this.formData)
      this.$emit('update:otherData', this.otherData)
    },
    //初始化标记，组件data恢复初始化
    goInit() {
      // 将初始状态的data复制到当前状态的data，实现重置效果
      Object.assign(this.$data, this.$options.data())
    },

    // 新增分类
    addCategory() {
      this.$refs.categoryAdd.openDialog()
    },
    // 新增标签
    addTag() {
      this.$refs.tagAdd.openDialog()
    },
    //结束添加listItem
    addListItemComplete() {
      this.$refs.listItemForm.complete()
      this.step++
    },
    //结束添加chip
    addChipComplete() {
      this.$refs.chipForm.complete()
      this.step++
      this.editable = true
    },
    //删除选中的标签
    deleteItems(index) {
      //
      this.otherData.selectedChipItems.splice(index, 1)
      this.updateParentData()
    },
    //更改List数据为后台使用的数据
    changeSelectedLists() {
      //赋值给表单数据
      this.formData.categoryId = this.otherData.selectedListItems[0][
        this.otherData.listId
      ]
      this.updateParentData()
    },
    //更改Chip数据为后台使用的数据
    changeSelectedChips() {
      let arr = []
      this.otherData.selectedChipItems.forEach(item => {
        arr.push(item[this.otherData.chipId])
      })
      //赋值给表单数据
      this.formData.tagIds = arr
      this.updateParentData()
    },
    //设置选中的状态
    setSelectedOpts() {
      let openOpts = ['推荐', '启用', '开启']
      let v1 = this.formData.admirationStatus,
        v2 = this.formData.copyrightStatus,
        v3 = this.formData.reprintStatus,
        v4 = this.formData.commentStatus,
        v5 = this.formData.recommendStatus,
        v6 = this.formData.status
      let arr = [
        {
          id: 'admirationStatus',
          value: v1
        },
        {
          id: 'copyrightStatus',
          value: v2
        },
        {
          id: 'reprintStatus',
          value: v3
        },
        {
          id: 'commentStatus',
          value: v4
        },
        {
          id: 'recommendStatus',
          value: v5
        },
        {
          id: 'status',
          value: v6
        }
      ]
      // console.log(arr)
      let selected = []
      arr.forEach(el => {
        if (openOpts.includes(el.value)) {
          selected.push(el.id)
        }
      })
      console.log(selected)
      this.selectedOpts = selected
    },
    //更改数据为后台使用的数据
    changeSelectedOpts() {
      this.switchOpt.forEach(item => {
        if (item.id === 'recommendStatus') {
          this.formData[item.id] = '不推荐'
        } else if (item.id === 'status') {
          this.formData[item.id] = '禁用'
          // this.switchOpt[index].text = '已设为仅个人可见'
        } else {
          this.formData[item.id] = '关闭'
        }
      })
      this.selectedOpts.forEach(item => {
        if (item === 'recommendStatus') {
          this.formData[item] = '推荐'
        } else if (item === 'status') {
          this.formData[item] = '启用'
        } else {
          this.formData[item] = '开启'
        }
      })
      // console.log(this.formData)
    }
  },
  computed: {
    //
  },
  watch: {
    //
    //添加分类数据
    'categoryAdd.success': {
      handler(newVal) {
        //添加分类数据成功
        if (newVal) {
          this.categoryAdd.success = false
          //请求更新list列表信息
          this.otherData.requireListItems = true
          this.updateParentData()
        }
      },
      immediate: true
    },
    //添加标签数据
    'tagAdd.success': {
      handler(newVal) {
        //添加标签数据成功
        if (newVal) {
          this.tagAdd.success = false
          //请求更新chip列表信息
          this.otherData.requireChipItems = true
          this.updateParentData()
        }
      },
      immediate: true
    },
    //监听父组件传来的数据，更新附加选项选中数据
    'otherData.changeForm2OptData': {
      handler(newVal) {
        // console.log('this.step')
        if (newVal) {
          // console.log('opt===========')
          this.setSelectedOpts()
        }
      },
      immediate: true
    },
    //更新分类数据
    'otherData.selectedListItems': {
      handler(newVal) {
        if (newVal.length > 0) {
          this.changeSelectedLists()
        }
      },
      immediate: true
    },
    //更新标签数据
    'otherData.selectedChipItems': {
      handler(newVal) {
        if (newVal.length > 0) {
          this.changeSelectedChips()
        }
      },
      immediate: true
    },
    //更新附加选项数据
    selectedOpts() {
      // console.log('selected===========')
      // console.log(this.selectedOpts)
      //如果是父组件传递数据更改的，则设为false
      if (this.otherData.changeForm2OptData) {
        // console.log('false===========')
        this.otherData.changeForm2OptData = false
        this.returnInitData = false
      } else {
        //由于本页面重置数据后，会被重新赋值再一次执行，不用提交数据到父组件
        if (!this.returnInitData) {
          //否则更改数据到为后台使用的数据，传递到父组件
          this.changeSelectedOpts()
        }
      }
    }
  },
  components: {
    //
  }
}
</script>

<style>
/*  */
.step-group {
  z-index: 10;
  position: absolute;
  right: 5%;
}
</style>
