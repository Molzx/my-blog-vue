/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 15:05:35
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-19 21:34:34
 * @FilePath     : \VueProjects\my-blog\src\api\main\captcha.js
 * @Description  : 验证码发送相关接口文件
 */
// 导入接口域名列表
import base from '../base'

// 导入axios.js中创建的axios实例
import axios from '@/utils/axios'
const UrlPrefix = base.baseUrl

const captcha = {
  // 发送图片验证码
  toSendImageCode(width, height) {
    return axios({
      url: UrlPrefix + 'code/image',
      method: 'get',
      params: {
        width: width,
        height: height
      }
    })
  },

  // 发送短信验证码
  toSendSmsCode(phone, templateCode) {
    return axios({
      url: UrlPrefix + 'code/sms',
      method: 'get',
      params: {
        phone: phone,
        smsTemplateCodeEnum: templateCode
      }
    })
  },

  // 发送短信验证码
  toSendEmailCode(email, templateCode) {
    return axios({
      url: UrlPrefix + 'code/sms',
      method: 'get',
      params: {
        email: email,
        emailTemplateCodeEnum: templateCode
      }
    })
  }
}
//导出接口方法
export default captcha
