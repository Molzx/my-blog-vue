/*
 * @Author       : xuzhenghao
 * @Date         : 2020-04-10 10:44:58
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-10 10:46:33
 * @FilePath     : \VueProjects\my-blog\src\api\main\system.js
 * @Description  : 这是一些注释
 */
// 导入接口域名列表
import base from '../base'

// http.js中创建的axios 方法实例
// eslint-disable-next-line no-unused-vars
import { getRequest, postRequest, jsonPostRequest } from '@/utils/axios/http'
const UrlPrefix = base.baseUrl
const prefix = UrlPrefix + 'system/'
const blog = {
  //=====================添加=====================

  //=====================删除=====================

  //=====================更新=====================

  //=====================查询=====================

  //获取system主页数据
  toGetIndex: () => getRequest(prefix + 'index')
}
//导出接口方法
export default blog
