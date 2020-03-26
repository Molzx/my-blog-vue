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

const user = {
  //=====================添加=====================
  //注册用户
  toRegister: params => {
    // params: {
    //       userName: userName,
    //       password: password,
    //       codeKey: codeKey,
    //       captcha: captcha
    //     }
    return jsonPostRequest(UrlPrefix + 'users/register', params)
  },

  //添加用户

  toAdd: params => filesRequest(UrlPrefix + 'users/item', params),

  // 添加用户信息（系统用）

  // =====================删除=====================

  // 根据用户名删除用户
  toDeleteByUserName: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { userName: params }
    } else {
      obj = params
    }
    return deleteRequest(UrlPrefix + 'users/item', obj)
  },

  //=====================更新=====================
  toUpdate: params => filesPutRequest(UrlPrefix + 'users/item', params),

  // 修改用户头像
  toUpdateAvatar: params =>
    filesRequest(UrlPrefix + 'users/item/avatar', params),

  // 修改用户年龄
  toUpdateAge: (params, userName) => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = {
        age: params,
        //用户名可为空，系统调用时不能为空
        userName: userName
      }
    } else {
      obj = params
    }
    return jsonPutRequest(UrlPrefix + 'users/item/age', obj)
  },
  // 修改用户个性签名
  toUpdateAutograph: (params, userName) => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = {
        autograph: params,
        //用户名可为空，系统调用时不能为空
        userName: userName
      }
    } else {
      obj = params
    }
    return jsonPutRequest(UrlPrefix + 'users/item/autograph', obj)
  },
  //校验手机号码
  toVerifyPhone: params => {
    // params: {
    //   phone: phone,
    //   codeKey: codeKey,
    //   captcha: captcha,
    //     }
    return jsonPostRequest(UrlPrefix + 'users/verify/phone', params)
  },
  //校验邮箱
  toVerifyEmail: params => {
    // params: {
    //   phone: phone,
    //   codeKey: codeKey,
    //   captcha: captcha,
    //     }
    return jsonPostRequest(UrlPrefix + 'users/verify/email', params)
  },
  //校验密码
  toVerifyPsw: params => {
    // params: {
    //   password: password,
    //   codeKey: codeKey,
    //   captcha: captcha,
    //     }
    return jsonPostRequest(UrlPrefix + 'users/verify/password', params)
  },
  // 修改用户手机号码
  toUpdatePhone: params => {
    // params: {
    //   phone: phone,
    //   codeKey: codeKey,
    //   captcha: captcha,
    //   //用户名可为空，系统调用时不能为空
    //   userName: userName
    // }
    return jsonPostRequest(UrlPrefix + 'users/item/phone', params)
  },
  // 修改用户邮箱
  toUpdateEmail: params => {
    // params: {
    //   email: email,
    //   codeKey: codeKey,
    //   captcha: captcha,
    //   //用户名可为空，系统调用时不能为空
    //   userName: userName
    // }
    return jsonPostRequest(UrlPrefix + 'users/item/email', params)
  },
  //解绑用手机号
  toUnbindPhone: () => jsonPutRequest(UrlPrefix + 'users/unbind/phone'),
  //解绑用户邮箱
  toUnbindEmail: () => jsonPutRequest(UrlPrefix + 'users/unbind/email'),
  // 修改用户性别
  toUpdateGender: (params, userName) => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = {
        gender: params,
        //用户名可为空，系统调用时不能为空
        userName: userName
      }
    } else {
      obj = params
    }
    return jsonPutRequest(UrlPrefix + 'users/item/gender', obj)
  },
  // 修改用户昵称
  toUpdateNickName: (params, userName) => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = {
        nickName: params,
        //用户名可为空，系统调用时不能为空
        userName: userName
      }
    } else {
      obj = params
    }
    return jsonPutRequest(UrlPrefix + 'users/item/nick-name', obj)
  },
  // 修改用户密码
  toUpdatePassword: params => {
    // params: {
    //   password: password,
    //   codeKey: codeKey,
    //   captcha: captcha,
    //   //用户名可为空，系统调用时不能为空
    //   userName: userName
    // }
    return jsonPostRequest(UrlPrefix + 'users/item/password', params)
  },
  // 修改用户状态
  toUpdateState: (params, userName) => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = {
        state: params,
        //用户名可为空，系统调用时不能为空
        userName: userName
      }
    } else {
      obj = params
    }
    return jsonPutRequest(UrlPrefix + 'users/item/state', obj)
  },
  // 修改帐号状态
  toUpdateStatus: (params, userName) => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = {
        status: params,
        //用户名可为空，系统调用时不能为空
        userName: userName
      }
    } else {
      obj = params
    }
    return jsonPutRequest(UrlPrefix + 'users/item/status', obj)
  },

  //=====================查询=====================

  //获取用户少部分数据
  toGetLessInfo: () => getRequest(UrlPrefix + 'users/item/less-info'),

  //获取用户个人信息展示数据
  toGetSomeInfo: () => getRequest(UrlPrefix + 'users/item/some-info'),

  //获取系统管理用户可供展示的数据
  toGetOtherUserInfo: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { userId: params }
    } else {
      obj = params
    }
    return getRequest(UrlPrefix + 'users/item/other/some-info', obj)
  },
  //获取系统管理用户可供展示的数据
  toGetMoreInfo: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { userName: params }
    } else {
      obj = params
    }
    return getRequest(UrlPrefix + 'users/item/more-info', obj)
  },

  //获取系统管理用户可供展示的数据
  toGetAllInfo: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { userName: params }
    } else {
      obj = params
    }
    return getRequest(UrlPrefix + 'users/item/all-info', obj)
  },

  //获取系统管理用户可供展示的数据
  toGetListInfo: () => getRequest(UrlPrefix + 'users/list'),

  //获取用户列表分页数据
  toGetPageListInfo: params => {
    let obj = JSON.parse(JSON.stringify(params))

    obj.status == 'all' ? delete obj.status : obj.status
    obj.state == 'all' ? delete obj.state : obj.state
    obj.search == '' ? delete obj.search : obj.search

    let url = UrlPrefix + 'users/page-list/more-info'
    return getRequest(url, obj)
  },

  //===================用户角色表相关===============================

  //=====================添加=====================

  //为用户添加一个角色
  toAddRole: (userId, roleId) => {
    let params = {
      userId: userId,
      roleId: roleId
    }
    return jsonPostRequest(UrlPrefix + 'user-role/records', params)
  },
  //为用户添加多个角色
  toAddRoles: (userId, roleIds) => {
    let params = {
      userId: userId,
      roleIds: roleIds
    }
    return jsonPostRequest(UrlPrefix + 'user-role/users/id/roles', params)
  },
  //=====================删除=====================

  //=====================更新=====================
  // 更新用户的拥有的角色记录的状态
  toUpdRoleStatus: (userId, roleId, status) => {
    let params = {
      userId: userId,
      roleId: roleId,
      status: status
    }
    return jsonPutRequest(UrlPrefix + 'user-role/records', params)
  },
  //=====================查询=====================

  //获取用户未拥有的全部角色
  toGetNotHasRoles: userId =>
    getRequest(UrlPrefix + 'user-role/users/' + userId + '/other/roles'),

  //获取用户拥有的全部角色
  toGetHasRoles: userId =>
    getRequest(UrlPrefix + 'user-role/users/' + userId + '/own/roles')
}

//导出接口方法
export default user
