<template>
  <div>
    <v-card class="shadow-1  b-card-title  short">
      <v-row class=" mx-6 fill-height" justify="center" align="center">
        <p class="b-title--normal  text-left mb-0">
          分类
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
            <v-list-item-group active-class="blue--text">
              <!-- <v-divider></v-divider> -->
              <template v-for="(item, i) in categoryInfo">
                <v-list-item
                  :key="item.categoryName + item.categoryId + i"
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
                    <v-badge
                      color="blue lighten-5 blue--text"
                      :content="item.count"
                      class="ml-1"
                      inline
                    >
                    </v-badge>
                  </v-list-item-action>
                </v-list-item>

                <!-- <v-divider
                  v-if="i + 1 < categories.length"
                  :key="i"
                ></v-divider> -->
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
      let params = {
        q: category.categoryName
      }
      // console.log(path)
      this.$toUrl(path, params, 'push')
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

<style lang="scss" scoped>
/deep/ .v-list-item__title {
  color: #545c63;
  padding-bottom: 2px;
}
</style>
