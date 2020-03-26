/* eslint-disable no-unused-vars */
/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-24 19:45:12
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-24 22:17:37
 * @FilePath     : \VueProjects\my-blog\src\plugins\vee-validate.js
 * @Description  : 这是一些注释
 */

import Vue from 'vue'
import { configure } from 'vee-validate'
import { i18n } from './vue-i18n'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  defaultMessage: (field, values) => {
    // override the field name.
    values._field_ = i18n.t(`fields.${field}`)

    return i18n.t(`validation.${values._rule_}`, values)
  }
})

import '@common/js/validateRule'
