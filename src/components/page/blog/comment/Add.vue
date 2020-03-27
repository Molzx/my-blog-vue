<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-12 21:55:44
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-13 14:15:23
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\Comment.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div class="comment active">
    <v-container class="px-5">
      <v-row height="72" no-gutters class="comment-item">
        <v-col cols="auto">
          <div class="avatar-bg mt-2 mr-4">
            <a @click="toUserInfo()">
              <v-avatar size="48">
                <img
                  :src="isLogin ? previewAvatar : unloginAvatar"
                /> </v-avatar
            ></a>
          </div>
        </v-col>
        <v-col>
          <v-col cols="12" class="comment-meta pa-0">
            <span class="comment-author d-flex align-center mt-5">
              <a class="users" @click="toUserInfo()">{{
                isLogin ? getBaseUserInfo.nickName : '未登录用户'
              }}</a>
            </span>
          </v-col>

          <v-col cols="12" class="comment-content pa-0">
            <div class="comment-content-big">
              <ValidationObserver ref="form">
                <v-form>
                  <ValidationProvider
                    :mode="validateMode"
                    name="comment"
                    rules="required|max:180"
                    v-slot="{ errors }"
                  >
                    <v-textarea
                      v-model="formData.content"
                      :disabled="addCommentLoading || !isLogin"
                      solo
                      :placeholder="
                        isLogin ? '说点什么吧......' : '登录来评论吧.....'
                      "
                      no-resize
                      auto-grow
                      rows="3"
                      hint=""
                      persistent-hint
                      :error-messages="errors[0]"
                    >
                    </v-textarea> </ValidationProvider></v-form
              ></ValidationObserver>
            </div>
            <v-row class="ml-0 mr-3">
              <v-spacer></v-spacer>
              <v-btn
                depressed
                :color="addCommentLoading ? 'diy-grey-lighten2' : 'info'"
                :loading="addCommentLoading"
                @click="validate"
                :disabled="!isLogin"
                >发布

                <template v-slot:loader>
                  <div class="loader">
                    <v-progress-circular
                      indeterminate
                      size="24"
                      width="3"
                      color="orange darken-2"
                    ></v-progress-circular>
                  </div>
                </template>
              </v-btn>

              <!-- <v-btn depressed color="info" class="ml-2" :disabled="!isLogin"
                >预览</v-btn
              > -->
            </v-row>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    formData: {
      type: Object,
      default: () => {
        return {
          //被评论的资源id，可以是文章，文件等
          ownerId: '',
          //父评论ID：为空则为父评论，不为空则为子评论
          parentId: '',
          //评论类型 { 0：文章，1：文件 }
          type: '文章',
          //被评论的用户ID
          toUid: '',
          //评论内容
          content: ''
        }
      }
    }
  },
  data() {
    return {
      //
      validateMode: 'passive',
      validateModes: ['aggressive', 'passive'],
      addCommentLoading: false,

      unloginAvatar: require('@/assets/images/avatar/unlogin_avatar_32.svg'),
      previewAvatar: require('@/assets/images/avatar/avatar.svg')

      // isLogin: true
    }
  },
  mounted() {
    //
  },
  methods: {
    ...mapActions({
      //设置使用的用户id
      setUseUserId: 'setUseUserIdFun'
    }),
    toUserInfo() {
      //
      if (this.isLogin) {
        this.setUseUserId()
        this.$router.push('/blog/users/info')
      } else {
        //
      }
    },
    postComment() {
      this.addCommentLoading = true
      // console.log(this.formData)
      this.$emit('update:formData', this.formData)
      this.$emit('postComment')
    },
    closeLoading() {
      this.addCommentLoading = false
    },

    validate() {
      let vm = this
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        vm.postComment()
      })
    },
    reset() {
      this.$refs.form.reset()
    }
  },
  components: {},
  computed: {
    ...mapGetters({
      //判断是否本地有token ，有返回 true
      isLogin: 'getLoginStatusFun',
      //获取基础头像，昵称
      getBaseUserInfo: 'getBaseUserInfoFun'
    })
  },
  watch: {
    //监听表单内容，内容为空，采用懒加载，提交再验证，如果内容不为空，采用立即校验
    'formData.content': {
      handler(newVal) {
        if (newVal == '') {
          if (this.$refs.form) {
            this.$refs.form.reset()
          }
          this.validateMode = this.validateModes[1]
        } else {
          this.validateMode = this.validateModes[0]
          this.$refs.form.validate()
        }
      },
      immediate: true
    },

    'getBaseUserInfo.avatar': {
      // eslint-disable-next-line no-unused-vars
      handler(newVal) {
        //头像修改
        // console.log(newVal)
        if (newVal) {
          this.previewAvatar = this.$avatar(newVal)
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
//头像
.avatar-bg {
  background: #fff;
  border-radius: 100%;
  padding: 1px;
  // box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
  //   0 1px 3px 0 rgba(0, 0, 0, 0.12);

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
}

.comment-content-big {
  background-color: white !important;

  padding: 10px;

  margin: 10px 0;

  border-radius: 14px 4px 14px 4px;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
}
.v-note-wrapper {
  min-height: 72px !important;
  min-width: 280px !important;
}
/deep/
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
  box-shadow: none;
  // background-color: #f2f6f9;
}
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot:hover {
  background-color: white;
  box-shadow: 0 0 1px rgba(39, 44, 49, 0.3), 0 4px 18px rgba(39, 44, 49, 0.08);
}
</style>
