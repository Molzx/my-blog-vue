/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 15:05:35
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-31 13:47:05
 * @FilePath     : \VueProjects\my-blog\src\api\main\captcha.js
 * @Description  : 验证码发送相关接口文件
 */
// 导入接口域名列表
import base from '../base'

// 导入axios.js中创建的axios实例
import { getRequest, jsonPostRequest } from '@/utils/axios/http'
const UrlPrefix = base.url

const captcha = {
  // 发送图片验证码
  toSendImageCode: params => {
    // params: {
    //   width: width,
    //   height: height
    // }
    let url = UrlPrefix + 'code/image'
    return getRequest(url, params)
  },

  // 发送短信验证码
  toSendSmsCode: params => {
    // params: {
    //   phone: phone,
    //   smsTemplateCodeEnum: templateCode
    // }
    let url = UrlPrefix + 'code/sms'
    return jsonPostRequest(url, params)
  },

  // 发送短信验证码
  toSendEmailCode: params => {
    // params: {
    //   email: email,
    //   emailTemplateCodeEnum: templateCode
    // }
    let url = UrlPrefix + 'code/email'
    return jsonPostRequest(url, params)
  }
}
//导出接口方法
export default captcha
