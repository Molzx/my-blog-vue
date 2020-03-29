/*
 * @Author       : xuzhenghao
 * @Date         : 2020-03-16 10:37:38
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-27 13:52:14
 * @FilePath     : \VueProjects\my-blog\src\plugins\blog\index.js
 * @Description  : 这是一些注释
 */
import Vue from 'vue'
import filters from './filters' //将全部过滤器放在 filters/index.js 中便于管理
// 加载全局变量
import global from './global'
// 挂载
Vue.prototype.$global = global
//技巧 同时 use 多个插件 被依赖的插件应放在偏后方
filters(Vue)
//导入路由
// eslint-disable-next-line no-unused-vars
import router from '@/router'
//导入vuex
import store from '@/store'
//导入动画
import { TweenMax, Power2, Bounce } from '@common/tweenmax/all'
let TweenMaxObject = { TweenMax, Power2, Bounce }
import functions from './fct'
Vue.use(functions, router, store, TweenMaxObject)
