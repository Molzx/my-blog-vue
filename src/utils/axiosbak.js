/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 14:21:12
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-31 09:56:48
 * @FilePath     : \VueProjects\my-blog\src\plugins\axios.js
 * @Description  : axios封装--请求拦截、响应拦截、错误统一处理
 */

import Vue from 'vue'

// Lib imports
import axios from 'axios'

import router from '@/router'
import store from '@/store/index'

// 将axios挂载到vue的原型上
Vue.prototype.$http = axios

//引入自定义通知组件
const toast = Vue.prototype.$toast

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toast.warning('需要登录')
      toLogin()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      toast.warning('登录过期，请重新登录')
      // tip('登录过期，请重新登录')
      localStorage.removeItem('Authorization')
      store.commit('loginSuccess', null)
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    // 404请求不存在
    case 404:
      toast.error('请求的资源不存在')
      // tip('请求的资源不存在')
      break
    default:
      toast.error('请求失败：' + status)
      console.log(other)
  }
}

// axios配置
let config = {
  // baseURL: '/api',
  timeout: 12 * 1000
  // withCredentials: true
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

// 创建axios实例
const instance = axios.create(config)

// 设置post请求头
// instance.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded'

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = store.state.Authorization
    token && (config.headers.Authorization = token)
    return config
  },
  // 对请求错误做些什么
  error => Promise.reject(error)
  // error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    // res.data.code === 200 ? Promise.resolve(res) : Promise.reject(res)
    // 对响应数据做点什么
    // 状态码全部是后端随性而来，哎~所有状态码返回在res.data里面
    // 这里的状态码可根据实际情况来修改

    // 数据正常情况下返回200
    if (res.data.code == '200') {
      return Promise.resolve(res)
    } else {
      // 数据不正常情况下返回（比如：token过期，参数不足）
      // judgeErrorCode详情看errorCode文件
      // judgeErrorCode(`code${res.data.code}`, res.data.msg)
      console.log(res.data)
      return Promise.reject(res)
    }
  },
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      // errorHandle(response.status, response)
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      store.commit('changeNetwork', false)
    }
  }
)

export default instance
