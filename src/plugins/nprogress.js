/*
 * @Author       : xuzhenghao
 * @Date         : 2020-02-13 15:52:09
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-13 15:55:12
 * @FilePath     : \VueProjects\my-blog\src\plugins\nprogress.js
 * @Description  : 这是一些注释
 */
//网页加载进度条

import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})
export default NProgress
