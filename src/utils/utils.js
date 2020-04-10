/*
 * @Author       : xuzhenghao
 * @Date         : 2020-04-07 12:43:34
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-10 13:29:07
 * @FilePath     : \VueProjects\my-blog\src\utils\utils.js
 * @Description  : 这是一些注释
 */

export const isEmptyObject = value => {
  if (Object.keys(value).length === 0) {
    return false // 如果为空,返回false
  }
  return true // 如果不为空，则会执行到这一步，返回true
}

export const isObject = value => {
  //获取是否为对象
  return Object.prototype.toString.call(value) == '[object Object]'
}

export const isArray = value => {
  //获取是否为数组
  return Object.prototype.toString.call(value) == '[object Array]'
}
export const isNumber = value => {
  //获取是否为数字
  return Object.prototype.toString.call(value) == '[object Number]'
}

export const isString = value => {
  //获取是否为数字
  return Object.prototype.toString.call(value) == '[object String]'
}
/**
 * @description: 指定长度和基数
 * 如// 8 character ID (base=2)
 * uuid(8, 2)  //  "01001010"
 * // 8 character ID (base=10)
 * uuid(8, 10) // "47473046"
 * // 8 character ID (base=16)
 * uuid(8, 16) // "098F4D35"
 * @param
 * @return:
 */
export function uuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    ''
  )
  var uuid = [],
    i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    // rfc4122, version 4 form
    var r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}
//清空空属性
export function removeEmpty(obj, parent, parentKey) {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') {
      removeEmpty(obj[key], obj, key)
    }
    if (
      obj[key] === undefined ||
      obj[key] === null ||
      (obj[key] !== null && obj[key].length === 0)
    ) {
      //   delete obj[key];
      obj[key] = 'hhhssg'
    }
  })
  if (Object.keys(obj).length === 0) {
    parent[parentKey] = 'hhhssg'
    // delete parent[parentKey]
  }

  return obj
}
//空对象置为null
export function changeEmptyObject(obj, parent, parentKey) {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') {
      changeEmptyObject(obj[key], obj, key)
    }
    if (
      obj[key] === undefined ||
      obj[key] === null ||
      (obj[key] !== null && obj[key].length === 0)
    ) {
      //   delete obj[key];
      obj[key] = null
    }
  })
  if (Object.keys(obj).length === 0) {
    parent[parentKey] = null
    // delete parent[parentKey]
  }

  return obj
}
