/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-15 17:35:35
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-17 17:13:09
 * @FilePath     : \VueProjects\blog\src\store\mutations.js
 * @Description  : 这是一些注释
 */
// https://vuex.vuejs.org/en/mutations.html

export default {
  //
  // 修改验证码key，并将 Key存入localStorage
  changeCodeKey(state, codeInfo) {
    const codeKey = codeInfo.CodeKey
    state.CodeKey = codeKey
    localStorage.setItem('CodeKey', codeKey)
  },

  // 修改token，并将token存入localStorage
  changeLogin(state, user) {
    state.Authorization = user.Authorization
    localStorage.setItem('Authorization', user.Authorization)
  }
}
