<template>
  <div>
    <v-card class="shadow-1  b-card-title  ">
      <v-row class=" mx-3 fill-height" justify="center" align="center">
        <p class="  text-left mb-0 ml-3">
          <strong class="title headline blue-grey--text text--darken-4"
            >所有分类</strong
          >
        </p>
      </v-row>
    </v-card>
    <v-card class="shadow-1  mb-6 b-card-content">
      <v-card-text>
        <v-scale-transition hide-on-leave>
          <v-skeleton-loader
            v-if="otherData.categoryInfoLoading"
            type="list-item@10"
          >
          </v-skeleton-loader>
          <v-list nav class="pa-0" v-else>
            <v-list-item-group active-class="pink--text">
              <!-- <v-divider></v-divider> -->
              <template v-for="(item, i) in categoryInfo">
                <v-list-item
                  :key="item.categoryName + item.categoryId"
                  class="mb-0"
                  @click="filterCategory(item)"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{
                        item.categoryName | textLengthFormat(12)
                      }}</v-list-item-title
                    >
                  </v-list-item-content>
                  <v-list-item-action>
                    <!-- <v-btn x-small outlined fab color="info">
                          <strong
                            class="primary--text text--lighten-1 body-2 font-weight-bold"
                            >12</strong
                          ></v-btn
                        > -->

                    <v-badge
                      color="primary"
                      :content="item.count"
                      class="ml-1"
                      inline
                    >
                    </v-badge>
                  </v-list-item-action>
                </v-list-item>

                <v-divider
                  v-if="i + 1 < categories.length"
                  :key="i"
                ></v-divider>
              </template>

              <!-- <v-divider></v-divider> -->
            </v-list-item-group>
          </v-list>
        </v-scale-transition>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import testData from '@/assets/data/article'
export default {
  props: {
    categoryInfo: {
      type: Array
    },
    otherData: {
      type: Object,
      default: () => {
        return {
          categoryInfoLoading: false
        }
      }
    }
  },
  data() {
    return {
      categories: testData.category.items
    }
  },
  methods: {
    filterCategory(category) {
      let path = this.$route.fullPath + '/category'
      let params = category.categoryName
      // console.log(path)
      this.$router.push({ path: path, query: { q: params } })
    }
  },
  components: {},
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

<style></style>
