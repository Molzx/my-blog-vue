/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 21:57:50
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-07 16:09:44
 * @FilePath     : \VueProjects\my-blog\src\assets\js\side.js
 * @Description  : 这是一些注释
 */
import { TweenLite, TimelineLite } from '@common/tweenmax/all'
export const sidebarData = require('@/assets/data/sidebar.json')
export function sidebarAnim(_this) {
  const hamburger = _this.$refs.hamburger
  // let sideBar = document.querySelectorAll('.sidebar_menu')
  // let arrow = document.querySelectorAll('.inner_hamburger')

  // let content = document.querySelectorAll('.side-list-item-content')
  // let content1 = document.querySelectorAll('.side-list-group-item-content')

  hamburger.addEventListener('click', function() {
    if (_this.sidebarOpen) {
      // TweenLite.to(container, 10.6, {
      //   css: { width: 'calc(100% - 100px)', marginLeft: '100px' }
      // })
      // containAnim(true, _this)
      listItemAnim(true, _this)
      arrowIconAnim(true, _this)

      _this.listExpand = false
    } else {
      // containAnim(false, _this)
      listItemAnim(false, _this)
      arrowIconAnim(false, _this)
      _this.listExpand = true
      _this.sidebarOpenCount++
    }
    _this.sidebarOpen = !_this.sidebarOpen
    _this.$refs.wrapper.classList.toggle('active')
    // _this.mini = !_this.mini
  })
}
// function containAnim(start, _this) {
//   const sidebar = _this.$refs.sidebar
//   const container = _this.$refs.container
//   if (start) {
//     //侧边栏关闭滑动效果
//     TweenLite.fromTo(
//       sidebar,
//       0.6,
//       { width: 250, ease: Power1.easeInOut },
//       { width: 100 }
//     )
//     TweenLite.fromTo(
//       container,
//       0.6,
//       {
//         css: { width: 'calc(100% - 250px)', marginLeft: '250px' },
//         ease: Power1.easeInOut
//       },
//       {
//         css: { width: 'calc(100% - 100px)', marginLeft: '100px' }
//       }
//     )
//   } else {
//     //侧边栏展开滑动效果
//     TweenLite.fromTo(
//       sidebar,
//       0.6,
//       { width: 100, ease: Power1.easeInOut },
//       { width: 250 }
//     )

//     TweenLite.to(container, 0.6, {
//       css: { width: 'calc(100% - 250px)', marginLeft: '250px' },
//       ease: Power1.easeOut
//     })
//   }
// }
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
  let time = 0.3
  if (start) {
    //侧边栏图标文字效果
    //单条列表项
    TweenLite.to([text], time, {
      // scale: 0.6,
      autoAlpha: 0,
      transformOrigin: 'left'
    })
    //组列表项 头部展开箭头
    TweenLite.to([group_append_icon], 0.1, {
      // scale: 0.6,
      autoAlpha: 0
    })

    //组列表项 子项的内容
    TweenLite.to([group_content], 0.1, {
      // scale: 0.6,
      autoAlpha: 0,
      transformOrigin: 'left'
    })
    //组列表项 子项的图标
    TweenLite.fromTo([group_icon], 1, { autoAlpha: 0 }, { autoAlpha: 1 })
  } else {
    //侧边栏图标文字效果
    //单条列表项
    TweenLite.to([text], 0.4, { autoAlpha: 1, delay: 0.3 })
    //组列表项 头部展开箭头
    TweenLite.to([group_append_icon], 0.4, { scale: 1, autoAlpha: 1 })

    //组列表项 子项的内容
    TweenLite.to([group_content], 0.4, { autoAlpha: 1, delay: 0.3 })

    //组列表项 子项的图标
    TweenLite.to([group_icon], 0.4, {
      // x: 30,
      autoAlpha: 0,
      // scale: 0.6,
      onComplete: function() {
        TweenLite.set([group_icon], { scale: 1 })
      }
    })
  }
}

export function groupItemAnim(start, _this) {
  // const group_content = _this.$refs.group_content
  const group_icon = _this.$refs.group_icon
  if (start) {
    _this.$nextTick(function() {
      // TweenLite.set([group_content], { x: -20, autoAlpha: 0 })

      // TweenLite.set([group_icon], { x: -70, autoAlpha: 0 })

      TweenLite.to([group_icon], 0.6, { autoAlpha: 1 })
    })
  }
}
