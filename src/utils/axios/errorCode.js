/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-31 10:02:27
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-29 10:44:30
 * @FilePath     : \VueProjects\my-blog\src\utils\axios\errorCode.js
 * @Description  : 错误统一处理
 */
import Vue from 'vue'
import router from '@/router'
// import store from '@/store/index'

//引入自定义通知组件
const toast = Vue.prototype.$toast
// const router = Vue.prototype.$router
const judgeErrorCode = (code, message) => {
  // 判断errorCode[code]是否为一个函数
  if (errorCode[code] instanceof Function) {
    // 调用该函数
    errorCode[code](message)
  } else {
    toast.error(message)
  }
}
/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  // let path = router.currentRoute.fullPath
  // console.log(path)
  router.push({
    path: '/login',
    query: {
      hostname: location.hostname
      // path: 'ssssssystemd'
    }
  })
}

const errorCode = {
  // 需要根据状态码的不同进行不同操作
  code201: function(message) {
    toast.error(message)
    // console.log('更新失败');
  },
  code202: function(message) {
    // console.log('参数不足');
    toast.error(message)
  },
  code203: function(message) {
    // console.log('输入错误');
    toast.error(message)
  },
  code400: function() {
    // console.log('token不能为空');
    // 清空本地用户ID，并重新登录
    // store.commit('TO_LOGIN')
    toast.error('请求错误')
  },
  code401: function() {
    // 401: 未登录状态，跳转登录页
    toast.error('需要登录')
    toLogin()
  },
  code404: function(message) {
    // toast.error('请求的资源不存在')
    toast.error(message)
  },
  code405: function(message) {
    // toast.error('请求的资源不存在')
    toast.error(message)
  },
  code500: function() {
    // 服务器错误
    toast.error('服务器错误')
  },
  code100420: function(message) {
    // token无效，请重新登录
    toast.error(message + '，请重新登录')
    toLogin()
  }
}
export default judgeErrorCode
