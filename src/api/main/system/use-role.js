/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-20 21:31:01
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-20 22:06:23
 * @FilePath     : \VueProjects\my-blog\src\api\main\use-role.js
 * @Description  : 用户角色管理相关接口
 */
// 导入接口域名列表
import base from '../../base'

// 导入axios.js中创建的axios实例
import axios from '@/utils/axios'
const UrlPrefix = base.baseUrl

const userRole = {
  //=====================添加=====================

  //为用户添加一个角色
  toAddition(userId, roleId) {
    return axios({
      url: UrlPrefix + 'user-role/records',
      method: 'post',
      data: {
        userId: userId,
        roleId: roleId
      }
    })
  },
  //=====================删除=====================
  // 更新用户的拥有的角色记录的状态
  toDelete(userId, roleId, status) {
    return axios({
      url: UrlPrefix + 'user-role/records',
      method: 'delete',
      data: {
        //delete
        data: {
          userId: userId,
          roleId: roleId,
          status: status
        }
      }
    })
  },
  //=====================更新=====================

  //=====================查询=====================

  //获取用户未拥有的全部角色
  toGetNotHasRoles(userId) {
    return axios({
      url: UrlPrefix + 'user-role/users/' + userId + '/other/roles',
      method: 'get'
    })
  },
  //获取用户拥有的全部角色
  toGetHasRoles(userId) {
    return axios({
      url: UrlPrefix + 'user-role/users/' + userId + '/own/roles',
      method: 'get'
    })
  }
}
//导出接口方法
export default userRole
