/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 14:42:58
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-20 20:05:14
 * @FilePath     : \VueProjects\my-blog\src\api\main\login.js
 * @Description  : 登录相关接口信息
 */

// 导入接口域名列表
import base from '../base'

// 导入axios.js中创建的axios实例
import axios from '@/utils/axios'
const UrlPrefix = base.baseUrl

const login = {
  // 图片验证码登录方式
  toLoginByImageCode(userName, password, codeKey, captcha) {
    return axios({
      url: UrlPrefix + 'auth/login/default',
      method: 'post',
      data: {
        userName: userName,
        password: password,
        codeKey: codeKey,
        captcha: captcha
      }
    })
  },

  // 短信验证码登录方式
  toLoginBySmsCode(phone, codeKey, captcha) {
    return axios({
      url: UrlPrefix + 'auth/login/phone',
      method: 'post',
      data: {
        phone: phone,
        codeKey: codeKey,
        captcha: captcha
      }
    })
  },

  // 邮箱验证码登录方式
  toLoginByEmailCode(email, codeKey, captcha) {
    return axios({
      url: UrlPrefix + 'auth/login/email',
      method: 'post',
      data: {
        email: email,
        codeKey: codeKey,
        captcha: captcha
      }
    })
  }
}
//导出接口方法
export default login
