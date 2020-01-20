/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-20 21:53:47
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-20 22:10:21
 * @FilePath     : \VueProjects\my-blog\src\api\main\blog\tag.js
 * @Description  : 博客标签管理相关接口
 */
// 导入接口域名列表
import base from '../../base'

// 导入axios.js中创建的axios实例
import axios from '@/utils/axios'
const UrlPrefix = base.baseUrl

const tag = {
  //=====================添加=====================

  //添加博客标签信息
  toAddition(tagName) {
    return axios({
      url: UrlPrefix + 'tags/item',
      method: 'post',
      data: {
        tagName: tagName
      }
    })
  },

  //=====================删除=====================

  // 删除博客标签信息
  toDelete(tagId) {
    return axios({
      url: UrlPrefix + 'tags/item' + tagId,
      method: 'delete'
    })
  },

  //=====================更新=====================

  //添加博客标签信息
  toUpdate(tagId, tagName) {
    return axios({
      url: UrlPrefix + 'tags/item',
      method: 'put',
      data: {
        tagId: tagId,
        tagName: tagName
      }
    })
  },

  //=====================查询=====================

  //根据id获取标签信息
  toGetTagById(tagId) {
    return axios({
      url: UrlPrefix + 'tags/item',
      method: 'get',
      params: {
        tagId: tagId
      }
    })
  }
}
//导出接口方法
export default tag
