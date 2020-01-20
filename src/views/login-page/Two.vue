<!--
 * @description: Something
 * @Version: 0.1
 * @Autor: xuzhenghao
 * @LastEditors  : xuzhenghao
 -->
<template>
  <v-layout row wrap align-center justify-center fill-height>
    <v-card class="mx-auto myCard" max-width="1200">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-img
            class="white--text align-end myImage"
            height="600px"
            width="600px"
            src="https://picsum.photos/600/600?image=2"
          ></v-img>
        </v-col>
        <v-col cols="auto">
          <v-row>
            <v-card-text style="width:500px">
              <div class="pa-6">
                <template>
                  <v-tabs centered>
                    <v-tab>Login</v-tab>
                    <v-tab>Register</v-tab>
                    <v-tab-item>
                      <v-row>
                        <v-col cols="2">
                          <v-row class="flex-column ma-0">
                            <v-col cols="2">
                              <v-btn
                                text
                                icon
                                color="primary"
                                @click="changeComponent"
                              >
                                <v-icon>iconfont icon-phone</v-icon>
                              </v-btn>
                            </v-col>
                            <v-col cols="2">
                              <v-btn
                                text
                                icon
                                color="primary"
                                @click="changeViewEmail"
                              >
                                <v-icon>iconfont icon-ic__email</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="10">
                          <div class="pa-6">
                            <transition name="component-fade" mode="out-in">
                              <component
                                @setView="getView"
                                :is="view"
                              ></component>
                            </transition>
                          </div>
                        </v-col>
                      </v-row>
                    </v-tab-item>
                    <v-tab-item></v-tab-item>
                  </v-tabs>
                </template>
              </div>
            </v-card-text>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-layout>
</template>

<script>
import LoginDefault from '@views/login-page/Default'
import LoginPhone from '@views/login-page/Phone'
import LoginEmail from '@views/login-page/Email'

export default {
  name: 'login-two',
  data() {
    return {
      flag: false,
      view: 'login-default',
      who: 'LoginPhone',
      loginType: 'default',
      btnLoginPhone: '短信登錄',
      btnLoginEmail: '郵箱登錄'
    }
  },
  methods: {
    changeComponent: function() {
      if (this.view == 'login-default' || this.loginType == 'email') {
        if (this.loginType == 'email') {
          this.btnLoginEmail = '郵箱登錄'
        }
        this.view = 'login-phone'
        this.loginType = 'phone'
        this.btnLoginPhone = '帳號密碼登錄'
      } else {
        this.view = 'login-default'
        this.loginType = 'default'
        this.btnLoginPhone = '短信登錄'
      }
    },
    changeViewEmail: function() {
      if (this.view == 'login-default' || this.loginType == 'phone') {
        if (this.loginType == 'phone') {
          this.btnLoginPhone = '短信登錄'
        }
        this.view = 'login-email'
        this.loginType = 'email'
        this.btnLoginEmail = '帳號密碼登錄'
      } else {
        this.view = 'login-default'
        this.loginType = 'default'
        this.btnLoginEmail = '郵箱登錄'
      }
    },
    checkPage(type) {
      console.log(this.view)
      this.view = type
      console.log(this.view)
    },
    getView(type) {
      if (type == 'LoginDefault') {
        this.who = 'LoginPhone'
      } else {
        this.who = 'LoginDefault'
      }
    }
  },
  components: {
    'login-default': LoginDefault,
    'login-phone': LoginPhone,
    'login-email': LoginEmail
  }
}
</script>

<style lang="scss" scoped>
.myBackground {
  background: color(#f8fafc);
  // background: url('../../public/images/bg.png');
  background-size: 100% 100%;
}
.myCard {
  background: #fff;
  height: 600px;
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
.myImage {
  box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.05) !important;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  box-sizing: border-box;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
  //  transition: all 1s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  // height: 0;
  opacity: 0;
}
</style>
