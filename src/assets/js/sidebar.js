/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 21:57:50
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-19 18:04:56
 * @FilePath     : \VueProjects\my-blog\src\assets\js\side.js
 * @Description  : 这是一些注释
 */
import { TweenLite, TweenMax, TimelineLite } from '@commons/tweenmax/all'
export const sidebarData = require('@/assets/data/sidebar.json')
export function sidebarAnim(_this) {
  const sidebar = _this.$refs.sidebar
  const container = _this.$refs.container

  const hamburger = _this.$refs.hamburger

  // let sideBar = document.querySelectorAll('.sidebar_menu')
  // let arrow = document.querySelectorAll('.inner_hamburger')

  // let content = document.querySelectorAll('.side-list-item-content')
  // let content1 = document.querySelectorAll('.side-list-group-item-content')

  hamburger.addEventListener('click', function() {
    if (_this.sidebarOpen) {
      //侧边栏关闭滑动效果
      TweenLite.fromTo(sidebar, 0.6, { width: 250 }, { width: 100 })

      TweenLite.to(container, 0.6, {
        css: { width: 'calc(100% - 100px)', marginLeft: '100px' }
      })

      listItemAnim(true, _this)
      arrowIconAnim(true, _this)

      _this.listExpand = false
    } else {
      //侧边栏展开滑动效果
      TweenLite.fromTo(sidebar, 0.6, { width: 100 }, { width: 250 })

      TweenLite.to(container, 0.6, {
        css: { width: 'calc(100% - 250px)', marginLeft: '250px' }
      })

      listItemAnim(false, _this)
      arrowIconAnim(false, _this)
      _this.listExpand = true
      _this.sidebarOpenCount++
    }
    _this.sidebarOpen = !_this.sidebarOpen
    // _this.$refs.wrapper.classList.toggle('active')
    // _this.mini = !_this.mini
  })
}

/**
 * @description: 导航箭头动画效果
 * @param {type}
 * @return:
 */
function arrowIconAnim(start, _this) {
  const arrowLeft = _this.$refs.arrowLeft
  const arrowRight = _this.$refs.arrowRight
  var tl
  if (start) {
    //侧边栏关闭时的箭头效果
    tl = new TimelineLite()
    tl.add(TweenLite.to(arrowLeft, 0.2, { x: -20, autoAlpha: 0 })) //将一个动画添加到时间轴
    tl.add(TweenLite.to(arrowLeft, 0.005, { css: { display: 'none' } })) //将一个动画添加到时间轴末端，即与前一个动画接续

    tl.add(TweenLite.to(arrowRight, 0.005, { css: { display: 'block' } }))
    tl.add(
      TweenLite.fromTo(
        arrowRight,
        0.2,
        { x: 20, autoAlpha: 0 },
        { x: 0, autoAlpha: 1 }
      )
    )
  } else {
    //侧边栏展开时的箭头效果
    tl = new TimelineLite()
    tl.add(TweenLite.to(arrowRight, 0.2, { x: 20, autoAlpha: 0 })) //将一个动画添加到时间轴
    tl.add(TweenLite.to(arrowRight, 0.005, { css: { display: 'none' } })) //将一个动画添加到时间轴末端，即与前一个动画接续

    tl.add(TweenLite.to(arrowLeft, 0.005, { css: { display: 'block' } }))
    tl.add(
      TweenLite.fromTo(
        arrowLeft,
        0.2,
        { x: -20, autoAlpha: 0 },
        { x: 0, autoAlpha: 1 }
      )
    )
  }
}

function listItemAnim(start, _this) {
  const text = _this.$refs.content

  let group_append_icon = document.querySelectorAll(
    '.v-list-group__header__append-icon'
  )

  const group_content = _this.$refs.group_content
  const group_icon = _this.$refs.group_icon
  if (start) {
    //侧边栏图标文字效果
    TweenLite.to([text], 0.4, { x: -20, autoAlpha: 0 })
    TweenLite.to([group_append_icon], 0.3, { x: -10, autoAlpha: 0 })

    TweenLite.to([group_content], 0.6, { x: -20, autoAlpha: 0 })
    TweenLite.to([group_icon], 0.6, { x: -70, autoAlpha: 1 })
  } else {
    //侧边栏图标文字效果
    TweenLite.to([text], 0.6, { x: 0, autoAlpha: 1 })
    TweenLite.to([group_append_icon], 0.3, { x: 0, autoAlpha: 1 })

    TweenLite.to([group_content], 0.6, { x: 0, autoAlpha: 1 })
    TweenLite.to([group_icon], 0.6, { x: 0, autoAlpha: 0 })
  }
}

export function groupItemAnim(start, _this) {
  const group_content = _this.$refs.group_content
  const group_icon = _this.$refs.group_icon
  if (start) {
    _this.$nextTick(function() {
      TweenMax.set([group_content], { x: -20, autoAlpha: 0 })

      TweenLite.set([group_icon], { x: -70, autoAlpha: 0 })
      TweenMax.to([group_icon], 0.2, { autoAlpha: 1 })
    })
  } else {
    TweenLite.to([group_content], 0.6, { x: 0, autoAlpha: 1 })
    TweenLite.to([group_icon], 0.6, { x: 0 })
  }
}
