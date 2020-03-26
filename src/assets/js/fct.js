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
    vm.setCodeTime({})
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
