/*
 * @Author       : xuzhenghao
 * @Date         : 2020-02-05 15:57:38
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-31 17:19:03
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

  //批量上传文章图片
  toUploadBatchImg: params => {
    // let params = {
    //   name: name,
    //   description: description,
    //   status: status,
    //   file:文件
    // }
    return filesRequest(UrlPrefix + 'list/picture', params)
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
  //获取共享文件列表分页数据
  toGetPageListForBlog: params => {
    let obj = JSON.parse(JSON.stringify(params))

    let url = UrlPrefix + 'page-list/shares'
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
