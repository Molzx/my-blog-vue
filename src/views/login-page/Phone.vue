<!--
 * @description: Something
 * @Version: 0.1
 * @Autor: xuzhenghao
 * @LastEditors  : xuzhenghao
 -->
<template>
  <v-form class="my-form" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="phone"
      :counter="10"
      :rules="phoneRules"
      label="请输入手机号码"
      solo
      flat
      required
      background-color="#f3f5f6"
      class="my-input"
    ></v-text-field>
    <v-text-field
      v-model="captcha"
      label="请输入验证码"
      maxlength="4"
      solo
      flat
      required
      background-color="#f3f5f6"
      class="my-input"
    >
      <template v-slot:append>
        <v-btn text color="primary" :disabled="isSend" @click="sendCode">
          {{ btnContent }}
        </v-btn>
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
    <a @click="validate" class="btn btn-3">Login</a>
    <!-- <v-row>
      <v-btn rounded outlined large block color="primary" @click="validate"
        >Login</v-btn
      >
    </v-row>-->
  </v-form>
</template>

<script>
import { mapMutations } from 'vuex'
// import { toSendSmsCode, toLoginBySmsCode } from '../../api/login'
export default {
  name: 'login-phone',
  data() {
    return {
      isSend: false,
      btnContent: '发送验证码',
      codeKey: '',
      captcha: '',
      templateCode: 'login',
      valid: true,
      remember: false,
      phone: 'test',
      phoneRules: [
        v => !!v || 'Phone is required',
        v => (v && v.length <= 10) || 'Phone must be less than 10 characters'
      ]
    }
  },
  methods: {
    ...mapMutations(['changeCodeKey', 'changeLogin']),

    changeSendBtn: function() {
      let vm = this
      // 控制倒计时及按钮是否可以点击
      const TIME_COUNT = 10
      vm.count = TIME_COUNT
      vm.timer = window.setInterval(() => {
        if (vm.count > 0 && vm.count <= TIME_COUNT) {
          // 倒计时时不可点击
          vm.isSend = true
          // 计时秒数
          vm.count--
          // 更新按钮的文字内容
          vm.btnContent = vm.count + 's后重新发送'
        } else {
          // 倒计时完，可点击
          vm.isSend = false
          // 更新按钮文字内容
          vm.btnContent = '发送验证码'
          // 清空定时器!!!
          clearInterval(vm.timer)
          vm.timer = null
        }
      }, 1000)
    },
    sendCode: function() {
      // 更改发送按钮状态
      this.changeSendBtn()
      let vm = this
      let phone = this.phone
      let templateCode = this.templateCode

      // 发送短信验证码
      this.$api.captcha.toSendSmsCode(phone, templateCode).then(res => {
        // console.log(res.data)
        var status = res.data.success
        var result = res.data.extend
        console.login(status)
        let codeKey = result.codeKey
        vm.codeKey = codeKey
        vm.changeCodeKey({ CodeKey: codeKey })
      })
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
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
      let _this = this
      let phone = this.phone
      let codeKey = this.codeKey
      let captcha = this.captcha
      console.log(phone + '====' + captcha)
      this.$api.login.toLoginBySmsCode(phone, codeKey, captcha).then(res => {
        //console.log(JSON.parse(res.data))
        // this.$store.commit("LOGIN", JSON.parse(res.data.data));
        if (res.data.code === 200) {
          // res.data.extend.data
          let userToken = 'Bearer ' + res.data.extend.data
          console.log(userToken)
          // 将用户token保存到vuex中
          _this.changeLogin({ Authorization: userToken })
        }
      })
    }
  },
  components: {},
  created: function() {},
  mounted: function() {
    const form = this.$refs.form
    console.log('子form' + form.offsetHeight)
    //从本地中拿到codeKey，避免刷新页面误操作造成丢失
    this.codeKey = this.$store.state.CodeKey
    console.log('codeKey From Local ：' + this.codeKey)
  }
}
</script>

<style lang="scss" src="@styles/btn.scss" scoped></style>
<style lang="scss" src="@styles/login.scss" scoped></style>
