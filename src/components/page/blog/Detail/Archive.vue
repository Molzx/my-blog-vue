<template>
  <div v-if="otherData.articleListLoading">
    <v-card
      class="shadow-1 mb-4"
      style="border-radius:12px"
      v-for="(item, i) in 1"
      :key="'card1' + i"
    >
      <v-container>
        <v-timeline class="pt-0 mt-2" dense>
          <v-timeline-item class="mb-2">
            <v-skeleton-loader class="mt-1" type="chip"> </v-skeleton-loader>
            <!-- <v-chip
              class="mt-1 b-chip-count"
              text-color="blue "
              color="blue lighten-5"
            >
              <v-icon dense left color="blue ">mdi-clock-fast</v-icon
              >{{ item.year }}
            </v-chip> -->
          </v-timeline-item>
          <v-timeline-item
            v-for="(record, i) in 6"
            :key="'record1' + i"
            color="grey"
            class="pb-0"
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
                      <v-skeleton-loader
                        type="image"
                        width="80px"
                        height="68px"
                      >
                      </v-skeleton-loader>
                    </v-card>
                  </v-col>
                  <v-col class="justify-center align-center">
                    <v-col cols="12" style="width: 90%;">
                      <v-skeleton-loader
                        type="paragraph"
                        class="mt-1"
                        width="100%"
                      >
                      </v-skeleton-loader>
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
  <div v-else>
    <v-card
      class="shadow-1 mb-4"
      style="border-radius:12px"
      v-for="(item, i) in getTimelineData"
      :key="'card' + i"
    >
      <v-container>
        <v-timeline class="pt-0 mt-2" dense>
          <v-timeline-item class="mb-2">
            <v-chip
              class="mt-1 b-chip-count"
              text-color="blue "
              color="blue lighten-5"
            >
              <v-icon dense left color="blue ">mdi-clock-fast</v-icon
              >{{ item.year }}
              <!-- 2020-20-12 -->
            </v-chip>
          </v-timeline-item>
          <v-scroll-y-transition class="py-0" group>
            <v-timeline-item
              v-for="(record, i) in item.records"
              :key="'record' + i"
              :color="record.color"
              class="pb-0"
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
                          class=" grey lighten-5"
                          :src="$cover(record.cover)"
                        ></v-img>
                      </v-card>
                    </v-col>
                    <v-col class="justify-center">
                      <v-col cols="12" class="pa-0">
                        <span class="b-span--time"
                          >{{ record.createdTime }}
                        </span>

                        <span class="b-span--time"> | </span>

                        <span class="b-span--time">
                          <router-link
                            :to="{
                              path: linkToCategory,
                              query: { q: record.categoryName }
                            }"
                            class="b-a"
                          >
                            {{ record.categoryName | textLengthFormat(18) }}
                          </router-link></span
                        >
                      </v-col>
                      <v-col cols="12" class="pa-0">
                        <p class="b-title--small mb-0">
                          <router-link
                            :to="{
                              path: linkToArticle,
                              query: { q: record.articleId }
                            }"
                            class="b-a"
                          >
                            {{ record.title }}
                          </router-link>
                        </p>
                      </v-col>
                      <v-col
                        cols="12"
                        class="pa-0"
                        v-if="record.tags.length > 0"
                      >
                        <!-- <v-icon size="10" left color="light-blue darken-2"
                          >fas fa-tags</v-icon
                        > -->
                        <span class="b-span--time">
                          <v-chip
                            v-for="tag in record.tags"
                            :key="tag.tagId + tag.tagName"
                            class="ma-1"
                            small
                            color="cyan lighten-5 cyan--text"
                            @click="filterTag(tag)"
                          >
                            {{ tag.tagName }}
                          </v-chip>
                          <!-- <router-link
                            :to="
                              record.tags
                                ? {
                                    path: linkToCategory,
                                    query: { q: record.tags[0].tagName }
                                  }
                                : ''
                            "
                            class="b-a"
                          >
                            {{ record.tags[0].tagName | textLengthFormat(18) }}
                          </router-link> -->
                          <!-- {{ record.tags }} -->
                        </span>
                      </v-col>
                    </v-col>
                  </v-row>
                </v-container>
              </v-alert>
            </v-timeline-item>
          </v-scroll-y-transition>
        </v-timeline>
      </v-container>
    </v-card>
    <div
      v-if="showMoreBtn"
      class="d-flex justify-center"
      style="margin-top:-36px"
    >
      <v-tooltip top content-class="b-tooltip" color="white" light>
        <template v-slot:activator="{ on }">
          <div class="social-icon-wrapper3" v-on="on">
            <div class="social-buttons">
              <a class="social-button i-orange shadow-1" @click="addItems">
                <!-- <i class="fa fa-dribbble"></i> -->
                <i class="fas fa-angle-double-down"></i>
              </a>
            </div>
          </div>
        </template>
        <span class="grey--text text--darken-3">加载更多</span>
      </v-tooltip>
      <!-- <v-btn fab bottom class="b-more-btn" @click="addItems">
        <v-icon>mdi-eye</v-icon>
      </v-btn> -->
    </div>
  </div>
</template>

<script>
// import testData from '@/assets/data/article'
export default {
  props: {
    articleList: {
      type: Array
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
      //
      // articleItems: testData.article.records,
      articleItems: [],
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
      ],
      colors: ['cyan', 'green', 'pink', 'amber', 'orange'],
      timelineArray: [],
      showMoreBtn: false
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    getTimelineArray(oldArr, newArr) {
      // let newArr = []
      oldArr.forEach((item, i) => {
        //获取一个时间对象
        // var date = new Date(item.created_time)

        var date = new Date(item.createdTime)
        //获取记录的年份
        let year = date.getFullYear()
        //添加颜色

        item.color = this.colors[i % this.colors.length]
        let index = -1
        //判断新的数组里面是否 已经存在当前年份的记录
        let alreadyExists = newArr.some((newItem, j) => {
          if (newItem.year === year) {
            index = j
            return true
          }
        })
        //如果新的数组没有存在当前年份，往新数组添加记录
        if (!alreadyExists) {
          newArr.push({
            year: year,
            records: [item]
          })
        } else {
          //否则根据下标，往已存在的记录添加记录
          newArr[index].records.push(item)
        }
      })
      return newArr.sort(this.compare('year'))
    },
    //排序方法
    compare(property) {
      return function(a, b) {
        var value1 = a[property]
        var value2 = b[property]
        // 升序
        // return value1 - value2
        // 倒序
        return value2 - value1
      }
    },
    addItems() {
      //
      let item = [
        {
          created_time: '2018-2-20 13:59:52',
          updated_time: '2018-2-23 11:30:16'
        },
        {
          created_time: '2017-2-20 13:59:52',
          updated_time: '2017-2-23 11:30:16'
        }
        // {
        //   created_time: '2019-2-20 13:59:52',
        //   updated_time: '2019-2-23 11:30:16'
        // },
        // {
        //   created_time: '2019-2-20 13:59:52',
        //   updated_time: '2019-2-23 11:30:16'
        // }
      ]
      this.articleItems = item
    },

    filterTag(tag) {
      let path = '/blog/tags/tag'
      let params = tag.tagName
      // console.log(path)
      this.$router.push({ path: path, query: { q: params } })
    }
  },
  computed: {
    //
    getItems() {
      var arr = this.articleItems
      var arr2 = []

      arr2.push(...arr)
      arr2.push(...arr2)
      arr2.push(...arr2)
      return arr2
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
    getTimelineData() {
      let arr = this.getTimelineArray(this.articleItems, this.timelineArray)
      console.log(arr)
      return arr
    }
  },
  watch: {
    //
    articleList(newVal) {
      //
      if (newVal) {
        let total = this.otherData.recordTotal
        //一页的数量
        // let size = 30
        let flag = parseInt(total) > this.timelineArray.length
        this.articleItems = this.articleList
        if (flag) {
          this.showMoreBtn = true
        } else {
          this.showMoreBtn = false
        }
      }
    }
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
  height: calc(100% - 52px) !important;
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
