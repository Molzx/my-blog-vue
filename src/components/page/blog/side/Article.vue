<template>
  <div ref="sideArticle" class="nn">
    <v-card class="shadow-1  b-card-title--recommand ">
      <v-row class=" mx-3 fill-height" justify="center" align="center">
        <p class="b-title--normal  text-center mb-0">
          {{ getTitle }}
        </p>
      </v-row>
    </v-card>

    <div class="" v-if="loading">
      <v-card
        v-for="(item, i) in 5"
        :key="i"
        class="shadow-1  mb-3 b-card-content "
        height="68"
      >
        <div class="d-flex flex-no-wrap">
          <div>
            <v-card
              class="mx-auto side-card__img"
              max-width="80"
              max-height="68"
              flat
            >
              <v-skeleton-loader type="image" width="80px" height="68px">
              </v-skeleton-loader>
            </v-card>
          </div>
          <div
            class="d-flex flex-column justify-center align-center ml-3 mr-2"
            style="width: 100%;"
          >
            <v-skeleton-loader type="paragraph" class="mt-1" width="100%">
            </v-skeleton-loader>
          </div>
        </div>
      </v-card>
    </div>
    <div class="" v-else>
      <v-card
        v-for="(item, i) in sideArticleItems"
        :key="item.articleId + 'article' + i"
        class="shadow-1  mb-3 b-card-content "
        height="68"
      >
        <div class="d-flex flex-no-wrap">
          <div>
            <v-card class="mx-auto side-card__img" max-height="68">
              <v-img
                height="68"
                width="80"
                class=" grey lighten-5"
                :src="$cover(item.cover)"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </div>
          <div
            class="d-flex flex-column justify-center ml-3 mr-2  text-truncate"
          >
            <v-tooltip
              top
              content-class="b-tooltip"
              color="white"
              light
              max-width="280"
            >
              <template v-slot:activator="{ on }">
                <a
                  v-on="on"
                  @click="toDetail(item.articleId)"
                  class=" text-no-wrap d-inline-block text-truncate mb-2
                    b-sub-title b-a"
                >
                  {{ item.title }}
                </a>
                <!-- <p
                  v-on="on"
                  class=" text-no-wrap d-inline-block text-truncate mb-2
                    b-sub-title
                    "
                >
                  <a @click="toDetail(item.articleId)" class="b-a">
                    {{ item.title }}
                    </a>
                </p> -->
              </template>
              <span class="grey--text text--darken-3">{{ item.title }}</span>
            </v-tooltip>
            <p
              class="d-flex align-center text-no-wrap d-inline-block text-truncate mb-0 footer-bg"
            >
              <v-icon size="13" class="mr-1"
                >iconfont icon-weibiaoti4fuzhi</v-icon
              >
              <Timeago class="" :datetime="item.createdTime" :autoUpdate="true">
              </Timeago>
              <span class="mx-1">·</span>
              <v-icon size="13" class="mx-1"
                >iconfont icon-Commentquantity</v-icon
              >
              <span class="mx-1">{{ item.commentTotal | getMaxNum(3) }}</span>
            </p>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['routerRefresh'], //在子组件中注入在父组件中创建的属性
  props: {
    //
    type: {
      type: String,
      default: 'recommand'
    },
    sideArticleItems: {
      type: Array
    },
    loading: {
      type: Boolean
    }
    // otherData: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       sideArticleLoading: false
    //     }
    //   }
    // }
  },
  data() {
    return {
      //
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    //屏幕滚动方法
    // onScroll(e)
    //   // let top = e.target.scrollingElement.scrollTop
    //   let pd = this.$refs.sideArticle.getBoundingClientRect().top
    //   // console.log(top)
    //   console.log(pd)
    // }
    toDetail(articleId) {
      this.$router.push({
        path: '/blog/articles',
        query: { q: articleId }
      })
      this.routerRefresh() //调用app.vue里面的routerRefresh()方法，完成摧毁和重建过程
    }
  },
  computed: {
    //
    getTitle() {
      switch (this.type) {
        case 'recommand':
          return '推荐文章'
        case 'new':
          return '最新文章'
        case 'top-view':
          return '浏览热榜'
        default:
          return ''
      }
    }
  },
  watch: {
    //
    sideArticleItems() {
      // console.log(this.sideArticleItems)
    }
  },
  components: {
    //
  },
  filters: {
    //
  }
}
</script>

<style lang="scss" scoped>
/*  */
.footer-bg {
  color: #6a6a6a;
  font-size: 12px;
  // padding: 0 8px;
  // background: #f5f5f5;
  // border-radius: 8px;
}
</style>
