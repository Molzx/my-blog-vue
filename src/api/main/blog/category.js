/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-20 21:53:58
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-20 22:13:08
 * @FilePath     : \VueProjects\my-blog\src\api\main\blog\category.js
 * @Description  : 博客文章类别管理相关接口
 */
// 导入接口域名列表
import base from '../../base'

// 导入axios.js中创建的axios实例
import axios from '@/utils/axios'
const UrlPrefix = base.baseUrl

const category = {
  //=====================添加=====================

  //添加博客类别信息
  toAddition(categoryName) {
    return axios({
      url: UrlPrefix + 'categories/item',
      method: 'post',
      data: {
        categoryName: categoryName
      }
    })
  },

  //=====================删除=====================

  // 删除博客类别信息
  toDelete(categoryId) {
    return axios({
      url: UrlPrefix + 'categories/item' + categoryId,
      method: 'delete'
    })
  },

  //=====================更新=====================

  //添加博客类别信息
  toUpdate(categoryId, categoryName) {
    return axios({
      url: UrlPrefix + 'categories/item',
      method: 'put',
      data: {
        categoryId: categoryId,
        categoryName: categoryName
      }
    })
  },

  //=====================查询=====================

  //根据id获取类别信息
  toGetTagById(categoryId) {
    return axios({
      url: UrlPrefix + 'categories/item',
      method: 'get',
      params: {
        categoryId: categoryId
      }
    })
  }
}
//导出接口方法
export default category
