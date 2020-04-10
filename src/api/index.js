/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 14:39:21
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-10 11:04:54
 * @FilePath     : \VueProjects\my-blog\src\api\index.js
 * @Description  : api接口的统一出口
 */

// 验证码模块接口
import captcha from './main/captcha'

// 登录模块接口
import login from './main/login'
import user from './main/system/user'
import role from './main/system/role'
import permission from './main/system/permission'
import file from './main/system/file'
import tag from './main/system/tag'
import category from './main/system/category'
import article from './main/system/article'
import comment from './main/system/comment'
import like from './main/system/like'
import collect from './main/system/collect'
import announcement from './main/system/announcement'
import report from './main/system/user-report'

import blog from './main/blog'
import system from './main/system'

// 其他模块的接口……

// 导出接口
export default {
  login,
  captcha,
  user,
  role,
  permission,
  file,
  tag,
  category,
  article,
  comment,
  blog,
  system,
  like,
  collect,
  announcement,
  report
  // ……
}
