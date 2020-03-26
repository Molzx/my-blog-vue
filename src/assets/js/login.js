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
