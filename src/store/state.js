/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-15 17:35:35
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-18 15:16:31
 * @FilePath     : \VueProjects\blog\src\store\state.js
 * @Description  : 这是一些注释
 */
// https://vuex.vuejs.org/en/state.html

export default {
  //

  //存储验证码key
  CodeKey: localStorage.getItem('CodeKey')
    ? localStorage.getItem('CodeKey')
    : '',
  // 存储token
  Authorization: localStorage.getItem('Authorization')
    ? localStorage.getItem('Authorization')
    : ''
}
