<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-04-05 22:01:36
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-06 23:53:04
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\Detail\About.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div>
    <v-card
      class="shadow-1 fill-width profile-card mb-4"
      style="border-radius:12px"
    >
      <v-card-text>
        <v-alert text dense color="grey" border="left" max-width="90">
          关于我
        </v-alert>
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
            <p class="content__name">NaiCha</p>

            <p class="content__txt">
              开发者
            </p>

            <p class="content-loc">
              <span class="content-loc__icon">
                <v-icon color="icon-color">iconfont icon-youjianxinjian</v-icon>
              </span>

              <span class="content-loc__txt">
                wahahanaicha@outlook.com
              </span>
            </p>
            <div class="space-line __w95"></div>
            <v-alert color="white" transition="scale-transition" class="mb-0">
              <span class="content-loc__txt">
                Hello，我是Naicha，一个正在启程的后端攻城狮，作为一个新人，不得不说，需要学习的内容
                还有很多，仍需要不断学习新的知识，充实自我，思考个人的人生道路。如果你也和我一样，都是在学习提升自我，欢迎联系我，进行学习交流。
              </span>
            </v-alert>
          </header>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card
      class="shadow-1 fill-width profile-card mb-4"
      style="border-radius:12px"
    >
      <v-card-text>
        <v-alert text dense color="grey" border="left" max-width="120">
          关于博客
        </v-alert>
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
        <div class="space-line __w95"></div>
        <v-row align="center" justify="center">
          <header>
            <v-alert
              color="white"
              transition="scale-transition"
              class="mb-0"
              style="text-align:start"
            >
              <!-- <span class="content-loc__txt ">
                <span class="">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                
                <br />
                &ensp;&ensp;
              </span> -->
              <p class="content-loc__txt ">
                <span class="ml-9"></span>
                建立此博客的初衷是为了“记录”和“交流”，记录即：记录学习到知识点，记录学习碰到的问题，记录当下的想法与思考。
                交流即：探讨技术，探讨人生。而在建立博客的过程中，也加深了我对前后端的理解。
              </p>
              <p class="content-loc__txt ">
                <span class="ml-9"></span>
                需要注意的是：博客中的论述，知识点的总结都是我个人的想法，可能存在不恰当的地方，所以仅供参考，错误之处，还请指正。希望你在此博客有所收获
                : )
              </p>
              <p class="content-loc__txt mb-0">
                <span class="ml-9"></span>
                本博客采用前后端分离的架构方式，在技术方面，后端采用的有SpringBoot
                + SpringSecurity + MyBatisPlus + Redis + MySQL，前端用到的是 Vue
                + Vuetify 。目前博客并不是响应式的，有待优化。
              </p>
            </v-alert>
            <!-- <v-alert color="white" transition="scale-transition" class="mb-0">
              <span class="content-loc__txt">
                &ensp;&ensp;
              </span>
            </v-alert> -->
          </header>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="shadow-1 fill-width profile-card" style="border-radius:12px">
      <v-card-text>
        <v-container>
          <v-row align="center" justify="center" class="">
            <v-col cols="3">
              <div class="space-line shu">
                <div class="d-flex justify-center">
                  <v-avatar color="orange" size="78">
                    <v-icon size="40" color="white">
                      iconfont icon-lianjie
                    </v-icon>
                  </v-avatar>
                </div>
                <div
                  class="d-flex justify-center my-4"
                  style="color:rgb(170, 148, 148);"
                >
                  友情链接
                </div>
              </div>
            </v-col>
            <v-col cols="9">
              <template v-for="(item, i) in links">
                <v-row
                  :key="i"
                  align="center"
                  justify="start"
                  class="ml-1 mb-3"
                >
                  <a
                    @click="toWebSite(item.link)"
                    class="social-buttons__button social-button social-button--facebook"
                    :class="item.class"
                    :aria-label="item.label"
                    style="z-index:4;"
                  >
                    <span class="social-button__inner">
                      <i :class="item.icon"></i>
                    </span>
                  </a>
                  <!-- <v-avatar color="white" size="48" style="z-index:4;">
                    <v-icon size="24" color="rgb(170, 148, 148)">
                      iconfont icon-lianjie
                    </v-icon>
                  </v-avatar> -->
                  <v-chip
                    class="ml-n5 link-chip"
                    color="teal lighten-5 teal--text"
                    @click="toWebSite(item.link)"
                  >
                    <span class="ml-3" style="margin-right:60px;">{{
                      item.link_desc
                    }}</span>

                    <v-chip
                      class="link-chip__end"
                      color="blue lighten-5 blue--text"
                      @click="toWebSite(item.link_home)"
                    >
                      <span style="">{{ item.link_home_desc }}</span>
                    </v-chip>
                  </v-chip>
                </v-row>
              </template>
            </v-col>
          </v-row>
        </v-container>
        <!-- <div class="space-line"></div> -->
      </v-card-text>
    </v-card>
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
      links: [
        {
          link: 'https://github.com/Molzx',
          link_desc: '我的Github',
          link_home: 'https://github.com',
          link_home_desc: 'github.com',
          class: 'social-button--github',
          label: 'GitHub',
          icon: 'fab fa-github'
        },
        {
          link: 'https://gitee.com/wahahanaicha',
          link_desc: '我的Gitee',
          link_home: 'https://gitee.com',
          link_home_desc: 'gitee.com',
          class: 'social-button--gitee',
          label: 'Gitee',
          icon: 'iconfont icon-mayun'
        },
        {
          link: 'https://codepen.io/molzx',
          link_desc: '我的Codepen',
          link_home: 'https://codepen.io',
          link_home_desc: 'codepen.io',
          class: 'social-button--codepen',
          label: 'CodePen',
          icon: 'fab fa-codepen'
        },
        {
          link: 'https://blog.csdn.net/Molzx',
          link_desc: '我的CSDN',
          link_home: 'https://blog.csdn.net',
          link_home_desc: 'blog.csdn.net',
          class: 'social-button--red',
          label: 'CSDN',
          icon: 'iconfont icon-csdn'
        }
        // {
        //   link: '',
        //   link_desc: '',
        //   link_home: '',
        //   link_home_desc: ''
        // }
      ],

      avatarBg: require('@/assets/images/avatar/myavatar.svg')
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    toWebSite(link) {
      window.open(link, '_blank').location
      // window.location.href = link
    }
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

<style lang="scss" scoped src="@styles/blog/social_icon_2.scss"></style>
<style lang="scss" scoped>
/*  */
.social-buttons__button {
  margin: 0 !important;
}
.social-button__inner {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05), 0 0 1px rgba(0, 0, 0, 0.1) !important;
}
.link-chip {
  /deep/ &.v-chip {
    padding-right: 0px !important;
  }
  /deep/ .link-chip__end.v-chip.v-size--default {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
}
.space-line {
  width: 100% !important;
  margin: auto;
  padding: 4px 0;
  border-bottom: 2px dashed #eeeeee;
  &.shu {
    height: 100% !important;
    padding: 0 4px;
    border-bottom: none;
    border-right: 2px dashed #eeeeee;
    &__left {
      border-left: 2px dashed #eeeeee;
    }
  }
  &.__w95 {
    width: 95% !important;
  }
  &.__w90 {
    width: 90% !important;
  }
  &.__w80 {
    width: 80% !important;
  }
  &.__w50 {
    width: 50% !important;
  }
}
.profile-card {
  header {
    width: 95%;
    // width: 179px;
    // height: 280px;
    // padding: 40px 20px 30px 20px;
    display: inline-block;
    // float: left;
    // border-bottom: 2px dashed #eeeeee;
    background: #ffffff;
    color: #4f4f4f;
    margin-top: 10px;
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
          #324e63 0%,
          #324e63 50%,
          #ffc107 50%,
          #ffc107 100%
        );
        background: linear-gradient(
          #324e63 0%,
          #324e63 50%,
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
    .content {
      &__name {
        font-weight: 700;
        font-size: 24px;
        color: #43474b;
        margin-bottom: 18px;
      }

      &__txt {
        font-size: 18px;
        font-weight: 500;
        color: #324e63;
        margin-bottom: 15px;

        strong {
          //color: #ff2846;
          font-weight: 700;
        }
      }

      &-loc {
        display: flex;
        justify-content: center;
        align-items: center;
        // font-size: 18px;
        // font-weight: 600;

        &__icon {
          display: inline-flex;
          font-size: 27px;
          margin-right: 10px;
          font-weight: 600;
          //color: #6944ff;
        }
        &__txt {
          color: #6c6c6c;
          // font-size: 18px;
        }
      }
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
