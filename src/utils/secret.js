/*
 * @Author       : xuzhenghao
 * @Date         : 2020-04-08 09:32:13
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-10 14:28:29
 * @FilePath     : \VueProjects\my-blog\src\utils\secret.js
 * @Description  : 这是一些注释
 */

import Vue from 'vue'
//加密解密相关
import cryptoJs from 'crypto-js'
import JSEncrypt from 'jsencrypt'
// import { uuid } from '@/utils/utils'

// import { changeEmptyObject } from '@/utils/utils'
import { setEmpObjToNull } from '@/utils/removeEmpty'

Vue.use(cryptoJs)

console.log('start')
// const u32 = uuid(32)
// const u16 = uuid(16)
const u32 = 'aaaabbbbccccddddeeeeffffgggghhhh'
const u16 = '1111222233334444'
// console.log(u32)
// console.log(u16)
const key = cryptoJs.enc.Latin1.parse(u32)
const iv = cryptoJs.enc.Latin1.parse(u16)

// console.log('key')
// console.log(key)
// console.log('iv')
// console.log(iv)
const PublicKey =
  // '123456'
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4980WaNEWI4Wc/Brzc8XsFq7EViD2tgOWjZjEZHh+0/EEzs9zTd08n87YG1S3mTsZNFc9cBgEZAQSmzDwSIElqvp2Gu8qwgt4mzNe2cGXAILtV8FZP8//QFq5WCBucJZcgyx3oPzTiHoZ2uHCsnlHRKc3Fxe4TF1ClJ97BX4B1wIDAQAB'

//加密方法
export function Encrypt(data) {
  // data数据加密
  if (typeof data === 'object') {
    data = JSON.stringify(data)
    // console.log('data')
    // console.log(JSON.parse(JSON.stringify(data)))
  }
  const encrypted = cryptoJs.AES.encrypt(data, key, {
    iv: iv,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.ZeroPadding
  })

  // console.log('jiami')
  // console.log(encrypted.toString())
  const jsencrypt = new JSEncrypt()
  jsencrypt.setPublicKey(PublicKey)
  const ras = jsencrypt.encrypt(u32 + ';' + u16)
  return ras + ';' + encrypted.toString()
}

//解密方法
export function Decrypt(data) {
  // 数据解密
  // 方式1 aes 解密
  const decrypt = cryptoJs.AES.decrypt(data, key, {
    iv: iv,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.ZeroPadding
  })
  let newData = cryptoJs.enc.Utf8.stringify(decrypt).toString()
  newData = JSON.parse(newData)
  ///由于解密后，属性为null的，全被变为Object类型，{"$ref":"$.extend.records[0].parent"}，
  //需要修改回来，如本来应该是id:null的，解密后变为id:{"$ref":"$.extend.records[0].parent"}，
  setEmpObjToNull(newData)
  return newData
}

const URLKEY = 'wahahanaichabloggoodgoodgoodgood'
const URLIV = 'wojuedemeicuowa'
//url地址加密方法
export function AESUrlEncrypt(data) {
  // data数据加密
  if (typeof data === 'object') {
    data = JSON.stringify(data)
    // console.log('data')
    // console.log(JSON.parse(JSON.stringify(data)))
  }
  const encrypted = cryptoJs.AES.encrypt(data, URLKEY, {
    iv: URLIV,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.ZeroPadding
  })

  return encrypted.toString()
}
//url地址解密方法
export function AESUrlDecrypt(data) {
  // 数据解密
  // 方式1 aes 解密
  const decrypt = cryptoJs.AES.decrypt(data, URLKEY, {
    iv: URLIV,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.ZeroPadding
  })
  let newData = cryptoJs.enc.Utf8.stringify(decrypt).toString()
  newData = JSON.parse(newData)
  return newData
}

const LOCALSTOREKEY = 'wahahanaichabloggoodgoodgoodgood'
const LOCALSTOREIV = 'wojuedemeicuowa'
//本地存储加密方法
export function AESStoreEncrypt(data) {
  // data数据加密
  if (typeof data === 'object') {
    data = JSON.stringify(data)
    // console.log('data')
    // console.log(JSON.parse(JSON.stringify(data)))
  }
  const encrypted = cryptoJs.AES.encrypt(data, LOCALSTOREKEY, {
    iv: LOCALSTOREIV,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.ZeroPadding
  })

  return encrypted.toString()
}
//本地存储解密方法
export function AESStoreDecrypt(data) {
  // 数据解密
  // 方式1 aes 解密
  const decrypt = cryptoJs.AES.decrypt(data, LOCALSTOREKEY, {
    iv: LOCALSTOREIV,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.ZeroPadding
  })
  let newData = cryptoJs.enc.Utf8.stringify(decrypt).toString()

  let cpData = JSON.parse(JSON.stringify(newData))

  //先将拿到的试着进行json转为对象的形式
  try {
    newData = JSON.parse(newData)
  } catch (error) {
    //如果不行就不是json的字符串，就直接返回
    newData = cpData
  }
  return newData
}
