/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-20 19:41:47
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-04 21:37:12
 * @FilePath     : \VueProjects\my-blog\src\api\main\role.js
 * @Description  : 角色管理相关接口
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
const UrlPrefix = base.baseUrl + 'roles/'
const UrlPrefix_p = base.baseUrl + 'role-permission/'

const role = {
  //=====================添加=====================

  //添加角色
  toAddition: params => {
    // let params= {
    //   code: code,
    //   name: name,
    //   description: description
    // }
    return jsonPostRequest(UrlPrefix + 'item', params)
  },

  //=====================删除=====================
  // 根据记录ID删除记录
  toDeleteById: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { roleId: params }
    } else {
      obj = params
    }
    return deleteRequest(UrlPrefix + 'item', obj)
  },

  //=====================更新=====================

  // 修改角色信息
  toUpdate: params => {
    // let params = {
    //   roleId: roleId,
    //   code: code,
    //   name: name,
    //   description: description,
    //   status: status
    // }
    return jsonPutRequest(UrlPrefix + 'item', params)
  },
  // 修改角色代码
  toUpdateCode: (roleId, code) => {
    let params = {
      roleId: roleId,
      code: code
    }
    return jsonPutRequest(UrlPrefix + 'item/role-code', params)
  },
  // 修改角色名称
  toUpdateName: (code, name) => {
    let params = {
      code: code,
      name: name
    }
    return jsonPutRequest(UrlPrefix + 'item/role-name', params)
  },
  // 修改角色描述
  toUpdateDesc: (code, description) => {
    let params = {
      code: code,
      description: description
    }
    return jsonPutRequest(UrlPrefix + 'item/role-desc', params)
  },
  // 修改角色状态
  toUpdateStatus: (code, status) => {
    let params = {
      code: code,
      status: status
    }
    return jsonPutRequest(UrlPrefix + 'item/role-status', params)
  },

  //=====================查询=====================
  //获取系统管理角色可供展示的数据
  toGetAllInfo: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { roleId: params }
    } else {
      obj = params
    }
    return getRequest(UrlPrefix + 'item/all-info', obj)
  },

  //获取新建用户用的可供展示的数据
  toGetUserUseListInfo: () => getRequest(UrlPrefix + 'list/user'),

  //获取角色列表分页数据
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
  },

  //===================角色权限表相关===============================

  //=====================添加=====================

  //为角色添加一个权限
  toAddPermission: (roleId, permissionId) => {
    let params = {
      roleId: roleId,
      permissionId: permissionId
    }
    return jsonPostRequest(UrlPrefix_p + 'records', params)
  },
  //为角色添加多个权限
  toAddPermissions: (roleId, permissionIds) => {
    let params = {
      roleId: roleId,
      permissionIds: permissionIds
    }
    return jsonPostRequest(UrlPrefix_p + 'roles/id/permissions', params)
  },
  //=====================删除=====================

  //=====================更新=====================
  // 更新角色的拥有的权限记录的状态
  toUpdPermissionStatus: (roleId, permissionId, status) => {
    let params = {
      roleId: roleId,
      permissionId: permissionId,
      status: status
    }
    return jsonPutRequest(UrlPrefix_p + 'records', params)
  },
  //=====================查询=====================

  //获取角色未拥有的全部权限
  toGetNotHasPermissions: roleId =>
    getRequest(UrlPrefix_p + 'roles/' + roleId + '/other/permissions'),

  //获取角色拥有的全部权限
  toGetHasPermissions: roleId =>
    getRequest(UrlPrefix_p + 'roles/' + roleId + '/own/permissions')
}
//导出接口方法
export default role
