<template>
  <v-navigation-drawer app mobile-break-point="754" class="left-drawer">
    <div class="drawer__logo d-flex align-center justify-center">
      <router-link to="/system">
        <img height="50" src="../../assets/images/logo.svg" />
      </router-link>
    </div>
    <v-list class="transparent drawer-list">
      <template v-for="(item, index) in routes">
        <v-subheader v-if="hasHeader(item)" :key="'h' + index">{{
          item.header
        }}</v-subheader>
        <v-list-item
          color="green"
          v-if="item.isMain"
          :key="index + 'i'"
          :to="item.to"
          :input-value="item.isActive"
          link
          active-class="active-list"
          :ripple="{ class: 'side-ripple-color' }"
        >
          <v-list-item-icon ref="icon">
            <v-icon class="drawer-icon" size="24" v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content ref="content">
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-else
          @click="groupClick($event)"
          :key="index + 'g'"
          :value="item.isActive"
          color="success"
          :ripple="{ class: 'side-ripple-color' }"
        >
          <template v-slot:activator>
            <v-list-item-icon ref="icon">
              <v-icon size="24" v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content ref="content">
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(content, i) in item.content"
            :key="i"
            :to="content.to"
            :input-value="item.isActive"
            link
            active-class="active-list"
            :ripple="{ class: 'side-ripple-color' }"
          >
            <v-list-item-icon ref="group_icon">
              <v-icon size="24" v-text="content.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content ref="group_content">
              <v-list-item-title v-text="content.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { sidebarData } from '@js/sidebar'
export default {
  data() {
    return {
      routes: sidebarData
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    hasHeader(item) {
      if (typeof item.header == 'undefined') {
        return false
      } else {
        return true
      }
    }
  },
  computed: {
    //
  },
  watch: {
    //
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped>
//侧边list列表字体颜色
/deep/
  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: #9baaab !important;
}
</style>
