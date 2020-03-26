/*
 * @Author       : xuzhenghao
 * @Date         : 2020-03-16 22:02:32
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-18 10:20:48
 * @FilePath     : \VueProjects\my-blog\src\api\main\system\user-report.js
 * @Description  : 这是一些注释
 */
/* eslint-disable no-unused-vars */
// 导入接口域名列表
import base from '../../base'

// http.js中创建的axios 方法实例
import {
  getRequest,
  filesRequest,
  filesPutRequest,
  jsonPostRequest,
  jsonPutRequest,
  deleteRequest
} from '@/utils/axios/http'
const UrlPrefix = base.baseUrl
const Prefix = UrlPrefix + 'user-reports/'
const userReport = {
  //=====================添加=====================

  //添加举报信息
  toAddition: params => {
    // let params = {
    //   // 举报人的帐号ID，前台新增不传
    //   reporter: reporter,
    //   // 被举报人的帐号ID
    //   accusedUser: accusedUser,
    //   // 举报理由
    //   reason: reason,
    //   // 状态标记 { 0：启用，1：禁用 }，前台新增不传
    //   status: status
    // }
    return jsonPostRequest(Prefix + 'item', params)
  },

  // =====================删除=====================

  // 根据id删除举报信息
  toDeleteById: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { id: params }
    } else {
      obj = params
    }
    return deleteRequest(Prefix + 'item', obj)
  },

  //=====================更新=====================
  toUpdate: params => {
    // let params = {
    //   // 主键ID
    //   id: id,
    //   // 记录状态 { 0：待处理，1：处理中，2：已解决 }
    //   handledStatus: handledStatus,
    //   // 状态标记 { 0：启用，1：禁用 }，前台新增不传
    //   status: status
    // }
    return jsonPutRequest(Prefix + 'item', params)
  },

  //=====================查询=====================

  //获取系统管理举报信息可供展示的数据
  toGetInfoById: params => {
    // console.log(params)
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { id: params }
    } else {
      obj = params
    }
    return getRequest(Prefix + 'item', obj)
  },
  //获取举报信息列表分页数据
  toGetPageListInfo: params => {
    let obj = JSON.parse(JSON.stringify(params))
    // let state = params.state == 'all' ? '' : params.state
    //如果是查询所有，即状态是 all 或者 id等于 0的，把参数删除，不上传到后台
    obj.status == 'all' ? delete obj.status : obj.status
    obj.search == '' ? delete obj.search : obj.search

    let url = Prefix + 'page-list'
    return getRequest(url, obj)
  }
}

//导出接口方法
export default userReport
