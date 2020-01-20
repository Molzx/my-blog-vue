/*
 * @Author       : xuzhenghao
 * @Date         : 2019-12-06 22:00:27
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-20 14:19:55
 * @FilePath     : \VueProjects\vuetify-material-dashboard-master\vuetify-material-dashboard-master\src\components\index.js
 * @Description  : 自动化加载component，使用 ：文件夹-文件名 (全小写)
 */
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context('@components', true, /\.vue$/, 'lazy')

requireComponent.keys().forEach(fileName => {
  // const componentConfig = requireComponent(fileName).default
  const componentConfig = require(`${fileName}`).default
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

import Toast from './toast'
Vue.use(Toast)
