/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-19 23:21:01
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-25 20:43:02
 * @FilePath     : \VueProjects\my-blog\src\components\tip-dialog.js
 * @Description  : 这是一些注释
 */
import TipDialogVue from './helper/TipDialog.vue'
// 定义插件对象
const TipDialog = {}
// vue的install方法，用于定义vue插件
// eslint-disable-next-line no-unused-vars
TipDialog.install = function(Vue, options) {
  const TipDialogInstance = Vue.extend(TipDialogVue)
  let currentDialog
  const initInstance = () => {
    // 实例化vue实例
    currentDialog = new TipDialogInstance()
    let tipDialogEl = currentDialog.$mount().$el
    // document.body.appendChild(el) // 把生成的提示的dom插入body中
    document.getElementById('app').appendChild(tipDialogEl)
    // document.body.appendChild(tipDialogEl)
  }
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$tipDialog = {
    showTipDialog(options) {
      if (!currentDialog) {
        initInstance()
      }
      if (typeof options === 'string') {
        currentDialog.content = options
      } else if (typeof options === 'object') {
        Object.assign(currentDialog, options)
      }
      return currentDialog
        .showTipDialog()
        .then(val => {
          currentDialog = null
          return Promise.resolve(val)
        })
        .catch(err => {
          currentDialog = null
          return Promise.reject(err)
        })
    }
  }
}
export default TipDialog
