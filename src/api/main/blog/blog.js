// 导入接口域名列表
import base from '../../base'

// http.js中创建的axios 方法实例
// eslint-disable-next-line no-unused-vars
import { getRequest, jsonPostRequest } from '@/utils/axios/http'
const UrlPrefix = base.baseUrl
const prefix = UrlPrefix + 'blog/'
const blog = {
  //=====================添加=====================

  //添加评论
  // toAddComment: params => {
  //   // let params1 = {
  //   //   //父评论ID：为空则为父评论，不为空则为子评论
  //   //   parentId: params.parentId,

  //   //   //被评论的资源id，可以是文章，文件等
  //   //   ownerId: params.ownerId,

  //   //   //评论类型 { 0：文章，1：文件 }
  //   //   type: params.type,

  //   //   //被评论的用户ID
  //   //   toUid: params.toUid,

  //   //   //评论内容
  //   //   content: params.content
  //   // }
  //   params.parentId == '' ? delete params.parentId : params.parentId
  //   return jsonPostRequest(prefix + 'comments', params)
  // },
  //=====================删除=====================

  //=====================更新=====================

  //=====================查询=====================

  //获取文章列表分页数据
  toGetArticles: params => {
    let obj = JSON.parse(JSON.stringify(params))
    let url = prefix + 'articles'
    return getRequest(url, obj)
  },
  //获取文章列表分页数据，按时间线
  toGetTimelineArticles: params => {
    // let obj = JSON.parse(JSON.stringify(params))
    //只传一个参数，页面数
    let obj = {
      current: params.current
    }
    let url = prefix + 'articles-timeline'
    return getRequest(url, obj)
  },

  //获取分类
  toGetCategories: () => getRequest(prefix + 'categories'),

  //获取标签
  toGetTags: () => getRequest(prefix + 'tags'),
  //获取系统管理文章可供展示的数据
  toGetArticleById: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { articleId: params }
    } else {
      obj = params
    }
    return getRequest(prefix + 'article-detail', obj)
  },

  //获取评论列表分页数据
  toGetComments: params => {
    let obj = JSON.parse(JSON.stringify(params))
    let url = prefix + 'comments'
    return getRequest(url, obj)
  },
  //获取二级评论列表分页数据
  toGetChildrenComments: params => {
    let obj = JSON.parse(JSON.stringify(params))
    delete obj.index
    delete obj.showSubMore
    let url = prefix + 'comments-children'
    return getRequest(url, obj)
  },

  //获取所有启用状态的公告数据
  toGetAnnouncements: () => getRequest(prefix + 'announcements'),

  //获取共享文件列表分页数据
  toGetSharesFile: params => {
    let obj = JSON.parse(JSON.stringify(params))

    let url = prefix + 'shares'
    return getRequest(url, obj)
  },

  //获取其他用户可供展示的数据
  toGetOtherUserInfo: params => {
    let isObj = Object.prototype.toString.call(params) === '[object Object]'
    let obj
    if (!isObj) {
      obj = { userId: params }
    } else {
      obj = params
    }
    let url = prefix + 'user-info'
    return getRequest(url, obj)
  },
  //=====================侧边=====================

  //获取侧边栏所有数据
  toGetSideAll: () => getRequest(prefix + 'side/all'),

  //获取最新更新的一条公告
  toGetSideAnnouncement: () => getRequest(prefix + 'side/announcement'),

  //获取最新--发布--文章列表
  toGetSideNewArticles: () => getRequest(prefix + 'side/articles-new'),

  //获取最新--推荐--的文章列表
  toGetSideRecArticles: () => getRequest(prefix + 'side/articles-recommend'),

  //获取分类
  toGetSideCategories: () => getRequest(prefix + 'side/categories'),

  //获取标签
  toGetSideTags: () => getRequest(prefix + 'side/tags')
}
//导出接口方法
export default blog
