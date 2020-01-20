<!--
 * @Author       : xuzhenghao
 * @Date         : 2019-12-08 16:50:21
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-19 20:21:50
 * @FilePath     : \VueProjects\blog\src\views\Home.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-content class="myBackground">
    <v-app-bar
      color="white"
      class="navShadow mx-auto"
      height="60"
      light
      absolute
      style="padding: 0px 16px;"
      scroll-target="#scrolling-techniques-6"
    >
      <v-layout row wrap align-center justify-center fill-height class="mx-12">
        <core-navmenu
          :shadow="navMenuShadow"
          :active="activeNavMenu"
        ></core-navmenu>

        <div v-if="isLogin">
          <v-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </div>
        <div v-else>
          <a class="nav-link" href="#">登录</a>
        </div>
      </v-layout>
    </v-app-bar>
    <!-- <v-container class="pt-10" style="height: 1000px;">
      <v-sheet
        class="d-flex myCard"
        color="grey lighten-3"
        height="424"
      ></v-sheet>
    </v-container> -->
    <v-sheet id="scrolling-techniques-6" class="overflow-y-auto">
      <v-container fluid grid-list-xl fill-height style="padding-top:80px">
        <v-layout justify-center align-center>
          <v-flex xs12>
            <material-card color="green">
              <div slot="header">
                <div class="title font-weight-light mb-2">Notifications</div>
                <div class="category">
                  Handcrafted by us with
                  <v-icon size="17">
                    mdi-heart
                  </v-icon>
                </div>
              </div>

              <v-card-text>
                <v-layout row wrap>
                  <v-flex md6 sm12>
                    <h2 class="title font-weight-light mb-3">
                      Notifications Style
                    </h2>

                    <material-notification class="mb-3" color="info">
                      This is a plain notification
                    </material-notification>
                    <material-notification
                      class="mb-3"
                      color="info"
                      dismissible
                    >
                      This is a notification with close button.
                    </material-notification>
                    <material-notification
                      class="mb-3"
                      color="info"
                      dismissible
                      icon="mdi-bell-plus"
                    >
                      This is a notification with close button and icon.
                    </material-notification>
                    <material-notification
                      class="mb-3"
                      color="info"
                      dismissible
                      icon="mdi-bell-plus"
                    >
                      This is a notification with close button and icon and have
                      many lines. You can see that the icon and the close button
                      are always vertically aligned. This is a beautiful
                      notification. So you don't have to worry about the style.
                    </material-notification>
                  </v-flex>

                  <v-flex md6 sm12>
                    <h2 class="title font-weight-light">Notifcation States</h2>

                    <material-notification
                      class="mb-3"
                      color="info"
                      dismissible
                    >
                      <strong>INFO</strong> - This is a regular notification
                      made with `color="info"`
                    </material-notification>

                    <material-notification
                      class="mb-3"
                      color="success"
                      dismissible
                    >
                      <strong>SUCCESS</strong> - This is a regular notification
                      made with `color="success"`
                    </material-notification>

                    <material-notification
                      class="mb-3"
                      color="warning"
                      dismissible
                    >
                      <strong>WARNING</strong> - This is a regular notification
                      made with `color="warning"`
                    </material-notification>

                    <material-notification
                      class="mb-3"
                      color="error"
                      dismissible
                    >
                      <strong>DANGER</strong> - This is a regular notification
                      made with `color="error"`
                    </material-notification>

                    <material-notification
                      class="mb-3"
                      color="purple"
                      dismissible
                    >
                      <strong>PRIMARY</strong> - This is a regular notification
                      made with `color="purple"`
                    </material-notification>
                  </v-flex>
                </v-layout>
                <div class="text-xs-center">
                  <h2 class="title font-weight-light mb-2">
                    Notification Places
                  </h2>
                  <span class=" subheading font-weight-light grey--text"
                    >Click to view notifications</span
                  >
                </div>

                <v-container grid-list-lg>
                  <v-layout justify-center row wrap>
                    <v-flex xs12 sm4>
                      <v-btn
                        block
                        color="success"
                        @click="snack('top', 'left')"
                      >
                        Top Left
                      </v-btn>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-btn block color="success" @click="snack('top')">
                        Top Center
                      </v-btn>
                    </v-flex>
                  </v-layout>
                  <v-layout justify-center row wrap>
                    <v-flex xs12 sm4>
                      <v-btn
                        block
                        color="success"
                        @click="snack('top', 'right')"
                      >
                        Top Right
                      </v-btn>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-btn
                        block
                        color="success"
                        @click="snack('bottom', 'left')"
                      >
                        Bottom Left
                      </v-btn>
                    </v-flex>
                  </v-layout>
                  <v-layout justify-center row wrap>
                    <v-flex xs12 sm4>
                      <v-btn block color="success" @click="snack('bottom')">
                        Bottom Center
                      </v-btn>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-btn
                        block
                        color="success"
                        @click="snack('bottom', 'right')"
                      >
                        Bottom Right
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>

                <v-snackbar
                  :color="color"
                  :bottom="bottom"
                  :top="top"
                  :left="left"
                  :right="right"
                  v-model="snackbar"
                  dark
                  :timeout="timeout"
                >
                  <v-icon color="white" class="mr-3">
                    mdi-bell-plus
                  </v-icon>
                  <div>
                    Welcome to <b>Vue Material Dashboard</b> - a beautiful
                    freebie for every web developer.
                  </div>
                  <v-icon size="16" @click="snackbar = false">
                    mdi-close-circle
                  </v-icon>
                </v-snackbar>
              </v-card-text>
            </material-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-sheet>
  </v-content>
</template>

<script>
// import NavMenu from '@/components/NavMenu.vue'

export default {
  name: 'main-home',

  data() {
    return {
      //NavMenu相关
      activeNavMenu: 0,
      navMenuShadow: false,
      //本页面
      isLogin: false,

      ///////////
      color: null,
      colors: ['purple', 'info', 'success', 'warning', 'error'],
      top: true,
      bottom: false,
      left: false,
      right: false,
      snackbar: false,
      timeout: 0
    }
  },
  components: {
    // NavMenu
  },

  methods: {
    snack(...args) {
      this.top = false
      this.bottom = false
      this.left = false
      this.right = false

      for (const loc of args) {
        this[loc] = true
      }

      this.color = this.colors[Math.floor(Math.random() * this.colors.length)]

      this.snackbar = true
    }
  }
}
</script>
