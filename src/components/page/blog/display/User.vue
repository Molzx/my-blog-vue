<template>
  <v-row class="pa-4">
    <v-col
      class="wrapper-col"
      cols="12"
      lg="8"
      md="8"
      order-md="1"
      order-sm="1"
    >
      <!-- 时间线归档详情 -->
      <v-card class="shadow-1 fill-width">
        <!-- <v-img :src="spaceBg" :aspect-ratio="16 / 9">
          <v-card-title>空间</v-card-title>
        </v-img> -->
        <v-card-text class="pt-6">
          <v-row class="justify-center align-center no-gutters">
            <v-col cols="12" class="justify-center align-center">
              <v-img :src="spaceBg" height="200" contain></v-img>
            </v-col>
          </v-row>
        </v-card-text>
        <v-tabs optional centered slider-size="2" v-model="tab" class="mb-3">
          <v-tab
            class="left-tab"
            v-for="(item, i) in tabItems"
            :key="i"
            :to="isOwnerSpace ? item.toOwner : item.toOther"
          >
            <v-icon left :size="item.iconSize">{{
              item.to == tab ? item.iconSelected : item.iconNormal
            }}</v-icon>
            {{ isOwnerSpace ? item.textOwner : item.textOther }}
          </v-tab>
        </v-tabs>
      </v-card>
      <v-scale-transition mode="out-in" origin="center center">
        <router-view></router-view>
      </v-scale-transition>
    </v-col>
    <v-col
      class="wrapper-col"
      cols="12"
      lg="4"
      md="4"
      order-md="2"
      order-sm="2"
    >
      <page-blog-side-display
        :sideRecArticleItems="sideRecArticleItems"
        :sideCategoryItems="sideCategoryItems"
        :sideTagItems="sideTagItems"
        :sideNewArticleItems="sideNewArticleItems"
        :otherData="otherData"
      ></page-blog-side-display>
    </v-col>
  </v-row>
  <!-- <v-row class="pa-4 fill-height">
    <v-col cols="auto" class="pr-1">
      <v-card style="border-radius:8px" class="shadow-1  mb-6">
        <v-container style="height: 300px;min-width:230px;">
        </v-container>
      </v-card>
    </v-col>
    <v-col class="pl-1">
      <v-card style="border-radius:8px" class="shadow-1  mb-6">
          <v-tabs optional slider-size="3" v-model="tab">
            <v-tab
              class="left-tab"
              v-for="(item, i) in tabItems"
              :key="i"
              :to="isOwnerSpace ? item.toOwner : item.toOther"
            >
              <v-icon left :size="item.iconSize">{{
                item.to == tab ? item.iconSelected : item.iconNormal
              }}</v-icon>
              {{ isOwnerSpace ? item.textOwner : item.textOther }}
            </v-tab>
          </v-tabs>
        <v-scale-transition mode="out-in" origin="center center">
          <router-view></router-view>
        </v-scale-transition>
      </v-card>
    </v-col>
  </v-row> -->
</template>

<script>
import {
  reqSideRecArticleData,
  reqSideCategoryData,
  reqSideTagData,
  reqSideNewArticleData
} from '@/assets/js/blog'
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    //
  },
  data() {
    return {
      //
      sideRecArticleItems: [],
      sideCategoryItems: [],
      sideTagItems: [],
      sideNewArticleItems: [],
      otherData: {
        sideRecArticleLoading: true,
        sideCategoryLoading: true,
        sideTagLoading: true,
        sideNewArticleLoading: true,

        //展示顺序
        sideListOrder: [1, 2, 3, 4],
        //展示的组件
        sideListShow: [true, true, true, true],

        recordTotal: 0
      },
      tab: '',
      tabItems: [
        {
          toOwner: '/blog/users/owner/info',
          toOther: '/blog/users/other/info',
          iconNormal: 'iconfont icon-user1',
          iconSelected: 'iconfont icon-user1',
          iconSize: 20,
          textOwner: '我的资料',
          textOther: 'ta的资料'
        },
        {
          toOwner: '/blog/users/owner/likes',
          toOther: '/blog/users/other/likes',
          iconNormal: 'iconfont icon-hand-like',
          iconSelected: 'iconfont icon-hand-like',
          iconSize: 20,
          textOwner: '我的点赞',
          textOther: 'ta的点赞'
        },
        {
          toOwner: '/blog/users/owner/collects',
          toOther: '/blog/users/other/collects',
          iconNormal: 'iconfont icon-star',
          iconSelected: 'iconfont icon-star',
          iconSize: 20,
          textOwner: '我的收藏',
          textOther: 'ta的收藏'
        },
        {
          toOwner: '/blog/users/owner/comments',
          toOther: '/blog/users/other/comments',
          iconNormal: 'iconfont icon-message1',
          iconSelected: 'iconfont icon-message1',
          iconSize: 20,
          textOwner: '我的评论',
          textOther: 'ta的评论'
        }
      ],

      // spaceBg: require('@/assets/images/bg/wallhaven-yjeo2d.jpg')
      spaceBg: require('@/assets/images/workspace.svg')
    }
  },
  mounted() {
    //

    this.requireData()
  },
  methods: {
    //
    requireData() {
      reqSideRecArticleData(this)
      reqSideCategoryData(this)
      reqSideTagData(this)
      reqSideNewArticleData(this)
    }
  },
  computed: {
    //
    ...mapGetters({
      getUseUserId: 'getUseUserIdFun',
      //获取基础头像，昵称
      getBaseUserInfo: 'getBaseUserInfoFun'
    }),
    //是否为个人信息
    isOwnerSpace() {
      let flag = this.$route.fullPath.indexOf('/blog/users/owner') != -1
      return flag
    },
    color() {
      switch (this.bottomNav) {
        case 0:
          return 'blue-grey'
        case 1:
          return 'teal'
        case 2:
          return 'brown'
        case 3:
          return 'indigo'
        default:
          return 'indigo'
      }
    }
  },
  watch: {
    //
    // tab(newVal) {
    //   console.log(newVal)
    // }
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped>
/*  */
/deep/ .theme--light.v-tabs > .v-tabs-bar .v-tab--disabled,
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active),
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon {
  color: #6c6c6c !important;
}
.left-tab {
  color: #4f4f4f;
  justify-content: start !important;
}
//未选中hover
.theme--light.v-tabs .v-tab:hover::before {
  opacity: 0.04;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
//选中
.v-tab--active.v-tab:not(:focus)::before {
  // opacity: 0.12;
  // border-top-right-radius: 6px;
  // border-bottom-right-radius: 6px;
}
</style>
