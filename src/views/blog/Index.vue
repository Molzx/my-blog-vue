<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 20:40:58
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-12 20:27:27
 * @FilePath     : \VueProjects\my-blog\src\views\blog\Index.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-row>
    <v-col cols="12" md="8" sm="12">
      <page-blog-article-list2></page-blog-article-list2>
    </v-col>
    <v-col cols="12" md="4" sm="12">
      <v-row class="flex-column ma-0" align="center">
        <!-- 分类内容开始 -->
        <v-col class="px-0">
          <v-card class="shadow-1  b-card-title">
            <v-row class=" mx-3 fill-height" justify="center" align="center">
              <p class="  text-left mb-0 ml-3">
                <strong class="title headline blue-grey--text text--darken-4"
                  >分类</strong
                >
              </p>
              <v-spacer></v-spacer>
              <v-chip class="" text-color="green" color="transparent">
                More
                <v-icon dense right color="green"
                  >fas fa-angle-double-right</v-icon
                >
              </v-chip>
            </v-row>
          </v-card>
          <v-card class="shadow-1  mb-6 b-card-content">
            <v-card-text>
              <v-list class="pa-0">
                <v-list-item-group active-class="pink--text">
                  <v-divider></v-divider>
                  <template v-for="(item, i) in items1">
                    <v-list-item :key="item.text" class="mb-0">
                      <v-list-item-content>
                        <v-list-item-title>
                          {{
                            item.text | textLengthFormat(12)
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
                          content="126"
                          class="ml-1"
                          inline
                        >
                        </v-badge>
                      </v-list-item-action>
                    </v-list-item>

                    <v-divider v-if="i + 1 < items1.length" :key="i"></v-divider
                  ></template>

                  <v-divider></v-divider></v-list-item-group
              ></v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- ====分类结束，标签内容开始== -->
        <v-col class="px-0">
          <v-card class="shadow-1  b-card-title">
            <v-row class=" mx-3 fill-height" justify="center" align="center">
              <p class="  text-left mb-0 ml-3">
                <strong class="title headline blue-grey--text text--darken-4"
                  >标签</strong
                >
              </p>
              <v-spacer></v-spacer>
              <v-chip
                class="green lighten-5"
                text-color="green"
                color="transparent"
              >
                More
                <v-icon dense right color="green"
                  >fas fa-angle-double-right</v-icon
                >
              </v-chip>
            </v-row>
          </v-card>
          <v-card class="shadow-1  mb-6 b-card-content">
            <v-card-text>
              <v-chip
                v-for="tag in tags"
                :key="tag"
                class="ma-1"
                color="light-blue lighten-5"
                >{{ tag }}
                <v-badge color="green" content="6" class="ml-1" bordered inline>
                </v-badge> </v-chip
            ></v-card-text>
            <v-divider></v-divider>
          </v-card>
        </v-col>
        <!-- ====标签内容结束，推荐文章内容开始== -->
        <!-- <v-col class="px-0">
            <v-card class="mx-auto" max-width="120">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              ></v-img>
            </v-card>
          </v-col> -->
        <v-col class="px-0">
          <v-card class="shadow-1  b-card-title--recommand">
            <v-row class=" mx-3 fill-height" justify="center" align="center">
              <p class="  text-left mb-0 ml-3">
                <strong class="title headline blue-grey--text text--darken-4"
                  >推荐文章</strong
                >
              </p>
            </v-row>
          </v-card>

          <div class="pb-12">
            <v-card
              v-for="(item, i) in [0, 1, 2, 3, 4]"
              :key="i"
              class="shadow-1  mb-3 b-card-content"
              height="68"
            >
              <div class="d-flex flex-no-wrap">
                <div>
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
                </div>
                <div class="d-flex flex-column justify-center ml-3 mr-2">
                  <p
                    class=" text-no-wrap d-inline-block text-truncate mb-2
                    body-2 grey--text text--darken-2
                    "
                  >
                    {{ items[1].title | textLengthFormat(12) }}
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
                    <span
                      class="caption font-weight-medium  grey--text text--darken-2"
                      >2020-01-10</span
                    >
                  </p>
                </div>
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
// import NavMenu from '@/components/NavMenu.vue'

export default {
  name: 'main-home',
  data() {
    return {
      items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: '泪如雨',
          artist:
            '你总是要我演绎虐到你心痛，然后又要感动到你心碎，似是换了一颗心。其实我只不过是你的左手，在你的情感世间里陪你左右互搏，打到天花乱坠，黯然神伤。'
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: '音乐很美好，汝觉如何，啊哈哈哈哈哈哈哈哈哈哈哈哈啦啦啦啦啦',
          artist:
            '伤的跌跌撞撞，像折翼的自由，一跳跃就触碰那条条框框，触碰那相思交织的忆中人。你总是让人印象深刻，出其不意，染指你的染指。第一次见到你，我就趣味的告白，“我喜欢你”，而你却对我说“相见恨晚”'
        }
      ],
      tags: [
        'Work',
        'Home Improvement',
        'Vacation',
        'Food',
        'Drawers',
        'Shopping',
        'Art',
        'Tech',
        'Creative Writing'
      ],
      items1: [
        { text: '学习日志等等等等等等等等a', icon: 'mdi-clock' },
        { text: '思考与感情', icon: 'mdi-account' },
        { text: '认知升级', icon: 'mdi-flag' },
        { text: '知识填补', icon: 'mdi-account' },
        { text: '创意记录', icon: 'mdi-flag' }
      ]
    }
  },
  components: {
    // NavMenu
  },

  methods: {},
  computed: {
    getItems() {
      var arr = this.items
      var arr2 = []

      arr2.push(...arr)
      arr2.push(...arr2)
      arr2.push(...arr2)
      return arr2
    },
    //=======内容相关
    getCategoryItems() {
      //截取前5个类别
      var heros = [
        '李白',
        '蔡文姬',
        '韩信',
        '赵云',
        '甄姬',
        '阿珂',
        '貂蝉',
        '妲己'
      ]
      let data = heros.slice(0, 5)
      console.log(data) //  [ "蔡文姬", "韩信", "赵云" ]开始索引为1 结束索引为4(不包括4)
      return data
    }
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
