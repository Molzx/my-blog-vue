<template>
  <v-container class="" style="min-height:500px">
    <v-row class="mb-4">
      <v-card class="shadow-1 fill-width">
        <v-card-text>
          <p class="b-title my-0 mx-8">{{ getTitle }}</p>
        </v-card-text>
      </v-card>
    </v-row>
    <!-- records.length == 0 && !loading -->
    <v-row
      v-if="records.length == 0 && !loading"
      class="justify-center align-center"
    >
      <v-card class="shadow-1 fill-width">
        <v-card-text class="pt-8">
          <v-img :src="$global.emptyBg" height="300" contain></v-img>
          <p class="text-center mt-2" style="color:#bababa;">
            暂时木有内容呀～～
          </p>
        </v-card-text>
      </v-card>
    </v-row>
    <!-- <v-divider class="mx-0"></v-divider> -->
    <v-row v-else :key="`icon-${loading}`">
      <template v-if="loading">
        <template v-for="i in 3">
          <v-col
            cols="12"
            :key="i + 'collects'"
            class="px-0 pt-0 pb-5"
            :class="i == records.length - 1 ? 'mb-3' : ''"
          >
            <v-card class="mb-0 pa-0 shadow-1">
              <!-- <v-divider v-if="i != 0"></v-divider> -->

              <v-container>
                <v-row dense>
                  <v-col class="align-center">
                    <v-row
                      class="mb-2 mx-0 no-gutters c-content align-center justify-space-between"
                    >
                      <v-col>
                        <v-row class="mr-2 no-gutters c-content align-center">
                          <v-col cols="auto" class="mr-3">
                            <v-skeleton-loader type="avatar">
                            </v-skeleton-loader>
                          </v-col>
                          <v-col>
                            <v-skeleton-loader type="chip"> </v-skeleton-loader>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <p class="mb-1 c-content">
                      <v-skeleton-loader type="list-item" width="100%">
                      </v-skeleton-loader>
                    </p>
                  </v-col>
                </v-row>
                <v-sheet color="grey lighten-5">
                  <v-row dense align="center" class="px-2 py-1">
                    <v-col cols="auto" class="mr-1">
                      <v-card class="mx-auto  main-card__img" max-height="50">
                        <v-skeleton-loader type="image" width="64" height="50">
                        </v-skeleton-loader>
                      </v-card>
                    </v-col>
                    <v-col cols="10" class="pa-0">
                      <v-skeleton-loader
                        type="paragraph"
                        class="mt-3"
                        width="100%"
                      >
                      </v-skeleton-loader>
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-container>
            </v-card>
          </v-col>
        </template>
      </template>
      <template v-else>
        <v-scroll-y-transition class="py-0" group style="width:100%">
          <template v-for="(item, i) in records">
            <v-col
              cols="12"
              :key="i + 'collects'"
              class="px-0 pt-0 pb-5"
              :class="i == records.length - 1 ? 'mb-3' : ''"
            >
              <v-card class="mb-0 pa-0 shadow-1">
                <!-- <v-divider v-if="i != 0"></v-divider> -->

                <v-container>
                  <v-row dense>
                    <v-col class="align-center">
                      <v-row
                        class="mb-2 mx-0 no-gutters c-content align-center justify-space-between"
                      >
                        <v-col>
                          <v-row class="mr-2 no-gutters c-content align-center">
                            <v-col cols="auto" class="mr-3">
                              <v-avatar size="38" class="avatar-shadow">
                                <img :src="$avatar(item.fromAvatar)" />
                                <!-- :alt="isLogin ? getBaseUserInfo.nickName : '奶茬-未登录用户'" -->
                              </v-avatar>
                            </v-col>
                            <v-col>
                              <p class="mb-0 c-h-user">
                                {{ item.fromNickName }}
                              </p>
                              <span class="c-h-time">
                                <Timeago
                                  class="c-h-time"
                                  :datetime="item.createdTime"
                                  :autoUpdate="true"
                                >
                                </Timeago>
                                <span class="ml-2">
                                  {{ isReply(item) ? '回复' : '评论' }}
                                </span>
                              </span>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="auto">
                          <v-tooltip
                            top
                            content-class="b-tooltip"
                            color="white"
                            light
                          >
                            <template v-slot:activator="{ on }">
                              <v-btn
                                class="opt-btn deep orange--text"
                                icon
                                @click="deleteItems(item, i)"
                                v-on="on"
                              >
                                <v-icon
                                  :size="icon.size"
                                  v-text="icon.text"
                                ></v-icon>
                              </v-btn>
                            </template>
                            <span class="grey--text text--darken-3"
                              >删除{{ title }}</span
                            >
                          </v-tooltip>
                        </v-col>
                      </v-row>
                      <p class="mb-1 c-content">
                        <v-avatar
                          v-if="isReply(item)"
                          color="grey lighten-3"
                          class="mr-1"
                          size="28"
                        >
                          <v-icon size="16" class="icon-color"
                            >iconfont icon-message</v-icon
                          >
                        </v-avatar>
                        <v-chip
                          v-if="isReply(item)"
                          class=""
                          small
                          text-color="green"
                          color="green lighten-5"
                          style="vertical-align: middle;"
                          @click="toUserInfo(item.toUid)"
                          >{{ item.toNickName }}
                        </v-chip>
                        <span
                          v-if="isReply(item)"
                          class="mx-2"
                          style="vertical-align: middle;"
                          >:</span
                        >

                        <span style="vertical-align: middle;">{{
                          item.content
                        }}</span>
                      </p>
                    </v-col>
                  </v-row>
                  <v-sheet color="grey lighten-5">
                    <v-row dense align="center" class="px-2 py-1">
                      <v-col cols="auto" class="mr-1">
                        <v-card class="mx-auto  main-card__img" max-height="50">
                          <v-img
                            height="50"
                            width="64"
                            class=" grey lighten-5"
                            :src="$cover(item.article.cover)"
                          ></v-img>
                        </v-card>
                      </v-col>
                      <v-col cols="10" class="pa-0">
                        <p class="c-a-title mb-1">
                          <router-link
                            :to="{
                              path: linkToArticle,
                              query: { q: item.article.articleId }
                            }"
                            class="b-a"
                          >
                            {{ item.article.title }}
                          </router-link>
                          <!-- <a class="float-right b-a" @click="item, i">取消收藏</a> -->
                        </p>
                        <p class="mb-0 c-a-desc">
                          {{ item.article.description }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-sheet>
                </v-container>
              </v-card>
            </v-col>
          </template>
        </v-scroll-y-transition>
      </template>
    </v-row>
    <!-- <div v-if="showMoreBtn" class="loading-more">
    </!-->
    <v-row
      v-if="showMoreBtn"
      class="justify-center"
      style="margin-bottom:-36px"
    >
      <v-tooltip top content-class="b-tooltip" color="white" light>
        <template v-slot:activator="{ on }">
          <div class="social-icon-wrapper3" v-on="on">
            <div class="social-buttons">
              <a class="social-button i-orange shadow-1" @click="nextPage">
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
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    //
    title: {
      type: String
    },
    icon: {
      type: Object
      // default: () => {
      //   return {
      //     size: 20,
      //     text: 'mdi-star-face'
      //   }
      // }
    },
    loading: {
      type: Boolean
    },
    records: {
      type: Array
    },
    showMoreBtn: {
      type: Boolean
    }
  },
  data() {
    return {
      //
      isEditing: true
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    ...mapActions({
      //设置使用的用户id
      setUseUserId: 'setUseUserIdFun'
    }),
    nextPage() {
      //
      this.$emit('nextPage')
    },
    deleteItems(item, i) {
      //父组件以数组形式接收，deleteItems(args)
      this.$emit('deleteItems', item, i)
    },
    toUserInfo(userId) {
      //
      this.setUseUserId(userId)
      this.$router.push('/blog/users/other/info')
    }
  },
  computed: {
    //
    ...mapGetters({
      getUseUserId: 'getUseUserIdFun'
    }),

    //是否为个人信息
    isOwnerSpace() {
      let flag = this.$route.fullPath.indexOf('/blog/users/owner') != -1
      return flag
    },
    getTitle() {
      if (this.isOwnerSpace) {
        return '我的' + this.title
      } else {
        return 'Ta的' + this.title
      }
    },
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
    isReply() {
      return function(item) {
        return item.parent
      }
    }
  },
  watch: {
    //
  },
  components: {
    //
  }
}
</script>
<style lang="scss" src="@styles/blog/social_icon3.scss" scoped></style>

<style lang="scss" scoped>
.avatar-shadow {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1) !important;
  &:hover {
    box-shadow: none;
    // box-shadow: 0 30px 50px -20px rgba(14, 0, 47, 0.21) !important;
  }
}
/*  */
.c-h-user {
  color: #5c5c5c;
  font-size: 0.86rem;
}
.c-h-time {
  color: #6c6c6c;
  font-size: 0.72rem;
}
.c-content {
  color: #4f4f4f;
}
.c-content {
  color: #4f4f4f;
}
.c-a-title {
  color: #5c5c5c;
  font-size: 0.88rem;
}
.c-a-desc {
  color: #7a7a7a;
  font-size: 0.81rem;
  // width: 480px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.b-c-desc {
  color: #7a7a7a;
  font-size: 0.88rem;
}
.opt-btn {
  // position: absolute;
  // top: -20px;
  // right: 10px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
}
.loading-more {
  position: absolute;
  bottom: 0;
  right: 50%;
}
</style>
