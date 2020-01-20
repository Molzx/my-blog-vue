<!--
 * @description: Something
 * @Version: 0.1
 * @Autor: xuzhenghao
 * @LastEditors  : xuzhenghao
 -->
<template>
  <div class="body">
    <div class="container" :class="classFlag ? 'right-panel-active' : ''">
      <div class="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <div class="social-container">
            <a href="#" class="social">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social">
              <i class="fab fa-google-plus-g"></i>
            </a>
            <a href="#" class="social">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#">
          <div ref="form">
            <div ref="formHeader">
              <h1>Sign in</h1>
              <div class="social-container">
                <a href="#" class="social">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social">
                  <i class="fab fa-google-plus-g"></i>
                </a>
                <a href="#" class="social">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a ref="loginlink" @click="changeLoginPhone" class="social">
                  <i class="iconfont icon-phone"></i>
                </a>
                <a @click="changeLoginEmail" class="social">
                  <i class="fas fa-at"></i>
                </a>
              </div>
              <span>or use your account</span>
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
          <!-- <transition 
              v-bind:css="false"
              @before-enter="beforeEnter"
              @enter="enter"
              @before-leave="beforeLeave"
              @leave="leave"
            >
              <component :is="view"></component>
          </transition>-->
          <!-- <transition name="component-slidex" mode="out-in">
              <component :is="view"></component>
          </transition>-->
          <!-- <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />-->
          <!-- <a href="#">Forgot your password?</a>
          <button>Sign In</button>-->
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="wrap-mask">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <a class="btn btn-1" @click="changeClass('signIn')">
                <svg>
                  <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                Sign In
              </a>
              <!-- <button class="my-button ghost" @click="changeClass('signIn')">
                  Sign In
              </button>-->
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>

              <a class="btn btn-1" @click="changeClass('signUp')">
                <svg>
                  <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                Sign Up
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
  </div>
</template>

<script>
// import Veloity from 'velocity-animate'
// import { TweenLite } from 'gsap'
import { TweenLite } from '@commons/tweenmax/all'
import LoginDefault from '@views/login-page/Default'
import LoginPhone from '@views/login-page/Phone'
import LoginEmail from '@views/login-page/Email'
export default {
  name: 'login-one',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      containerClass: 'container',
      activedClass: 'right-panel-active',
      classFlag: false,
      formFlag: true,
      singIn: false,
      singUp: false,

      view: 'login-default',
      loginType: 'default',

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
    changeLoginPhone: function() {
      const _this = this
      const form = this.$refs.form
      const flag = _this.view == 'login-default'
      if (flag) {
        _this.view = 'login-phone'
        _this.loginType = 'phone'
      } else {
        _this.view = 'login-default'
        _this.loginType = 'default'
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
      const flag = this.view == 'login-default'
      if (flag) {
        this.view = 'login-email'
        this.loginType = 'email'
      } else {
        this.view = 'login-default'
        this.loginType = 'default'
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
    'login-default': LoginDefault,
    'login-phone': LoginPhone,
    'login-email': LoginEmail
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
