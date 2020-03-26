<template>
  <v-container class="" style="min-height: 500px;">
    <v-row>
      <v-col cols="12"
        ><p class="b-title my-3 mx-8">{{ getTitle }}</p>
      </v-col></v-row
    >
    <v-row
      v-if="records.length == 0 && !loading"
      class="mt-8 justify-center align-center"
    >
      <v-img :src="$global.emptyBg" height="300" contain></v-img>
    </v-row>
    <!-- <v-divider class="mx-0"></v-divider> -->
    <v-row v-else>
      <v-container>
        <v-sheet class="" color="grey lighten-4">
          <v-row v-if="loading">
            <template v-for="i in 4">
              <v-col
                cols="12"
                :key="i + 'collects'"
                class="px-6 mt-7 py-0"
                :class="i == 4 ? 'mb-3' : ''"
              >
                <v-alert text color="#F5F5F5" class="mb-0 pa-0">
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
                            <v-skeleton-loader
                              type="image"
                              width="80"
                              height="68"
                            >
                            </v-skeleton-loader>
                          </v-card>
                        </v-col>
                        <v-col class="justify-center">
                          <v-skeleton-loader
                            type="paragraph"
                            class="mt-3"
                            width="100%"
                          >
                          </v-skeleton-loader>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-sheet> </v-alert
              ></v-col>
            </template>
          </v-row>
          <v-row v-else>
            <v-scroll-y-transition class="py-0" group style="width:100%">
              <template v-for="(item, i) in records">
                <v-col
                  cols="12"
                  :key="i + 'collects'"
                  class="px-6 mt-7 py-0"
                  :class="i == records.length - 1 ? 'mb-3' : ''"
                >
                  <v-alert text color="#F5F5F5" class="mb-0 pa-0">
                    <!-- <v-divider v-if="i != 0"></v-divider> -->

                    <v-tooltip
                      top
                      content-class="b-tooltip"
                      color="white"
                      light
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="opt-btn red--text"
                          icon
                          @click="deleteItems(item, i)"
                          v-on="on"
                        >
                          <v-icon :size="icon.size" v-text="icon.text"></v-icon>
                        </v-btn>
                      </template>
                      <span class="grey--text text--darken-3"
                        >取消{{ title }}</span
                      >
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
                                class=" grey lighten-5"
                                :src="$cover(item.cover)"
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
          </v-row>
        </v-sheet>
      </v-container>
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
    isSelfUserInfo() {
      return !this.getUseUserId
    },
    getTitle() {
      if (this.isSelfUserInfo) {
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
.loading-more {
  position: absolute;
  bottom: 0;
  right: 50%;
}
</style>
