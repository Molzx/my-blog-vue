/*
 * @Author       : xuzhenghao
 * @Date         : 2020-03-16 10:59:39
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-25 14:44:42
 * @FilePath     : \VueProjects\my-blog\src\plugins\blog\fct.js
 * @Description  : 这是一些注释
 */
// eslint-disable-next-line no-unused-vars
exports.install = function(Vue, router) {
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
    Vue.prototype.$store.dispatch('setUseUserIdFun')
    Vue.prototype.$store.dispatch('setBaseUserInfoFun')
    Vue.prototype.$store.dispatch('setUserInfoFun')
    Vue.prototype.$store.dispatch('setLoginStatusFun')
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
  Vue.prototype.$fileBg = type => {
    //全局函数，根据传进来的参数，判断使用文件所属类型背景
    switch (type) {
      case 'text/html':
        return Vue.prototype.$global.filesTypeBgs.html

      case 'image/png':
      case 'image/jpeg':
        return Vue.prototype.$global.filesTypeBgs.img

      default:
        return Vue.prototype.$global.filesTypeBgs.zip
    }
  }
  Vue.prototype.$pushH = function() {
    //全局函数2
  }
  Vue.prototype.$pushHN = function() {
    //全局函数3
  }
}
