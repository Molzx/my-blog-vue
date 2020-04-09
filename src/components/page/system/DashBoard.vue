<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-04-09 20:44:59
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-09 22:22:17
 * @FilePath     : \VueProjects\my-blog\src\components\page\system\DashBoard.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div class="content">
    <v-row align="center" justify="center" class="count_info">
      <template v-for="(item, i) in countItems">
        <v-col :key="i + item.text">
          <v-card flat class="card-1" min-width="250">
            <div class="d-flex justify-start pt-3 pl-3">
              <!-- <v-chip class="mb-6" color="blue lighten-5 blue--text">
                <span class="">{{ item.text }}</span>
              </v-chip> -->
              <v-alert
                dense
                tile
                color="blue blue--text"
                colored-border
                border="left"
                class="py-0 my-alert"
              >
                <span class="blue--text">{{ item.text }}</span>
              </v-alert>
            </div>
            <v-card-text class="pt-1">
              <div class="d-flex justify-center mb-6">
                <v-avatar :color="item.bgColor" size="78">
                  <v-icon size="40" :color="item.iconColor">{{
                    item.icon
                  }}</v-icon>
                </v-avatar>
              </div>
              <div
                class="d-flex justify-center item__title mb-4"
                v-format="parseInt(item.count) > 999 ? '#,###' : '###'"
              >
                {{ item.count }}
              </div>
              <div
                class="d-flex justify-center item__txt"
                v-format="parseInt(item.newCount) > 999 ? '#,###' : '###'"
              >
                {{ item.newCount }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>
    <!-- Something -->
  </div>
</template>

<script>
export default {
  name: 'temp',
  props: {
    //
  },
  data() {
    return {
      //

      countItems: [
        {
          name: 'article',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-shuben',
          iconColor: 'rgb(170, 148, 148)',
          count: '11122420',
          newCount: '122',
          text: '文章'
        },
        {
          name: 'category',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-fenlei',
          iconColor: 'rgb(170, 148, 148)',
          count: '120',
          newCount: '122',
          text: '分类'
        },
        {
          name: 'tag',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-jiagebiaoqian',
          iconColor: 'rgb(170, 148, 148)',
          count: '120',
          newCount: '122',
          text: '标签'
        },
        {
          name: 'parentComment',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-xiaoxi',
          iconColor: 'rgb(170, 148, 148)',
          count: '440',
          newCount: '122',
          text: '评论'
        },
        {
          name: 'childrenComment',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-liaotian',
          iconColor: 'rgb(170, 148, 148)',
          count: '14120',
          newCount: '122',
          text: '回复'
        },
        {
          name: 'childrenComment',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-liaotian',
          iconColor: 'rgb(170, 148, 148)',
          count: '14120',
          newCount: '122',
          text: '点赞'
        },
        {
          name: 'childrenComment',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-liaotian',
          iconColor: 'rgb(170, 148, 148)',
          count: '14120',
          newCount: '122',
          text: '收藏'
        },
        {
          name: 'childrenComment',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-liaotian',
          iconColor: 'rgb(170, 148, 148)',
          count: '14120',
          newCount: '122',
          text: '分享'
        },
        {
          name: 'childrenComment',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-liaotian',
          iconColor: 'rgb(170, 148, 148)',
          count: '14120',
          newCount: '122',
          text: '浏览'
        },
        {
          name: 'childrenComment',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-liaotian',
          iconColor: 'rgb(170, 148, 148)',
          count: '14120',
          newCount: '122',
          text: '用户'
        },
        {
          name: 'childrenComment',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-liaotian',
          iconColor: 'rgb(170, 148, 148)',
          count: '14120',
          newCount: '122',
          text: '举报信息'
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
    getCountFormat() {
      return count => {
        return parseInt(count) > 999 ? '#,###' : ''
      }
    }
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
/deep/ .system .app-content .main-container .main-body .v-alert__border {
  border-radius: 4px !important;
}
.count_info {
  .item__title {
    font-weight: 700;
    font-size: 27px;
    //color: #6944ff;
    color: #324e63;
  }

  .item__txt {
    font-weight: 500;
    font-size: 16px;
    margin-top: 7px;
    color: #e65100;
  }
}
</style>
