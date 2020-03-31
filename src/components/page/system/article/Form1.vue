<template>
  <ValidationObserver ref="form">
    <v-form>
      <v-container>
        <v-row class="justify-center">
          <div style="width: calc(100% - 20px);">
            <page-common-markdown
              :formData.sync="formData"
              ref="mdEditor"
            ></page-common-markdown>
          </div>
        </v-row>
        <v-row align="start" dense>
          <v-col cols="12" md="8">
            <ValidationProvider
              name="article_title"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.title"
                solo
                flat
                background-color="#F5F5F5"
                class="my-input"
                label="标题内容"
                hint="文章标题"
                persistent-hint
                :error-messages="errors[0]"
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <v-row class="mx-0 align-center">
              <v-chip label outlined color="info" class="mr-2">文章类型</v-chip>
              <v-chip-group
                v-model="formData.type"
                active-class="blue--text text--accent-4"
                mandatory
              >
                <v-chip value="原创">
                  原创
                </v-chip>
                <v-chip value="转载">
                  转载
                </v-chip>
                <v-chip value="翻译">
                  翻译
                </v-chip>
              </v-chip-group>
            </v-row>
          </v-col>
        </v-row>
        <v-row align="start" dense>
          <v-col cols="12" md="4">
            <ValidationProvider
              name="article_cover_file"
              :rules="uploadSelection == 0 ? 'required|image|size:12048' : ''"
              v-slot="{ errors, validate }"
            >
              <v-file-input
                v-model="otherData.file"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon="far fa-image"
                show-size
                solo
                flat
                background-color="#F5F5F5"
                class="my-input"
                label="上传照片文件"
                hint="文章封面"
                persistent-hint
                @change="validate"
                :error-messages="errors[0]"
                :disabled="!isEditing || uploadSelection == 1"
              ></v-file-input>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              name="article_cover"
              :rules="uploadSelection == 1 ? 'required' : ''"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.cover"
                prepend-icon="far fa-image"
                solo
                flat
                background-color="#F5F5F5"
                class="my-input"
                label="在线照片地址"
                hint="文章封面"
                persistent-hint
                :error-messages="errors[0]"
                :disabled="!isEditing || uploadSelection == 0"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <v-chip-group
              v-model="uploadSelection"
              active-class="blue--text"
              mandatory
              class=""
            >
              <v-chip label>上传文件</v-chip>
              <v-chip label>网络地址</v-chip>
            </v-chip-group>
          </v-col>
        </v-row>

        <v-row class="align-center" dense>
          <v-col cols="12">
            <ValidationProvider
              name="article_description"
              rules="required"
              v-slot="{ errors }"
            >
              <v-textarea
                v-model="formData.description"
                :counter="80"
                solo
                flat
                no-resize
                auto-grow
                rows="3"
                label="描述内容......"
                hint="文章描述"
                persistent-hint
                background-color="#F5F5F5"
                class="my-input"
                :error-messages="errors[0]"
                :disabled="!isEditing"
              >
              </v-textarea>
              <!-- <v-text-field
                v-model="formData.description"
                label="文章描述"
                placeholder="描述内容"
                :error-messages="errors[0]"
                :disabled="!isEditing"
              ></v-text-field> -->
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </ValidationObserver>
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
          tagId: [1],
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
        }
      }
    },
    otherData: {
      type: Object,
      // required: true,
      default: () => {
        return {
          //
          file: [],
          validateSuccess: false,
          loading: false,
          //是否为编辑页面
          isEditingPage: true
        }
      }
    }
  },
  data() {
    return {
      //是否可编辑
      isEditing: true,
      //单选，选中上传文件，或者填写封面地址
      uploadSelection: 0
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    setEditing(flag) {
      //
      this.isEditing = flag
    },
    validate() {
      this.$refs.mdEditor.submit()
      let vm = this
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        console.log(success)
        vm.otherData.validateSuccess = true
        vm.updateParentData()
      })
    },
    reset() {
      this.$refs.form.reset()

      // 将初始状态的data复制到当前状态的data，实现重置效果
      Object.assign(this.$data, this.$options.data())
    },
    updateParentData() {
      this.$emit('update:formData', this.formData)
      this.$emit('update:otherData', this.otherData)
    }
  },
  computed: {
    //
  },
  watch: {
    //

    //是否为编辑页面
    'otherData.isEditingPage': {
      handler(newVal) {
        if (newVal) {
          //
          //如果是编辑页面，默认设为修改网络地址
          this.uploadSelection = 1
          // console.log(this.uploadSelection)
        }
      },
      immediate: true
    },
    'formData.mdContent': {
      handler() {
        // console.log(this.formData)
      },
      immediate: true
    }
  },
  components: {
    //
  }
}
</script>

<style scoped>
.v-note-wrapper {
  min-height: 400px !important;
  /* min-width: 280px !important; */
}
</style>
