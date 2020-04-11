/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-30 13:43:47
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-30 13:44:04
 * @FilePath     : \VueProjects\my-blog\src\utils\storage\session-storage.js
 * @Description  : 这是一些注释
 */
import { AESStoreEncrypt, AESStoreDecrypt } from '../secret'
const ls = window.sessionStorage
export default {
  getItem(key) {
    try {
      let val = ls.getItem(key)
      // return JSON.parse(val)
      return AESStoreDecrypt(val)
    } catch (err) {
      return null
    }
  },
  setItem(key, val) {
    // ls.setItem(key, JSON.stringify(val))
    ls.setItem(key, AESStoreEncrypt(val))
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
