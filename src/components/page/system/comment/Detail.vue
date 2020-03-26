<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-05 14:10:05
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-05 19:58:02
 * @FilePath     : \VueProjects\my-blog\src\components\page\file\Detail.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-dialog
    v-model="show"
    width="500"
    scrollable
    transition="scroll-x-transition"
    origin="center right"
  >
    <v-card>
      <v-card-title
        class=" title font-weight-regular justify-space-between"
        color="primary"
      >
        <span>评论信息</span>
        <div class="d-flex align-center">
          <v-btn icon color="primary" small class="mb-2 mr-3" @click="cancel">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <p class="font-weight-medium">评论类型：{{ info.type }}</p>
        <p class="font-weight-medium">评论人id：{{ info.fromUid }}</p>
        <p class="font-weight-medium">评论人帐号：{{ info.fromUserName }}</p>
        <p class="font-weight-medium">评论人昵称：{{ info.fromNickName }}</p>
        <p class="font-weight-medium">被回复人id：{{ info.toUid }}</p>
        <p class="font-weight-medium">被回复人帐号：{{ info.toUserName }}</p>
        <p class="font-weight-medium">被回复人昵称：{{ info.toNickName }}</p>
        <p class="font-weight-medium">评论内容：{{ info.content }}</p>
        <p class="font-weight-medium">置顶状态：{{ info.status }}</p>
        <p class="font-weight-medium">评论状态：{{ info.status }}</p>
        <p class="font-weight-medium">创建时间：{{ info.createdTime }}</p>
        <p class="font-weight-medium">
          更新时间：{{ info.updatedTime }}
        </p></v-card-text
      >
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      info: {
        commentId: '1542338175424142145',
        parentId: null,
        ownerId: '1541062468073593543',
        type: null,
        fromUid: '555555',
        fromUserName: null,
        fromNickName: '张扬',
        // fromAvatar: null,
        toUid: null,
        toUserName: null,
        toNickName: null,
        // toAvatar: null,
        likeNum: 0,
        content: '你好呀',
        createdTime: '2018-11-16T03:16:15.000+0000',
        updatedTime: '2018-11-16T03:16:15.000+0000',
        status: '启用',
        sticky: '不置顶'
      },
      show: false
    }
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    getParentRefs() {
      let parent = this.$parent.$parent
      return parent
    },
    goBack() {
      let parent = this.getParentRefs()
      parent.goPageList()
    },
    initMethod() {
      console.log('detail组件--')
      let parent = this.getParentRefs()
      let commentId = parent.getUseCommentId()
      //打开对话框
      this.show = true
      this.getCommentInfo(commentId)
    },
    getCommentInfo(commentId) {
      let vm = this
      this.$api.comment
        .toGetOneInfo(commentId)
        .then(res => {
          let data = res.data.extend.data
          vm.info = data
        })
        .catch(() => {
          this.loading = false
        })
    },
    cancel() {
      this.show = false
    },
    openDialog() {
      this.initMethod()
    }
  },
  components: {}
}
</script>

<style></style>
