// 导入接口域名列表
import base from '../../base'

// 导入axios.js中创建的axios实例
import { getRequest, postRequest } from '@/utils/axios/http'
const UrlPrefix = base.baseUrl + 'likes/'

const like = {
  // 点赞
  toLiked: params => {
    // params: {
    //   //资源类型
    //   ownerType: ownerType,
    //   //资源id
    //   ownerId: ownerId,
    //   //用户id
    //   userId: userId
    // }
    let url = UrlPrefix + 'like'
    return postRequest(url, params)
  },

  // 取消点赞
  toUnliked: params => {
    // params: {
    //   //资源类型
    //   ownerType: ownerType,
    //   //资源id
    //   ownerId: ownerId,
    //   //用户id
    //   userId: userId
    // }
    let url = UrlPrefix + 'unlike'
    return postRequest(url, params)
  },
  // 获取用户点赞过的所有文章
  toGetLikedArticles: params => {
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
    let obj = JSON.parse(JSON.stringify(params))
    params.userId == 0 ? delete obj.userId : params.state
    let url = UrlPrefix + 'page-list/articles'
    return getRequest(url, obj)
  }
}
//导出接口方法
export default like
