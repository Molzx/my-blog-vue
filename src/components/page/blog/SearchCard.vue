<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-04-04 22:31:38
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-08 23:28:08
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\SearchCard.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div>
    <v-card class="shadow-1 fill-width mb-4">
      <v-container>
        <v-row class="px-4">
          <v-col cols="12">
            <ValidationObserver ref="form">
              <v-form @submit.native.prevent>
                <v-row align="center" justify="center">
                  <v-col cols="10">
                    <ValidationProvider
                      name="search"
                      rules="max:50"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="searchStr"
                        append-icon="iconfont icon-sousuo1"
                        @click:append="toSearch"
                        @keydown.enter="toSearch"
                        @focus="searchCol = 10"
                        @blur="searchCol = 6"
                        label="搜索看看 :）"
                        hide-details
                        single-line
                        dense
                        solo
                        flat
                        rounded
                        background-color="#f5f5f5"
                        :error-messages="errors[0]"
                        :disabled="searchLoading"
                      >
                        <!-- <template v-slot:append-outer>
                          <v-btn
                            class="search-btn"
                            icon
                            x-large
                            @click="toSearch"
                          >
                            <v-icon color="hsl(212, 16%, 48%)"
                              >iconfont icon-search-alt</v-icon
                            >
                          </v-btn>
                        </template> -->
                      </v-text-field>
                    </ValidationProvider>
                  </v-col>
                </v-row>
              </v-form>
            </ValidationObserver>
          </v-col>
          <!-- <v-col cols="2" class="pl-0">
          <v-btn depressed class="blue white--text">搜索一下</v-btn>
        </v-col> -->
        </v-row>
      </v-container>
    </v-card>

    <v-card v-if="loading" class="shadow-1 fill-width mb-4">
      <v-card-text class="py-12">
        <v-row class="justify-center align-center">
          <v-col cols="12" class="justify-center align-center">
            <v-img :src="startSearchBg" height="200" contain></v-img>
          </v-col>
          <v-col cols="12">
            <p class="mb-0 mt-2 text-center" style="color:#9a9a9a;">
              正在搜索中呀！
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card v-else-if="!pageParams.search" class="shadow-1 fill-width mb-4">
      <v-card-text class="py-12">
        <v-row class="justify-center align-center">
          <v-col cols="12" class="justify-center align-center">
            <v-img :src="startSearchBg" height="200" contain></v-img>
          </v-col>
          <v-col cols="12">
            <p class="mb-0 mt-2 text-center" style="color:#9a9a9a;">
              快来搜索你想看的文章呀！
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card v-else-if="noRecord" class="shadow-1 fill-width mb-4">
      <v-card-text class="py-6">
        <v-row class="justify-center align-center">
          <v-col cols="12" class="justify-center align-center">
            <v-img :src="searchEmptyBg" height="200" contain></v-img>
          </v-col>
          <v-col cols="12">
            <p class="mb-0 mt-2 text-center" style="color:#9a9a9a;">
              没有找到相关的文章......
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import merge from 'webpack-merge'
export default {
  props: {
    //
    loading: {
      type: Boolean
    },
    noRecord: {
      type: Boolean
    }
  },
  data() {
    return {
      //
      pageParams: {
        size: 5,
        current: 1,
        total: 0,

        //搜索内容
        search: '',
        // 文章分类名
        cName: ''
      },
      searchStr: '',
      searchLoading: false,

      //搜索内容是否为空，为空即代表未开始搜索内容
      startSearch: false,
      //搜索结果是否为空
      isSearchEmpty: true,
      // searchEmptyBg: require('@/assets/images/search/search_empty1.svg'),
      // searchEmptyBg: require('@/assets/images/search/search_empty2.svg'),
      searchEmptyBg: require('@/assets/images/search/search_empty3.svg'),
      startSearchBg: require('@/assets/images/search/search_empty4.svg'),
      searchCol: 8
    }
  },
  mounted() {
    //
    //获取地址栏的参数(只有初次加载，才会运行，如果在同一页面，修改，此方法不再进入)
    this.getUrlParams()
  },
  methods: {
    //
    initData() {
      //获取地址栏的参数
      this.getUrlParams()
    },
    getUrlParams() {
      let search = this.$route.query.search
      if (search) {
        this.pageParams.search = search
        this.searchStr = search
      } else {
        this.pageParams.search = ''
        this.searchStr = ''
      }
      console.log(this.searchStr)
      //请求后台数据
      // this.requireData()
    },
    toSearch() {
      if (this.searchStr) {
        //获取原有的路由参数
        let params = {
          //重置为第一页
          p: 1,
          search: this.searchStr
        }
        console.log(params)

        this.$router.replace({
          path: this.$route.fullPath,
          query: merge(this.$route.query, params)
        })
      }
    }
  },
  computed: {
    //
  },
  watch: {
    //
    // 监听路由变化，参数改变，随时获取新的信息
    $route: 'initData'
  },
  filters: {
    //
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped>
/*  */
.search-btn {
  background: #f5f5f5;
}
/deep/ .v-text-field.v-text-field--enclosed .v-text-field__details,
/deep/
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot {
  padding: 0 0 0 12px !important;
}
</style>
