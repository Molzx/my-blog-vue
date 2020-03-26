/*
 * @Author       : xuzhenghao
 * @Date         : 2020-03-13 22:53:39
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-26 21:09:54
 * @FilePath     : \VueProjects\my-blog\src\api\main\blog\collect.js
 * @Description  : 这是一些注释
 */
// 导入接口域名列表
import base from '../../base'

// 导入axios.js中创建的axios实例
import { getRequest, postRequest } from '@/utils/axios/http'
const UrlPrefix = base.baseUrl + 'collects/'

const collect = {
  // 收藏
  toCollected: params => {
    // params: {
    //   //资源类型
    //   ownerType: ownerType,
    //   //资源id
    //   ownerId: ownerId,
    //   //用户id，可不传
    //   userId: userId
    // }
    let url = UrlPrefix + 'collect'
    return postRequest(url, params)
  },

  // 取消收藏
  toUncollected: params => {
    // params: {
    //   //资源类型
    //   ownerType: ownerType,
    //   //资源id
    //   ownerId: ownerId,
    //   //用户id
    //   userId: userId
    // }
    let url = UrlPrefix + 'uncollect'
    return postRequest(url, params)
  },
  // 获取用户收藏过的所有文章
  toGetCollectedArticles: params => {
    // params: {
    //   //一页的记录数
    //   size: size,
    //   //当前页数
    //   current: current,
    //   //用户id
    //   userId: userId,
    //   //数据库分页查询，页面偏移量，用在分页查询点赞量、阅读量等
    //   offset: offset,
    //   //当前已显示的点赞记录的数目，用与缓存区没有数据时，计算偏移量
    //   showSize: showSize
    // }
    let url = UrlPrefix + 'page-list/articles'
    return getRequest(url, params)
  }
}
//导出接口方法
export default collect
