export function reloadSendBtn(vm) {
  // 控制倒计时及按钮是否可以点击
  // let code = vm.getCodeTime

  // if (code && JSON.stringify(code) != '{}') {
  // }
  changeSendBtn(vm, 4)
}

//更改发送验证码按钮，state 0，默认启用倒计时，1，,重置倒计时，2，中止倒计时，立即重试
//3，,暂停倒计时，存储倒计时到本地，4，,继续倒计时
export function changeSendBtn(vm, state) {
  if (!state) {
    state = 0
  }
  if (state == 1) {
    //重置倒计时，
    endSendBtn(vm, 1)
  } else if (state == 2) {
    //中止倒计时，立即重试，
    endSendBtn(vm, 2)
  } else if (state == 3) {
    //暂停倒计时，存储倒计时到本地
    endSendBtn(vm, 2, vm.code)
  } else if (state == 0 || state == 4) {
    // let vm = this
    const TIME_COUNT = 60
    // 控制倒计时及按钮是否可以点击
    let code = vm.getCodeTime

    // console.log(code)
    // console.log(vm.code)
    if (
      code &&
      JSON.stringify(code) != '{}' &&
      code.count > 0 &&
      code.name == vm.code.name &&
      code.type == vm.code.type
    ) {
      vm.code.count = code.count
    } else {
      //如果是继续倒计时，本地没有存储，直接返回
      if (state == 4) {
        //重置倒计时，
        endSendBtn(vm, 1)
        // console.log(vm.isSend)
        return
      }
      vm.code.count = TIME_COUNT
    }
    //只有当前没有倒计时运行，才新建倒计时
    if (!vm.timer) {
      vm.timer = window.setInterval(() => {
        if (vm.code.count > 0 && vm.code.count <= TIME_COUNT) {
          // 倒计时时不可点击
          vm.isSend = true
          // 计时秒数
          vm.code.count--
          //倒计时存储到session本地
          vm.setCodeTime(vm.code)
          // 更新按钮的文字内容
          vm.btnContent = '重新发送(' + vm.code.count + ')'
        } else {
          endSendBtn(vm, 2)
        }
      }, 1000)
    }
  }
}

function endSendBtn(vm, type, code) {
  //倒计时存储到session本地
  if (code) {
    vm.setCodeTime(code)
    // 暂停倒计时，不可点击
    vm.isSend = true
    // console.log('in')
  } else {
    vm.setCodeTime()
    // 倒计时完，可点击
    vm.isSend = false
  }
  // 更新按钮文字内容
  if (type == 1) {
    vm.btnContent = '获取验证码'
  }
  if (type == 2) {
    vm.btnContent = '重新发送'
  }
  // 清空定时器!!!
  clearInterval(vm.timer)
  vm.timer = null
}
//复制添加版权来源信息
export function copy() {
  //复制添加版权信息
  if (typeof window.getSelection == 'undefined') return //IE8 及更老的版本不兼容

  var body_element = document.getElementsByTagName('body')[0]
  var selection = window.getSelection()

  //如果选择是短的内容，让我们不要打扰我们的用户
  if (('' + selection).length < 30) return

  //创建一个DIV的可见区域之外
  //并填写选定的文本
  var newdiv = document.createElement('div')
  newdiv.style.position = 'absolute'
  newdiv.style.left = '-99999px'
  body_element.appendChild(newdiv)
  newdiv.appendChild(selection.getRangeAt(0).cloneContents())

  //我们需要<pre>标签解决方案
  //其他的文本在<pre>失去了所有的行符！
  if (selection.getRangeAt(0).commonAncestorContainer.nodeName == 'PRE') {
    newdiv.innerHTML = '<pre>' + newdiv.innerHTML + '</pre>'
  }
  //   返回https://xxx/blog/home
  let url =
    window.location.protocol + '//' + window.location.host + '/blog/home'
  newdiv.innerHTML +=
    "<br />————————————————<br />欢迎转载，转载请注明: <a href='" +
    url +
    "'>" +
    '「奶茬博客」</a>(' +
    url +
    ")<br />原文链接：<a href='" +
    document.location.href +
    "'>" +
    document.location.href +
    '</a>'

  selection.selectAllChildren(newdiv)
  window.setTimeout(function() {
    body_element.removeChild(newdiv)
  }, 200)
}
//打开小窗口
export function openWindow(url, title, w, h) {
  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : screen.left
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : screen.top

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height

  const left = width / 2 - w / 2 + dualScreenLeft
  const top = height / 2 - h / 2 + dualScreenTop
  const newWindow = window.open(
    url,
    title,
    'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      top +
      ', left=' +
      left
  )

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
}
//name 弹窗名字
//width 弹窗宽度（比例）
//height 弹窗高度（比例）
//myWindow 弹窗对象
export function openWin(url, name, width, height, myWindow) {
  // var myWindow
  var w_percent = width ? width : 9 //如果参数未传，则取9
  var h_percent = height ? height : 8
  var widths = (window.screen.availWidth * w_percent) / 10
  var heights = (window.screen.availHeight * h_percent) / 10
  var iLeft = (window.screen.availWidth - widths) / 2
  var iTop = (window.screen.availHeight - heights) / 2

  //判断是否为IE
  var b_version = navigator.appVersion
  var version = b_version.split(';')
  if (version[1]) {
    var trim_Version = version[1].replace(/[ ]/g, '')
  }
  if (
    trim_Version == 'MSIE9.0' ||
    trim_Version == 'MSIE10.0' ||
    trim_Version == 'WOW64' ||
    trim_Version == 'MSIE7.0'
  ) {
    //IE浏览器，直接打开
    myWindow = window.open(
      url,
      name,
      'scrollbars=yes,width=' +
        widths +
        ',height=' +
        heights +
        ',left=' +
        iLeft +
        ',top=' +
        iTop +
        ''
    )
    myWindow.focus()
  } else {
    //非IE，判断窗口是否存在，若存在，则关闭当前窗口，重新打开
    if (myWindow) {
      myWindow.close()
      myWindow = null
    }
    myWindow = window.open(
      url,
      name,
      'scrollbars=yes,width=' +
        widths +
        ',height=' +
        heights +
        ',left=' +
        iLeft +
        ',top=' +
        iTop +
        ''
    )
  }

  // console.log(myWindow)
  return myWindow
  //弹窗名字重命名ss
  // var title = name
  // setTimeout(function() {
  //   myWindow.document.title = title
  // }, 1000)
}
