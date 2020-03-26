<template>
  <div :max-width="drawerWidth" class="transition-swing left-drawer">
    <!-- <div class="arrow-wrapper align-end">
      <div ref="hamburger" class="hamburger">
        <div class="inner-hamburger">
          <span class="arrow">
            <i ref="arrowLeft" class="fas fa-long-arrow-alt-left"></i>
            <i ref="arrowRight" class="fas fa-long-arrow-alt-right"></i>
          </span>
        </div>
      </div>
    </div> -->
    <!-- <v-btn
      style="margin-top:100px;margin-left:210px"
      fab
      absolute
      dark
      left
      top
      size="32"
      color="primary"
    >
      <v-icon dark>mdi-minus</v-icon>
    </v-btn> -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      app
      clipped
      dark
      mobile-break-point="754"
      class="transparent"
      :class="drawerClass"
      :width="drawerWidth"
    >
      <v-divider></v-divider>
      <v-list dark :expand="listExpand" nav class="drawer-list">
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              @click.stop="changeWidth"
              src="https://randomuser.me/api/portraits/men/85.jpg"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-title>John Leider</v-list-item-title>

          <v-btn icon @click.stop="changeWidth">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
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

            <v-list-item-content ref="content" class="side-list-item-content">
              <v-list-item-title v-text="item.text"></v-list-item-title>
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
              <v-list-item-icon ref="icon" class="side-list-group-header-icon">
                <v-icon size="24" v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content
                ref="content"
                class="side-list-group-header-content"
              >
                <v-list-item-title v-text="item.text"></v-list-item-title>
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
                <v-list-item-title v-text="content.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { sidebarData } from '@js/sidebar'
export default {
  name: 'temp',
  data() {
    return {
      drawer: true,
      sidebarOpen: true,
      sidebarOpenCount: 0,
      //设置列表的expand参数，为true时，列表不会自动折叠
      listExpand: true,
      itemActiveColor: 'side-list-item-active',
      groupActiveColor: 'side-list-item-active',
      mini: false,
      routes: sidebarData,

      drawerClass: 'drawer-content',
      flag: true,
      drawerWidth: 250,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ]
    }
  },
  methods: {
    ...mapActions({
      setDrawerWidth: 'setDrawerWidthFun'
    }),
    changeWidth() {
      // if (this.flag) {
      //   this.drawerWidth = 100
      // } else {
      //   this.drawerWidth = 250
      // }
      // this.flag = !this.flag
      this.mini = !this.mini
      // this.setDrawerWidth(this.drawerWidth)
    }
  },
  components: {}
}
</script>

<style></style>
