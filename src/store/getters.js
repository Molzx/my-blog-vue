/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 15:13:35
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-08 16:35:42
 * @FilePath     : \VueProjects\my-blog\src\store\getters.js
 * @Description  : 这是一些注释
 */
// https://vuex.vuejs.org/en/getters.html

export default {
  //===================system===============
  //文章列表展示页面的分类下拉，标签下拉数据是否更新
  getArticleConditionRefreshFun: state => state.articleConditionRefresh,
  getCodeKeyFun: state => state.codeKey,
  getCodeTimeFun: state => state.codeTime,
  //获取登录用户信息
  getUserInfoFun: state => state.userInfo,
  //本地是否有token，有返回true，代表已登录
  getLoginStatusFun: state => {
    let status = state.Authorization
    if (status) {
      return true
    } else {
      return false
    }
  },
  getBaseUserInfoFun: state => state.BaseUserInfo,
  isFirstInitSubPageFun: state => state.firstInitSubPage,
  getCurrentSubPageFun: function(state) {
    return state.currentSubPage
  },
  getSubPageCurrentPageFun: state => state.currentSubPage.currentPage,
  getUseRecordIdFun: state => state.useRecordId,
  getDrawerWidthFun: state => state.drawerWidth,
  getOpenDrawerFun: state => state.openDrawer,

  //================blog============
  getActiveBlogPageIndexFun: state => state.blogData.activePageIndex,
  getArticleFloatGroupFun: state => state.articleFloatGroup,
  getArticlePreviewSuccessFun: state => state.articlePreviewSuccess,

  //获取  侧边栏的最新推荐文章数据
  getRecArticleItemsFun: state => state.recArticleItems,

  //获取  侧边栏的分类数据
  getCategoryItemsFun: state => state.categoryItems,
  //获取  侧边栏的标签数据
  getTagItemsFun: state => state.tagItems,
  //获取  侧边栏的最新发布文章数据
  getNewArticleItemsFun: state => state.newArticleItems,
  //获取  侧边栏的浏览量最高的文章数据
  getTopViewArticleItemsFun: state => state.topViewArticleItems,

  //设置所查看用户信息的用户id
  getUseUserIdFun: state => state.useUserId
}
