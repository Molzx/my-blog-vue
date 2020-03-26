/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-29 13:14:36
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-30 14:09:20
 * @FilePath     : \VueProjects\my-blog\src\utils\storage\index.js
 * @Description  : 这是一些注释
 */

import Vue from 'vue'
import Storage from './local-storage'
import sessionStorage from './session-storage'
let storage = new Storage()

// 将 storage 挂载到vue的原型上
Vue.prototype.$storage = storage
Vue.prototype.$sessionStorage = sessionStorage

export default storage
