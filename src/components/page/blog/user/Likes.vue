<template>
  <page-blog-user-list
    title="点赞"
    :icon="icon"
    :loading="loading"
    :records="dataItems"
    :showMoreBtn="showMoreBtn"
    @nextPage="nextPage"
    @deleteItems="deleteItems(arguments)"
  ></page-blog-user-list>
</template>

<script>
// import testData from '@/assets/data/article'
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    //
  },
  data() {
    return {
      //
      pageParams: {
        //一页的记录数
        size: 10,
        //当前页数
        current: 0,
        //用户id
        userId: '',
        //数据库分页查询，页面偏移量，用在分页查询点赞量、阅读量等
        offset: 0,
        //当前已显示的点赞记录的数目，用与缓存区没有数据时，计算偏移量
        showSize: 0
      },
      recordItems: [],
      dataItems: [],
      total: 0,

      icon: {
        size: 20,
        text: 'mdi-heart'
      },
      showMoreBtn: false,
      loading: true
    }
  },
  mounted() {
    //
    // let data = {
    //   total: 30,
    //   size: 0,
    //   records: testData.article.records
    // }
    // this.changeAfterRequire(data)
    this.requireData()
  },
  methods: {
    //
    requireData() {
      //

      let vm = this
      vm.changeBeforeRequire()
      setTimeout(() => {
        this.$api.like
          .toGetLikedArticles(this.pageParams)
          .then(res => {
            let data = res.data.extend.data
            // console.log(data)
            vm.changeAfterRequire(data)
          })
          .catch(() => {
            vm.loading = false
          })
      }, 0)
    },
    changeBeforeRequire() {
      if (this.selfUser) {
        this.pageParams.userId = 0
      } else {
        this.pageParams.userId = this.getUseUserId
      }
      this.pageParams.current++
      this.pageParams.showSize = this.dataItems.length
    },
    changeAfterRequire(data) {
      this.total = data.total
      let total = this.total
      //一页的数量
      // let size = 30
      console.log(this.dataItems.length)
      let flag = parseInt(total) > this.dataItems.length + data.records.length
      console.log(flag)
      if (flag) {
        this.showMoreBtn = true
      } else {
        this.showMoreBtn = false
      }
      //设置偏移量为返回的size
      this.pageParams.offset = data.size
      this.recordItems = data.records
    },
    unLike(item, index) {
      //取消收藏
      let vm = this

      let params = {
        //资源类型
        ownerType: '文章',
        //资源id
        ownerId: item.articleId
        //用户id
        // userId: userId
      }
      setTimeout(() => {
        this.$api.like
          .toUnliked(params)
          .then(res => {
            let data = res.data.extend.data
            console.log(data)
            this.$toast.success(data)
            //在下标处开始删除,删除一位，删除取消点赞的记录
            //不必重新拉取数据
            vm.dataItems.splice(index, 1)
          })
          .catch(() => {
            // vm.loading = false
          })
      }, 0)
    },

    nextPage() {
      //
      this.requireData()
    },
    deleteItems(args) {
      //父组件以数组形式接收，deleteItems(args)
      this.unLike(args[0], args[1])
      // this.dataItems.splice(args[1], 1)
    }
  },
  computed: {
    //
    ...mapGetters({
      //获取  其他用户id
      getUseUserId: 'getUseUserIdFun'
    }),
    selfUser() {
      var path = this.$route.fullPath
      if (path.indexOf('users/info/owner') != -1) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    //

    recordItems: {
      handler(newVal) {
        if (newVal) {
          // console.log(newVal)
          this.dataItems.push(...newVal)
          this.loading = false
        }
      },
      deep: true
    }
  },
  components: {
    //
  },
  //
  filters: {
    //
  }
}
</script>

<style lang="scss" scoped>
//
</style>
