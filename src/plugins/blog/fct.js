/*
 * @Author       : xuzhenghao
 * @Date         : 2020-03-16 10:59:39
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-08 13:58:39
 * @FilePath     : \VueProjects\my-blog\src\plugins\blog\fct.js
 * @Description  : 这是一些注释
 */
// eslint-disable-next-line no-unused-vars
exports.install = function(Vue, router, store, TweenMaxObject) {
  Vue.prototype.$toLogin = () => {
    //全局函数，跳转到登录页面
    console.log(router)
    router.push({
      path: '/login',
      query: {
        hostname: location.hostname
      }
    })
  }
  Vue.prototype.$toLoginSuccess = () => {
    //全局函数，登录成功，跳转到上次页面
    // 获取域名
    let hostName = router.currentRoute.query.hostname
    // let url = '127.0.0.1'
    // console.log(hostName)
    // console.log(location.hostname)
    // let url = '127.0.0.1'
    if (hostName === location.hostname) {
      // 判断如果域名是你项目域名，说明是从本网站内部跳转过来的，
      //获取路由路径
      // let path = _this.$route.query.redirect
      router.go(-1) // 登录成功后，返回上次进入的页面；
    } else {
      // 若不是网站内部跳转过来的，登陆成功后进入网站首页
      router.push('/blog')
    }
  }
  Vue.prototype.$toLogout = () => {
    //全局函数，注销登录
    store.dispatch('setUseUserIdFun')
    store.dispatch('setBaseUserInfoFun')
    store.dispatch('setUserInfoFun')
    store.dispatch('setLoginStatusFun')
    //注销后跳回首页
    router.push('/blog/home')
  }
  Vue.prototype.$avatar = avatar => {
    //全局函数，根据传进来的参数，判断使用默认头像，或者使用服务器头像
    let previewAvatar
    if (avatar) {
      if (avatar.indexOf('http') == -1) {
        previewAvatar = Vue.prototype.$global.remoteHost + avatar
        // previewAvatar = Vue.prototype.$global.preview + avatar
      } else {
        previewAvatar = avatar
      }
    } else {
      previewAvatar = Vue.prototype.$global.defaultAvatar
    }
    return previewAvatar
  }
  Vue.prototype.$cover = cover => {
    //全局函数，根据传进来的参数，判断使用默认头像，或者使用服务器头像
    let previewCover
    if (cover) {
      if (cover.indexOf('http') == -1) {
        previewCover = Vue.prototype.$global.remoteHost + cover
        // previewCover = Vue.prototype.$global.preview + cover
      } else {
        previewCover = cover
      }
    } else {
      previewCover = Vue.prototype.$global.defaultCover
    }
    return previewCover
  }
  Vue.prototype.$articleImg = img => {
    //全局函数，根据传进来的参数，判断使用默认文章图片，或者使用服务器文章图片
    let previewImg
    if (img) {
      if (img.indexOf('http') == -1) {
        previewImg = Vue.prototype.$global.remoteHost + img
        // previewCover = Vue.prototype.$global.preview + cover
      } else {
        previewImg = img
      }
    } else {
      previewImg = Vue.prototype.$global.defaultCover
    }
    return previewImg
  }
  Vue.prototype.$fileBg = name => {
    //全局函数，根据传进来的参数，判断使用文件所属类型背景
    let index = name.lastIndexOf('.')
    let type = name.substring(index + 1, name.length)
    let data = Vue.prototype.$global.filesTypeBgs[type]
    if (!data) {
      data = Vue.prototype.$global.filesTypeBgs.zip
    }
    return data
    // switch (type) {
    //   case 'text/html':
    //     return Vue.prototype.$global.filesTypeBgs.html

    //   case 'image/png':
    //   case 'image/jpeg':
    //     return Vue.prototype.$global.filesTypeBgs.img

    //   default:
    //     return Vue.prototype.$global.filesTypeBgs.zip
    // }
  }
  Vue.prototype.$scrollTop = function() {
    //滑动到顶部
    TweenMaxObject.TweenMax.to(window, 1.6, {
      scrollTo: 0,
      ease: TweenMaxObject.Bounce.easeOut
    })
    // TweenMax.to(window, 2, { scrollTo: { y: 'min' } })
  }
  Vue.prototype.$scrollBottom = function() {
    //滚动到最下方
    TweenMaxObject.TweenMax.to(window, 1.6, {
      scrollTo: 'max',
      ease: TweenMaxObject.Bounce.easeOut
    })
  }
  Vue.prototype.$isLogin = function() {
    //获取是否登录，已登录返回true
    return store.getters.getLoginStatusFun
  }
  Vue.prototype.$isAdmin = function() {
    //获取是否为管理员，是管理员返回true
    return (
      store.getters.isAdminFun == true || store.getters.isAdminFun == 'true'
    )
  }
  Vue.prototype.$isObject = value => {
    //获取是否为Object
    // if (JSON.stringify(value) === '{}') {
    //   return false // 如果为空,返回false
    // }
    // return true
    if (Object.keys(value).length === 0) {
      return false // 如果为空,返回false
    }
    return true // 如果不为空，则会执行到这一步，返回true
  }
  Vue.prototype.$isArray = value => {
    //获取是否为数组
    return Object.prototype.toString.call(value) == '[object Array]'
  }
  Vue.prototype.$isNumber = value => {
    //获取是否为数字

    return Object.prototype.toString.call(value) == '[object Number]'
  }
}
