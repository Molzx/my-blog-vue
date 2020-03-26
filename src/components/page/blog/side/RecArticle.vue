<template>
  <div ref="sideArticle" class="nn">
    <v-card class="shadow-1  b-card-title--recommand ">
      <v-row class=" mx-3 fill-height" justify="center" align="center">
        <p class="mb-0">
          <strong class="title headline blue-grey--text text--darken-4">{{
            getTitle
          }}</strong>
        </p>
      </v-row>
    </v-card>

    <div class="" v-if="otherData.sideRecArticleLoading">
      <v-card
        v-for="(item, i) in 5"
        :key="i"
        class="shadow-1  mb-3 b-card-content "
        height="68"
      >
        <div class="d-flex flex-no-wrap">
          <div>
            <v-card
              class="mx-auto"
              max-width="80"
              max-height="68"
              style="border-radius:4px"
            >
              <v-skeleton-loader type="image" width="80px" height="68px">
              </v-skeleton-loader>
            </v-card>
          </div>
          <div
            class="d-flex flex-column justify-center align-center ml-3 mr-2"
            style="width: 100%;"
          >
            <v-skeleton-loader type="paragraph" class="mt-1" width="100%">
            </v-skeleton-loader>
          </div>
        </div>
      </v-card>
    </div>
    <div class="" v-else>
      <v-card
        v-for="(item, i) in sideRecArticleItems"
        :key="item.articleId + 'article' + i"
        class="shadow-1  mb-3 b-card-content "
        height="68"
      >
        <div class="d-flex flex-no-wrap">
          <div>
            <v-card class="mx-auto" max-height="68" style="border-radius:4px">
              <v-img
                height="68"
                width="80"
                class=" grey lighten-5"
                :src="$cover(item.cover)"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </div>
          <div
            class="d-flex flex-column justify-center ml-3 mr-2  text-truncate"
          >
            <p
              class=" text-no-wrap d-inline-block text-truncate mb-2
                    b-sub-title
                    "
            >
              <router-link
                :to="{
                  path: '/blog/articles',
                  query: { q: item.articleId }
                }"
                class="b-a"
              >
                {{ item.title }}
              </router-link>
            </p>
            <p
              class="d-flex text-no-wrap d-inline-block text-truncate mb-0
                    body-2 grey--text text--darken-2
                    "
            >
              <v-icon size="14" class="mx-1">fas fa-eye</v-icon>
              <span
                class="caption font-weight-medium   grey--text text--darken-2"
                >2321</span
              >

              <span class="mx-1">·</span>
              <v-icon size="12" class="mr-1">fas fa-calendar-alt</v-icon>
              <Timeago
                class="caption font-weight-medium   grey--text text--darken-2"
                :datetime="item.createdTime"
                :autoUpdate="true"
              >
              </Timeago>
            </p>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //
    type: {
      type: String,
      default: 'recommand'
    },
    sideRecArticleItems: {
      type: Array
    },
    otherData: {
      type: Object,
      default: () => {
        return {
          sideRecArticleLoading: false
        }
      }
    }
  },
  data() {
    return {
      //
      items: [
        {
          color: '#1F7087',
          src:
            'https://edyoda.s3.amazonaws.com/media/blog-images/learn-artificial-intelligence_E1bep5u.jpeg',
          title: 'gradle环境搭建',
          artist:
            '你总是要我演绎虐到你心痛，然后又要感动到你心碎，似是换了一颗心。其实我只不过是你的左手，在你的情感世间里陪你左右互搏，打到天花乱坠，黯然神伤。'
        },
        {
          color: '#952175',
          src:
            'https://edyoda.s3.amazonaws.com/media/blog-images/data-mining-an-overview_8O9fl2t.jpg',
          title: '耐人寻味的CSS属性font-family',
          artist:
            '伤的跌跌撞撞，像折翼的自由，一跳跃就触碰那条条框框，触碰那相思交织的忆中人。你总是让人印象深刻，出其不意，染指你的染指。第一次见到你，我就趣味的告白，“我喜欢你”，而你却对我说“相见恨晚”'
        }
      ]
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    //屏幕滚动方法
    // onScroll(e)
    //   // let top = e.target.scrollingElement.scrollTop
    //   let pd = this.$refs.sideArticle.getBoundingClientRect().top
    //   // console.log(top)
    //   console.log(pd)
    // }
  },
  computed: {
    //
    getTitle() {
      switch (this.type) {
        case 'recommand':
          return '推荐文章'
        case 'new':
          return '最新文章'
        default:
          return ''
      }
    }
  },
  watch: {
    //
    sideRecArticleItems() {
      console.log(this.sideRecArticleItems)
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

<style>
/*  */
</style>
