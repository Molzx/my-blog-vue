/* eslint-disable no-unused-vars */
/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-24 19:55:13
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-25 10:02:00
 * @FilePath     : \VueProjects\my-blog\src\common\js\validatorRule.js
 * @Description  : 这是一些注释
 */

import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

// Install required rule and message.
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

// 手机号码验证
extend('phone', {
  // message: () => `请输入正确的手机号码`,
  validate: value =>
    value.length === 11 &&
    /^(((13[0-9]{1})|(14[57]{1})|(15[012356789]{1})|(17[03678]{1})|(18[0-9]{1})|(19[89]{1})|(16[6]{1}))+\d{8})$/.test(
      value
    )
})
// 昵称验证
extend('nickName', {
  // message: () => `姓名只能包括中文字或英文字母`,
  validate: value => {
    const reg = /^([\u4e00-\u9fa5\s]|[a-zA-Z])*$/
    return reg.test(value)
  }
})
// ('phoneNum', '手机号不正确', 'phoneNum error', (value, [args]) => {
//   const reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
//   return reg.test(value)
// })
// (
//   'personName',
//   '姓名只能包括中文字或英文字母',
//   'username no yes',
//   (value, [args]) => {
//     const reg = /^([\u4e00-\u9fa5\s]|[a-zA-Z])*$/
//     return reg.test(value)
//   }
// )
