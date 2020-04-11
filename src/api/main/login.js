/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 14:42:58
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-11 23:05:25
 * @FilePath     : \VueProjects\my-blog\src\api\main\login.js
 * @Description  : 登录相关接口信息
 */

// 导入接口域名列表
import base from '../base'

// 导入axios.js中创建的axios实例
import { jsonPostRequest, getRequest } from '@/utils/axios/http'
const UrlPrefix = base.url

const login = {
  // 图片验证码登录方式
  toLoginByImageCode: params => {
    // params: {
    //   userName: userName,
    //   password: password,
    //   codeKey: codeKey,
    //   captcha: captcha
    // }
    return jsonPostRequest(UrlPrefix + 'auth/login/default', params)
  },

  // 短信验证码登录方式
  toLoginBySmsCode: params => {
    // params: {
    //   phone: phone,
    //   codeKey: codeKey,
    //   captcha: captcha
    // }
    return jsonPostRequest(UrlPrefix + 'auth/login/phone', params)
  },

  // 邮箱验证码登录方式
  toLoginByEmailCode: params => {
    // params: {
    //   email: email,
    //   codeKey: codeKey,
    //   captcha: captcha
    // }
    return jsonPostRequest(UrlPrefix + 'auth/login/email', params)
  },
  toLogOut: () => {
    return getRequest(UrlPrefix + 'auth/logout')
  }
}
//导出接口方法
export default login
