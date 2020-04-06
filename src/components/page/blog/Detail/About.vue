<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-04-05 22:01:36
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-06 11:13:56
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\Detail\About.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-card class="shadow-1 fill-width profile-card" min-height="400">
    <v-card-text>
      <v-row align="center" justify="center">
        <header>
          <!-- here’s the avatar -->
          <a href="/blog/home">
            <img :src="avatarBg" />

            <!-- <v-img :src="avatarBg" height="64" width="64" contain></v-img> -->
          </a>
          <!-- <v-avatar size="128">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar> -->
          <h1>NaiCha</h1>
        </header>
      </v-row>
      <v-row align="center" justify="center" class="count_info">
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
      ],

      avatarBg: require('@/assets/images/avatar/myavatar.svg')
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
.profile-card {
  header {
    width: 95%;
    // width: 179px;
    // height: 280px;
    // padding: 40px 20px 30px 20px;
    display: inline-block;
    // float: left;
    border-bottom: 2px dashed #eeeeee;
    background: #ffffff;
    color: #4f4f4f;
    margin-top: 50px;
    // opacity: 0;
    text-align: center;
    // -webkit-animation: moveIn 1s 3.1s ease forwards;
    // animation: moveIn 1s 3.1s ease forwards;
    a {
      display: inline-block;
      text-align: center;
      position: relative;
      margin: 25px 30px;
      &:after {
        position: absolute;
        content: '';
        bottom: 3px;
        right: 3px;
        width: 30px;
        height: 30px;
        border: 4px solid #ffffff;
        -webkit-transform: scale(0);
        transform: scale(0);
        background: -webkit-linear-gradient(
          top,
          #2196f3 0%,
          #2196f3 50%,
          #ffc107 50%,
          #ffc107 100%
        );
        background: linear-gradient(
          #2196f3 0%,
          #2196f3 50%,
          #ffc107 50%,
          #ffc107 100%
        );
        -webkit-border-radius: 50%;
        border-radius: 50%;
        -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
        -webkit-animation: scaleIn 0.3s 3.5s ease forwards;
        animation: scaleIn 0.3s 3.5s ease forwards;
      }
      > img {
        width: 150px;
        max-width: 100%;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        -webkit-transition: -webkit-box-shadow 0.3s ease;
        transition: box-shadow 0.3s ease;

        $shadow: #f5f5f5;
        box-shadow: 0px 0px 0px 8px rgba($shadow, 1);
        -webkit-box-shadow: 0px 0px 0px 8px rgba($shadow, 1);
        // -webkit-box-shadow: 0px 0px 0px 8px rgba(0, 0, 0, 0.06);
        // box-shadow: 0px 0px 0px 8px rgba(0, 0, 0, 0.06);
      }
      &:hover > img {
        $shadow: #efeff4;
        box-shadow: 0px 0px 0px 12px rgba($shadow, 1);
        -webkit-box-shadow: 0px 0px 0px 12px rgba($shadow, 1);
        // -webkit-box-shadow: 0px 0px 0px 12px rgba(0, 0, 0, 0.1);
        // box-shadow: 0px 0px 0px 12px rgba(0, 0, 0, 0.1);
      }
    }
    h1 {
      font-size: 20px;
      color: #4f4f4f;
    }
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
      margin-top: 7px;
    }
  }
}

@-webkit-keyframes scaleIn {
  0% {
    -webkit-transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
@keyframes scaleIn {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
