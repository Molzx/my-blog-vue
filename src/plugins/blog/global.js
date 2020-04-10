/*
 * @Author       : xuzhenghao
 * @Date         : 2020-02-23 15:22:48
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-10 13:04:07
 * @FilePath     : \VueProjects\my-blog\src\plugins\blog\global.js
 * @Description  : 这是一些注释
 */
// 全局变量
const remoteHost = 'http://127.0.0.1:8088/'
const host = 'localhost:8088'
const urlPrefix = 'http://' + host
const home = window.location.protocol + '//' + window.location.host + '/home'
const defaultAvatar = require('@/assets/images/avatar/avatar.svg')
const defaultCover = require('@/assets/images/cover/wallhaven-630792.jpg')
const filesTypeBgs = {
  ai: require('@/assets/images/files/file_ai.svg'),
  blank: require('@/assets/images/files/file_blank.svg'),
  bt: require('@/assets/images/files/file_bt.svg'),
  cad: require('@/assets/images/files/file_cad.svg'),
  cloud: require('@/assets/images/files/file_cloud.svg'),
  code: require('@/assets/images/files/file_code.svg'),
  excel: require('@/assets/images/files/file_excel.svg'),
  exe: require('@/assets/images/files/file_exe.svg'),
  flash: require('@/assets/images/files/file_flash.svg'),
  html: require('@/assets/images/files/file_html.svg'),
  img: require('@/assets/images/files/file_img.svg'),
  iso: require('@/assets/images/files/file_iso.svg'),
  music: require('@/assets/images/files/file_music.svg'),
  pdf: require('@/assets/images/files/file_pdf.svg'),
  ppt: require('@/assets/images/files/file_ppt.svg'),
  psd: require('@/assets/images/files/file_psd.svg'),
  txt: require('@/assets/images/files/file_txt.svg'),
  video: require('@/assets/images/files/file_video.svg'),
  word: require('@/assets/images/files/file_word.svg'),
  zip: require('@/assets/images/files/file_zip.svg')
}
const emptyBg = require('@/assets/images/empty/empty1.svg')
const preview = urlPrefix + '/api/v1/resources/preview?fileName='
const searchArticleUrl = '/blog/articles'
const searchCategoryUrl = '/blog/categories/categoryg'
const searchTagUrl = '/blog/tags/tag'

//导入url解密获取
import { GetQueryParamOfObjEntry } from '@/utils/secretUrl'

export default {
  home,
  remoteHost,
  emptyBg,
  filesTypeBgs,
  defaultAvatar,
  defaultCover,
  //预览图片URL前缀
  preview,
  searchArticleUrl,
  searchCategoryUrl,
  searchTagUrl,
  GetQueryParamOfObjEntry
}
