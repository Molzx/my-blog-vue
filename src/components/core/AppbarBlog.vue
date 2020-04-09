<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-08 10:44:30
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-09 17:50:18
 * @FilePath     : \VueProjects\my-blog\src\components\core\AppbarBlog.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-scale-transition>
    <v-app-bar
      color="white"
      class="shadow-nav__top mx-auto b-appbar"
      light
      absolute
      app
      scroll-target="#scrolling-1"
    >
      <v-layout row wrap align-center fill-height class="mx-12">
        <router-link to="/blog">
          <img height="50" src="../../assets/images/logo.svg" />
        </router-link>
        <!-- <core-navmenu
        :shadow="navMenuShadow"
        :active="activeNavMenu"
      ></core-navmenu> -->

        <section class="menu-bar">
          <nav
            class="link-effect-14 light ml-3"
            id="link-effect-14"
            ref="navBar"
          >
            <template v-for="(item, i) in navLinks">
              <router-link
                :key="i"
                :class="activeNavIndex === i ? 'current' : ''"
                style="opacity:0;"
                :to="item.link"
                :data-hover="item.text"
              >
                <span>
                  {{ item.text }}
                </span>
              </router-link>
            </template>
          </nav>
        </section>
        <!-- <div class="menu-bar light">
          <ul class="menu-bar-1" ref="menuBar">
            <li
              v-for="(item, i) in navLinks"
              :key="i"
              :class="activeNavIndex === i ? 'current' : ''"
              style="opacity:0;"
            >
              <router-link :to="item.link" :data-hover="item.text">{{
                item.text
              }}</router-link>
            </li>
          </ul>
        </div> -->
        <!-- <v-btn @click="switchTheme" ref="switch">theme</v-btn> -->
        <v-spacer></v-spacer>
        <v-responsive
          ref="searchContainer"
          :max-width="searchWidth"
          class="transition-swing"
        >
          <v-text-field
            v-model="search"
            append-icon="search"
            label="搜索..."
            single-line
            hide-details
            dense
            solo
            flat
            rounded
            background-color="#f5f5f5"
            @focus="searchWidth = 200"
            @blur="searchWidth = 130"
            @click:append="startSearch"
            @keydown.enter="startSearch"
          ></v-text-field>
        </v-responsive>
        <div class=" ml-5">
          <!-- <v-avatar size="38" @click="toUserInfo">
            <img :src="previewAvatar" alt="John" />
          </v-avatar> -->
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
              <v-avatar size="38" class="avatar-shadow" v-on="on">
                <img :src="$isLogin() ? previewAvatar : unloginAvatar" />
                <!-- :alt="isLogin ? getBaseUserInfo.nickName : '奶茬-未登录用户'" -->
              </v-avatar>
            </template>

            <v-card class="shadow-1">
              <v-list nav dense>
                <v-list-item-group color="primary" v-model="menu">
                  <template v-for="(item, i) in menuItems">
                    <v-list-item
                      :key="i"
                      v-if="showMenuItem(item) && item.to"
                      :to="item.to"
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
                    <v-list-item
                      :key="i"
                      v-if="showMenuItem(item) && !item.to"
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
          <!-- <router-link to="/login" class="nav-link"> 登录</router-link> -->
          <!-- <router-link
            to="/blog/users/info"
            @click.native="setUseUserId('')"
            class="nav-link"
          >
            大牛</router-link
          > -->
        </div>
      </v-layout>
    </v-app-bar>
  </v-scale-transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { TimelineLite, Sine } from '@common/tweenmax/all'
export default {
  data() {
    return {
      //NavMenu相关
      activeNavMenu: 0,
      navMenuShadow: false,

      search: '',
      searchWidth: 130,

      navLinks: [
        {
          text: '首页',
          link: '/blog/home'
        },
        {
          text: '时间线',
          link: '/blog/archives'
        },
        {
          text: '分类',
          link: '/blog/categories'
        },
        {
          text: '标签',
          link: '/blog/tags'
        },
        {
          text: '共享',
          link: '/blog/shares'
        },
        {
          text: '公告',
          link: '/blog/announcements'
        },
        {
          text: '关于',
          link: '/blog/about'
        },
        {
          text: '测试',
          link: '/blog/test'
        }
      ],
      activeNavIndex: 0,
      unloginAvatar: require('@/assets/images/avatar/unlogin_avatar_32.svg'),
      previewAvatar: require('@/assets/images/avatar/avatar.svg'),

      menu: 999,
      menuItems: [
        {
          name: 'userInfo',
          //是否登录后才显示
          needLogin: true,
          text: '个人中心',
          icon: 'iconfont icon-user1',
          to: '/blog/users/owner'
        },
        {
          name: 'system',
          needLogin: true,
          needAdmin: true,
          text: '后台管理',
          icon: 'iconfont icon-dashboard',
          to: '/system'
        },
        {
          name: 'login',
          needLogin: false,
          text: '登录',
          icon: 'iconfont icon-login'
        },
        {
          name: 'logout',
          needLogin: true,
          text: '注销',
          icon: 'iconfont icon-loguot'
        }
      ]
    }
  },
  created() {
    // this.activeNavIndex = this.getActiveBlogPageIndex

    let linkTo = this.$route.fullPath
    this.setActiveNavBarItem(linkTo)
  },
  mounted() {
    this.initNavBarAnim()
    this.initBaseUserInfo()
  },
  methods: {
    ...mapActions({
      setActiveBlogPageIndex: 'setActiveBlogPageIndexFun',
      //设置使用的用户id
      setUseUserId: 'setUseUserIdFun',
      //设置基本用户信息
      setBaseUserInfo: 'setBaseUserInfoFun',
      //设置登录用户信息
      setUserInfo: 'setUserInfoFun',
      //设置登录状态token
      setLoginStatus: 'setLoginStatusFun'
    }),
    initNavBarAnim() {
      let navList = this.$refs.navBar.children

      let tl = new TimelineLite()

      tl.staggerFromTo(
        navList,
        0.2,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: Sine.easeInOut },
        0.2
      )
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
        //如果用户未登录，且跳转到个人中心，返回首页
        if (this.isOwnerSpace) {
          this.$router.push('/blog/home')
        }
      }
    },
    clickMenu(name) {
      switch (name) {
        case 'userInfo':
          this.toUserInfo()
          break
        case 'login':
          this.toLoginIn()
          break
        case 'logout':
          this.toLogOut()
          break
        default:
          break
      }
    },
    startSearch() {
      if (this.search) {
        //搜索
        let param = {
          search: this.search
        }
        this.$router.push({ path: '/blog/search', query: param })
        this.search = ''
      }
    },
    toLoginIn() {
      //登录
      console.log('登录')
      this.$toLogin()
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
      // this.setUseUserId()
      if (!this.isOwnerSpace) {
        this.menu = 0
        this.$router.push('/blog/users/owner/info')
      }
    },
    requireBaseUserInfo() {
      // let vm = this
      // setTimeout(() => {
      //   this.$api.user
      //     .toGetLessInfo()
      //     .then(res => {
      //       let data = res.data.extend.data
      //       vm.setBaseUserInfo(data)
      //     })
      //     .catch(() => {
      //       //
      //     })
      // }, 0)
    },
    setActiveNavBarItem(linkTo) {
      this.activeNavIndex = -1
      for (var i = 0, len = this.navLinks.length; i < len; i++) {
        let item = this.navLinks[i]
        if (item.link === linkTo) {
          this.activeNavIndex = i
          break
        }
      }
    }
  },
  components: {},
  computed: {
    ...mapGetters({
      getActiveBlogPageIndex: 'getActiveBlogPageIndexFun',
      //判断是否本地有token ，有返回 true
      // isLogin: 'getLoginStatusFun',
      //获取基础头像，昵称
      getBaseUserInfo: 'getBaseUserInfoFun'
    }),
    isOwnerSpace() {
      let flag = this.$route.fullPath.indexOf('/blog/users/owner') != -1
      return flag
    },
    //计算展示的菜单选项
    showMenuItem() {
      return function(item) {
        let show = true
        //判断是否需要管理员才显示
        if (item.needAdmin) {
          //只有当登录了，而且是管理员才显示
          show = this.$isLogin() && this.$isAdmin()
        } else {
          //判断是否需要登录才显示
          if (item.needLogin) {
            //只有当登录了才显示
            show = this.$isLogin()
          }
        }
        return show
      }
    }
  },
  watch: {
    $route(to) {
      let linkTo = to.fullPath
      // let linkFrom = from.fullPath
      // console.log(linkTo)
      // console.log(from)
      // this.activeNavIndex = -1
      // for (var i = 0, len = this.navLinks.length; i < len; i++) {
      //   let item = this.navLinks[i]
      //   if (item.link === linkTo) {
      //     this.activeNavIndex = i
      //     break
      //   }
      // }
      this.setActiveNavBarItem(linkTo)
      this.setActiveBlogPageIndex(this.activeNavIndex)
    },

    'getBaseUserInfo.avatar': {
      // eslint-disable-next-line no-unused-vars
      handler(newVal) {
        //头像修改
        if (newVal) {
          this.previewAvatar = this.$avatar(newVal)
        }
      },
      immediate: true
    }
  }
}
// <style lang="scss" scoped src="@styles/blog/_menu_bar.scss"></style>
</script>

<style lang="scss" scoped src="@styles/blog/link_hover.scss"></style>

<style lang="scss" scoped>
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
