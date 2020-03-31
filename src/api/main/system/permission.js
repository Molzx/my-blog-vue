/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-20 19:41:58
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-04 13:27:32
 * @FilePath     : \VueProjects\my-blog\src\api\main\permission.js
 * @Description  : 权限管理相关接口
 */
// 导入接口域名列表
import base from '../../base'

// http.js中创建的axios 方法实例
import {
  getRequest,
  jsonPostRequest,
  jsonPutRequest,
  deleteRequest
} from '@/utils/axios/http'
const UrlPrefix = base.baseUrl + 'permissions/'

const permission = {
  //=====================添加=====================

  //添加权限
  toAddition: params => {
    // let params = {
    //   url: url,
    //   path: path,
    //   type: type,
    //   name: name,
    //   description: description,
    //   component: component,
    //   status: status
    // }
    return jsonPostRequest(UrlPrefix + 'item', params)
  },

  //=====================删除=====================
  // 根据记录ID删除记录
  toDeleteById: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { permissionId: params }
    } else {
      obj = params
    }
    return deleteRequest(UrlPrefix + 'item', obj)
  },

  //=====================更新=====================

  // 修改权限信息
  toUpdate: params => {
    // let params = {
    //   permissionId: permissionId,
    //   url: url,
    //   path: path,
    //   type: type,
    //   name: name,
    //   description: description,
    //   component: component,
    //   status: status
    // }
    return jsonPutRequest(UrlPrefix + 'item', params)
  },

  //=====================查询=====================
  //获取系统管理可供展示的数据
  toGetAllInfo: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { permissionId: params }
    } else {
      obj = params
    }
    return getRequest(UrlPrefix + 'item/all-info', obj)
  },

  //获取权限列表分页数据
  toGetListInfo: () => {
    let url = UrlPrefix + 'list'
    return getRequest(url)
  },

  //获取权限列表分页数据
  toGetPageListInfo: params => {
    let obj = JSON.parse(JSON.stringify(params))

    // obj.status == 'all' ? delete obj.status : obj.status
    // obj.search == '' ? delete obj.search : obj.search

    //如果是查询所有，即状态是 all 或者 id等于 0的，把参数删除，不上传到后台
    for (let key in obj) {
      // console.log(key + '---' + obj[key])
      if (obj[key] == 'all' || obj[key] == 0 || obj[key] == '' || !obj[key]) {
        delete obj[key]
      }
    }
    let url = UrlPrefix + 'page-list'
    return getRequest(url, obj)
  }
}
//导出接口方法
export default permission
