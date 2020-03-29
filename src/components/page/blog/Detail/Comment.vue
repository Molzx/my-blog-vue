<template>
  <v-card style="border-radius:12px" class="shadow-1  mb-6" id="comment">
    <v-card-title>评论</v-card-title>
    <v-card-text>
      <p class="">{{ pageParams.total }}条评论</p>
      <!-- <v-divider></v-divider> -->
      <page-blog-comment-add
        ref="addComment"
        :formData.sync="formData"
        @postComment="postComment"
      ></page-blog-comment-add>
      <page-blog-comment-tip
        v-if="!commentData.commentStatus || commentList.length == 0"
        :isEmpty="commentData.commentStatus && commentList.length == 0"
      >
      </page-blog-comment-tip>
      <!-- 评论信息 -->
      <page-blog-comment-list
        v-else
        ref="showComments"
        :formData.sync="formData"
        :commentList="commentList"
        :showData="showData"
        :pageParams.sync="pageParams"
        @loadingMore="loadingMore"
        @postComment="postComment"
        @changePage="requireParentComment"
      ></page-blog-comment-list>
    </v-card-text>
  </v-card>
</template>

<script>
// import testData from '@/assets/data/article'
export default {
  props: {
    //
    commentData: {
      type: Object
    }
  },
  data() {
    return {
      //
      pageParams: {
        current: 1,
        size: 6,
        //被评论的资源id，可以是文章，文件等
        ownerId: '',
        total: 0
      },
      //存放评论的列表
      commentList: [],
      showData: {
        //专门用来存储是否有子评论，是否可以加载更多，当前操作的是那一条评论等相关信息
        subCommentData: {},
        //用来存储当前正在操作的评论的信息，如回复那一条评论，就存储那一条评论的信息
        currentComment: {},
        refreshChildrenComment: false
      },

      formData: {
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
  },
  mounted() {
    //
  },
  methods: {
    //
    initData() {
      this.getUrlParams()
      this.requireParentComment()
      // this.updateParentComment(testData.comment.records)
    },
    getUrlParams() {
      let params = this.$route.query.q
      this.formData.ownerId = params
      this.pageParams.ownerId = params
    },
    //加载更多子评论
    loadingMore(parentId) {
      // console.log(parentId)
      //页数加一，获取下一页
      this.showData.subCommentData[parentId].current++
      //获取当前点击是哪一条评论下的子评论
      let params = this.showData.subCommentData[parentId]
      //设置当前使用的发送后台的参数
      this.showData.currentComment = params
      //发送请求
      this.requireSubComment()
    },
    //添加子评论后，更新子评论
    updateChildrenComment(parentId) {
      //页数重置为第一页
      this.showData.subCommentData[parentId].current = 1
      //获取当前添加是哪一条评论下的子评论
      let params = this.showData.subCommentData[parentId]
      //设置当前使用的发送后台的参数
      this.showData.currentComment = params
      //设置刷新二级评论为true，
      this.refreshChildrenComment = true
      //发送请求
      this.requireSubComment()
    },
    //请求总评论数据，
    requireParentComment() {
      const vm = this
      setTimeout(() => {
        vm.$api.blog.toGetComments(vm.pageParams).then(res => {
          console.log('require parent comments ')
          let data = res.data.extend
          vm.pageParams.total = data.total
          vm.updateParentComment(data.records)
        })
      }, 0)
    },
    //请求二级评论数据，
    requireSubComment() {
      const vm = this
      setTimeout(() => {
        vm.$api.blog
          .toGetChildrenComments(vm.showData.currentComment)
          .then(res => {
            console.log('require sub comments ')
            let data = res.data.extend
            //拿到当前操作子评论的父评论id
            let parentId = vm.showData.currentComment.parentId
            let currentSub = vm.showData.subCommentData[parentId]

            var parentComment = vm.commentList[currentSub.index]
            //由于默认显示两条子评论，第二次获取数据时，获取10条中包含当前的2条
            var arr = data.records
            if (currentSub.current == 1 && !vm.refreshChildrenComment) {
              arr = arr.slice(2)
              // console.log(arr)
            }
            //如果刷新标记为true，更新所有子评论，而不是拼接数据
            if (vm.refreshChildrenComment) {
              //设置数据到子评论，覆盖原来数据
              parentComment.childrens = arr
              vm.refreshChildrenComment = false
            } else {
              //设置数据到子评论
              let childrens = parentComment.childrens
              parentComment.childrens = childrens.concat(arr)
            }
            //如果子评论的数量和总记录数相等，即代表子评论已加载完毕，隐藏显示加载更多
            if (parentComment.childrens.length >= data.total) {
              currentSub.showSubMore = false
            } else {
              currentSub.showSubMore = true
            }
          })
      }, 0)
    },
    updateParentComment(commentList) {
      let newArr = JSON.parse(JSON.stringify(commentList))
      //找出可以显示更多的子评论
      let obj = {}
      newArr.forEach((el, i) => {
        let item = {}
        //
        // let size=this.refreshChildrenComment?10:2
        if (parseInt(el.count) > 2) {
          item = {
            //父评论id
            parentId: el.commentId,
            //父评论所在数组的index
            index: i,
            //子评论当前页数
            current: 0,
            //是否显示加载更多评论
            showSubMore: true
          }
        } else {
          item = {
            //父评论id
            parentId: el.commentId,
            //父评论所在数组的index
            index: i,
            //是否显示加载更多评论
            showSubMore: false
          }
        }

        obj[el.commentId] = item
      })
      //根据获取到的评论列表信息，重新设置子评论数据
      this.showData.subCommentData = obj
      // console.log(this.showData.subCommentData)
      //更新评论信息
      this.commentList = commentList
    },
    //添加评论后更新评论列表
    updateDataAfterAdd(parentId) {
      // 父评论ID 为空则为父评论，不为空则为子评论
      // console.log(parentId)
      let flag = typeof parentId == 'undefined'
      // console.log(flag)
      if (flag) {
        //如果是添加父评论则更新全部评论数据
        this.requireParentComment()
      } else {
        //如果是添加子评论则只更新子评论数据
        this.updateChildrenComment(parentId)
      }
    },
    postComment() {
      // console.log('ready post comment')
      // console.log(this.formData)
      let vm = this
      setTimeout(() => {
        vm.$api.comment
          .toAdditionForBlog(vm.formData)
          .then(res => {
            console.log('post comment')
            let data = res.data.extend
            //关闭提交表单框
            vm.$refs.showComments.closeReply()
            //关闭加载动画
            vm.$refs.addComment.closeLoading()

            vm.$toast.success(data.data)
            //保存id以备用
            let partentId = vm.formData.parentId
            // 重置表单数据
            Object.assign(this.$data.formData, this.$options.data().formData)
            //重新获取当前资源ID
            vm.getUrlParams()
            //更新列表数据
            vm.updateDataAfterAdd(partentId)
          })
          .catch(() => {
            //关闭按钮动画
            vm.$refs.showComments.closeReplyLoading()
            vm.$refs.addComment.closeLoading()
          })
      }, 0)
    }
  },
  computed: {
    //
  },
  watch: {
    //
    //监听表单内容，内容为空，采用懒加载，提交再验证，如果内容不为空，采用立即校验
    'commentData.commentStatus': {
      handler(newVal) {
        if (newVal) {
          //如果开启评论功能，则查询评论信息
          this.initData()
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
