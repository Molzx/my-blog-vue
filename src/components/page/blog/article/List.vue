<template>
  <v-container class="pa-0">
    <v-row dense class="justify-center" v-if="showBreadcrumbs">
      <v-col cols="auto">
        <page-blog-breadcrumbs
          :items="breadcrumbsItems"
        ></page-blog-breadcrumbs>
      </v-col>
    </v-row>
    <v-row dense class="justify-center">
      <v-scale-transition hide-on-leave>
        <!-- 加载器 -->
        <v-container
          class="pa-0"
          v-if="otherData.articleListLoading"
          style="width:100%"
        >
          <v-col
            v-for="i in 6"
            :key="i"
            cols="12"
            :class="i == 0 ? 'pt-0' : ''"
          >
            <v-card class="b-card-list">
              <v-row align="center" no-gutters class=" fill-height">
                <v-card class="b-card-image">
                  <v-skeleton-loader type="image" width="100%" height="100%">
                  </v-skeleton-loader>
                </v-card>
                <div class="b-card-image--content" style="width:100%">
                  <v-skeleton-loader type="article" class="ml-3">
                  </v-skeleton-loader>
                </div>
              </v-row>
            </v-card>
          </v-col>
        </v-container>
        <!-- 主要内容 -->
        <v-container class="pa-0" v-else>
          <v-col
            v-for="(item, articleIndex) in optArticleArr"
            :key="articleIndex"
            cols="12"
            :class="articleIndex == 0 ? 'pt-0' : ''"
          >
            <v-card class="b-card-list">
              <v-row align="center" no-gutters class=" fill-height">
                <v-card class="b-card-image">
                  <v-img
                    class="b-card-image--img grey lighten-5"
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
                <div class="b-card-image--content" style="width:100%">
                  <p class="b-title">
                    <router-link
                      :to="{
                        path: linkToArticle,
                        query: { q: item.articleId }
                      }"
                      class="b-a text-no-wrap d-inline-block text-truncate "
                      style="max-width:520px"
                    >
                      {{ item.title }}
                    </router-link>
                  </p>

                  <p class="b-sub-title text-justify">
                    {{ item.description | textLengthFormat(120) }}
                  </p>
                  <div class="d-flex flex-row b-footer-content align-start">
                    <router-link
                      :to="{
                        path: linkToCategory,
                        query: { q: item.categoryName }
                      }"
                      class="b-a"
                    >
                      {{ item.categoryName | textLengthFormat(18) }}
                    </router-link>
                  </div>
                  <div class="d-flex flex-row b-footer-content align-start">
                    <Timeago
                      class="comment-meta-item timeago "
                      :datetime="item.createdTime"
                      :autoUpdate="true"
                    >
                    </Timeago>
                    <v-spacer></v-spacer>
                    <template v-for="(opt, optIndex) in item.opt">
                      <span :key="optIndex" class="ml-2">
                        <v-tooltip
                          top
                          content-class="b-tooltip"
                          color="white"
                          light
                        >
                          <template v-slot:activator="{ on }"
                            ><v-btn
                              class="opt-btn"
                              :class="opt.selected ? 'red--text' : ''"
                              icon
                              small
                              @click="clickOptBtn(item, articleIndex, optIndex)"
                              v-on="on"
                              style="background:#f5f5f5;z-index:5;margin-right:-10px;"
                            >
                              <v-icon
                                :size="opt.size"
                                v-text="opt.icon"
                              ></v-icon>
                            </v-btn>
                            {{ articleIndex }}
                            <v-chip class="" x-small color="grey lighten-4">
                              {{ opt.count }}
                            </v-chip>
                          </template>
                          <span class="grey--text text--darken-3">{{
                            opt.selected ? opt.text2 : opt.text1
                          }}</span>
                        </v-tooltip>
                      </span>
                    </template>
                  </div>
                </div>
              </v-row>
            </v-card>
          </v-col>
        </v-container>
      </v-scale-transition>
    </v-row>
    <v-row dense class="mt-4 mx-4 justify-end">
      <v-pagination
        v-if="pageParams.total > pageParams.size"
        v-model="page"
        class="mt-4"
        :length="getPageLength"
        total-visible="7"
      ></v-pagination>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    showBreadcrumbs: {
      type: Boolean,
      default: false
    },
    breadcrumbsItems: {
      type: Array
    },
    articleList: {
      type: Array
    },

    pageParams: {
      type: Object,
      default: () => {
        return {
          current: 1,
          size: 10,
          total: 0
        }
      }
    },
    otherData: {
      type: Object,
      default: () => {
        return {
          articleListLoading: false
        }
      }
    }
  },

  data() {
    return {
      //页数，第几页
      page: 1,
      liked: false,
      collected: false,
      optBtnItems: [
        {
          icon: 'mdi-eye',
          size: 18,
          count: 0,
          selected: true,
          text1: '浏览量',
          text2: ''
        },
        {
          icon: 'mdi-thumb-up',
          size: 16,
          count: 1223,
          selected: false,
          text1: '点赞',
          text2: '取消点赞'
        },
        {
          icon: 'mdi-star-face',
          size: 18,
          count: 121,
          selected: false,
          text1: '收藏',
          text2: '取消收藏'
        },
        {
          icon: 'mdi-share',
          size: 18,
          count: 122,
          selected: true,
          text1: '分享',
          text2: '取消分享'
        }
      ],
      optLikeIndex: 1,
      optCollectIndex: 2,
      optArticleArr: [],
      floatData: ''
    }
  },
  methods: {
    goToDetail() {
      // let params = articleId
      // // console.log(path)
      // this.$router.push({ path: path, query: { q: params } })
    },
    clickOptBtn(article, articleIndex, optIndex) {
      let flag = article.opt[optIndex].selected
      console.log(this.optArticleArr)
      this.optArticleArr.slice(articleIndex, 1)
      this.optArticleArr[0].opt[2].selected = !flag
      console.log(this.optArticleArr)
    },
    like(item) {
      //点赞
      // let vm = this

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
          .toliked(params)
          .then(res => {
            let data = res.data.extend.data
            console.log(data.msg)
          })
          .catch(() => {
            // vm.loading = false
          })
      }, 0)
    },
    collect(item) {
      //收藏
      // let vm = this

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
          .toCollected(params)
          .then(res => {
            let data = res.data.extend.data
            console.log(data.msg)
          })
          .catch(() => {
            // vm.loading = false
          })
      }, 0)
    }
  },
  components: {},
  computed: {
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
    getPageLength() {
      if (this.pageParams.total == 0) {
        return 0
      } else {
        return Math.ceil(this.pageParams.total / this.pageParams.size)
      }
    }
  },

  watch: {
    //
    page() {
      this.pageParams.current = this.page
      this.$emit('update:pageParams', this.pageParams)
      //调用父类方法获取数据
      this.$emit('changePage')
    },

    articleList: {
      handler(newVal) {
        if (newVal) {
          this.optArticleArr = newVal
          this.optArticleArr.forEach(i => {
            let arr = this.optBtnItems
            i.opt = JSON.parse(JSON.stringify(arr))
          })
        }
      },
      deep: true
    },
    optArticleArr: {
      handler(newVal) {
        if (newVal) {
          console.log(newVal)
        }
      },
      deep: true
    }
  },
  filters: {
    //
  }
}
</script>

<style></style>
