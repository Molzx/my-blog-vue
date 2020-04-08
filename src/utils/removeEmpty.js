/*
 * @Author       : xuzhenghao
 * @Date         : 2020-04-08 17:25:18
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-08 20:21:38
 * @FilePath     : \VueProjects\my-blog\src\utils\removeEmpty.js
 * @Description  : 这是一些注释
 */
// js删除对象/数组中null、undefined、空对象及空数组方法示例
//源地址：http://www.luyixian.cn/javascript_show_166075.aspx

// 判断对象是否没有属性，如{}或者[]
function isEmptyObj(o) {
  for (let attr in o) return !1
  return !0
}
function processArray(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === null || arr[i] === undefined) {
      arr.splice(i, 1)
    } else if (typeof arr[i] == 'object') {
      removeNullItem(arr[i], arr, i)
    }
  }
  return arr.length == 0
}
function proccessObject(o) {
  for (let attr in o) {
    if (o[attr] === null || o[attr] === undefined) delete o[attr]
    else if (typeof o[attr] == 'object') {
      removeNullItem(o[attr])
      if (isEmptyObj(o[attr])) delete o[attr]
    }
  }
}
export function removeNullItem(o, arr, i) {
  let s = {}.toString.call(o)
  if (s == '[object Array]') {
    if (processArray(o) === true) {
      //o也是数组，并且删除完子项，从所属数组中删除
      if (arr) arr.splice(i, 1)
    }
  } else if (s == '[object Object]') {
    proccessObject(o)
    if (arr && isEmptyObj(o)) arr.splice(i, 1)
  }
}
// removeNullItem(o)
// console.log(o)
//=====================我的 不删除空属性，而是置为null=======================
//用于解决，后端aes加密后返回的，原本为null的属性，解密后会变成Object ，
//并且多出一个属性，"$ref":"$.extend.records[0].parent"，要重新处理，置为null

function dealObject(o) {
  for (let attr in o) {
    if (o[attr] === null || o[attr] === undefined) {
      // delete o[attr]
    } else if (typeof o[attr] == 'object') {
      setEmpObjToNull(o[attr])
      if (o[attr].hasOwnProperty('$ref') || isEmptyObj(o[attr])) {
        // delete o[attr]
        o[attr] = null
      }
    }
  }
}
function dealArray(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    /*if (arr[i] === null || arr[i] === undefined) arr.splice(i, 1);
   else */ if (
      typeof arr[i] == 'object'
    )
      setEmpObjToNull(arr[i], arr, i)
  }
  return arr.length == 0
}
// eslint-disable-next-line no-unused-vars
export function setEmpObjToNull(o, arr, i) {
  let s = {}.toString.call(o)
  if (s == '[object Array]') {
    if (dealArray(o) === true) {
      //o也是数组，并且删除完子项，从所属数组中删除
      //if (arr) arr.splice(i, 1);
    }
  } else if (s == '[object Object]') {
    dealObject(o)
    //if (arr&&isEmptyObj(o)) arr.splice(i, 1);
  }
}

//移除get请求中不用的数据
export function remGetEmpParam(obj) {
  //如果是查询所有，即状态是 all 或者 id等于 0的，把参数删除，不上传到后台
  for (let key in obj) {
    // console.log(key + '---' + obj[key])
    if (obj[key] == 'all' || obj[key] == 0 || obj[key] == '' || !obj[key]) {
      delete obj[key]
    }
  }
}
