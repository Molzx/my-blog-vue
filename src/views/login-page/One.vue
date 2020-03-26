<!--
 * @description: Something
 * @Version: 0.1
 * @Autor: xuzhenghao
 * @LastEditors  : xuzhenghao
 -->
<template>
  <v-row class="ma-auto" align="center" justify="center">
    <div class="login-container" :class="classFlag ? 'right-panel-active' : ''">
      <div class="form-container sign-up-container">
        <form action="#">
          <div ref="formHeader" class="mx-n3">
            <h1 class="mb-6">注册</h1>
            <p class="text-center ma-0">
              <a
                :disabled="regViewIndex == 0"
                @click="setRegPhone"
                class="caption"
                :class="regViewIndex == 0 ? 'a-disabled' : ''"
                >手机号码注册
              </a>
              <span> | </span>
              <a
                :disabled="regViewIndex == 1"
                @click="setRegEmail"
                class="caption"
                :class="regViewIndex == 1 ? 'a-disabled' : ''"
                >邮箱注册
              </a>
            </p>
          </div>
          <transition name="component-scale" mode="out-in">
            <page-login-reg-phone
              v-if="regViewIndex == 0"
            ></page-login-reg-phone>
            <page-login-reg-email v-else></page-login-reg-email>
          </transition>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#">
          <div ref="form">
            <div ref="formHeader" class="mx-n3">
              <h1 class="mb-6">登录</h1>
              <!-- <div class="social-container">
                <a href="#" class="social">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social">
                  <i class="fab fa-google-plus-g"></i>
                </a>
                <a href="#" class="social">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div> -->
              <!-- <span>默认登录方式</span> -->
              <p class="text-center ma-0">
                <a
                  :disabled="loginViewIndex == 0"
                  @click="setLoginDefault"
                  class="caption"
                  :class="loginViewIndex == 0 ? 'a-disabled' : ''"
                  >帐号密码登录
                </a>
                <span> | </span>
                <a
                  :disabled="loginViewIndex == 1"
                  @click="setLoginPhone"
                  class="caption"
                  :class="loginViewIndex == 1 ? 'a-disabled' : ''"
                  >手机登录
                </a>
                <span> | </span>
                <a
                  :disabled="loginViewIndex == 2"
                  @click="setLoginEmail"
                  class="caption"
                  :class="loginViewIndex == 2 ? 'a-disabled' : ''"
                  >邮箱登录
                </a>
                <!-- <span> | </!-->
                <!-- <span> | 手机登录 | 邮箱登录</span> -->
              </p>
            </div>

            <v-layout ref="component" row wrap>
              <transition name="component-scale" mode="out-in">
                <component
                  :is="view"
                  :data="data"
                  @commit="getSonData"
                ></component>
              </transition>
            </v-layout>
          </div>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="wrap-mask">
            <div class="overlay-panel overlay-left">
              <h1>欢迎回来！</h1>
              <p class="mb-0">已经拥有帐号了吗？</p>
              <p>
                快回来，我们一起学习交流吧！
              </p>
              <a class="btn btn-1" @click="changeClass('signIn')">
                <svg>
                  <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                登录
              </a>
              <!-- <button class="my-button ghost" @click="changeClass('signIn')">
                  Sign In
              </button>-->
            </div>
            <div class="overlay-panel overlay-right">
              <h1>朋友，你好！</h1>
              <p class="mb-0">还没有帐号吗？</p>
              <p>快来创建帐号，加入博客吧！</p>
              <a class="btn btn-1" @click="changeClass('signUp')">
                <svg>
                  <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                注册
              </a>
              <!-- <button
                  class="my-button ghost"
                  @click="changeClass"
                  id="signUp"
                >
                  Sign Up
              </button>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-row>
</template>

<script>
// import Veloity from 'velocity-animate'
// import { TweenLite } from 'gsap'
import { TweenLite } from '@common/tweenmax/all'
// import LoginDefault from '@views/login-page/Default'
// import LoginPhone from '@views/login-page/Phone'
// import LoginEmail from '@views/login-page/Email'
export default {
  name: 'login-one',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      containerClass: 'login-container',
      activedClass: 'right-panel-active',
      classFlag: false,
      formFlag: true,
      singIn: false,
      singUp: false,

      view: 'page-login-default',
      loginType: 'default',
      loginViewIndex: 0,
      regViewIndex: 0,

      fadeInDuration: 1600,
      fadeOutDuration: 1600,
      formHeight: 0,

      //发送到子组件的数据
      data: '发送到子组件的数据'
    }
  },
  computed: {},
  watch: {},
  methods: {
    getSonData() {},
    changeClass: function(type) {
      console.log('don')
      if (type === 'signIn') {
        this.classFlag = false
      } else {
        this.classFlag = true
      }
    },
    formAnim(small) {
      const form = this.$refs.form
      if (small) {
        TweenLite.to([form], 0.6, { height: '-=68', onComplete: function() {} })
      } else {
        TweenLite.to([form], 0.6, { height: '+=68', onComplete: function() {} })
      }
    },
    setLoginDefault() {
      this.loginViewIndex = 0

      this.view = 'page-login-default'
      this.formAnim(false)
    },
    setLoginPhone() {
      this.loginViewIndex = 1

      const flag = this.view == 'page-login-default'
      this.view = 'page-login-phone'
      if (flag) {
        this.formAnim(true)
      }
    },
    setLoginEmail() {
      this.loginViewIndex = 2

      const flag = this.view == 'page-login-default'
      this.view = 'page-login-email'
      if (flag) {
        this.formAnim(true)
      }
    },
    setRegPhone() {
      this.regViewIndex = 0
    },
    setRegEmail() {
      console.log('inn')
      this.regViewIndex = 1
    },
    changeLoginPhone: function() {
      const _this = this
      const form = this.$refs.form
      const flag = _this.view == 'page-login-default'
      if (flag) {
        _this.view = 'page-login-phone'
        _this.loginType = 'phone'
        this.loginViewIndex = 1
      } else {
        _this.view = 'page-login-default'
        _this.loginType = 'default'
        this.loginViewIndex = 0
      }
      this.formAnim(flag)
      console.log('hn')
      // const formHeader = this.$refs.formHeader
      // const form = this.$refs.component
      console.log(form.offsetHeight)
      // TweenLite.from([form], 3.4, { height: 444 ,
      // onComplete: function() {

      // }})
      this.$nextTick(() => {
        console.log('h')
        const form = this.$refs.form
        // const form = this.$refs.component
        console.log(form.offsetHeight)
        // console.log(form.$el.offsetHeight)

        // this.formHeight = form
      })
    },
    changeLoginEmail: function() {
      const flag = this.view == 'page-login-default'
      if (flag) {
        this.view = 'page-login-email'
        this.loginType = 'email'
        this.loginViewIndex = 2
      } else {
        this.view = 'page-login-default'
        this.loginType = 'default'
        this.loginViewIndex = 0
      }
      this.formAnim(flag)
    },
    // 动画
    beforeEnter: function(el) {
      console.log('beforeEnter')
      el.style.opacity = 1
      el.style.marginTop = -this.formHeight
      // el.style.transformOrigin = 'top'
      // el.style.transform.origin: 0% 0%;
    },
    enter: function(el, done) {
      console.log('enter')
      // el.style.display = 'block'
      // var vm = this
      TweenLite.to(el, 10.4, {
        x: -20,
        autoAlpha: 0,
        onComplete: function() {
          done()
        }
      })
      // Velocity(
      //   el,
      //   {
      //     opacity: 1
      //     // scale: [1, 0.7]
      //     // translateX: [0, 200]
      //   },
      //   {
      //     delay: 1600,
      //     // easing: 'swing',
      //     duration: this.fadeInDuration,
      //     complete: function() {
      //       done()
      //     }
      //   }
      // )
    },
    beforeLeave: function(el) {
      console.log('beforeLeave')
      el.style.opacity = 1

      // el.style.transform.origin: 0% 0%;
    },
    afterEnter: function() {
      console.log('afterEnter')
      // el.style.opacity = 1
      // el.style.transform.origin: 0% 0%;
    },
    afterLeave: function() {
      console.log('afterLeave')
      // el.style.opacity = 1
      // el.style.transform.origin: 0% 0%;
    },
    leave: function(el, done) {
      console.log('leave')

      // var vm = this
      // var _el = el

      TweenLite.to(el, 10.4, {
        x: -20,
        autoAlpha: 0,
        onComplete: function() {
          done()
        }
      })
      // Velocity(
      //   el,
      //   {
      //     opacity: 0
      //     // scale: [0.7, 1]
      //     // translateX: [200, 0]
      //   },
      //   {
      //     duration: this.fadeOutDuration,
      //     complete: function() {
      //       _el.style.display = 'none'
      //       done()
      //       vm.formHeaderShow = true
      //     }
      //   }
      // )
    }
  },
  components: {
    // 'login-default': LoginDefault,
    // 'login-phone': LoginPhone,
    // 'login-email': LoginEmail
  },
  created: function() {
    // this.$store.dispatch('changeRouter', '测试')
  },
  mounted: function() {
    // this.formHeaderShow = false
  }
}
</script>
<style lang="scss" src="@styles/btn.scss" scoped></style>
<style lang="scss" src="@styles/login.scss" scoped></style>

<style lang="scss" scoped>
.a-disabled {
  pointer-events: none;
  color: #343434;
}
</style>
