/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 14:21:12
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-18 16:17:59
 * @FilePath     : \VueProjects\my-blog\src\plugins\vuetify.js
 * @Description  : 这是一些注释
 */
import Vue from 'vue'
import Vuetify from 'vuetify'
import theme from './theme'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  iconfont: 'mdi',
  theme
})
