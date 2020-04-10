<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-04-09 20:44:59
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-10 11:22:36
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
                v-format="parseInt(item.count) > 999 ? '#,###' : '0'"
              >
                {{ item.count }}
              </div>
              <div
                class="d-flex justify-center item__txt"
                v-format="parseInt(item.newCount) > 999 ? '#,###' : '0'"
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
import { TweenMax } from '@common/tweenmax/all'
export default {
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
          name: 'pComment',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-xiaoxi',
          iconColor: 'rgb(170, 148, 148)',
          count: '440',
          newCount: '122',
          text: '评论'
        },
        {
          name: 'cComment',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-liaotian',
          iconColor: 'rgb(170, 148, 148)',
          count: '14120',
          newCount: '122',
          text: '回复'
        },
        {
          name: 'like',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-shoucang',
          iconColor: 'rgb(170, 148, 148)',
          count: '14120',
          newCount: '122',
          text: '点赞'
        },
        {
          name: 'collect',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-shoucangxihuan',
          iconColor: 'rgb(170, 148, 148)',
          count: '14120',
          newCount: '122',
          text: '收藏'
        },
        {
          name: 'share',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-fenxiang',
          iconColor: 'rgb(170, 148, 148)',
          count: '14120',
          newCount: '122',
          text: '分享'
        },
        {
          name: 'view',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-xiuxiankafeiyule',
          iconColor: 'rgb(170, 148, 148)',
          count: '14120',
          newCount: '122',
          text: '浏览'
        },
        {
          name: 'user',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-iconfuzhi',
          iconColor: 'rgb(170, 148, 148)',
          count: '14120',
          newCount: '122',
          text: '用户'
        },
        {
          name: 'report',
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-bangzhuyufankui',
          iconColor: 'rgb(170, 148, 148)',
          count: '14120',
          newCount: '122',
          text: '举报信息'
        }
      ],
      loading: true
    }
  },
  mounted() {
    //
    this.requireData()
  },
  methods: {
    //
    requireData() {
      //
      let vm = this
      this.$api.system.toGetIndex().then(res => {
        let data = res.data.extend.data
        console.log(data)
        vm.changeAfterRequire(data)
        vm.loading = false
      })
    },
    changeAfterRequire(data) {
      //
      // eslint-disable-next-line no-unused-vars
      this.countItems.forEach((el, i) => {
        // el.count = data[el.name]
        // el.newCount = data[el.name + 'New']

        this.setLite(el, data[el.name], 1)
        this.setLite(el, data[el.name + 'New'])
      })
    },
    setLite(obj, val, type) {
      if (type == 1) {
        TweenMax.fromTo(
          obj,
          2,
          {
            count: 0
          },
          { count: val, roundProps: ['count'] }
        )
      } else {
        TweenMax.fromTo(
          obj,
          2,
          {
            newCount: 0
          },
          { newCount: val, roundProps: ['newCount'] }
        )
      }
    }
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

/deep/ .v-alert__border {
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
