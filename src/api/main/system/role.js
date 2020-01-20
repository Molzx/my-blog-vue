/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-20 19:41:47
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-20 21:33:10
 * @FilePath     : \VueProjects\my-blog\src\api\main\role.js
 * @Description  : 角色管理相关接口
 */
// 导入接口域名列表
import base from '../../base'

// 导入axios.js中创建的axios实例
import axios from '@/utils/axios'
const UrlPrefix = base.baseUrl

const role = {
  //=====================添加=====================

  //添加角色
  toAddition(code, name, description) {
    return axios({
      url: UrlPrefix + 'roles/item',
      method: 'post',
      data: {
        code: code,
        name: name,
        description: description
      }
    })
  },

  //=====================删除=====================

  //=====================更新=====================

  // 修改角色信息
  toUpdate(roleId, code, name, description, status) {
    return axios({
      url: UrlPrefix + 'roles/item',
      method: 'put',
      data: {
        roleId: roleId,
        code: code,
        name: name,
        description: description,
        status: status
      }
    })
  },
  // 修改角色代码
  toUpdateCode(roleId, code) {
    return axios({
      url: UrlPrefix + 'roles/item/role-code',
      method: 'put',
      data: {
        roleId: roleId,
        code: code
      }
    })
  },
  // 修改角色名称
  toUpdateName(code, name) {
    return axios({
      url: UrlPrefix + 'roles/item/role-name',
      method: 'put',
      data: {
        code: code,
        name: name
      }
    })
  },
  // 修改角色描述
  toUpdateDesc(code, description) {
    return axios({
      url: UrlPrefix + 'roles/item/role-desc',
      method: 'put',
      data: {
        code: code,
        description: description
      }
    })
  },
  // 修改角色状态
  toUpdateStatus(code, status) {
    return axios({
      url: UrlPrefix + 'roles/item/role-status',
      method: 'put',
      data: {
        code: code,
        status: status
      }
    })
  },

  //=====================查询=====================

  //获取角色列表分页数据
  toGetPageListInfo(current, size) {
    return axios({
      url: UrlPrefix + 'roles/item/page-list',
      method: 'get',
      params: {
        current: current,
        size: size
      }
    })
  }
}
//导出接口方法
export default role
