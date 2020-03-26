/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-30 13:43:47
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-30 13:44:04
 * @FilePath     : \VueProjects\my-blog\src\utils\storage\session-storage.js
 * @Description  : 这是一些注释
 */
const ls = window.sessionStorage
export default {
  getItem(key) {
    try {
      return JSON.parse(ls.getItem(key))
    } catch (err) {
      return null
    }
  },
  setItem(key, val) {
    ls.setItem(key, JSON.stringify(val))
  },
  clear() {
    ls.clear()
  },
  keys(index) {
    return ls.key(index)
  },
  removeItem(key) {
    ls.removeItem(key)
  }
}
