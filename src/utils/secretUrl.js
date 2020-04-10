/*
 * @Author       : xuzhenghao
 * @Date         : 2020-04-10 12:27:58
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-10 14:38:53
 * @FilePath     : \VueProjects\my-blog\src\utils\secretUrl.js
 * @Description  : 这是一些注释
 */
import { isObject, isString } from './utils'
import { AESUrlEncrypt, AESUrlDecrypt } from './secret'
/**
 * url参数加密
 * 传入json格式的串
 * @param {*Object} query
 */
export const EncryUrl = query => {
  if (!isObject(query)) {
    return ''
  }
  try {
    // console.log('jjjjj')
    query = AESUrlEncrypt(query)
    // query = JSON.stringify(query)/
    query = window.encodeURIComponent(query)
    return window.btoa(query) // 编码
  } catch (err) {
    console.log('%c url-encry-error：' + JSON.stringify(err), 'color:red;')
  }
  return ''
}

/**
 * url参数解密
 * 传入加密的json串
 * @param {*string} val
 */
export const DecryptUrl = val => {
  if (!isString(val)) {
    return false
  }
  try {
    let decryStr = window.atob(val) // 解码
    let deStr = window.decodeURIComponent(decryStr)

    // return  JSON.parse(deStr)
    return AESUrlDecrypt(deStr)
  } catch (err) {
    console.log(
      '%c url-decry-error：' + JSON.stringify(err.stack),
      'color:red;'
    )
  }
  return false
}

/**
 * 从地址栏获取指定参数值
 * @param {*string} param
 */
export const GetQueryParam = param => {
  let h = window.location.href
  let reg = new RegExp('[?&]?' + param + '=([,-w]+)[&]?', 'i')
  if (reg.test(h)) {
    let v = reg.exec(h)[1]
    return v
  }
  return ''
}

/**
 * 返回 地址栏 加密 Object
 * @param {*string} param
 */
export const GetQueryParamOfObjEntry = () => {
  let keyStr = GetQueryParam('key')
  if (!keyStr) {
    return ''
  }
  try {
    // let objStr = DecryptUrl(keyStr)
    // let obj = JSON.parse(objStr)
    return DecryptUrl(keyStr)
  } catch (err) {
    console.log(
      '%c url-json-parse-error：' + JSON.stringify(err.stack),
      'color:red;'
    )
  }
  return ''
}

// url参数加密
export function encryUrlOfRouter(to, from, next) {
  console.log(to)
  // 这里对路由参数key进行加密
  if (Object.keys(to.query).length > 0 && !to.query.key) {
    let urlEntry = EncryUrl(to.query)
    if (urlEntry) {
      next({
        path: to.path,
        query: {
          key: urlEntry
        }
      })
      return false
    }
    next({
      path: to.path
    })
    return false
  }
  return true
}
