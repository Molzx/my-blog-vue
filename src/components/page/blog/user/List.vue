<template>
  <v-container class="" style="min-height:500px">
    <v-row class="mb-0">
      <v-card class="shadow-1 fill-width">
        <v-card-text>
          <p class="b-title my-0 mx-8">{{ getTitle }}</p>
        </v-card-text>
      </v-card>
    </v-row>
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
            class="px-0 pt-8 pb-0"
            :class="i == records.length - 1 ? 'mb-3' : ''"
          >
            <v-card class="mb-0 pa-0 shadow-1">
              <v-container>
                <v-row dense align="center">
                  <v-col cols="auto" class="mr-1">
                    <v-card class="mx-auto  main-card__img" max-height="68">
                      <v-skeleton-loader type="image" width="80" height="68">
                      </v-skeleton-loader>
                    </v-card>
                  </v-col>
                  <v-col class="justify-center" cols="10">
                    <v-skeleton-loader
                      type="paragraph"
                      class="mt-3"
                      width="100%"
                    >
                    </v-skeleton-loader>
                  </v-col>
                </v-row>
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
              class="px-0 pt-8 pb-0"
              :class="i == records.length - 1 ? 'mb-3' : ''"
            >
              <v-card class="mb-0 pa-0 shadow-1">
                <v-tooltip top content-class="b-tooltip" color="white" light>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="opt-btn"
                      :class="icon.color"
                      icon
                      @click="deleteItems(item, i)"
                      v-on="on"
                    >
                      <v-icon :size="icon.size" v-text="icon.text"></v-icon>
                    </v-btn>
                  </template>
                  <span class="grey--text text--darken-3">取消{{ title }}</span>
                </v-tooltip>
                <v-container>
                  <v-row dense align="center">
                    <v-col cols="auto" class="mr-1">
                      <v-card class="mx-auto  main-card__img" max-height="68">
                        <v-img
                          height="68"
                          width="80"
                          class=" grey lighten-5"
                          :src="$cover(item.cover)"
                        ></v-img>
                      </v-card>
                    </v-col>
                    <v-col class="justify-center" cols="10">
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
                      <v-col cols="12" class="pa-0 ">
                        <p class="mb-0 b-c-desc">
                          {{ item.description }}
                        </p>
                      </v-col>
                      <v-col cols="12" class="pa-0">
                        <v-chip
                          small
                          class="float-right"
                          text-color="grey "
                          color="grey lighten-5"
                        >
                          <Timeago
                            class="b-span--time"
                            :datetime="item.createdTime"
                            :autoUpdate="true"
                          >
                          </Timeago>
                        </v-chip>
                        <!-- <span class="b-span--time mr-2">分类</span> -->

                        <v-chip
                          class="category-bg"
                          label
                          small
                          color="blue--text"
                          :to="{
                            path: linkToCategory,
                            query: { q: item.categoryName }
                          }"
                          >{{ item.categoryName | textLengthFormat(18) }}
                        </v-chip>
                        <span class="b-span--time">
                          <!-- <router-link
                            :to="{
                              path: linkToCategory,
                              query: { q: item.categoryName }
                            }"
                            class="b-a"
                          >
                            {{ item.categoryName | textLengthFormat(18) }}
                          </router-link> -->
                        </span>
                      </v-col>
                    </v-col>
                  </v-row>
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
import { mapGetters } from 'vuex'
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
    nextPage() {
      //
      this.$emit('nextPage')
    },
    deleteItems(item, i) {
      //父组件以数组形式接收，deleteItems(args)
      this.$emit('deleteItems', item, i)
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
/*  */
.b-c-desc {
  color: #7a7a7a;
  font-size: 0.88rem;
  padding-bottom: 2px;
  // width: 500px;
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
.loading-more {
  position: absolute;
  bottom: 0;
  right: 50%;
}
</style>
