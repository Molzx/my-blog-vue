<template>
  <v-navigation-drawer
    app
    clipped
    mobile-break-point="754"
    class="left-drawer"
    v-model="drawerStatus"
  >
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
            <v-icon class="drawer-icon" size="18" v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content ref="content">
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-else
          :key="index + 'g'"
          :value="item.isActive"
          color="success"
          :ripple="{ class: 'side-ripple-color' }"
        >
          <template v-slot:activator>
            <v-list-item-icon ref="icon">
              <v-icon size="18" v-text="item.icon"></v-icon>
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
              <v-icon size="18" v-text="content.icon"></v-icon>
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
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      routes: sidebarData,
      drawerStatus: true
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
    ...mapGetters({
      //获取抽屉状态
      getOpenDrawer: 'getOpenDrawerFun'
    })
  },
  watch: {
    //
    getOpenDrawer(newVal) {
      this.drawerStatus = newVal
    }
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
  color: hsl(212, 16%, 48%) !important;
}
</style>
