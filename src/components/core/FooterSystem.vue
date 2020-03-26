<template>
  <v-footer color="" app inset padless height="60" class="appbar"> </v-footer>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'
export default {
  name: '',
  props: {
    //
  },
  data() {
    return {
      //
      unloginAvatar: require('@/assets/images/avatar/unlogin_avatar_32.svg'),
      previewAvatar: require('@/assets/images/avatar/avatar.svg')
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    ...mapActions({
      //设置抽屉开启状态
      setDrawerOpen: 'setDrawerOpenFun',
      //设置基本用户信息
      setBaseUserInfo: 'setBaseUserInfoFun',
      //设置登录用户信息
      setUserInfo: 'setUserInfoFun',
      //设置登录状态token
      setLoginStatus: 'setLoginStatusFun'
    }),
    changeDrawerStatus() {
      let open = this.getDrawerOpen
      this.setDrawerOpen(!open)
    },
    clickHamburger() {
      //
    }
  },
  computed: {
    //
    ...mapGetters({
      //获取抽屉开启状态
      getDrawerOpen: 'getDrawerOpenFun',
      //判断是否本地有token ，有返回 true
      isLogin: 'getLoginStatusFun',
      //获取基础头像，昵称
      getBaseUserInfo: 'getBaseUserInfoFun'
    })
  },
  watch: {
    //
    'getBaseUserInfo.avatar': {
      // eslint-disable-next-line no-unused-vars
      handler(newVal) {
        //头像修改
        // console.log(newVal)
        // if (newVal) {
        //   this.previewAvatar = this.$global.preview + newVal
        // }
        this.previewAvatar = this.$avatar(newVal)
      },
      immediate: true
    }
  },
  components: {
    //
  }
}
</script>
<style lang="scss" src="@styles/other/hamburger.scss" scoped></style>

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
  color: #555555 !important;
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
