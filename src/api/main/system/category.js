// 导入接口域名列表
import base from '../../base'

// http.js中创建的axios 方法实例
import {
  getRequest,
  jsonPostRequest,
  jsonPutRequest,
  deleteRequest
} from '@/utils/axios/http'
const UrlPrefix = base.baseUrl + 'categories/'

const category = {
  //=====================添加=====================

  //添加分类
  toAddition: params => {
    // let params = {
    //   categoryName: categoryName,
    // }
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { categoryName: params }
    } else {
      obj = params
    }
    return jsonPostRequest(UrlPrefix + 'item', obj)
  },

  //=====================删除=====================
  // 根据记录ID删除记录
  toDeleteById: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { categoryId: params }
    } else {
      obj = params
    }
    return deleteRequest(UrlPrefix + 'item', obj)
  },

  //=====================更新=====================

  // 修改分类信息
  toUpdate: params => {
    // let obj = {
    //   categoryId: params.categoryId,
    //   categoryName: params.categoryName,
    //   status: params.status
    // }
    return jsonPutRequest(UrlPrefix + 'item', params)
  },

  //=====================查询=====================
  //获取系统管理可供展示的数据
  toGetAllInfo: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { categoryId: params }
    } else {
      obj = params
    }
    return getRequest(UrlPrefix + 'item', obj)
  },

  //获取分类列表分页数据
  toGetPageListInfo: params => {
    let obj = JSON.parse(JSON.stringify(params))

    obj.status == 'all' ? delete obj.status : obj.status
    obj.search == '' ? delete obj.search : obj.search

    let url = UrlPrefix + 'page-list'
    return getRequest(url, obj)
  },
  //获取分类列表数据（全部）
  toGetListLessInfo: () => getRequest(UrlPrefix + 'list/less-info'),

  //获取分类列表数据（正在使用的分类）
  toGetListLessInfoByUse: () => getRequest(UrlPrefix + 'list/less-info/use'),
  //获取分类列表数据（正在使用的分类，带有每个分类拥有的博客文章数目）
  toGetListLessInfoByUseHasCount: () =>
    getRequest(UrlPrefix + 'list/less-info/use-count'),
  //获取所有分类列表数据（正在使用的分类，带有每个分类拥有的博客文章数目）
  //用于分类详细列表页 categories
  toGetListLessInfoByUseHasCountAll: () =>
    getRequest(UrlPrefix + 'list/less-info/use-count-all')
}
//导出接口方法
export default category
