var target
var options = {
  duration: 300,
  offset: 0,
  easing: 'easeInOutCubic'
}

export function scrollTo(_this, value, type) {
  if (type === 'number') {
    target = Number(value)
  } else {
    target = value
  }
  _this.$vuetify.goTo(target, options)
}
//回到顶部
export function scrollToTop(_this) {
  target = 0
  _this.$vuetify.goTo(target, options)
}
//回到底部
export function scrollToBottom(_this) {
  target = 9999
  _this.$vuetify.goTo(target, options)
}
//滑动到评论区域
export function scrollToComment(_this) {
  target = '#comment'
  _this.$vuetify.goTo(target, options)
}
