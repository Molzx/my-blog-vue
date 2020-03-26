/*
 * @Author       : xuzhenghao
 * @Date         : 2020-02-05 15:57:38
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-07 11:16:17
 * @FilePath     : \VueProjects\my-blog\src\api\main\system\file.js
 * @Description  : 这是一些注释
 */
// 导入接口域名列表
import base from '../../base'

// http.js中创建的axios 方法实例
import {
  getRequest,
  filesRequest,
  jsonPutRequest,
  deleteRequest,
  getFileRequest
} from '@/utils/axios/http'
const UrlPrefix = base.baseUrl + 'resources/'

const file = {
  //=====================添加=====================

  //添加文件
  toAddition: params => {
    // let params = {
    //   name: name,
    //   description: description,
    //   status: status,
    //   file:文件
    // }
    return filesRequest(UrlPrefix + 'item', params)
  },

  //=====================删除=====================
  // 根据记录ID删除记录
  toDeleteById: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { id: params }
    } else {
      obj = params
    }
    return deleteRequest(UrlPrefix + 'item', obj)
  },

  //=====================更新=====================

  // 修改文件信息
  toUpdate: params => {
    // let obj = {
    //   id: params.fileId,
    //   name: params.name,
    //   description: params.description,
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
      obj = { id: params }
    } else {
      obj = params
    }
    return getRequest(UrlPrefix + 'item', obj)
  },

  //获取文件列表分页数据
  toGetPageListInfo: params => {
    let obj = JSON.parse(JSON.stringify(params))

    obj.status == 'all' ? delete obj.status : obj.status
    obj.search == '' ? delete obj.search : obj.search

    let url = UrlPrefix + 'page-list'
    return getRequest(url, obj)
  },
  //-======
  //通过文件名下载文件
  toDownloadByFileName: params => {
    return getFileRequest(UrlPrefix + 'download/' + params)
  },
  //通过主键id 预览文件
  toDownloadById: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { id: params }
    } else {
      obj = params
    }
    return getFileRequest(UrlPrefix + 'download', obj)
  },
  //通过主键id 预览文件
  toDownloadByResourceId: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { resourceId: params }
    } else {
      obj = params
    }
    return getFileRequest(UrlPrefix + 'download', obj)
  },
  //通过主键id 预览文件
  toPreviewById: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { id: params }
    } else {
      obj = params
    }
    return getRequest(UrlPrefix + 'view', obj)
  },
  //通过文件名 预览文件
  toPreviewByFileName: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { fileName: params }
    } else {
      obj = params
    }
    return getRequest(UrlPrefix + 'view', obj)
  },
  //通过资源id 预览文件
  toPreviewByResourceId: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { resourceId: params }
    } else {
      obj = params
    }
    return getRequest(UrlPrefix + 'view', obj)
  }
}
//导出接口方法
export default file
