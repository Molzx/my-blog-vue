/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-19 23:21:01
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-09 13:31:13
 * @FilePath     : \VueProjects\my-blog\src\components\toast.js
 * @Description  : 这是一些注释
 */
import ToastVue from './helper/Toast.vue'
// import Vue from 'vue';
const TOAST = {
  color: 'info',
  // colors: ['purple', 'info', 'success', 'warning', 'error'],
  //====位置信息
  top: true,
  bottom: false,
  left: false,
  right: false,
  //Toast显示时间 ms ==== 0代表一直显示
  timeout: 6000,
  //文本信息
  text: '默认信息',
  icon: 'mdi-bell-plus',
  iconColor: ' white',
  showHideIcon: true,
  autoClose: true,
  duration: 16000,

  install(Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('Toast', ToastVue)

    // function dealData(data) {
    //   if (data) {
    //     if (data.timeout) {
    //       return data.timeout
    //     }
    //   }
    // }
    function showToast(type, text, data) {
      let color = type
      let msg,
        // duration,
        top,
        bottom,
        left,
        right,
        timeout,
        icon,
        iconColor,
        showHideIcon
      let defaultType
      let alwaysShow = false
      if (data) {
        if (data.timeout != null) {
          console.log('timeout')
          timeout = data.timeout
          alwaysShow = true
        }
      }
      if (type == 'info') {
        icon = 'mdi-info'
        defaultType = true
      } else if (type == 'success') {
        icon = 'mdi-bell'
        defaultType = true
      } else if (type == 'warning') {
        icon = 'mdi-warning'
        defaultType = true
      } else if (type == 'error') {
        icon = 'mdi-alert'
        defaultType = true
      }

      if (typeof text === 'string') {
        msg = text
      } else if (text instanceof Object) {
        msg = text.text || ''
        if (text.top !== null) {
          top = text.top
        }
        if (text.bottom !== null) {
          bottom = text.bottom
        }
        if (text.left !== null) {
          left = text.left
        }
        if (text.right !== null) {
          right = text.right
        }
        if (text.timeout !== null && !alwaysShow) {
          timeout = text.timeout
        }
        if (text.icon !== null && !defaultType) {
          icon = text.icon
        }
        if (text.iconColor !== null) {
          iconColor = text.iconColor
        }
        if (text.showHideIcon !== null) {
          showHideIcon = text.showHideIcon
        }
      }
      let VueToast = Vue.extend({
        render(h) {
          let props = {
            color: color == null ? TOAST.color : color,
            text: msg,
            show: this.show,
            top: top == null ? TOAST.top : top,
            bottom: bottom == null ? TOAST.bottom : bottom,
            left: left == null ? TOAST.left : left,
            right: right == null ? TOAST.right : right,
            timeout: timeout == null ? TOAST.timeout : timeout,
            icon: icon == null ? TOAST.icon : icon,
            iconColor: iconColor == null ? TOAST.iconColor : iconColor,
            showHideIcon:
              showHideIcon == null ? TOAST.showHideIcon : showHideIcon
          }
          return h('toast', { props })
        },
        data() {
          return {
            show: false
          }
        }
      })
      let newToast = new VueToast()
      let vm = newToast.$mount()
      let el = vm.$el
      // document.body.appendChild(el) // 把生成的提示的dom插入body中
      document.getElementById('app').appendChild(el)
      vm.show = true
      // let t1 = setTimeout(() => {
      //   clearTimeout(t1)
      //   //关闭提示组件，自动移除dom
      //   // vm.show = false
      // }, duration)
    }

    // 挂载到vue原型上，暴露四个方法
    Vue.prototype.$toast = {
      info(text, alwaysShow) {
        if (!text) return
        if (alwaysShow) {
          showToast('info', text, { timeout: 0 })
        } else {
          showToast('info', text)
        }
      },
      success(text, alwaysShow) {
        if (!text) return
        if (alwaysShow) {
          showToast('success', text, { timeout: 0 })
        } else {
          showToast('success', text)
        }
      },
      error(text, alwaysShow) {
        if (!text) return
        if (alwaysShow) {
          showToast('error', text, { timeout: 0 })
        } else {
          showToast('error', text)
        }
      },
      warning(text, alwaysShow) {
        if (!text) return
        if (alwaysShow) {
          showToast('warning', text, { timeout: 0 })
        } else {
          showToast('warning', text)
        }
      },
      color(color, text, alwaysShow) {
        if (!text) return
        if (alwaysShow) {
          showToast(color, text, { timeout: 0 })
        } else {
          showToast(color, text)
        }
      }
    }
  }
}
export default TOAST
