/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 14:01:53
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-11 21:29:00
 * @FilePath     : \VueProjects\my-blog\src\main.js
 * @Description  : 项目主要js文件
 */
//导入VUE
import Vue from 'vue'

// 导入路由文件、vuex文件、APP主页面
import App from './App'
import router from '@/router'
import store from '@/store'

// 导入组件自动注册
import '@components'

// 导入插件
import './plugins'

import { i18n } from '@/plugins/vue-i18n'

import vuetify from '@/plugins/vuetify'

import { sync } from 'vuex-router-sync'
// Sync store with router
sync(store, router)

// 导入api接口
import api from '@/api'

// 将api挂载到vue的原型上
//使用 this.$api.login.方法
Vue.prototype.$api = api

// 加载全局变量
import global from './assets/js/global'
// 挂载
Vue.prototype.$global = global

//加载全局样式
import '@styles/main.scss'
//导入material design icon
import 'material-design-icons-iconfont/dist/material-design-icons.css'
//导入fontawesome图标
import '@common/fontawesome-free-5.12.0/css/all.css'
//加载swiper
import '../node_modules/swiper/css/swiper.css'

// import toast from '@components/toast'
// Vue.prototype.$toast = toast

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
