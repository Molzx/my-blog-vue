<template>
  <div class="system-wrapper">
    <v-app-bar
      absolute
      color="blue"
      height="65"
      elevate-on-scroll
      style="margin-left:0px"
      scroll-target="#scrolling-tag"
      class="shadow-3"
    >
      <div class="wrapper">
        <div class="top-navbar">
          <div class="logo">
            <a href="#">Nai Cha</a>
          </div>
          <div class="top-menu">
            <div class="home-link">
              <a href="#">
                <span class="icon"><i class="fas fa-home"></i></span>
                <span>Home</span>
              </a>
            </div>
            <v-spacer></v-spacer>
            <div class="right-info">
              <div class="test">nihao</div>
              <div class="icon-wrap">
                <div class="icon">
                  <i class="fas fa-bell"></i>
                </div>
              </div>
              <div class="icon-wrap">
                <div class="icon">
                  <i class="fas fa-cog"></i>
                </div>
              </div>
            </div>
            <v-avatar size="40">
              <img :src="imgUrl" alt="John" />
            </v-avatar>
          </div>
        </div>
      </div>
    </v-app-bar>
    <v-sheet
      id="scrolling-tag"
      class="overflow-y-auto"
      v-resize="onResize"
      ref="sheet"
      :color="sheetBgColor"
      :max-height="windowSize.y - 1"
    >
      <div ref="wrapper" class="wrapper">
        <!-- <div class="top-navbar">
          <div class="logo">
            <a href="#">Nai Cha</a>
          </div>
          <div class="top-menu">
            <div class="home-link">
              <a href="#">
                <span class="icon"><i class="fas fa-home"></i></span>
                <span>Home</span>
              </a>
            </div>
            <div class="right-info">
              <div class="test">nihao</div>
              <div class="icon-wrap">
                <div class="icon">
                  <i class="fas fa-bell"></i>
                </div>
              </div>
              <div class="icon-wrap">
                <div class="icon">
                  <i class="fas fa-cog"></i>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <div class="main-body">
          <div ref="sidebar" class="sidebar-menu">
            <div class="inner--sidebar-menu">
              <v-navigation-drawer
                v-model="drawer"
                height="100vh"
                permanent
                dark
                hide-overlay
                color="transparent"
                disable-route-watcher
              >
                <!-- <v-list-item class="side-list-item">
                  <v-list-item-avatar>
                    <v-img :src="imgUrl"> </v-img>
                  </v-list-item-avatar>

                  <v-list-item-title>John Leider</v-list-item-title>

                  <v-btn icon @click.stop="mini = !mini">
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                </v-list-item> -->

                <v-divider></v-divider>
                <v-list dark :expand="listExpand" nav>
                  <template v-for="(item, index) in routes">
                    <v-list-item
                      v-if="item.isMain"
                      :key="index"
                      :to="item.to"
                      :input-value="item.isActive"
                      class="side-list-item"
                      :active-class="itemActiveColor"
                      link
                      :ripple="{ class: 'side-ripple-color' }"
                    >
                      <v-list-item-icon ref="icon" class="side-list-item-icon">
                        <v-icon size="24" v-text="item.icon"></v-icon>
                      </v-list-item-icon>

                      <v-list-item-content
                        ref="content"
                        class="side-list-item-content"
                      >
                        <v-list-item-title
                          v-text="item.text"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-group
                      v-else
                      @click="groupClick($event)"
                      :key="index"
                      :value="item.isActive"
                      :active-class="groupActiveColor"
                      color="success"
                      class="side-list-group"
                      :ripple="{ class: 'side-ripple-color' }"
                    >
                      <template v-slot:activator>
                        <v-list-item-icon
                          ref="icon"
                          class="side-list-group-header-icon"
                        >
                          <v-icon size="24" v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content
                          ref="content"
                          class="side-list-group-header-content"
                        >
                          <v-list-item-title
                            v-text="item.text"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </template>
                      <v-list-item
                        v-for="(content, i) in item.content"
                        :key="i"
                        :to="content.to"
                        :input-value="item.isActive"
                        :active-class="itemActiveColor"
                        class="side-list-group-item"
                        link
                        :ripple="{ class: 'side-ripple-color' }"
                      >
                        <v-list-item-icon
                          ref="group_icon"
                          class="side-list-group-item-icon"
                        >
                          <v-icon size="24" v-text="content.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content
                          ref="group_content"
                          class="side-list-group-item-content"
                        >
                          <v-list-item-title
                            v-text="content.text"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-group>
                  </template>
                </v-list>
              </v-navigation-drawer>
              <ul>
                <!-- <li>
                <a href="#">
                  <span class="icon"> <i class="fas fa-border-all"></i></span>
                  <span class="list">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#" class="active">
                  <span class="icon"><i class="fas fa-chart-pie"></i></span>
                  <span class="list">Charts</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="icon"><i class="fas fa-address-book"></i></span>
                  <span class="list">Contact</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="icon"><i class="fas fa-address-card"></i></span>
                  <span class="list">About</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="icon"><i class="fab fa-blogger"></i></span>
                  <span class="list">Blogs</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="icon"
                    ><i class="fas fa-map-marked-alt"></i
                  ></span>
                  <span class="list">Maps</span>
                </a>
              </li> -->
              </ul>

              <div ref="hamburger" class="hamburger">
                <div class="inner-hamburger">
                  <span class="arrow">
                    <i ref="arrowLeft" class="fas fa-long-arrow-alt-left"></i>
                    <i ref="arrowRight" class="fas fa-long-arrow-alt-right"></i>
                    <!-- <i>i</i> -->
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div ref="container" class="main-container">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </v-sheet>
  </div>
</template>
<script>
import { sidebarData, sidebarAnim, groupItemAnim } from '@js/sidebar'
import imgLocalUrl from '@static/images/avatar.jpg'
import styles from '@styles/color'
export default {
  name: 'system',
  data() {
    return {
      windowSize: {
        x: 0,
        y: 0
      },
      sheetBgColor: styles.bgcolor,
      drawer: true,
      sidebarOpen: true,
      sidebarOpenCount: 0,
      //设置列表的expand参数，为true时，列表不会自动折叠
      listExpand: true,
      itemActiveColor: 'side-list-item-active',
      groupActiveColor: 'side-list-item-active',
      mini: false,
      routes: sidebarData,
      // imgUrl:'https://randomuser.me/api/portraits/men/85.jpg',
      imgUrl: imgLocalUrl
    }
  },
  mounted() {
    // console.log(styles)
    // this.$refs.sheet.color = styles.bgcolor
    //挂载浏览器高度获取方法
    this.onResize()
    sidebarAnim(this)
  },
  methods: {
    //获取浏览器窗口大小，浏览器窗口发生改变时触发该函数
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      // console.log(this.windowSize)
    },
    groupClick(event) {
      if (!this.sidebarOpen) {
        //获取点击对象
        var el = event.currentTarget
        if (el.getAttribute('aria-expanded') == 'false') {
          //侧栏关闭状态下，其列表处于关闭状态，点击打开时，开启动画
          groupItemAnim(true, this)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" src="@styles/nav_sidebar.scss" scoped></style>
<style lang="scss" scoped>
>>> .side-ripple-color {
  color: #f57c00 !important;
  caret-color: #f57c00 !important;
}
</style>
