<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-04-04 22:31:38
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-04 23:30:46
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
              <v-form>
                <ValidationProvider
                  name="search"
                  rules="required|max:50"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="searchStr"
                    dense
                    solo
                    flat
                    background-color="#eee"
                    class="my-input"
                    label="搜索"
                    hint="搜索"
                    persistent-hint
                    :error-messages="errors[0]"
                    :disabled="searchLoading"
                  >
                    <template v-slot:append>
                      <!-- <v-btn class="opt-btn " icon>
                      <v-icon :size="24" color="blue"
                        >iconfont icon-search-alt</v-icon
                      >
                    </v-btn> -->
                      <v-btn depressed class="teal white--text" height="38" tile
                        >搜索一下</v-btn
                      >
                    </template>
                  </v-text-field>
                </ValidationProvider>
              </v-form>
            </ValidationObserver>
          </v-col>
          <!-- <v-col cols="2" class="pl-0">
          <v-btn depressed class="blue white--text">搜索一下</v-btn>
        </v-col> -->
        </v-row>
      </v-container>
    </v-card>

    <v-card class="shadow-1 fill-width">
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
export default {
  props: {
    //
  },
  data() {
    return {
      //
      searchStr: '',
      searchLoading: false,

      // searchEmptyBg: require('@/assets/images/search/search_empty1.svg'),
      // searchEmptyBg: require('@/assets/images/search/search_empty2.svg'),
      searchEmptyBg: require('@/assets/images/search/search_empty3.svg')
      // searchEmptyBg: require('@/assets/images/search/search_empty4.svg')
    }
  },
  mounted() {
    //
  },
  methods: {
    //
  },
  computed: {
    //
  },
  watch: {
    //
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
/deep/ .v-text-field.v-text-field--enclosed .v-text-field__details,
/deep/
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot {
  padding: 0 0 0 12px !important;
}
</style>
