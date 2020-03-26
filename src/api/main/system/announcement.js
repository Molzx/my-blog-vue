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
const Prefix = UrlPrefix + 'announcements/'
const announcement = {
  //=====================添加=====================

  //添加公告

  toAddition: params => filesRequest(Prefix + 'item', params),

  // =====================删除=====================

  // 根据id删除公告
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
  toUpdate: params => filesPutRequest(Prefix + 'item', params),

  //=====================查询=====================

  //获取系统管理公告可供展示的数据
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
  //获取博客前台用的启用状态下最新更新的一条数据
  toGetEnabledInfo: () => getRequest(Prefix + 'item/enabled'),
  //获取博客前台用的启用状态的列表数据
  toGetListInfo: () => getRequest(Prefix + 'list/enabled'),
  //获取公告列表分页数据
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
export default announcement
