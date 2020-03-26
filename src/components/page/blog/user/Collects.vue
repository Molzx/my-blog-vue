<template>
  <v-container class="" style="min-height: 450px;">
    <v-row>
      <v-col cols="12"><p class="b-title my-3 mx-8">我的收藏</p> </v-col></v-row
    >
    <!-- <v-divider class="mx-0"></v-divider> -->
    <v-sheet class="" color="grey lighten-4">
      <v-scroll-y-transition class="py-0" group tag="v-row">
        <template v-for="(item, i) in getArrayData">
          <v-col
            cols="12"
            :key="i + 'collects'"
            class="px-6 mt-7 py-0"
            :class="i == getArrayData.length - 1 ? 'mb-3' : ''"
          >
            <v-alert text color="#F5F5F5" class="mb-0 pa-0">
              <!-- <v-divider v-if="i != 0"></v-divider> -->

              <v-tooltip top content-class="b-tooltip" color="white" light>
                <template v-slot:activator="{ on }"
                  ><v-btn
                    class="opt-btn"
                    :class="fav ? 'red--text' : ''"
                    icon
                    @click="fav = !fav"
                    v-on="on"
                  >
                    <v-icon size="20">mdi-star-face</v-icon>
                  </v-btn>
                </template>
                <span class="grey--text text--darken-3">取消收藏</span>
              </v-tooltip>
              <v-sheet>
                <v-container>
                  <v-row dense>
                    <v-col cols="auto" class="mr-1">
                      <v-card
                        class="mx-auto"
                        max-height="68"
                        flat
                        style="border-radius:0px"
                      >
                        <v-img
                          height="68"
                          width="80"
                          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        ></v-img>
                      </v-card>
                    </v-col>
                    <v-col class="justify-center">
                      <v-col cols="12" class="pa-0">
                        <p class="b-title--small mb-1">
                          <router-link
                            :to="{
                              path: linkToArticle,
                              query: { q: item.articleId }
                            }"
                            class="b-a"
                          >
                            {{ item.title }}
                          </router-link>
                          <!-- <a class="float-right b-a" @click="item, i">取消收藏</a> -->
                        </p>
                      </v-col>
                      <v-col cols="2" class="pa-0 ">
                        <p class="mb-0 b-c-desc">
                          {{ item.description }}
                        </p>
                      </v-col>
                      <v-col cols="12" class="pa-0">
                        <span class="b-span--time"
                          >{{ item.createdTime }}
                        </span>

                        <span class="b-span--time mx-2"> | </span>

                        <span class="b-span--time">
                          <router-link
                            :to="{
                              path: linkToCategory,
                              query: { q: item.categoryName }
                            }"
                            class="b-a"
                          >
                            {{ item.categoryName | textLengthFormat(18) }}
                          </router-link></span
                        >
                      </v-col>
                    </v-col>
                  </v-row>
                </v-container></v-sheet
              >
            </v-alert></v-col
          >
        </template>
      </v-scroll-y-transition>
    </v-sheet>
    <v-row
      v-if="showMoreBtn"
      class="justify-center"
      style="margin-bottom:-36px"
    >
      <v-tooltip top content-class="b-tooltip" color="white" light>
        <template v-slot:activator="{ on }">
          <div class="social-icon-wrapper3" v-on="on">
            <div class="social-buttons">
              <a class="social-button i-orange shadow-1" @click="addItems">
                <i class="fas fa-angle-double-down"></i>
              </a>
            </div>
          </div>
        </template>
        <span class="grey--text text--darken-3">加载更多</span>
      </v-tooltip>
    </v-row>
  </v-container>
</template>

<script>
import testData from '@/assets/data/article'
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
        current: 1,
        //用户id
        userId: '',
        //数据库分页查询，页面偏移量，用在分页查询点赞量、阅读量等
        offset: 0,
        //当前已显示的点赞记录的数目，用与缓存区没有数据时，计算偏移量
        showSize: 0
      },
      recordItems: testData.article.records,
      dataItems: [],
      total: 0,
      showMoreBtn: false,

      loading: true,

      fav: true
    }
  },
  mounted() {
    //
    let data = {
      total: 30,
      size: 0,
      records: testData.article.records
    }
    this.changeAfterRequire(data)
  },
  methods: {
    //
    requireData() {
      //

      let vm = this
      vm.changeBeforeRequire()
      setTimeout(() => {
        this.$api.collect
          .toGetCollectedArticles()
          .then(res => {
            let data = res.data.extend.data
            console.log(data.msg)
            vm.changeAfterRequire(data)
          })
          .catch(() => {
            vm.loading = false
          })
      }, 0)
    },
    changeBeforeRequire() {
      this.pageParams.showSize = this.dataItems.length
    },
    changeAfterRequire(data) {
      this.total = data.total
      //设置偏移量为返回的size
      this.pageParams.offset = data.size
      this.recordItems = data.records
      let total = this.total
      //一页的数量
      // let size = 30
      let flag = parseInt(total) > this.dataItems.length

      if (flag) {
        this.showMoreBtn = true
      } else {
        this.showMoreBtn = false
      }
    },
    addItems() {
      let item = testData.article.records[1]
      // console.log(item)
      this.recordItems = [item]
    },
    unCollect(item, index) {
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
        this.$api.collect
          .toUncollected(params)
          .then(res => {
            let data = res.data.extend.data
            console.log(data.msg)
            //在下标处开始删除,删除一位，删除取消点赞的记录
            //不必重新拉取数据
            vm.dataItems.splice(index, 1)
          })
          .catch(() => {
            // vm.loading = false
          })
      }, 0)
    }
  },
  computed: {
    //
    linkToArticle() {
      let path = '/blog/articles'
      return path
    },
    linkToCategory() {
      let path = '/blog/categories/category'
      return path
    },
    linkToTag() {
      let path = '/blog/tags/tag'
      return path
    },
    getArrayData() {
      var arr = this.recordItems

      let arr2 = this.dataItems
      arr2.push(...arr)
      // console.log(arr2)
      return arr2
    }
  },
  watch: {
    //
  },
  components: {
    //
  },
  //截断超出一定数量的字符
  filters: {
    textLengthFormat(value, num) {
      // let num = 18
      if (!value) return ''
      if (value.length > num) {
        return value.slice(0, num) + '...'
      }
      return value
    },
    subTitleFormat(value) {
      let num = 18
      if (!value) return ''
      if (value.length > num) {
        return value.slice(0, num) + '...'
      }
      return value
    }
  }
}
</script>

<style lang="scss" src="@styles/blog/social_icon3.scss" scoped></style>
<style lang="scss" scoped>
/*  */
.b-c-desc {
  color: #7a7a7a;
  font-size: 0.88rem;
  width: 700px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.opt-btn {
  position: absolute;
  top: -20px;
  right: 10px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
}
</style>
