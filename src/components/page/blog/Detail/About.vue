<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-04-05 22:01:36
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-05 23:40:16
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\Detail\About.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-card class="shadow-1 fill-width about" height="400">
    <v-card-text>
      <v-row align="center" justify="center">
        <v-avatar size="128">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
      </v-row>
      <v-row align="center" justify="center">
        <template v-for="(item, i) in countItems">
          <v-col :key="i + item.text">
            <div class="d-flex justify-center">
              <v-avatar :color="item.bgColor" size="78">
                <v-icon size="40" :color="item.iconColor">{{
                  item.icon
                }}</v-icon>
              </v-avatar>
            </div>
            <div class="d-flex justify-center item__title my-4">
              {{ item.count }}
            </div>
            <div class="d-flex justify-center item__txt">
              {{ item.text }}
            </div>
          </v-col>
        </template>
      </v-row>
    </v-card-text>
  </v-card>
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
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-shuben',
          iconColor: 'rgb(170, 148, 148)',
          count: '12',
          text: '文章'
        },
        {
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-fenlei',
          iconColor: 'rgb(170, 148, 148)',
          count: '12',
          text: '分类'
        },
        {
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-jiagebiaoqian',
          iconColor: 'rgb(170, 148, 148)',
          count: '34',
          text: '标签'
        },
        {
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-xiaoxi',
          iconColor: 'rgb(170, 148, 148)',
          count: '24',
          text: '评论'
        },
        {
          bgColor: 'grey lighten-4',
          icon: 'iconfont icon-liaotian',
          iconColor: 'rgb(170, 148, 148)',
          count: '142',
          text: '回复'
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
.about {
  .item__title {
    font-weight: 700;
    font-size: 27px;
    //color: #6944ff;
    color: #324e63;
  }

  .item__txt {
    font-weight: 500;
    margin-top: 7px;
  }
}
</style>
