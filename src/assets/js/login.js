/*
 * @Author       : xuzhenghao
 * @Date         : 2020-02-17 10:20:11
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-28 13:10:53
 * @FilePath     : \VueProjects\my-blog\src\assets\js\login.js
 * @Description  : 这是一些注释
 */
export function goToPage(_this) {
  // 获取域名
  let hostName = _this.$route.query.hostname
  // let url = '127.0.0.1'
  // console.log(hostName)
  // console.log(location.hostname)
  // let url = '127.0.0.1'
  if (hostName === location.hostname) {
    // 判断如果域名是你项目域名，说明是从本网站内部跳转过来的，
    //获取路由路径
    // let path = _this.$route.query.redirect
    _this.$router.go(-1) // 登录成功后，返回上次进入的页面；
  } else {
    _this.$router.push('/blog')
    // window.open(url + '/blog', '_self') // 若不是网站内部跳转过来的，登陆成功后进入网站首页
  }
}
//登录成功后的数据处理
export function afterLoginSuccess(vm, data) {
  let userToken = 'Bearer ' + data.token
  console.log(vm.remember)
  // 将用户token保存到vuex中
  let userInfo = data.userInfo
  let storeData = {
    Authorization: userToken,
    BaseUserInfo: userInfo,
    type: vm.remember
  }
  vm.$store.dispatch('setLoginStatusFun', storeData)
  // vm.setLoginStatus()
  // vm.setUserInfo(userInfo)
  vm.$toast.success('登录成功')

  vm.loading = false
  //跳转到原来页面
  vm.$toLoginSuccess()
}
