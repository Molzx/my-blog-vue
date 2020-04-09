/*
 * @Author       : xuzhenghao
 * @Date         : 2020-03-17 23:31:22
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-09 15:21:41
 * @FilePath     : \VueProjects\my-blog\src\utils\sensitive-word\index.js
 * @Description  : 这是一些注释
//  */
import SensitiveSearch from './sensitive-search'
// const loadFile = function(name) {
//   // name为文件所在位置
//   let xhr = new XMLHttpRequest(),
//     okStatus = document.location.protocol === 'file:' ? 0 : 200
//   xhr.open('GET', name, false)
//   xhr.overrideMimeType('text/html;charset=utf-8') //默认为utf-8
//   xhr.send(null)
//   return xhr.status === okStatus ? xhr.responseText : null
// }
// let filePath = './../../assets/data/dictionaries/chinese_dictionary.txt'
// let data = loadFile(filePath)
// console.log(data)
//导入敏感词

import word from '@/assets/data/dictionaries/dictionary'
// let word = ['fuck']
// console.log(word)
let instance = new SensitiveSearch(word)
export default instance
