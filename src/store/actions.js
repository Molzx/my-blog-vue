/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 15:13:35
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-02 12:26:55
 * @FilePath     : \VueProjects\my-blog\src\store\actions.js
 * @Description  : 这是一些注释
 */
// https://vuex.vuejs.org/en/actions.html

export default {
  // changeRouter(state) {
  //   console.log(state)
  // }
  setRefreshFun(context, refresh) {
    context.commit('setRefresh', refresh)
  },
  setCodeKeyFun(context, codeKey) {
    context.commit('setCodeKey', codeKey)
  },
  // 修改验证码 倒计时，并将 Key存入 sessionStorage
  setCodeTimeFun(context, time) {
    context.commit('setCodeTime', time)
  },
  //设置登录用户信息
  setUserInfoFun(context, info) {
    context.commit('setUserInfo', info)
  },
  setLoginStatusFun(context, info) {
    context.commit('setLoginStatus', info)
    //设置基本用户信息
    context.commit('setBaseUserInfo', info.BaseUserInfo)
  },
  setBaseUserInfoFun(context, info) {
    context.commit('setBaseUserInfo', info)
  },
  setCurrentSubPageFun(context, index) {
    context.commit('setCurrentSubPage', index)
  },
  saveCurrentSubPageFun(context) {
    context.commit('saveCurrentSubPage')
  },
  setSubPageCurrentPageFun(context, index) {
    context.commit('setSubPageCurrentPage', index)
  },
  setUseRecordIdFun(context, useRecordId) {
    context.commit('setUseRecordId', useRecordId)
  },
  setDrawerWidthFun(context, number) {
    context.commit('setDrawerWidth', number)
  },
  changeOpenDrawerFun(context, open) {
    context.commit('changeOpenDrawer', open)
  },

  //文章列表展示页面的分类下拉，标签下拉数据是否更新
  setArticleConditionRefreshFun(context, articleConditionRefresh) {
    context.commit('setArticleConditionRefresh', articleConditionRefresh)
  },
  //=============blog=================
  saveCurrentBlogDataFun(context) {
    context.commit('saveCurrentBlogData')
  },
  setActiveBlogPageIndexFun(context, index) {
    context.commit('setActiveBlogPageIndex', index)
  },
  setArticleFloatGroupFun(context, show) {
    context.commit('setArticleFloatGroup', show)
  },
  setArticlePreviewSuccessFun(context, success) {
    context.commit('setArticlePreviewSuccess', success)
  },

  //设置  侧边栏的最新推荐文章数据
  setRecArticleItemsFun(context, items) {
    context.commit('setRecArticleItems', items)
  },
  //设置  侧边栏的分类数据
  setCategoryItemsFun(context, items) {
    context.commit('setCategoryItems', items)
  },
  //设置  侧边栏的标签数据
  setTagItemsFun(context, items) {
    context.commit('setTagItems', items)
  },
  //设置  侧边栏的最新发布文章数据
  setNewArticleItemsFun(context, items) {
    context.commit('setNewArticleItems', items)
  },
  //设置所查看用户信息的用户id
  setUseUserIdFun(context, userId) {
    context.commit('setUseUserId', userId)
  }
}
