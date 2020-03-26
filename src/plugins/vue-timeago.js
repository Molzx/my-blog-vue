import Vue from 'vue'
import VueTimeago from 'vue-timeago'
import { i18n } from './vue-i18n'

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: i18n.locale,
  // locale: 'en', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    'en-US': require('date-fns/locale/en')
    // ja: require('date-fns/locale/ja')
  }
})
