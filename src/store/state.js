/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-15 17:35:35
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-04 13:19:15
 * @FilePath     : \VueProjects\blog\src\store\state.js
 * @Description  : 这是一些注释
 */
// https://vuex.vuejs.org/en/state.html

// 导入修改过的可删除localstorage过期数据的index.js中创建的 storage 实例
import storage from '@/utils/storage/index'

import sessionStorage from '@/utils/storage/session-storage'
export default {
  //

  // 存储token
  Authorization: storage.getItem('Authorization')
    ? storage.getItem('Authorization')
    : '',
  NetworkStatus: storage.getItem('NetworkStatus')
    ? storage.getItem('NetworkStatus')
    : true,

  //login
  //存储验证码key
  codeKey: sessionStorage.getItem('codeKey')
    ? sessionStorage.getItem('codeKey')
    : {},
  //存储验证码 倒计时
  codeTime: sessionStorage.getItem('codeTime')
    ? sessionStorage.getItem('codeTime')
    : '',
  //存储登录成功的用户信息
  userInfo: sessionStorage.getItem('userInfo')
    ? sessionStorage.getItem('userInfo')
    : '',
  //存储登录成功的用户头像和昵称
  BaseUserInfo: storage.getItem('BaseUserInfo')
    ? storage.getItem('BaseUserInfo')
    : '',

  //system
  //文章列表展示页面的分类下拉，标签下拉数据是否更新
  articleConditionRefresh: false,
  //设置当前使用的是哪个功能界面
  currentSubPage: sessionStorage.getItem('currentSubPage')
    ? sessionStorage.getItem('currentSubPage')
    : {},
  //默认功能界面下的子界面的第一个页面
  firstInitSubPage: true,
  //存储展示列表过程中记录需要使用的唯一标识，
  //例如用户的userName，角色的roleCode等等
  useRecordId: sessionStorage.getItem('useRecordId')
    ? sessionStorage.getItem('useRecordId')
    : '',
  drawerWidth: 250,
  //侧边栏开启状态
  openDrawer: sessionStorage.getItem('openDrawer')
    ? sessionStorage.getItem('openDrawer')
    : true,

  //=============blog================
  //存储博客顶栏导航的index
  blogData: sessionStorage.getItem('currentBlogData')
    ? sessionStorage.getItem('currentBlogData')
    : {
        activePageIndex: 0
      },
  //博客详情页面左边浮动控件是否显示
  articleFloatGroup: true,
  //博客详情文章是否已经加载完毕，后初始化目录
  articlePreviewSuccess: false,
  //存储要查看的用户信息的用户id
  useUserId: sessionStorage.getItem('useUserId')
    ? sessionStorage.getItem('useUserId')
    : '',

  //=======边缘栏目
  //侧边栏的最新推荐文章数据
  recArticleItems: [],
  //侧边栏的分类数据
  categoryItems: [],
  //侧边栏的标签数据
  tagItems: [],
  //侧边栏的最新发布文章数据
  newArticleItems: []
}
