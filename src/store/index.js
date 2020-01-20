/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 15:13:35
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-18 15:14:15
 * @FilePath     : \VueProjects\my-blog\src\store\index.js
 * @Description  : 存储相关的信息
 */

import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
// import modules from './modules'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  getters,
  // modules,
  mutations,
  state
})

export default store
