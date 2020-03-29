<!--
 * @description: Something
 * @Version: 0.1
 * @Autor: xuzhenghao
 * @LastEditors  : xuzhenghao
 -->
<template>
  <ValidationObserver ref="form">
    <v-form class="my-form">
      <ValidationProvider
        name="email"
        rules="required|email"
        v-slot="{ errors }"
        class="fill-width"
      >
        <v-text-field
          v-model="loginData.email"
          label="请输入邮箱帐号"
          solo
          flat
          required
          background-color="#eee"
          class="my-input"
          :error-messages="errors[0]"
          :disabled="loading"
        ></v-text-field>
      </ValidationProvider>

      <ValidationProvider
        name="captcha"
        rules="required|min:4|numeric"
        v-slot="{ errors, passed }"
        class="fill-width"
      >
        <div v-show="false">{{ (canSend = passed) }}</div>
        <v-text-field
          v-model="loginData.captcha"
          label="请输入验证码"
          solo
          flat
          required
          background-color="#eee"
          class="my-input"
          :error-messages="errors[0]"
          :disabled="loading"
        >
          <template v-slot:append>
            <v-btn
              text
              color="green"
              :disabled="!canSend || isSend || loading"
              @click="sendCode"
            >
              {{ btnContent }}
            </v-btn>
          </template>
        </v-text-field>
      </ValidationProvider>
      <div class="d-flex justify-start align-center my-row my-1">
        <v-col cols="6" class="my-col">
          <v-switch
            class="my-switch"
            v-model="remember"
            :disabled="loading"
            inset
            dense
            hide-details
            color="blue"
            label="记住我"
          ></v-switch>
        </v-col>
        <v-col cols="auto" class="my-col">
          <a href="#">忘记密码</a>
        </v-col>
        <v-col cols="auto" class="my-col">
          <a href="#">无法登录</a>
        </v-col>
      </div>
      <v-btn
        :loading="loading"
        class="mt-2"
        color="info"
        width="150"
        @click="validate"
        >登录</v-btn
      >
    </v-form>
  </ValidationObserver>
</template>

<script>
import { afterLoginSuccess } from '@js/login'
import { mapGetters, mapActions } from 'vuex'
import { changeSendBtn, reloadSendBtn } from '@/assets/js/fct'
// import { toSendEmailCode, toLoginByEmailCode } from '../../api/login'
export default {
  name: 'login-email',
  data() {
    return {
      loginData: {
        email: '',
        codeKey: '',
        captcha: ''
      },
      code: {
        name: 'login',
        type: 'email',
        count: 0
      },
      isSend: false,
      btnContent: '发送验证码',
      templateCode: 'login',
      //是否可点击发送按钮
      canSend: false,

      remember: true,
      loading: false
    }
  },
  methods: {
    ...mapActions({
      setCodeKey: 'setCodeKeyFun',
      setCodeTime: 'setCodeTimeFun',
      setLoginStatus: 'setLoginStatusFun',
      setUserInfo: 'setUserInfoFun'
    }),
    sendCode() {
      // 更改发送按钮状态
      changeSendBtn(this)
      let vm = this
      let captchaData = {
        email: this.loginData.email,
        mailTemplateCodeEnum: this.templateCode
      }

      // 发送邮箱验证码
      this.$api.captcha.toSendEmailCode(captchaData).then(res => {
        var result = res.data.extend

        let codeKey = result.codeKey
        vm.loginData.codeKey = codeKey
        vm.setCodeKey(codeKey)
      })
    },
    validate() {
      let vm = this
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        console.log(success)
        vm.login()
      })
    },
    reset() {
      this.$refs.form.reset()
    },
    login() {
      let vm = this
      vm.loading = true
      this.$api.login
        .toLoginByEmailCode(this.loginData)
        .then(res => {
          let data = res.data.extend

          //整理数据
          afterLoginSuccess(vm, data)
        })
        .catch(() => {
          vm.loading = false
        })
    },
    //继续倒计时
    reloadSend() {
      //从本地中拿到codeKey，避免刷新页面误操作造成丢失
      this.loginData.codeKey = this.getCodeKey
      console.log('codeKey From Local ：' + this.codeKey)
      //重新加载倒计时
      reloadSendBtn(this)
    }
  },
  computed: {
    ...mapGetters({
      getCodeKey: 'getCodeKeyFun',
      getCodeTime: 'getCodeTimeFun'
    })
  },
  components: {},
  mounted: function() {
    //继续倒计时
    this.reloadSend()
  }
}
</script>

<style lang="scss" src="@styles/btn.scss" scoped></style>
<style lang="scss" src="@styles/login.scss" scoped></style>
