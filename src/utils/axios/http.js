/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-31 10:27:42
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-07 11:21:25
 * @FilePath     : \VueProjects\my-blog\src\utils\axios\http.js
 * @Description  : 这是一些注释
 */
import axios from './index'

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
        let req = ''
        for (const key in data) {
          req +=
            encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
        }
        return req
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
  return axios({
    method: 'get',
    url,
    params: params,
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
  headers = { 'Content-Type': 'application/json' }
) => {
  return axios({
    method: 'post',
    url,
    data: params,
    headers
  })
}
// 用于数据格式为json的场景put请求
export const jsonPutRequest = (
  url,
  params,
  headers = { 'Content-Type': 'application/json' }
) => {
  return axios({
    method: 'put',
    url,
    data: params,
    headers
  })
}
// 用于delete请求
export const deleteRequest = (
  url,
  params,
  headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
) => {
  return axios({
    method: 'delete',
    url,
    params: params,
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
  console.log('inni')
  return axios({
    method: 'get',
    url,
    params: params,
    headers,
    responseType
  })
}
