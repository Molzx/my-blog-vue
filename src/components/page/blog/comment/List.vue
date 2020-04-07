<template>
  <div
    class="comment pt-9 pb-6 mt-3"
    :class="selfCommentList.length == 0 ? '' : 'active'"
  >
    <!-- Something -->
    <v-container>
      <v-timeline class="pt-0" align-top dense>
        <v-scroll-y-transition class="py-0" group>
          <template v-for="(comment, commentIndex) in selfCommentList">
            <v-timeline-item
              class="pb-0"
              large
              right
              :key="comment.commentId + 'comment1' + commentIndex"
            >
              <template v-slot:icon>
                <a @click="toUserInfo(comment.fromUid, children.fromNickName)">
                  <v-avatar>
                    <img :src="$avatar(comment.fromAvatar)" />
                  </v-avatar>
                </a>
              </template>
              <v-row class="comment-item">
                <!-- <v-col cols="12" md="auto" sm="auto">
                  <v-avatar>
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    />
                  </v-avatar>
                </v-col> -->
                <v-col>
                  <v-col cols="12" class="comment-meta pa-0">
                    <span class="comment-author d-flex align-center mr-5">
                      <a
                        class="users"
                        @click="
                          toUserInfo(comment.fromUid, children.fromNickName)
                        "
                        >{{ comment.fromNickName }}</a
                      >
                      <span class="ml-2" v-if="comment.fromUid == 1">
                        <v-chip
                          label
                          x-small
                          class="green lighten-5"
                          text-color="green"
                          color="transparent"
                        >
                          作者
                        </v-chip>
                      </span>
                      <v-spacer></v-spacer>
                      <span class=""
                        >#{{
                          pageParams.total -
                            (pageParams.current - 1) * pageParams.size -
                            commentIndex
                        }}</span
                      >
                    </span>
                  </v-col>

                  <v-col cols="12" class="comment-content pa-0">
                    <div class="comment-content-text mr-5">
                      <p class="mb-0">
                        {{ comment.content }}
                      </p>
                    </div>
                    <div class="comment-footer d-flex align-center mr-5">
                      <time
                        class="comment-meta-item timeago"
                        datetime="2020-02-11T11:16:43+08:00"
                        :data-timeago="comment.createdTime"
                        itemprop="datePublished"
                        data-tid="649"
                        >{{ comment.createdTime }}</time
                      >
                      <v-spacer></v-spacer>
                      <v-btn
                        class="comment-btn"
                        text
                        retain-focus-on-click
                        :ripple="false"
                        x-small
                        @click="replyParent(comment, commentIndex)"
                      >
                        <v-icon size="13" style="padding-right:2px">
                          far fa-thumbs-up
                        </v-icon>
                        喜欢
                      </v-btn>
                      <v-btn
                        class="comment-btn"
                        text
                        retain-focus-on-click
                        :ripple="false"
                        x-small
                        @click="replyParent(comment, commentIndex)"
                      >
                        <v-icon size="13" style="padding-right:2px">
                          far fa-thumbs-down
                        </v-icon>
                        反对
                      </v-btn>
                      <v-btn
                        class="comment-btn"
                        text
                        retain-focus-on-click
                        :ripple="false"
                        x-small
                        @click="replyParent(comment, commentIndex)"
                      >
                        <v-icon size="13" style="padding-right:2px">
                          far fa-comment-dots
                        </v-icon>
                        回复
                      </v-btn>
                      <v-btn
                        class="comment-btn"
                        text
                        retain-focus-on-click
                        :ripple="false"
                        x-small
                        @click="deleteComment(comment, commentIndex)"
                      >
                        <v-icon size="13" style="padding-right:2px">
                          far fa-comment-dots
                        </v-icon>
                        删除
                      </v-btn>
                    </div>
                  </v-col>

                  <v-expand-transition>
                    <v-col
                      cols="12"
                      class="pa-0"
                      style="position: relative;"
                      v-if="showParentReply == commentIndex && openParentReply"
                    >
                      <ValidationObserver ref="replyForm">
                        <v-form>
                          <ValidationProvider
                            :mode="validateMode"
                            name="comment"
                            rules="required|max:180"
                            v-slot="{ errors }"
                          >
                            <v-textarea
                              v-model="replyContent"
                              :disabled="replyLoading"
                              solo
                              placeholder="想说什么呢......"
                              no-resize
                              auto-grow
                              rows="3"
                              class="mr-5 mt-3"
                              hint="写回复..."
                              persistent-hint
                              :error-messages="errors[0]"
                            >
                              <template slot="prepend-inner">
                                <p class="inner-text">
                                  <span class="at">@</span
                                  >{{ comment.fromNickName }}
                                </p>
                              </template>
                            </v-textarea>
                          </ValidationProvider></v-form
                        ></ValidationObserver
                      >
                      <v-btn
                        absolute
                        bottom
                        right
                        fab
                        small
                        :loading="replyLoading"
                        class="reply-btn"
                        @click="validate"
                      >
                        <v-slide-x-reverse-transition mode="out-in">
                          <v-icon
                            size="18"
                            :key="`icon-${isContentNull}`"
                            :color="!isContentNull ? 'success' : 'info'"
                            v-text="
                              !isContentNull
                                ? 'mdi-check-outline'
                                : 'mdi-circle-edit-outline'
                            "
                          ></v-icon>
                        </v-slide-x-reverse-transition>
                        <template v-slot:loader>
                          <div class="loader">
                            <v-progress-circular
                              indeterminate
                              size="24"
                              width="3"
                              color="green"
                            ></v-progress-circular>
                          </div>
                        </template>
                      </v-btn>
                    </v-col>
                  </v-expand-transition>

                  <v-container class="pa-0">
                    <v-scroll-y-transition class="py-0" group>
                      <template
                        v-for="(children, childrenIndex) in comment.childrens"
                      >
                        <v-row
                          :key="children.commentId + 'children' + childrenIndex"
                        >
                          <v-col cols="12" md="auto" sm="auto" class="pb-0">
                            <div class="avatar-bg">
                              <a
                                @click="
                                  toUserInfo(
                                    children.fromUid,
                                    children.fromNickName
                                  )
                                "
                              >
                                <v-avatar size="40">
                                  <img :src="$avatar(children.fromAvatar)" />
                                </v-avatar>
                              </a>
                            </div>
                          </v-col>
                          <v-col class="pb-0 pt-5 pl-0">
                            <v-col cols="12" class="comment-meta pa-0 pl-3">
                              <span class="comment-author">
                                <a
                                  class="users"
                                  @click="
                                    toUserInfo(
                                      children.fromUid,
                                      children.fromNickName
                                    )
                                  "
                                  >{{ children.fromNickName }}</a
                                >
                                <span class="ml-2" v-if="children.fromUid == 1">
                                  <v-chip
                                    label
                                    x-small
                                    class="green lighten-5"
                                    text-color="green"
                                    color="transparent"
                                  >
                                    作者
                                  </v-chip>
                                </span>
                                <span class="comment_at">@</span>
                                <a
                                  class="users"
                                  @click="
                                    toUserInfo(
                                      children.toUid,
                                      children.toNickName
                                    )
                                  "
                                  >{{ children.toNickName }}</a
                                >
                                <span></span>
                              </span>
                            </v-col>
                            <v-col cols="12" class="comment-content pa-0 pl-3">
                              <div class="comment-content-text">
                                <p class="mb-0">
                                  {{ children.content }}
                                </p>
                              </div>
                              <div
                                class="comment-footer d-flex align-center mr-5"
                              >
                                <time
                                  class="comment-meta-item timeago"
                                  datetime="2020-02-11T11:16:43+08:00"
                                  :data-timeago="children.createdTime"
                                  itemprop="datePublished"
                                  data-tid="649"
                                  >{{ children.createdTime }}</time
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                  class="comment-btn"
                                  text
                                  retain-focus-on-click
                                  :ripple="false"
                                  x-small
                                  @click="
                                    replyChildren(
                                      children,
                                      commentIndex,
                                      childrenIndex
                                    )
                                  "
                                >
                                  <v-icon size="13" style="padding-right:2px">
                                    far fa-thumbs-up
                                  </v-icon>
                                  喜欢
                                </v-btn>
                                <v-btn
                                  class="comment-btn"
                                  text
                                  retain-focus-on-click
                                  :ripple="false"
                                  x-small
                                  @click="
                                    replyChildren(
                                      children,
                                      commentIndex,
                                      childrenIndex
                                    )
                                  "
                                >
                                  <v-icon size="13" style="padding-right:2px">
                                    far fa-thumbs-down
                                  </v-icon>
                                  反对
                                </v-btn>
                                <v-btn
                                  class="comment-btn"
                                  text
                                  retain-focus-on-click
                                  :ripple="false"
                                  x-small
                                  @click="
                                    replyChildren(
                                      children,
                                      commentIndex,
                                      childrenIndex
                                    )
                                  "
                                >
                                  <v-icon size="13" style="padding-right:2px">
                                    far fa-comment-dots
                                  </v-icon>
                                  回复
                                </v-btn>
                                <v-btn
                                  class="comment-btn"
                                  text
                                  retain-focus-on-click
                                  :ripple="false"
                                  x-small
                                  @click="
                                    deleteComment(
                                      children,
                                      commentIndex,
                                      childrenIndex
                                    )
                                  "
                                >
                                  <v-icon size="13" style="padding-right:2px">
                                    far fa-comment-dots
                                  </v-icon>
                                  删除
                                </v-btn>
                              </div>
                            </v-col>

                            <v-expand-transition>
                              <v-col
                                cols="12"
                                class="pa-0"
                                style="position: relative;"
                                v-if="
                                  showParentReply == commentIndex &&
                                    showChildrenReply == childrenIndex
                                "
                              >
                                <ValidationObserver ref="replyForm">
                                  <v-form>
                                    <ValidationProvider
                                      :mode="validateMode"
                                      name="comment"
                                      rules="required|max:180"
                                      v-slot="{ errors }"
                                    >
                                      <v-textarea
                                        v-model="replyContent"
                                        :disabled="replyLoading"
                                        solo
                                        placeholder="想说什么呢......"
                                        no-resize
                                        auto-grow
                                        rows="3"
                                        class="mr-5 mt-3 ml-3"
                                        hint="写回复..."
                                        persistent-hint
                                        :error-messages="errors[0]"
                                      >
                                        <template slot="prepend-inner">
                                          <p class="inner-text">
                                            <span class="at">@</span
                                            >{{ children.fromNickName }}
                                          </p>
                                        </template>
                                      </v-textarea>
                                    </ValidationProvider></v-form
                                  ></ValidationObserver
                                >

                                <v-btn
                                  absolute
                                  bottom
                                  right
                                  fab
                                  small
                                  :loading="replyLoading"
                                  class="reply-btn"
                                  @click="validate"
                                >
                                  <v-slide-x-reverse-transition mode="out-in">
                                    <v-icon
                                      size="18"
                                      :key="`icon-${isContentNull}`"
                                      :color="
                                        !isContentNull ? 'success' : 'info'
                                      "
                                      v-text="
                                        !isContentNull
                                          ? 'mdi-check-outline'
                                          : 'mdi-circle-edit-outline'
                                      "
                                    ></v-icon>
                                  </v-slide-x-reverse-transition>
                                  <template v-slot:loader>
                                    <div class="loader">
                                      <v-progress-circular
                                        indeterminate
                                        size="24"
                                        width="3"
                                        color="green"
                                      ></v-progress-circular>
                                    </div>
                                  </template>
                                </v-btn>
                              </v-col>
                            </v-expand-transition>
                          </v-col>
                        </v-row>
                      </template>
                      <div
                        v-if="
                          isSubCommentDataNull
                            ? false
                            : getMoreTip(comment.commentId)
                        "
                        key="tomore"
                        class="d-flex justify-center mt-1"
                      >
                        <v-chip
                          class="green lighten-5"
                          text-color="green"
                          color="transparent"
                          @click="loadingMore(comment.commentId)"
                        >
                          查看更多
                        </v-chip>
                      </div>
                    </v-scroll-y-transition>
                  </v-container>
                </v-col>
              </v-row>
            </v-timeline-item>
          </template>
        </v-scroll-y-transition>
        <v-timeline-item class="pb-0" right color="grey lighten-5">
          <template v-slot:icon>
            <v-tooltip top content-class="b-tooltip" color="white" light>
              <template v-slot:activator="{ on }">
                <a @click="goToComment" v-on="on">
                  <v-img :src="commentBg" height="24" contain></v-img>
                </a>
              </template>
              <span class="grey--text text--darken-3">添加评论</span>
            </v-tooltip>
          </template>
          <v-row class="comment-item">
            <v-pagination
              v-if="pageParams.total > pageParams.size"
              v-model="page"
              class="mt-4"
              :length="getPageLength"
              total-visible="7"
            ></v-pagination> </v-row
        ></v-timeline-item>
      </v-timeline>
    </v-container>

    <!-- 登录提示组件 -->
    <helper-permission-dialog
      :show.sync="showLoginTip"
      shortContent="发表回复"
    ></helper-permission-dialog>
    <!-- <v-btn absolute bottom left fab></v-btn> -->
  </div>
</template>

<script>
import { scrollToComment } from '@/assets/js/scrolling'
import { mapActions, mapGetters } from 'vuex'
// import testData from '@/assets/data/article'
export default {
  props: {
    pageParams: {
      type: Object,
      default: () => {
        return {
          current: 1,
          size: 10,
          //被评论的资源id，可以是文章，文件等
          ownerId: '',
          total: 0
        }
      }
    },
    //存放评论的列表
    commentList: {
      type: Array,
      required: true
      // default: () => {
      //   return testData.comment.records
      // }
    },
    showData: {
      type: Object,
      default: () => {
        return {
          //专门用来存储是否有子评论，是否可以加载更多，当前操作的是那一条评论等相关信息
          subCommentData: {},
          //用来存储当前正在操作的评论的信息，如回复那一条评论，就存储那一条评论的信息
          currentComment: {}
        }
      }
    },

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
      //评论数组
      selfCommentList: [],
      //页数，第几页
      page: 1,
      //回复内容
      replyContent: 'Nihaonhao',
      //内容表单校验规则
      contentRules: '',
      showParentReply: -1,
      showChildrenReply: -1,
      openParentReply: true,
      replyLoading: false,

      //表单校验模式
      validateMode: 'passive',
      validateModes: ['aggressive', 'passive'],

      previewAvatar: require('@/assets/images/avatar/avatar.svg'),

      commentBg: require('@/assets/images/comment/comment.svg'),

      //登录提示框
      showLoginTip: false
    }
  },
  mounted() {
    //
  },
  methods: {
    //,
    ...mapActions({
      //设置使用的用户id
      setUseUserId: 'setUseUserIdFun'
    }),
    toUserInfo(userId, nickName) {
      //跳转到用户个人信息界面
      if (this.getBaseUserInfo.nickName == nickName) {
        this.$router.push('/blog/users/own/info')
      } else {
        this.setUseUserId(userId)
        this.$router.push('/blog/users/other/info')
      }
    },
    //加载更多子评论
    loadingMore(commentId) {
      this.$emit('loadingMore', commentId)
    },

    //==========
    //删除评论
    deleteComment(item, commentIndex, childrenIndex) {
      let vm = this
      // console.log(item)
      // console.log(index)
      let params = {
        commentId: item.commentId,
        userId: item.fromUid
      }
      setTimeout(() => {
        this.$api.comment
          .toDeleteByUid(params)
          .then(res => {
            // eslint-disable-next-line no-unused-vars
            let data = res.data.extend.data
            // console.log(data)
            this.$toast.success('删除评论成功')
            //在下标处开始删除,删除一位，删除 删除成功的记录
            //不必重新拉取数据
            if (childrenIndex) {
              vm.selfCommentList[commentIndex].splice(childrenIndex, 1)
            } else {
              vm.selfCommentList.splice(commentIndex, 1)
            }
          })
          .catch(() => {
            // vm.loading = false
          })
      }, 0)
    },
    //回复主评论
    replyParent(parentComment, parentIndex) {
      //判断是否已登录，未登录，展开提示框
      if (!this.$isLogin()) {
        this.showLoginTip = true
        return
      }
      //如果已经打开输入框，则关闭
      if (this.showParentReply == parentIndex) {
        this.showParentReply = -1
        this.openParentReply = false
      } else {
        this.formData.parentId = parentComment.commentId
        this.formData.toUid = parentComment.fromUid
        this.showParentReply = parentIndex
        //清空原来表单内容
        this.replyContent = ''
        //打开父评论框
        this.openParentReply = true
        //设置使用子评论index=-1，,关闭子评论框
        this.showChildrenReply = -1
      }
    },
    //回复子评论
    replyChildren(childrenComment, parentIndex, childrenIndex) {
      //判断是否已登录，未登录，展开提示框
      if (!this.$isLogin()) {
        this.showLoginTip = true
        return
      }
      //如果已经打开输入框，则关闭
      if (this.showChildrenReply == childrenIndex) {
        this.showParentReply = -1
        this.showChildrenReply = -1
      } else {
        this.formData.parentId = childrenComment.parentId
        this.formData.toUid = childrenComment.fromUid
        //清空原来表单内容
        this.replyContent = ''
        //关闭父评论框
        this.openParentReply = false
        this.showParentReply = parentIndex
        this.showChildrenReply = childrenIndex
      }
    },
    //提交数据到父组件，发布评论
    postComment() {
      this.replyLoading = true
      this.formData.content = this.replyContent
      this.$emit('update:formData', this.formData)
      this.$emit('postComment')
    },
    //校验表单
    validate() {
      let vm = this
      this.$refs.replyForm[0].validate().then(success => {
        if (!success) {
          return
        }
        vm.postComment()
      })
    },
    reset() {
      this.$refs.replyForm.reset()
    },
    //关闭回复框
    closeReply() {
      //关闭提交按钮动画
      this.closeReplyLoading()
      //关闭输入框
      this.showParentReply = -1
      this.showChildrenReply = -1
    },
    //关闭提交按钮加载动画
    closeReplyLoading() {
      this.replyLoading = false
    },
    //获取是否显示加载更多
    getMoreTip(commentId) {
      // console.log(commentId)
      return this.showData.subCommentData[commentId].showSubMore
    },

    //返回发布评论
    goToComment() {
      scrollToComment(this)
      // this.showThis = false
    }
  },
  computed: {
    //
    ...mapGetters({
      //获取基础头像，昵称
      getBaseUserInfo: 'getBaseUserInfoFun'
    }),
    isContentNull() {
      // let content = this.replyContent
      return this.replyContent === ''
    },
    isSubCommentDataNull() {
      let data = this.showData.subCommentData

      let flag = JSON.stringify(data) == '{}'
      // console.log(flag)
      if (!flag) {
        // console.log(data)
      }
      return flag
    },

    getPageLength() {
      if (this.pageParams.total == 0) {
        return 0
      } else {
        return Math.ceil(this.pageParams.total / this.pageParams.size)
      }
    }
  },
  watch: {
    //把父组件传来的评论列表复制到子组件
    commentList: {
      handler(newVal) {
        if (newVal) {
          this.selfCommentList = JSON.parse(JSON.stringify(newVal))
        }
      },
      deep: true
    },

    // 判断是否为自己发布的评论
    isOwner() {
      return function(value) {
        return this.getBaseUserInfo.nickName == value
      }
    },
    //监听表单内容，内容为空，采用懒加载，提交再验证，如果内容不为空，采用立即校验
    replyContent() {
      if (this.replyContent == '') {
        if (this.$refs.replyForm) {
          this.$refs.replyForm[0].reset()
        }
        this.validateMode = this.validateModes[1]
      } else {
        this.validateMode = this.validateModes[0]
        this.$refs.replyForm[0].validate()
      }
    },
    page() {
      this.pageParams.current = this.page
      this.$emit('update:pageParams', this.pageParams)
      //调用父类方法获取数据
      this.$emit('changePage')
    }
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped src="@styles/blog/social_icon2.scss"></style>
<style lang="scss" scoped src="@styles/other/loader.scss"></style>
<style lang="scss" scoped>
//头像
.avatar-bg {
  background: #fff;
  border-radius: 50%;
  padding: 1px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
}
.reply-btn {
  bottom: 16px !important;
  right: 0px !important;
  background-color: white !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08) !important;
  &:hover {
    background-color: white !important;
  }
}
/deep/ .theme--light.v-input {
  color: rgba(0, 0, 0, 0.6);
}
//回复 @ 标志
.at {
  margin: 0 2px;
  // color: #aaa;
  font-size: 14px;
  vertical-align: 1px;
}
.inner-text {
  // margin-top: 10px;
  line-height: 1.36rem;
  // color: rgba(0,0,0,.6);
  font-size: 14px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 6px;
}

//===========覆盖=========
/deep/ .v-timeline::before {
  height: calc(100% - 36px) !important;
  background: rgba(0, 0, 0, 0.04) !important;
}

// 文本框
/deep/
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  // box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.02);

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
  background-color: white;
  // box-shadow: 0 0 1px rgba(39, 44, 49, 0.3), 0 4px 18px rgba(39, 44, 49, 0.08);
}
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot:hover {
  background-color: white;
  box-shadow: 0 0 1px rgba(39, 44, 49, 0.3), 0 4px 18px rgba(39, 44, 49, 0.08);
}
// 子评论fab按钮
/deep/ .v-btn:not(.v-btn--text):not(.v-btn--outlined):hover::before {
  opacity: 0.02;
}
/deep/ .v-btn:not(.v-btn--text):not(.v-btn--outlined):focus::before {
  opacity: 0;
}
//评论页脚按钮
.theme--light.v-btn--active::before,
.theme--light.v-btn--active:hover::before,
.theme--light.v-btn:focus::before {
  opacity: 0;
}
.v-btn:not(.v-btn--round).v-size--x-small {
  height: 20px;
  min-width: 36px;
  padding: 0 5px;
}
//=================分页组件=====================
$trans-props: all 0.3s ease;
/deep/ .theme--light.v-pagination .v-pagination__item,
/deep/ .theme--light.v-pagination .v-pagination__navigation {
  color: hsl(212, 16%, 48%);
  // box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: $trans-props;

  &.v-pagination__item--active {
    color: white;
  }
}

/deep/ .theme--light.v-pagination .v-pagination__item:hover,
/deep/ .theme--light.v-pagination .v-pagination__navigation:hover {
  transform: translateY(-4px);
  // color: #fff;
  // background-color: #BBDEFB;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16);
}

/deep/ .theme--light.v-pagination .v-pagination__item:hover i {
  /* 	transform: scale(1.1); */
  color: #fff;
}

/deep/ .theme--light.v-pagination .v-pagination__item:hover:after,
/deep/ .theme--light.v-pagination .v-pagination__navigation:hover::after {
  transform: translate(0) scale(1.2);
}
</style>
