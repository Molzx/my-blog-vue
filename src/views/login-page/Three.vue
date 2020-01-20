<!--
 * @Author: your name
 * @Date: 2019-12-08 17:07:18
 * @LastEditTime : 2019-12-27 09:29:07
 * @LastEditors  : xuzhenghao
 * @Description: In User Settings Edit
 * @FilePath: \VueProjects\blog\src\views\Login.vue
 -->
<template>
  <v-container fluid>
    <v-layout row wrap align-center justify-center fill-height>
      <v-hover v-slot:default="{ hover }">
        <v-card class="mx-auto myCard" max-width="400">
          <v-card class="mx-auto myCard-chirld" height="80" max-width="200">
            <v-card-text class="pa-6">
              <p class="display-1 text-center">SIGN IN</p>
            </v-card-text>
          </v-card>
          <transition name="fade" mode="in-out">
            <v-btn v-bind:key="showLogin">
              {{ showLogin === 0 ? 'Save' : 'Edit' }}
            </v-btn>
          </transition>
          <v-card-text style="height: auto;">
            <div class="pa-6">
              <v-form ref="form" v-model="valid" lazy-validation>
                <transition name="fade" mode="out-in">
                  <div v-if="showLogin === 0 ? true : false" key="default">
                    <v-text-field
                      v-model="username"
                      :counter="10"
                      :rules="nameRules"
                      label="請輸入帳號"
                      solo
                      flat
                      required
                      background-color="#f3f5f6"
                      prepend-icon="iconfont icon-icon_mine"
                      style="border-radius: 6px"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="password"
                      :counter="10"
                      :type="showPassword ? 'text' : 'password'"
                      :rules="passwordRules"
                      label="請輸入密碼"
                      solo
                      flat
                      required
                      background-color="#f3f5f6"
                      prepend-icon="iconfont icon-icon_password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                      style="border-radius: 6px"
                    ></v-text-field>
                    <v-text-field
                      v-model="imageCode"
                      label="請輸入驗證碼"
                      maxlength="4"
                      solo
                      flat
                      required
                      background-color="#f3f5f6"
                      prepend-icon="iconfont icon-icon_emoticon"
                      style="border-radius: 6px"
                    >
                      <template v-slot:append>
                        <img
                          :src="imageData"
                          @click="show"
                          style="cursor: pointer;"
                        />
                      </template>
                    </v-text-field>
                    <v-row>
                      <v-switch
                        class="pl-6"
                        v-model="remember"
                        inset
                        label="7天內自動登陸"
                      ></v-switch>
                      <v-scroll-x-transition>
                        <v-icon v-if="remember" color="success">check</v-icon>
                      </v-scroll-x-transition>
                    </v-row>
                    <v-row>
                      <v-btn
                        rounded
                        outlined
                        large
                        block
                        color="primary"
                        @click="validate"
                        >Login</v-btn
                      >
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="showLoginPage(1)"
                          >短信登錄</v-btn
                        >
                      </v-col>
                    </v-row>
                  </div>
                  <div v-else-if="showLogin === 1 ? true : false" key="phone">
                    <v-text-field
                      v-model="username"
                      :counter="10"
                      :rules="nameRules"
                      label="請輸入帳號"
                      solo
                      flat
                      required
                      background-color="#f3f5f6"
                      prepend-icon="iconfont icon-icon_mine"
                      style="border-radius: 6px"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="imageCode"
                      label="請輸入驗證碼"
                      maxlength="4"
                      solo
                      flat
                      required
                      background-color="#f3f5f6"
                      prepend-icon="iconfont icon-icon_emoticon"
                      style="border-radius: 6px"
                    >
                      <template v-slot:append>
                        <v-btn text color="primary">發送驗證碼</v-btn>
                      </template>
                    </v-text-field>
                    <v-switch
                      class="pl-6"
                      v-model="remember"
                      inset
                      label="7天內自動登陸"
                    ></v-switch>
                    <v-row>
                      <v-btn
                        rounded
                        outlined
                        large
                        block
                        color="primary"
                        @click="validate"
                        >Login</v-btn
                      >
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <v-btn
                          text
                          small
                          color="primary"
                          @click="showLoginPage(0)"
                          >默認登錄方式</v-btn
                        >
                      </v-col>
                    </v-row>
                  </div>
                </transition>
                <v-row class="justify-center">
                  <v-col sm="0" cols="5">
                    <v-btn outlined large color="primary" @click="validate"
                      >Login</v-btn
                    >
                  </v-col>
                  <v-col sm="0" cols="5">
                    <v-btn outlined large color="primary" @click="reset"
                      >Reset</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'login-three',
  data: () => ({
    imageData:
      'data:image/jpeg;base64,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',
    imageCode: '',
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
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    password: '123456',
    showPassword: false,
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length <= 10) || 'Password must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    checkbox: false
  }),
  mounted: function() {
    this.show()
  },

  methods: {
    ...mapMutations(['changeLogin']),
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
      let username = this.username
      let password = this.password
      let imageCode = this.imageCode
      let _this = this
      console.log(username + '==' + password)
      this.axios
        .post(
          'auth/login',
          {
            username: username,
            password: password,
            imageCode: imageCode
          },
          {
            headers: {
              //  'Content-Type': 'application/json;charset=UTF-8'
            }
          }
        )
        .then(res => {
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
    },
    show() {
      const _this = this
      this.axios
        .get('code/image', {
          params: {
            width: 80,
            height: 30
          }
          // responseType: 'arraybuffer'
        })
        // .then(res => {
        //   return (
        //     'data:image/png;base64,' +
        //     btoa(
        //       new Uint8Array(res.data).reduce(
        //         (data, byte) => data + String.fromCharCode(byte),
        //         ''
        //       )
        //     )
        //   )
        // })
        .then(res => {
          // 接收转换后的Base64图片
          _this.imageData = res.data.extend.imageData

          var data = res.data.extend.imageData
          // console.log(res.data)
          console.log(data)
          _this.codeKey = res.data.extend.codeKey
          //console.log(data)

          //var ca = this.$cookie.get('captcha')
          //console.log(ca)
        })
        .catch(function(error) {
          // handle error
          console.log(error)
        })
        .finally(function() {
          // always executed
        })
    },
    showLoginPage(type) {
      this.showLogin = type
    }
  },
  doCheck() {
    this.done = true
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.myCard {
  background: #fff;
  box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.05) !important;
  border-radius: 12px;
  box-sizing: border-box;
  position: relative;
}
.myCard-chirld {
  background: #fff;
  box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.05) !important;
  border-radius: 40px;
  box-sizing: border-box;
  position: relative;
}
.myInput {
  width: 526px;
  height: 48px;
  padding: 12px 16px;
  box-sizing: border-box;
  background: #f3f5f6;
  border-radius: 6px;
  font-size: 16px;
  color: #9199a1;
  line-height: 24px;
}
</style>
