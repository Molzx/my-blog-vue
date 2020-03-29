<template>
  <v-app-bar
    height="60"
    app
    clipped-left
    scroll-target="#scrolling-system"
    class="appbar"
  >
    <div class="appbar__logo d-flex align-center">
      <v-btn
        icon
        color="icon-color"
        class="nav-btn mr-2"
        @click="clickOpenDrawer"
      >
        <v-scale-transition mode="out-in" origin="center center">
          <v-icon size="18" :key="getNavIcon">{{ getNavIcon }}</v-icon>
        </v-scale-transition>
      </v-btn>
      <router-link to="/system">
        <img height="50" src="../../assets/images/logo.svg" />
      </router-link>
    </div>
    <v-spacer></v-spacer></v-spacer>
    <div class="d-flex align-end justify-end">
      <v-avatar size="38" class="avatar-shadow">
        <img :src="previewAvatar" />
        <!-- :alt="isLogin ? getBaseUserInfo.nickName : '奶茬-未登录用户'" -->
      </v-avatar>
    </div>
    <!-- <div class="wrapper">
      <div class="top-navbar">
        <div class="logo">
          <a href="#">Nai Cha</a>
        </div>
        <div class="top-menu">
          <div class="home-link">
            <a href="#">
              <span class="icon"><i class="fas fa-home"></i></span>
              <span>Home</span>
            </a>
          </div>
          <v-spacer></v-spacer>
          <div class="right-info">
            <div class="test">nihao</div>
            <div class="icon-wrap">
              <div class="icon">
                <i class="fas fa-bell"></i>
              </div>
            </div>
            <div class="icon-wrap">
              <div class="icon">
                <i class="fas fa-cog"></i>
              </div>
            </div>
          </div>
          <v-avatar size="40">
            <img :src="imgUrl" alt="John" />
          </v-avatar>
        </div>
      </div>
    </div> -->
  </v-app-bar>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    //
  },
  data() {
    return {
      //
      previewAvatar: require('@/assets/images/avatar/avatar.svg')
    }
  },
  mounted() {
    //
    this.initBaseUserInfo()
  },
  methods: {
    //
    ...mapActions({
      //设置侧边抽屉状态
      changeOpenDrawer: 'changeOpenDrawerFun',
      //设置基本用户信息
      setBaseUserInfo: 'setBaseUserInfoFun'
    }),
    clickOpenDrawer() {
      //更改抽屉状态
      this.changeOpenDrawer()
    },
    initBaseUserInfo() {
      //如果用户已登录
      if (this.$isLogin()) {
        //如果头像信息为空
        let info = this.getBaseUserInfo
        if (!info) {
          this.requireBaseUserInfo()
        }
      } else {
        //如果用户未登录，跳转到登陆
        this.$toLogin()
      }
    },
    requireBaseUserInfo() {
      let vm = this
      setTimeout(() => {
        this.$api.user
          .toGetLessInfo()
          .then(res => {
            let data = res.data.extend.data

            vm.setBaseUserInfo(data)
          })
          .catch(() => {
            //
          })
      }, 0)
    },
    toLogOut() {
      //注销
      console.log('注销')
      //注销后跳回首页
      this.$toLogout()
    }
  },
  computed: {
    //
    ...mapGetters({
      //获取抽屉状态
      getOpenDrawer: 'getOpenDrawerFun',
      //获取基础头像，昵称
      getBaseUserInfo: 'getBaseUserInfoFun'
    }),
    getNavIcon() {
      return this.getOpenDrawer ? 'fas fa-outdent' : 'fas fa-indent'
    }
  },
  watch: {
    //
    'getBaseUserInfo.avatar': {
      // eslint-disable-next-line no-unused-vars
      handler(newVal) {
        //头像修改
        console.log(newVal)
        if (newVal) {
          this.previewAvatar = this.$avatar(newVal)
        }
      },
      immediate: true
    }
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped>
/*  */
.nav-btn {
  background-color: #f5f5f5 !important;
  width: 40px !important;
  height: 40px !important;
}
</style>
