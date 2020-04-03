/*
 * @Author       : xuzhenghao
 * @Date         : 2020-02-24 20:06:06
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-03 19:46:59
 * @FilePath     : \VueProjects\my-blog\src\api\main\system\comment.js
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
const commentPrefix = UrlPrefix + 'comments/'
const comment = {
  //=====================添加=====================

  //添加评论
  toAdditionForBlog: params => {
    // let params1 = {
    //   //父评论ID：为空则为父评论，不为空则为子评论
    //   parentId: params.parentId,

    //   //被评论的资源id，可以是文章，文件等
    //   ownerId: params.ownerId,

    //   //评论类型 { 0：文章，1：文件 }
    //   type: params.type,

    //   //被评论的用户ID
    //   toUid: params.toUid,

    //   //评论内容
    //   content: params.content
    // }
    params.parentId == '' ? delete params.parentId : params.parentId
    return jsonPostRequest(commentPrefix + 'item/blog', params)
  },
  //=====================删除=====================
  // 根据记录ID删除记录
  toDeleteById: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { commentId: params }
    } else {
      obj = params
    }
    return deleteRequest(commentPrefix + 'item', obj)
  },

  //=====================查询=====================
  //获取系统管理可供展示的数据
  toGetOneInfo: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { commentId: params }
    } else {
      obj = params
    }
    return getRequest(commentPrefix + 'item', obj)
  },
  //获取评论列表分页数据
  toGetPageListInfoForSys: params => {
    let obj = JSON.parse(JSON.stringify(params))

    //如果是查询所有，即状态是 all 或者 id等于 0的，把参数删除，不上传到后台
    // obj.type == 'all' ? delete obj.type : obj.type
    // obj.ownerId == 0 ? delete obj.ownerId : obj.ownerId
    // obj.searchParent == '' ? delete obj.searchParent : obj.searchParent
    // obj.fromUid == 0 ? delete obj.fromUid : obj.fromUid
    // obj.toUid == 0 ? delete obj.toUid : obj.toUid
    // obj.status == 'all' ? delete obj.status : obj.status
    // obj.sticky == 'all' ? delete obj.sticky : obj.sticky

    // obj.search == '' ? delete obj.search : obj.search

    //如果是查询所有，即状态是 all 或者 id等于 0的，把参数删除，不上传到后台
    for (let key in obj) {
      // console.log(key + '---' + obj[key])
      if (obj[key] == 'all' || obj[key] == 0 || obj[key] == '' || !obj[key]) {
        delete obj[key]
      }
    }
    let url = commentPrefix + 'page-list/sys'
    return getRequest(url, obj)
  },
  //获取评论列表分页数据
  toGetPageListInfoForBlog: params => {
    let obj = JSON.parse(JSON.stringify(params))
    let url = commentPrefix + 'page-list/blog'
    return getRequest(url, obj)
  },
  //获取二级评论列表分页数据
  toGetPageListInfoForSub: params => {
    let obj = JSON.parse(JSON.stringify(params))
    delete obj.index
    delete obj.showSubMore
    let url = commentPrefix + 'page-list/sub'
    return getRequest(url, obj)
  },
  //获取用户评论列表分页数据
  toGetPageListInfoForUser: params => {
    let obj = JSON.parse(JSON.stringify(params))
    let url = commentPrefix + 'page-list/user'
    return getRequest(url, obj)
  }
}

//导出接口方法
export default comment
