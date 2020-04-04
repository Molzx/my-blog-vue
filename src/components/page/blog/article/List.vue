<template>
  <v-container class="pa-0">
    <v-row no-gutters class="justify-center" v-if="showBreadcrumbs">
      <page-blog-breadcrumbs :items="breadcrumbsItems"></page-blog-breadcrumbs>
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
                    <v-chip
                      class="mr-1 type-bg"
                      small
                      color=""
                      text-color="#4CAF50"
                      @click="filterType(item.type)"
                      >{{ item.type }}
                    </v-chip>
                    <v-chip
                      class="mr-1 category-bg"
                      label
                      small
                      color="blue--text"
                      :to="{
                        path: linkToCategory,
                        query: { q: item.categoryName }
                      }"
                      >{{ item.categoryName | textLengthFormat(18) }}
                    </v-chip>
                    <!-- <rou -->
                  </div>
                  <div class="d-flex flex-row align-center b-footer--opt">
                    <v-chip class="" small color="grey lighten-5">
                      <v-icon
                        left
                        size="13"
                        class="ml-1"
                        color="hsl(212, 16%, 48%)"
                        >fas fa-calendar-minus</v-icon
                      >
                      <Timeago
                        class="time-age"
                        :datetime="item.createdTime"
                        :autoUpdate="true"
                      >
                      </Timeago>
                    </v-chip>
                    <!-- <v-avatar size="24">
                      <img :src="dateBg" />
                    </v-avatar> -->
                    <v-spacer></v-spacer>
                    <template v-for="(opt, optIndex) in item.opt">
                      <span :key="optIndex" class="ml-2 span-opt">
                        <v-tooltip
                          top
                          content-class="b-tooltip"
                          color="white"
                          light
                          open-delay="300"
                        >
                          <template v-slot:activator="{ on }">
                            <v-badge color="grey lighten-4" inline overlap>
                              <template v-slot:badge>
                                <span class="opt-color--text">
                                  {{ opt.count | getMaxNum(4) }}
                                </span>
                              </template>
                              <v-btn
                                class="opt-btn"
                                :class="
                                  opt.selected ? 'active ' + opt.class : ''
                                "
                                icon
                                small
                                @click="
                                  clickOptBtn(item, articleIndex, optIndex)
                                "
                                v-on="on"
                              >
                                <v-icon
                                  :size="opt.size"
                                  v-text="opt.icon"
                                ></v-icon>
                              </v-btn>
                            </v-badge>
                            <!-- {{ articleIndex }}

                            <span class="opt-bg footer--span">
                              {{ opt.count | getMaxNum(4) }}
                            </span> -->
                          </template>
                          <span class="icon-color">{{
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

    <!-- 登录提示组件 -->
    <helper-permission-dialog
      :show.sync="showLoginTip"
      :shortContent="getTipContent"
    ></helper-permission-dialog>
  </v-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'
import { like, unlike, collect, uncollect } from '@/assets/js/blog'
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
      dateBg: require('@/assets/images/date.svg'),
      optBtnItems: [
        {
          icon: 'fas fa-book-reader',
          class: 'view',
          size: 14,
          count: 0,
          selected: false,
          text1: '快点进来，一起学习吧 :)',
          text2: '浏览量'
        },
        {
          icon: 'fas fa-thumbs-up',
          class: 'like',
          size: 14,
          count: 0,
          selected: false,
          text1: '喜欢这篇文章吗，点个赞叭 :)',
          text2: '取消点赞'
        },
        {
          icon: 'fas fa-star',
          class: 'collect',
          size: 14,
          count: 0,
          selected: false,
          text1: '不妨先收藏，下次再看叭 :)',
          text2: '取消收藏'
        },
        {
          icon: 'fas fa-share',
          class: 'share',
          size: 14,
          count: 0,
          selected: true,
          text1: '分享给其他人看看叭 :)',
          text2: '分享给其他人看看叭 :)'
        }
      ],
      optViewIndex: 0,
      optLikeIndex: 1,
      optCollectIndex: 2,
      optShareIndex: 3,
      //点赞操作的那一项的信息
      optArticleInfo: {},
      //点赞、收藏操作的参数
      optParams: {
        //资源类型
        ownerType: '文章',
        //资源id
        ownerId: ''
        //用户id
        // userId: userId
      },
      optArticleArr: [],

      showLoginTip: false,
      LoginTipContent: {
        like: '点赞',
        collect: '收藏'
      }
    }
  },
  mounted() {
    //获取当前页数
    this.getUrlParams()
  },
  methods: {
    goToDetail() {
      // let params = articleId
      // // console.log(path)
      // this.$router.push({ path: path, query: { q: params } })
    },
    clickOptBtn(article, articleIndex, optIndex) {
      this.optArticleInfo = {
        article: article,
        articleIndex: articleIndex,
        optIndex: optIndex,
        selected: !article.opt[optIndex].selected
      }
      if (optIndex == this.optViewIndex) {
        this.$router.push({
          path: this.linkToArticle,
          query: { q: article.articleId }
        })
      } else if (optIndex == this.optShareIndex) {
        this.optParams.ownerId = article.articleId
      } else {
        //判断是否已登录
        if (this.$isLogin()) {
          if (optIndex == this.optLikeIndex) {
            this.optParams.ownerId = article.articleId

            if (this.optArticleInfo.selected) {
              //点赞
              like(this, this.optParams)
            } else {
              //取消点赞
              unlike(this, this.optParams)
            }
          } else if (optIndex == this.optCollectIndex) {
            this.optParams.ownerId = article.articleId
            if (this.optArticleInfo.selected) {
              //收藏
              collect(this, this.optParams)
            } else {
              //取消收藏
              uncollect(this, this.optParams)
            }
          }
        } else {
          //未登录，打开登录提示
          this.showLoginTip = true
        }
      }
    },
    //设置图标的显示状态
    setOptStatus(result) {
      let info = this.optArticleInfo
      let selected = info.selected
      info.article.opt[info.optIndex].selected = selected
      info.article.opt[info.optIndex].count = result.count
      this.$set(this.optArticleArr, info.articleIndex, info.article)
    },
    // eslint-disable-next-line no-unused-vars
    filterType(type) {
      //
    },
    getUrlParams() {
      let params = parseInt(this.$route.query.p)
      if (params) {
        this.page = params
      }
    }
  },
  components: {},
  computed: {
    ...mapGetters({
      //判断是否本地有token ，有返回 true
      isLogin: 'getLoginStatusFun'
    }),
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
    },
    getTipContent() {
      let type = this.optArticleInfo.optIndex
      switch (type) {
        case this.optLikeIndex:
          return this.LoginTipContent.like

        default:
          return this.LoginTipContent.collect
      }
    }
  },

  watch: {
    //
    page(newVal) {
      //更新地址栏分页参数
      let page = parseInt(newVal)
      this.$router.replace({ path: this.$route.fullPath, query: { p: page } }) // 这样页面就跳转到相应的路由了。
      // console.log(this.$route)
      // this.pageParams.current = this.page
      // this.$emit('update:pageParams', this.pageParams)
      // //调用父类方法获取数据
      // this.$emit('changePage')
    },

    articleList: {
      handler(newVal) {
        if (newVal) {
          this.optArticleArr = JSON.parse(JSON.stringify(newVal))
          this.optArticleArr.forEach(i => {
            let arr = this.optBtnItems
            i.opt = JSON.parse(JSON.stringify(arr))
            // i.opt[this.optViewIndex].count = 99999
            i.opt[this.optViewIndex].count = i.view
            i.opt[this.optLikeIndex].count = i.liked
            i.opt[this.optLikeIndex].selected = i.likedStatus
            i.opt[this.optCollectIndex].count = i.collected
            i.opt[this.optCollectIndex].selected = i.collectedStatus
            i.opt[this.optShareIndex].count = i.shared
          })
        }
      },
      deep: true
    }
    // optArticleArr: {
    //   handler(newVal) {
    //     if (newVal) {
    //       console.log(newVal)
    //     }
    //   },
    //   deep: true
    // }
  },
  filters: {
    //
  }
}
</script>

<style lang="scss" scoped>
.b-footer--opt {
  font-size: 13px;
  color: hsl(212, 16%, 48%);
  margin-top: 1px;
  .time-age {
    color: hsl(212, 16%, 48%);
  }
  .span-opt {
    // min-width: 50px;
  }
}
.opt-btn {
  background: #f5f5f5;
  color: hsl(212, 16%, 48%);
  // color: #6c6c6c;
  z-index: 5;
  &.active {
    background: #e3f2fd;
    &.view {
      background: #e0f7fa;
      color: #00bcd4;
    }
    &.like {
      background: #ffebee;
      color: #f44336;
      // background: #e1f5fe;
      // color: #03a9f4;
    }
    &.collect {
      background: #fce4ec;
      color: #e91e63;
    }
    &.share {
      background: #fbe9e7;
      color: #ff5722;
    }
  }
  // margin-right: -10px;
}
.opt-color--text {
  color: hsl(212, 16%, 48%);
  // color: #6c6c6c;
}
.opt-bg {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 3px 8px;
}
</style>
