/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-15 17:35:35
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-29 16:40:48
 * @FilePath     : \VueProjects\my-blog\src\store\mutations.js
 * @Description  : 这是一些注释
 */
// https://vuex.vuejs.org/en/mutations.html

// 导入修改过的可删除localstorage过期数据的index.js中创建的 storage 实例
import storage from '@/utils/storage/index'

import sessionStorage from '@/utils/storage/session-storage'

import subPage from '@/assets/data/subpage-data'

export default {
  //
  changeNetwork(state, status) {
    state.NetworkStatus = status
    storage.setItem({ name: 'NetworkStatus', value: status })
  },
  // 修改验证码key，并将 Key存入 sessionStorage
  setCodeKey(state, codeKey) {
    state.codeKey = codeKey
    sessionStorage.setItem('codeKey', state.codeKey)
  },
  // 修改验证码 倒计时，并将 Key存入 sessionStorage
  setCodeTime(state, time) {
    if (time) {
      state.codeTime = time
    } else {
      state.codeTime = ''
    }
    sessionStorage.setItem('codeTime', state.codeTime)
  },

  // 修改用户信息，并将用户信息存入localStorage，当前浏览器未关闭有效
  setUserInfo(state, info) {
    //如果info不为空
    if (typeof info != undefined) {
      state.userInfo = info
      sessionStorage.setItem('userInfo', state.userInfo)
    } else {
      state.userInfo = ''
      //info为空，即代表删除
      sessionStorage.removeItem('userInfo')
    }
  },
  // 修改token，并将token存入localStorage
  setLoginStatus(state, info) {
    //如果info不为空
    if (typeof info != undefined) {
      state.Authorization = info.Authorization
      //判断是否记住我，如果为1保存token7天，否则为当次浏览器会话
      if (info.type) {
        console.log('in')
        storage.setItem({
          name: 'Authorization',
          value: info.Authorization,
          expires: '604800000'
        })
      } else {
        sessionStorage.setItem('Authorization', info.Authorization)
      }
    } else {
      state.Authorization = ''
      //info为空，即代表删除
      storage.removeItem('Authorization')
      sessionStorage.removeItem('Authorization')
    }
  },
  // 修改基础用户信息，并将信息存入localStorage
  setBaseUserInfo(state, info) {
    //如果info不为空
    if (typeof info != undefined) {
      state.BaseUserInfo = info
      // let userInfo = info.BaseUserInfo
      // if (userInfo) {
      //   state.BaseUserInfo = {
      //     avatar: userInfo.avatar,
      //     nickName: userInfo.nickName
      //   }
      // } else {
      //   state.BaseUserInfo = {
      //     avatar: info.avatar,
      //     nickName: info.nickName
      //   }
      // }
      storage.setItem({ name: 'BaseUserInfo', value: state.BaseUserInfo })
    } else {
      state.BaseUserInfo = ''
      //info为空，即代表删除
      storage.removeItem('BaseUserInfo')
    }
  },
  //=====================================system=============================
  setUseRecordId(state, useRecordId) {
    if (state.useRecordId == useRecordId) {
      // console.log('yes')
      state.refresh = true
    } else {
      // console.log('no')
      state.refresh = false
    }
    state.useRecordId = useRecordId
    sessionStorage.setItem('useRecordId', state.useRecordId)
  },

  setCurrentSubPage(state, name) {
    //根据name获取页面数据
    let page = subPage[name]
    //设置页面
    state.currentSubPage = JSON.parse(JSON.stringify(page))
  },
  saveCurrentSubPage(state) {
    sessionStorage.setItem('currentSubPage', state.currentSubPage)
  },
  setSubPageCurrentPage(state, name) {
    switch (name) {
      case 'list':
        state.refresh = false
        state.currentSubPage.currentPage = 0
        break
      case 'detail':
        state.currentSubPage.currentPage = 1
        break
      case 'edit':
        state.currentSubPage.currentPage = 2
        break
      case 'add':
        state.currentSubPage.currentPage = 3
        break
    }
  },
  setDrawerWidth(state, number) {
    state.drawerWidth = number
  },

  //侧边栏开启状态
  changeOpenDrawer(state, open) {
    if (open) {
      state.openDrawer = open
    } else {
      state.openDrawer = !state.openDrawer
    }
    sessionStorage.setItem('openDrawer', state.openDrawer)
  },
  //文章列表展示页面的分类下拉，标签下拉数据是否更新
  setArticleConditionRefresh(state, articleConditionRefresh) {
    state.articleConditionRefresh = articleConditionRefresh
  },

  //=============blog==============
  saveCurrentBlogData(state) {
    sessionStorage.setItem('currentBlogData', state.blogData)
  },
  setActiveBlogPageIndex(state, index) {
    state.blogData.activePageIndex = index
  },
  setArticleFloatGroup(state, show) {
    state.articleFloatGroup = show
  },
  setArticlePreviewSuccess(state, success) {
    state.articlePreviewSuccess = success
  },

  //设置  侧边栏的最新推荐文章数据
  setRecArticleItems(state, recArticleItems) {
    state.recArticleItems = recArticleItems
  },
  //设置  侧边栏的分类数据
  setCategoryItems(state, categoryItems) {
    state.categoryItems = categoryItems
  },
  //设置  侧边栏的标签数据
  setTagItems(state, tagItems) {
    state.tagItems = tagItems
  },
  //设置  侧边栏的最新发布文章数据
  setNewArticleItems(state, newArticleItems) {
    state.newArticleItems = newArticleItems
  },
  //设置所查看用户信息的用户id
  setUseUserId(state, userId) {
    //如果info不为空
    if (typeof userId != undefined) {
      state.useUserId = userId
    } else {
      state.useUserId = ''
    }
    sessionStorage.setItem('useUserId', state.useUserId)
  }
}
