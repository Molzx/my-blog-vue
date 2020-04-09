<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-01-19 22:44:26
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-09 13:30:30
 * @FilePath     : \VueProjects\my-blog\src\components\helper\Toast.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-snackbar
    :color="color"
    :bottom="bottom"
    :top="top"
    :left="left"
    :right="right"
    v-model="toast"
    dark
    :timeout="timeout"
  >
    <v-icon class="mr-3" :color="iconColor" v-text="icon"> </v-icon>
    <div v-html="toastText"></div>
    <v-icon v-if="showHideIcon" size="16" @click="toast = false">
      mdi-close-circle
    </v-icon>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'info'
      // validator: val =>
      //   ['purple', 'info', 'success', 'warning', 'error'].includes(val)
    },
    top: {
      type: Boolean,
      default: true
    },
    bottom: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: false
    },
    timeout: {
      type: Number,
      default: 6000
    },
    icon: {
      type: String,
      default: 'mdi-bell-plus'
    },

    iconColor: {
      type: String,
      default: 'white'
    },

    text: {
      type: String,
      default:
        'Welcome to <b>Vue Material Dashboard</b> - a beautiful freebie for every web developer.'
    },
    showHideIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      toast: this.show
    }
  },
  watch: {
    show(newVal) {
      this.toast = newVal
    },
    timeout(newVal) {
      console.log(newVal)
    },
    color(newVal) {
      console.log(newVal)
    }
  },
  computed: {
    toastText() {
      return '<b>' + this.text + '</b>'
    }
  }
}
</script>

<style></style>
