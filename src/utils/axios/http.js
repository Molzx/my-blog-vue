/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-31 10:27:42
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-09 20:27:09
 * @FilePath     : \VueProjects\my-blog\src\utils\axios\http.js
 * @Description  : 这是一些注释
 */
import axios from './Interceptor'

import { Encrypt } from '../secret'

import { remGetEmpParam } from '@/utils/removeEmpty'

// 用于一般场景下的post请求
export const postRequest = (
  url,
  params,
  headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
) => {
  return axios({
    method: 'post',
    url,
    data: params,
    transformRequest: [
      function(data) {
        // let req = ''
        // for (const key in data) {
        //   req +=
        //     encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
        // }
        // req = req.substring(0, req.length - 1)

        // return req
        //en_data 加密后的数据
        // req = JSON.stringify(req)
        let en_data = Encrypt(data)
        console.log(en_data)
        return en_data
      }
    ],
    headers
  })
}
// 用于一般场景下的get请求
export const getRequest = (
  url,
  params,
  headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
) => {
  let obj
  if (params) {
    //复制一份新的参数，去除其中的空参数
    obj = JSON.parse(JSON.stringify(params))
    console.log(obj)
    remGetEmpParam(obj)
  }
  //en_data此名称要与后端分隔名称一致
  let en_data = Encrypt(obj)
  return axios({
    method: 'get',
    url,
    params: { en_data },
    headers
  })
}
// 用于上传文件场景的post上传
export const filesRequest = (
  url,
  params,
  headers = { 'Content-Type': 'multipart/form-data' }
) => {
  return axios({
    method: 'post',
    url,
    data: params,
    headers
  })
}
// 用于上传文件场景的putst上传
export const filesPutRequest = (
  url,
  params,
  headers = { 'Content-Type': 'multipart/form-data' }
) => {
  return axios({
    method: 'put',
    url,
    data: params,
    headers
  })
}
// 用于数据格式为json的场景post请求
export const jsonPostRequest = (
  url,
  params,
  headers = { 'Content-Type': 'application/json; charset=utf-8' }
) => {
  //en_data 加密后的数据
  let en_data = Encrypt(params)
  console.log(en_data)
  return axios({
    method: 'post',
    url,
    data: en_data,
    headers
  })
}
// 用于数据格式为json的场景put请求
export const jsonPutRequest = (
  url,
  params,
  headers = { 'Content-Type': 'application/json' }
) => {
  //en_data 加密后的数据
  let en_data = Encrypt(params)
  console.log(en_data)
  return axios({
    method: 'put',
    url,
    data: en_data,
    headers
  })
}
// 用于delete请求
export const deleteRequest = (
  url,
  params,
  headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
) => {
  //en_data此名称要与后端分隔名称一致
  let en_data = Encrypt(params)
  return axios({
    method: 'delete',
    url,
    params: { en_data },
    headers
  })
}

// 用于下载文件的get请求
export const getFileRequest = (
  url,
  params,
  headers = { 'Content-Type': 'application/x-www-form-urlencoded' },
  //服务器返回的数据类型
  responseType = 'blob'
) => {
  //en_data此名称要与后端分隔名称一致
  let en_data = Encrypt(params)
  return axios({
    method: 'get',
    url,
    params: { en_data },
    headers,
    responseType
  })
}
