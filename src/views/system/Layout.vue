<template>
  <div>
    <div ref="wrapper" class="wrapper">
      <div class="top_navbar">
        <div class="logo">
          <a href="#">Nai Cha</a>
        </div>
        <div class="top_menu">
          <div class="home_link">
            <a href="#">
              <span class="icon"><i class="fas fa-home"></i></span>
              <span>Home</span>
            </a>
          </div>
          <div class="right_info">
            <div class="test">nihao</div>
            <div class="icon_wrap">
              <div class="icon">
                <i class="fas fa-bell"></i>
              </div>
            </div>
            <div class="icon_wrap">
              <div class="icon">
                <i class="fas fa-cog"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="main_body">
        <div ref="sidebar" class="sidebar_menu">
          <div class="inner__sidebar_menu">
            <v-navigation-drawer
              v-model="drawer"
              height="100vh"
              permanent
              dark
              hide-overlay
              color="transparent"
              disable-route-watcher
            >
              <v-list-item class="side-list-item">
                <v-list-item-avatar>
                  <v-img :src="imgUrl"> </v-img>
                </v-list-item-avatar>

                <v-list-item-title>John Leider</v-list-item-title>

                <v-btn icon @click.stop="mini = !mini">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
              </v-list-item>

              <v-divider></v-divider>
              <v-list dark :expand="listExpand" nav>
                <template v-for="(item, index) in routes">
                  <v-list-item
                    v-if="item.isMain"
                    :key="index"
                    :to="item.to"
                    :input-value="item.isActive"
                    class="side-list-item"
                    :active-class="item_activeColor"
                    link
                    :ripple="{ class: 'side-ripple-color' }"
                  >
                    <v-list-item-icon ref="icon" class="side-list-item-icon">
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content
                      ref="content"
                      class="side-list-item-content"
                    >
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-group
                    v-else
                    @click="groupClick($event)"
                    :key="index"
                    :value="item.isActive"
                    :active-class="groud_activeColor"
                    color="success"
                    class="side-list-group"
                    :ripple="{ class: 'side-ripple-color' }"
                  >
                    <template v-slot:activator>
                      <v-list-item-icon
                        ref="icon"
                        class="side-list-group-header-icon"
                      >
                        <v-icon v-text="item.icon"></v-icon>
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
                      :active-class="item_activeColor"
                      class="side-list-group-item"
                      link
                      :ripple="{ class: 'side-ripple-color' }"
                    >
                      <v-list-item-content
                        ref="group_content"
                        class="side-list-group-item-content"
                      >
                        <v-list-item-title
                          v-text="content.text"
                        ></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-icon
                        ref="group_icon"
                        class="side-list-group-item-icon"
                      >
                        <v-icon v-text="content.icon"></v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list-group>
                </template>
                <!-- <v-list-item to="/system/temp1" link>
                    <v-list-item-icon>
                      <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>Home</v-list-item-title>
                  </v-list-item>  -->
                <!-- <v-list-group
                    v-for="(route, i) in routes"
                    :key="i"
                    active-class="black"
                    :prepend-icon="route.icon"
                    :value="route.isActive"
                  >
                    <template v-slot:activator>
                      <v-list-item-title>{{ route.text }}</v-list-item-title>
                    </template>
                    <v-list-item
                      v-for="(content, j) in route.content"
                      :key="j"
                      :to="content.to"
                      active-class="black"
                      link
                    >
                      <v-list-item-icon>
                        <v-icon>{{ content.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{
                          content.text
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-group> -->
                <!-- <v-list-item
                    v-for="(link, i) in links"
                    :key="i"
                    :to="link.to"
                    active-class="black"
                    link
                  >
                    <v-list-item-icon>
                      <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item> -->
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
              <div class="inner_hamburger">
                <span class="arrow">
                  <i ref="arrowLeft" class="fas fa-long-arrow-alt-left"></i>
                  <i ref="arrowRight" class="fas fa-long-arrow-alt-right"></i>
                  <!-- <i>i</i> -->
                </span>
              </div>
            </div>
          </div>
        </div>

        <div ref="container" class="main_container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { sidebarData, sidebarAnim, groupItemAnim } from '@js/sidebar'
import imgLocalUrl from '@static/images/avatar.jpg'
export default {
  name: 'system',
  data() {
    return {
      drawer: true,
      sidebarOpen: true,
      sidebarOpenCount: 0,
      //设置列表的expand参数，为true时，列表不会自动折叠
      listExpand: true,
      item_activeColor: 'side-list-item-active',
      groud_activeColor: 'side-list-item-active',
      mini: false,
      routes: sidebarData,
      // imgUrl:'https://randomuser.me/api/portraits/men/85.jpg',
      imgUrl: imgLocalUrl
    }
  },
  mounted() {
    sidebarAnim(this)
  },
  methods: {
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
