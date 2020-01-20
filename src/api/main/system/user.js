/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-20 19:40:46
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-20 21:03:56
 * @FilePath     : \VueProjects\my-blog\src\api\main\user.js
 * @Description  : 用户管理相关接口
 */
// 导入接口域名列表
import base from '../../base'

// 导入axios.js中创建的axios实例
import axios from '@/utils/axios'
const UrlPrefix = base.baseUrl

const user = {
  //=====================添加=====================

  //注册用户
  toRegister(userName, password, codeKey, captcha) {
    return axios({
      url: UrlPrefix + 'users/item',
      method: 'post',
      data: {
        userName: userName,
        password: password,
        codeKey: codeKey,
        captcha: captcha
      }
    })
  },
  //添加用户信息（系统用）

  //=====================删除=====================

  //=====================更新=====================

  // 修改用户年龄
  toUpdateAge(age, userName) {
    return axios({
      url: UrlPrefix + 'users/item/age',
      method: 'put',
      data: {
        age: age,
        //用户名可为空，系统调用时不能为空
        userName: userName
      }
    })
  },
  // 修改用户个性签名
  toUpdateAutograph(autograph, userName) {
    return axios({
      url: UrlPrefix + 'users/item/autograph',
      method: 'put',
      data: {
        autograph: autograph,
        //用户名可为空，系统调用时不能为空
        userName: userName
      }
    })
  },
  // 修改用户手机号码
  toUpdatePhone(phone, codeKey, captcha, userName) {
    return axios({
      url: UrlPrefix + 'users/item/phone',
      method: 'put',
      data: {
        phone: phone,
        codeKey: codeKey,
        captcha: captcha,
        //用户名可为空，系统调用时不能为空
        userName: userName
      }
    })
  },
  // 修改用户邮箱
  toUpdateEmail(email, codeKey, captcha, userName) {
    return axios({
      url: UrlPrefix + 'users/item/email',
      method: 'put',
      data: {
        email: email,
        codeKey: codeKey,
        captcha: captcha,
        //用户名可为空，系统调用时不能为空
        userName: userName
      }
    })
  },
  // 修改用户性别
  toUpdateGender(gender, userName) {
    return axios({
      url: UrlPrefix + 'users/item/gender',
      method: 'put',
      data: {
        gender: gender,
        //用户名可为空，系统调用时不能为空
        userName: userName
      }
    })
  },
  // 修改用户昵称
  toUpdateNickName(nickName, userName) {
    return axios({
      url: UrlPrefix + 'users/item/nick-name',
      method: 'put',
      data: {
        nickName: nickName,
        //用户名可为空，系统调用时不能为空
        userName: userName
      }
    })
  },
  // 修改用户密码
  toUpdatePassword(password, codeKey, captcha, userName) {
    return axios({
      url: UrlPrefix + 'users/item/password',
      method: 'put',
      data: {
        password: password,
        codeKey: codeKey,
        captcha: captcha,
        //用户名可为空，系统调用时不能为空
        userName: userName
      }
    })
  },
  // 修改用户状态
  toUpdateState(state, userName) {
    return axios({
      url: UrlPrefix + 'users/item/state',
      method: 'put',
      data: {
        state: state,
        //用户名可为空，系统调用时不能为空
        userName: userName
      }
    })
  },
  // 修改帐号状态
  toUpdateStatus(status, userName) {
    return axios({
      url: UrlPrefix + 'users/item/status',
      method: 'put',
      data: {
        status: status,
        //用户名可为空，系统调用时不能为空
        userName: userName
      }
    })
  },

  //=====================查询=====================

  //获取用户少部分数据
  toGetLessInfo() {
    return axios({
      url: UrlPrefix + 'users/item/less-info',
      method: 'get'
    })
  },
  //获取用户个人信息展示数据
  toGetSomeInfo() {
    return axios({
      url: UrlPrefix + 'users/item/some-info',
      method: 'get'
    })
  },
  //获取系统管理用户可供展示的数据
  toGetMoreInfo() {
    return axios({
      url: UrlPrefix + 'users/item/more-info',
      method: 'get'
    })
  },
  //获取用户列表分页数据
  toGetPageListInfo(current, size) {
    return axios({
      url: UrlPrefix + 'users/item/page-list',
      method: 'get',
      params: {
        current: current,
        size: size
      }
    })
  }
}
//导出接口方法
export default user
