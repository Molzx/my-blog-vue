<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-12 22:20:30
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-12 22:35:03
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\ArticleButton.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div class="active-box">
    <div class="d-flex flex-column justify-center">
      <div class="social-icon-wrapper">
        <div class="social-icons">
          <div class="d-flex flex-column justify-center">
            <v-tooltip
              right
              content-class="b-tooltip"
              color="white"
              light
              nudge-top="3"
            >
              <template v-slot:activator="{ on }">
                <v-badge
                  :value="hover[0] && thumbsUpCount"
                  color="white"
                  :content="thumbsUpCount"
                  overlap
                  border
                  left
                  transition="slide-y-reverse-transition"
                >
                  <v-hover v-model="hover[0]">
                    <a class="social-icon i-pink" v-on="on">
                      <i class="fas fa-thumbs-up"></i>
                    </a>
                  </v-hover>
                </v-badge>
              </template>
              <span class="max-index grey--text text--darken-3"
                >喜欢就点个赞叭</span
              >
            </v-tooltip>

            <v-tooltip
              right
              content-class="b-tooltip"
              color="white"
              light
              nudge-top="3"
            >
              <template v-slot:activator="{ on }">
                <v-badge
                  :value="hover[1] && starCount"
                  color="white"
                  :content="starCount"
                  overlap
                  border
                  left
                  transition="slide-y-reverse-transition"
                >
                  <v-hover v-model="hover[1]">
                    <a class="social-icon i-teal" v-on="on">
                      <i class="fas fa-star"></i>
                    </a>
                  </v-hover>
                </v-badge>
              </template>
              <span class="max-index grey--text text--darken-3">收藏</span>
            </v-tooltip>
            <v-tooltip
              right
              content-class="b-tooltip"
              color="white"
              light
              nudge-top="3"
            >
              <template v-slot:activator="{ on }">
                <v-badge
                  :value="hover[2] && commentCount"
                  color="white"
                  :content="commentCount"
                  overlap
                  border
                  left
                  transition="slide-y-reverse-transition"
                >
                  <v-hover v-model="hover[2]">
                    <a
                      class="social-icon i-orange"
                      v-on="on"
                      @click="goToComment"
                    >
                      <i class="fas fa-comment-alt"></i>
                    </a>
                  </v-hover>
                </v-badge>
              </template>
              <span class="max-index grey--text text--darken-3">评论</span>
            </v-tooltip>
            <!-- <a
              class="social-icon i-orange"
              href="#"
              target="_blank"
              rel="author"
            >
              <i class="fas fa-comment-alt"></i>
            </a> -->

            <v-tooltip
              right
              content-class="b-tooltip"
              color="white"
              light
              nudge-top="3"
            >
              <template v-slot:activator="{ on }">
                <v-badge
                  :value="hover[3] && shareCount && !showShareGroup"
                  color="white"
                  :content="shareCount"
                  overlap
                  border
                  left
                  transition="slide-y-reverse-transition"
                >
                  <v-hover v-model="hover[3]">
                    <a
                      class="social-icon i-green"
                      @click="changeShowShareGroup"
                      v-on="on"
                    >
                      <v-scale-transition mode="out-in">
                        <i
                          :key="`icon-${showShareGroup}`"
                          :class="
                            showShareGroup ? 'fas fa-angle-up' : 'fas fa-share'
                          "
                        ></i>
                      </v-scale-transition>
                    </a>
                  </v-hover>
                </v-badge>
              </template>
              <span class="max-index grey--text text--darken-3">{{
                showShareGroup ? '收起' : '分享'
              }}</span>
            </v-tooltip>
            <v-slide-y-transition>
              <div v-show="showShareGroup">
                <a
                  class="social-icon twitter"
                  href="https://twitter.com/anronkai"
                  target="_blank"
                  rel="author"
                >
                  <i class="fab fa-twitter"></i>
                </a>

                <a
                  class="social-icon dribbble"
                  href="https://dribbble.com/anronkai"
                  target="_blank"
                  rel="author"
                >
                  <i class="fab fa-dribbble"></i>
                </a>

                <a
                  class="social-icon behance"
                  href="https://behance.net/anron"
                  target="_blank"
                  rel="author"
                >
                  <i class="fab fa-behance"></i>
                </a>

                <a
                  class="social-icon instagram"
                  href="https://instagram.com/anronkai"
                  target="_blank"
                  rel="author"
                >
                  <i class="fab fa-instagram"></i>
                </a>
                <a
                  class="social-icon medium"
                  href="https://medium.com/@anron"
                  target="_blank"
                  rel="author"
                >
                  <i class="fab fa-medium-m"></i>
                </a>

                <a
                  class="social-icon github"
                  href="https://github.com/anronkai"
                  target="_blank"
                  rel="author"
                >
                  <i class="fab fa-github"></i>
                </a>
              </div>
            </v-slide-y-transition>
          </div>
        </div>
      </div>
      <!-- <v-btn class="b-btn" tile text color="green">dd</v-btn>
      <v-divider class="mx-4"></v-divider>
      <v-tooltip
        left
        content-class="b-tooltip"
        color="white"
        light
        
      >
        <template v-slot:activator="{ on }">
          <v-btn text style="" v-on="on" class="b-btn">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </template>
        <div>
          <span class="max-index pt-2 text-center grey--text text--darken-3"
            >扫描关注我</span
          >
          <v-img
            class="my-4"
            height="150"
            width="150"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          ></v-img>
        </div>
      </v-tooltip>
      <v-divider class="mx-4"></v-divider>
      <v-tooltip
        left
        content-class="b-tooltip"
        color="white"
        light
        
      >
        <template v-slot:activator="{ on }">
          <v-btn
            text
            style=""
            v-on="on"
            class="b-btn"
            @click="$vuetify.goTo(target, options)"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </template>
        <span class="max-index grey--text text--darken-3">返回顶部</span>
      </v-tooltip> -->
      <!-- <v-btn class="" tile text color="green">dd</v-btn> -->
    </div>
  </div>
</template>

<script>
import { scrollToComment } from '@/assets/js/scrolling'
export default {
  props: {
    //
    floatGroupData: {
      type: Object,
      default: () => {
        return {
          liked: 0,
          collected: 0,
          comment: 0,
          shared: 0,
          isLiked: false,
          isCollect: false,
          isShared: false
        }
      }
    }
  },
  data() {
    return {
      showThis: true,
      hover: [false, false, false, false],
      showShareGroup: false,
      articleData: {
        thumbsUpCount: 0,
        starCount: 14,
        commentCount: 25,
        shareCount: 10000
      }
    }
  },
  methods: {
    changeShowShareGroup() {
      this.showShareGroup = !this.showShareGroup
    },
    goToComment() {
      scrollToComment(this)
      // this.showThis = false
    },
    refixCountData(data) {
      let count = eval(data)
      if (count > 9999) {
        return '9999+'
      } else if (count > 0) {
        return data
      } else {
        return false
      }
    }
  },
  components: {},
  computed: {
    thumbsUpCount() {
      let data = this.articleData.thumbsUpCount
      return this.refixCountData(data)
    },
    starCount() {
      let data = this.articleData.starCount
      return this.refixCountData(data)
    },
    commentCount() {
      let data = this.articleData.commentCount
      return this.refixCountData(data)
    },
    shareCount() {
      let data = this.articleData.shareCount
      return this.refixCountData(data)
    }
  },

  watch: {}
}
</script>

<style lang="scss" src="@styles/blog/social_icon.scss" scoped></style>
<style lang="scss" scoped>
/deep/ .v-badge__badge {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
  color: #e65100;
  font-weight: 700;
}
</style>
