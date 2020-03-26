<!--
 * @description: Something
 * @Version: 0.1
 * @Autor: xuzhenghao
 * @LastEditors  : xuzhenghao
 -->
<template id="login-default">
  <ValidationObserver ref="form">
    <v-form class="my-form">
      <ValidationProvider
        name="account"
        rules="required"
        v-slot="{ errors }"
        class="fill-width"
      >
        <v-text-field
          v-model="loginData.userName"
          label="请输入帐号"
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
          v-model="loginData.password"
          :type="showPassword ? 'text' : 'password'"
          label="请输入密码"
          :counter="16"
          solo
          flat
          required
          background-color="#eee"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          class="my-input"
          :error-messages="errors[0]"
          :disabled="loading"
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider
        name="captcha"
        rules="required|length:4|numeric"
        v-slot="{ errors }"
        class="fill-width"
      >
        <v-text-field
          v-model="loginData.captcha"
          label="请输入验证码"
          maxlength="4"
          solo
          flat
          required
          background-color="#eee"
          class="my-input"
          :error-messages="errors[0]"
          :disabled="loading"
        >
          <template v-slot:append>
            <img
              :src="imageData"
              @click="sendImageCode"
              style="cursor: pointer;"
            />
          </template>
        </v-text-field>
      </ValidationProvider>
      <div class="d-flex justify-start align-center my-row my-1">
        <v-col cols="6" class="my-col">
          <v-switch
            class="my-switch"
            v-model="remember"
            :true-value="1"
            :false-value="0"
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

      <!-- <a @click="validate" class="btn btn-2">Login</a> -->
      <!-- <button>Sign Up</button> -->
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
// import { toSendImageCode, toLoginByImageCode } from '@/api/login'
import { goToPage } from '@js/login'
import { mapActions } from 'vuex'
export default {
  name: 'login-default',
  data() {
    return {
      imageCaptcha: {
        width: 80,
        height: 30
      },

      loginData: {
        userName: 'test',
        password: '123456',
        codeKey: '',
        captcha: ''
      },
      imageData:
        'data:image/jpeg;base64,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',

      remember: 1,

      showPassword: false,
      loading: false
    }
  },
  props: {
    data: {
      required: true
    }
  },
  methods: {
    ...mapActions({
      setCodeKey: 'setCodeKeyFun',
      setLoginStatus: 'setLoginStatusFun',
      setUserInfo: 'setUserInfoFun'
    }),
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
        .toLoginByImageCode(this.loginData)
        .then(res => {
          let data = res.data.extend
          let userToken = 'Bearer ' + data.token
          console.log(vm.remember)
          // 将用户token保存到vuex中
          let userInfo = data.userInfo
          vm.setLoginStatus({
            Authorization: userToken,
            BaseUserInfo: userInfo,
            type: vm.remember
          })
          vm.setUserInfo(userInfo)
          vm.$toast.success('登录成功')

          vm.loading = false
          //跳转到原来页面
          goToPage(vm)
        })
        .catch(() => {
          vm.loading = false
          vm.sendImageCode()
        })
    },
    sendImageCode() {
      const vm = this
      this.$api.captcha.toSendImageCode(this.imageCaptcha).then(res => {
        // 接收转换后的Base64图片
        vm.imageData = res.data.extend.imageData

        // var data = res.data.extend.imageData
        // console.log(data)
        let codeKey = res.data.extend.codeKey
        vm.loginData.codeKey = codeKey
      })
    }
  },
  components: {},
  mounted: function() {
    this.sendImageCode()
  },
  watch: {
    remember() {
      // console.log(this.remember)
    }
  }
}
</script>

<style lang="scss" src="@styles/btn.scss" scoped></style>
<style lang="scss" src="@styles/login.scss" scoped></style>
