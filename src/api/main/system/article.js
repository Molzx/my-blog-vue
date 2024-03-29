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
const articlePrefix = UrlPrefix + 'articles/'
const article = {
  //=====================添加=====================

  //添加文章

  toAdd: params => filesRequest(articlePrefix + 'item', params),

  // =====================删除=====================

  // 根据id删除文章
  toDeleteById: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { articleId: params }
    } else {
      obj = params
    }
    return deleteRequest(articlePrefix + 'item', obj)
  },

  //=====================更新=====================
  toUpdate: params => filesPutRequest(articlePrefix + 'item', params),

  //=====================查询=====================

  //获取用户少部分数据
  // toGetLessInfo: () => getRequest(UrlPrefix + 'users/item/less-info'),

  //获取用户个人信息展示数据
  // toGetSomeInfo: () => getRequest(UrlPrefix + 'users/item/some-info'),

  //获取系统管理文章可供展示的数据
  toGetSomeInfoById: params => {
    console.log(params)
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { articleId: params }
    } else {
      obj = params
    }
    return getRequest(articlePrefix + 'item/some-info', obj)
  },

  //获取系统管理文章可供展示的数据
  // toGetAllInfo: params => {
  //   let isObj = Object.prototype.toString.call(params) === '[object Object]'
  //   let obj
  //   if (!isObj) {
  //     obj = { userName: params }
  //   } else {
  //     obj = params
  //   }
  //   return getRequest(UrlPrefix + 'users/item/all-info', obj)
  // },

  //获取浏览量--最高的--文章列表
  toGetListLessInfoByTopView: () =>
    getRequest(articlePrefix + 'list/less-info/top-view'),

  //获取最新--发布--文章列表
  toGetListLessInfoByNew: () =>
    getRequest(articlePrefix + 'list/less-info/new'),

  //获取最新--推荐--的文章列表
  toGetListLessInfoByRec: () =>
    getRequest(articlePrefix + 'list/less-info/recommend'),

  //获取文章列表分页数据
  toGetPageListLessInfo: params => {
    let obj = JSON.parse(JSON.stringify(params))
    let url = articlePrefix + 'page-list/less-info'
    return getRequest(url, obj)
  },
  //获取  搜索下的  文章列表分页数据
  toGetPageListForSearch: params => {
    let obj = JSON.parse(JSON.stringify(params))
    let url = articlePrefix + 'page-list/blog/search'
    return getRequest(url, obj)
  },

  //获取文章列表分页数据，按时间线
  toGetPageListLessInfoByTimeline: params => {
    // let obj = JSON.parse(JSON.stringify(params))
    //只传一个参数，页面数
    let obj = {
      current: params.current
    }
    let url = articlePrefix + 'page-list/less-info/timeline'
    return getRequest(url, obj)
  },
  //获取文章列表分页数据
  toGetPageListInfo: params => {
    let obj = JSON.parse(JSON.stringify(params))
    // let state = params.state == 'all' ? '' : params.state
    //如果是查询所有，即状态是 all 或者 id等于 0的，把参数删除，不上传到后台
    // obj.type == 'all' ? delete obj.type : obj.type
    // obj.cid == 0 ? delete obj.cid : obj.cid
    // obj.tid == 0 ? delete obj.tid : obj.tid
    // obj.status == 'all' ? delete obj.status : obj.status
    // obj.admStatus == 'all' ? delete obj.admStatus : obj.admStatus
    // obj.copStatus == 'all' ? delete obj.copStatus : obj.copStatus
    // obj.repStatus == 'all' ? delete obj.repStatus : obj.repStatus
    // obj.comStatus == 'all' ? delete obj.comStatus : obj.comStatus
    // obj.pubStatus == 'all' ? delete obj.pubStatus : obj.pubStatus
    // obj.recStatus == 'all' ? delete obj.recStatus : obj.recStatus
    // obj.search == '' ? delete obj.search : obj.search

    //如果是查询所有，即状态是 all 或者 id等于 0的，把参数删除，不上传到后台
    for (let key in obj) {
      // console.log(key + '---' + obj[key])
      if (obj[key] == 'all' || obj[key] == 0 || obj[key] == '' || !obj[key]) {
        delete obj[key]
      }
    }
    // let obj = JSON.parse(JSON.stringify(params))
    // //删除不用的属性
    // delete obj.state
    // // obj.state = state
    // obj.type = type
    // obj.cid = cid
    // obj.tid = tid
    // obj.admStatus = admStatus
    // obj.copStatus = copStatus
    // obj.repStatus = repStatus
    // obj.comStatus = comStatus
    // obj.pubStatus = pubStatus
    // obj.recStatus = recStatus
    // obj.status = status
    let url = articlePrefix + 'page-list/sys/some-info'
    return getRequest(url, obj)
  }
}

//导出接口方法
export default article
