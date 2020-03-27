/*
 * @Author       : xuzhenghao
 * @Date         : 2020-03-16 10:33:54
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-27 10:36:59
 * @FilePath     : \VueProjects\my-blog\src\plugins\blog\filters.js
 * @Description  : 这是一些注释
 */
const filters = {
  /**
   * 功能：将时间戳按照给定的 时间/日期 格式进行处理
   * @param {Number} date 时间戳
   * @param {String} fmtExp 时间格式 'hh:ss'
   * @returns {String} 规范后的 时间/日期 字符串
   */
  fmtDate: function(dateVal, fmtExp) {
    var date = new Date(dateVal)
    var o = {
      'M+': date.getMonth() + 1, //月份
      'D+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    }

    if (/(y+)/.test(fmtExp)) {
      fmtExp = fmtExp.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
      console.log(fmtExp)
    }
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmtExp))
        fmtExp = fmtExp.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
    return fmtExp
  },

  textLengthFormat(value, num) {
    // let num = 18
    if (!value) return ''
    if (value.length > num) {
      return value.slice(0, num) + '...'
    }
    return value
  },
  subTitleFormat(value) {
    let num = 18
    if (!value) return ''
    if (value.length > num) {
      return value.slice(0, num) + '...'
    }
    return value
  },
  //截取大于num位数字的值为num+，如9999,3 变为999+
  getMaxNum(value, num) {
    // let num = 18
    if (!value || value == 0) {
      return 0
    }
    //如102，保留3位，最大999
    let maxNum = Math.pow(10, num) - 1
    if (parseInt(value) > maxNum) {
      return maxNum + '+'
    }
    return value
  },
  // 转换文件大小显示
  getFileSize(fileByte) {
    var fileSizeByte = fileByte
    var fileSizeMsg = ''
    if (fileSizeByte < 1048576)
      fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + 'KB'
    else if (fileSizeByte == 1048576) fileSizeMsg = '1MB'
    else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824)
      fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + 'MB'
    else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824)
      fileSizeMsg = '1GB'
    else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776)
      fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
    else fileSizeMsg = '文件超过1TB'
    return fileSizeMsg
  }
}
export default Vue => {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}
