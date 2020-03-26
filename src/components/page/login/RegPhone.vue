<template>
  <ValidationObserver ref="form">
    <v-form class="my-form">
      <ValidationProvider
        name="phone"
        rules="required|phone"
        v-slot="{ errors }"
        class="fill-width"
      >
        <v-text-field
          v-model="formData.userName"
          label="请输入手机号码"
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
        name="password"
        rules="required|max:16"
        v-slot="{ errors }"
        class="fill-width"
      >
        <v-text-field
          v-model="formData.password"
          type="password"
          :counter="16"
          label="请输入密码"
          solo
          flat
          background-color="#eee"
          class="my-input"
          :error-messages="errors[0]"
          :disabled="loading"
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider
        name="repassword"
        rules="required|max:16|confirmed:password"
        v-slot="{ errors }"
        class="fill-width"
      >
        <v-text-field
          v-model="repassword"
          type="password"
          :counter="16"
          label="请再次输入密码"
          solo
          flat
          background-color="#eee"
          class="my-input"
          :error-messages="errors[0]"
          :disabled="loading"
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider
        name="captcha"
        rules="required|numeric"
        v-slot="{ errors }"
        class="fill-width"
      >
        <v-text-field
          v-model="formData.captcha"
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
            <v-btn text color="primary" :disabled="isSend" @click="sendCode">
              {{ btnContent }}
            </v-btn>
          </template>
        </v-text-field>
      </ValidationProvider>

      <v-btn
        :loading="loading"
        class="mt-2"
        color="info"
        width="150"
        @click="validate"
        >注册</v-btn
      >
    </v-form>
  </ValidationObserver>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    //
  },
  data() {
    return {
      //
      formData: {
        userName: '',
        password: '',
        codeKey: '',
        captcha: ''
      },
      repassword: '',

      isSend: false,
      btnContent: '发送验证码',
      templateCode: 'register',

      remember: 1,
      loading: false
    }
  },
  mounted() {
    //
    //从本地中拿到codeKey，避免刷新页面误操作造成丢失
    this.formData.codeKey = this.getCodeKey
    console.log('codeKey From Local ：' + this.codeKey)
  },
  methods: {
    //
    ...mapActions({
      setCodeKey: 'setCodeKeyFun',
      setLoginStatus: 'setLoginStatusFun'
    }),
    changeSendBtn() {
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
    sendCode() {
      // 更改发送按钮状态
      this.changeSendBtn()
      let vm = this
      let captchaData = {
        phone: this.formData.userName,
        smsTemplateCodeEnum: this.templateCode
      }

      // 发送短信验证码
      this.$api.captcha.toSendSmsCode(captchaData).then(res => {
        // console.log(res.data)
        var result = res.data.extend.data

        let codeKey = result.codeKey

        vm.formData.codeKey = codeKey
        vm.setCodeKey(codeKey)
      })
    },
    validate() {
      let vm = this
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        // console.log(success)
        vm.register()
      })
    },
    reset() {
      this.$refs.form.reset()
    },
    register() {
      //
      let vm = this
      vm.loading = true
      this.$api.user
        .toRegister(this.formData)
        .then(res => {
          vm.$toast.success(res.data.msg)

          vm.loading = false
          //刷新页面，重新登录
          this.$router.go(0)
        })
        .catch(() => {
          vm.loading = false
        })
    }
  },
  computed: {
    //
    ...mapGetters({
      getCodeKey: 'getCodeKeyFun'
    })
  },
  watch: {
    //
  },
  components: {
    //
  }
}
</script>

<style lang="scss" src="@styles/login.scss" scoped></style>
<style>
/*  */
</style>
