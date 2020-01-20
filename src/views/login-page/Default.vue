<!--
 * @description: Something
 * @Version: 0.1
 * @Autor: xuzhenghao
 * @LastEditors  : xuzhenghao
 -->
<template id="login-default">
  <v-form class="my-form" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="username"
      :rules="nameRules"
      label="請輸入帳號"
      solo
      flat
      required
      background-color="#e7eaec"
      class="my-input-header"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      :rules="passwordRules"
      label="請輸入密碼"
      solo
      flat
      required
      background-color="#e7eaec"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      class="my-input"
    ></v-text-field>
    <v-text-field
      v-model="captcha"
      label="請輸入驗證碼"
      maxlength="4"
      solo
      flat
      required
      background-color="#e7eaec"
      class="my-input"
    >
      <template v-slot:append>
        <img :src="imageData" @click="show" style="cursor: pointer;" />
      </template>
    </v-text-field>
    <div class="d-flex justify-start my-row">
      <v-col cols="6" class="my-col">
        <v-switch
          class="my-switch"
          v-model="remember"
          inset
          dense
          color="blue"
          label="记住我"
          style="
  height: 40px;"
        ></v-switch>
      </v-col>
      <v-col cols="auto" class="my-col">
        <a href="#">忘记密码</a>
      </v-col>
      <v-col cols="auto" class="my-col">
        <a href="#">无法登录</a>
      </v-col>
    </div>
    <!-- <div class="d-flex justify-start">
      <v-switch
        class="my-switch"
        v-model="remember"
        inset
        dense
        label="记住我"
      ></v-switch>
      <div class="my-col">
        <a href="#">忘记密码</a>
        <a href="#">无法登录</a>
      </div>
    </div>-->

    <!-- <v-btn rounded outlined @click="validate">Login</v-btn> -->

    <a @click="validate" class="btn btn-2">Login</a>
    <!-- <button>Sign Up</button> -->
  </v-form>
</template>

<script>
import { mapMutations } from 'vuex'
// import { toSendImageCode, toLoginByImageCode } from '@/api/login'
export default {
  name: 'login-default',
  data() {
    return {
      imageCodeWidth: 80,
      imageCodeHeight: 30,
      imageData:
        'data:image/jpeg;base64,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',
      captcha: '',
      codeKey: '',
      valid: true,
      remember: false,
      showLogin: 0,
      showDefaultLogin: true,
      showPhoneLogin: false,
      showEmailLogin: false,
      done: false,
      username: 'test',
      nameRules: [
        v => !!v || '账号不能为空',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      password: '123456',
      showPassword: false,
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 10) || 'Password must be less than 10 characters'
      ]
    }
  },
  props: {
    data: {
      required: true
    }
  },
  methods: {
    ...mapMutations(['changeCodeKey', 'changeLogin']),
    validate() {
      if (this.$refs.form.validate()) {
        this.login()
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    showCookie() {
      // eslint-disable-next-line no-unused-vars
      this.$cookie.set('test', 'Hello world!', 1)
      // This will set a cookie with the name 'test' and the value 'Hello world!' that expires in one day

      // To get the value of a cookie use

      console.log('test' + this.$cookie.get('test'))
      var ca = this.$cookie.get('captcha')
      console.log(ca)
    },
    login() {
      let vm = this
      let username = this.username
      let password = this.password
      let codeKey = this.codeKey
      let captcha = this.captcha
      console.log(username + '==' + password)
      vm.$emit('commit', true, '用户名错误')
      this.$api.login
        .toLoginByImageCode(username, password, codeKey, captcha)
        .then(res => {
          console.log('in')
          //console.log(JSON.parse(res.data))
          // this.$store.commit("LOGIN", JSON.parse(res.data.data));
          if (res.data.code === 200) {
            // res.data.extend.data
            let userToken = 'Bearer ' + res.data.extend.data
            console.log(userToken)
            // 将用户token保存到vuex中
            vm.changeLogin({ Authorization: userToken })
          } else {
            console.log('error')
            vm.$emit('snackbar', true)
          }
        })
    },
    show() {
      const vm = this
      let imageCodeWidth = this.imageCodeWidth
      let imageCodeHeight = this.imageCodeHeight
      this.$api.captcha
        .toSendImageCode(imageCodeWidth, imageCodeHeight)
        .then(res => {
          // 接收转换后的Base64图片
          vm.imageData = res.data.extend.imageData

          // var data = res.data.extend.imageData
          // console.log(data)
          let codeKey = res.data.extend.codeKey
          vm.codeKey = codeKey
          vm.changeCodeKey({ CodeKey: codeKey })
        })
    },
    showLoginPage(type) {
      this.showLogin = type
      this.$emit('setView', 'LoginPhone')
    }
  },
  components: {},
  mounted: function() {
    //从本地中拿到codeKey，避免刷新页面误操作造成丢失
    this.codeKey = this.$store.state.CodeKey
    console.log('codeKey From Local ：' + this.codeKey)
    //刷新页面，重新获取验证码
    this.show()
  }
}
</script>

<style lang="scss" src="@styles/btn.scss" scoped></style>
<style lang="scss" src="@styles/login.scss" scoped></style>
