/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-24 13:47:49
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-25 10:02:33
 * @FilePath     : \VueProjects\my-blog\src\plugins\vue-i18n.js
 * @Description  : 这是一些注释
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@common/lang/en'
import cn from '@common/lang/cn'

// 语言标识
let language = 'zh-CN'
// let language = 'en-US'

const messages = {
  'zh-CN': cn, // 中文语言包
  'en-US': en // 英文语言包
}
Vue.use(VueI18n)

//定义标识符
const i18n = new VueI18n({
  locale: language, // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages
  // messages: {
  //   'zh-CN': cn, // 中文语言包
  //   'en-US': en // 英文语言包
  // }
})
export { i18n }
