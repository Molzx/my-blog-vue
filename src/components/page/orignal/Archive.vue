<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-13 14:27:10
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-13 23:15:45
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\Archive.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div>
    <v-card
      class="shadow-1 mb-4"
      style="border-radius:12px"
      v-for="i in [1, 2]"
      :key="'s' + i"
    >
      <v-container>
        <v-timeline class="pt-0 mt-2" dense>
          <v-timeline-item class="mb-2">
            <v-chip
              class="mt-1 b-chip-count"
              text-color="blue "
              color="blue lighten-5"
            >
              <v-icon dense left color="blue ">mdi-clock-fast</v-icon>2020-20-12
            </v-chip>
          </v-timeline-item>
          <v-timeline-item
            v-for="(item, i) in getItems"
            :key="i"
            :color="item.color"
            small
            right
          >
            <v-alert text color="#F5F5F5" class="mb-0 pa-0">
              <v-divider></v-divider>
              <v-container>
                <v-row dense>
                  <v-col cols="auto" class="mr-1">
                    <v-card
                      class="mx-auto"
                      max-height="68"
                      style="border-radius:4px"
                    >
                      <v-img
                        height="68"
                        width="80"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                      ></v-img>
                    </v-card>
                  </v-col>
                  <v-col class="justify-center">
                    <v-col cols="12" class="pa-0">
                      <span class="b-span--time">2020-20-12 </span>

                      <span class="b-span--time"> | </span>

                      <span class="b-span--time">
                        <router-link to="/blog/articles">
                          日志
                        </router-link></span
                      >
                    </v-col>
                    <v-col cols="12" class="pa-0">
                      <p class="b-title--small mb-0">
                        <router-link to="/blog/articles">
                          {{ item.title | textLengthFormat(18) }}
                        </router-link>
                      </p>
                    </v-col>
                    <v-col cols="12" class="pa-0">
                      <v-icon small left color="#242424 ">mdi-tag</v-icon>
                      <span class="b-span--time">
                        <router-link to="/blog/articles">
                          java
                        </router-link>
                      </span>
                    </v-col>
                  </v-col>
                </v-row>
              </v-container>
            </v-alert>
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import testData from '@/assets/data/article'
export default {
  data() {
    return {
      items: testData.article.items,
      years: [
        {
          color: 'cyan',
          year: '1960'
        },
        {
          color: 'green',
          year: '1970'
        },
        {
          color: 'pink',
          year: '1980'
        },
        {
          color: 'amber',
          year: '1990'
        },
        {
          color: 'orange',
          year: '2000'
        }
      ]
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
    getItems() {
      var arr = this.items
      var arr2 = []

      arr2.push(...arr)
      arr2.push(...arr2)
      arr2.push(...arr2)
      return arr2
    }
  },
  watch: {
    //
  },
  components: {
    //
  },

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
/deep/ .v-timeline::before {
  height: 92% !important;
}
// /deep/ .v-timeline::before {
//   left: calc(20% - 1px) !important;
// }
// /deep/
//   .v-timeline:not(.v-timeline--dense):not(.v-timeline--reverse)
//   .v-timeline-item--after
//   .v-timeline-item__body,
// .v-timeline:not(.v-timeline--dense):not(.v-timeline--reverse)
//   .v-timeline-item:nth-child(2n + 1):not(.v-timeline-item--before)
//   .v-timeline-item__body {
//   max-width: calc(80% - 48px) !important;
// }
// /deep/ .v-timeline-item__opposite {
//   max-width: calc(20% - 48px) !important;
//   align-self: start;
// }
/*  */
</style>
