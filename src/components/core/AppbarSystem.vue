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
    <div class="d-flex align-center">
      <v-btn depressed color="light-blue lighten-5 blue--text">
        <v-icon left>fas fa-home</v-icon>
        主页
      </v-btn>
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex align-center justify-end">
      <v-menu
        open-on-hover
        close-delay="200"
        :close-on-content-click="true"
        :nudge-width="100"
        offset-y
        :nudge-bottom="20"
        content-class="appbar-menu-class"
        origin="top center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-avatar size="38" class="avatar-shadow mr-4" v-on="on">
            <img :src="previewAvatar" />
            <!-- :alt="isLogin ? getBaseUserInfo.nickName : '奶茬-未登录用户'" -->
          </v-avatar>
        </template>

        <v-card class="shadow-1">
          <v-list nav dense>
            <v-list-item-group color="primary">
              <template v-for="(item, i) in menuItems">
                <v-list-item :key="i" v-if="item.to" :to="item.to">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="item.text"
                      class="appbar-menu-title"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  :key="i"
                  v-if="!item.to"
                  @click="clickMenu(item.name)"
                >
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="item.text"
                      class="appbar-menu-title"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
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
      previewAvatar: require('@/assets/images/avatar/avatar.svg'),

      menuItems: [
        {
          name: 'userInfo',
          text: '个人中心',
          icon: 'fas fa-house-user',
          to: '/blog/users/owner'
        },
        { name: 'logout', text: '注销', icon: 'fas fa-sign-out-alt' }
      ]
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
    clickMenu(name) {
      switch (name) {
        case 'userInfo':
          this.toUserInfo()
          break
        case 'logout':
          this.toLogOut()
          break
        default:
          break
      }
    },
    toLogOut() {
      //注销
      console.log('注销')
      //注销后跳回首页
      this.$toLogout()
    },
    toUserInfo() {
      //个人中心
      console.log('个人中心')
      this.$router.push('/blog/users/owner/info')
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
.btn-logout {
  background-color: #f5f5f5 !important;
  color: #6c6c6c;
}

.avatar-shadow {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1) !important;
  &:hover {
    box-shadow: none;
    // box-shadow: 0 30px 50px -20px rgba(14, 0, 47, 0.21) !important;
  }
}
.avatar-hover {
  box-shadow: 0 8px 16px 0 rgba(28, 31, 33, 0.1) !important;
}
.appbar-menu-class {
  box-shadow: 0 8px 16px 0 rgba(28, 31, 33, 0.1) !important;
}

.appbar-menu-title {
  color: #6c6c6c !important;
  font-size: 0.86rem !important;
}
.appbar-menu-class /deep/ .v-icon.v-icon {
  font-size: 1.3rem !important;
}
/deep/
  .v-application--is-ltr
  .appbar-menu-class
  .v-list-item__action:first-child,
.v-application--is-ltr .appbar-menu-class .v-list-item__icon:first-child {
  margin-right: 16px !important;
}
</style>
