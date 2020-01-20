/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 14:39:21
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-18 20:06:58
 * @FilePath     : \VueProjects\my-blog\src\api\index.js
 * @Description  : api接口的统一出口
 */

// 验证码模块接口
import captcha from './main/captcha'

// 登录模块接口
import login from './main/login'

// 其他模块的接口……

// 导出接口
export default {
  login,
  captcha
  // ……
}
