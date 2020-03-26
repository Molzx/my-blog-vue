import Vue from 'vue'
import vuescroll from 'vuescroll'

// 你可以在这里设置全局配置
Vue.use(vuescroll, {
  ops: {
    //
    vuescroll: {
      detectResize: false
    },
    scrollPanel: {
      initialScrollY: false,
      initialScrollX: false,
      scrollingX: true,
      scrollingY: true,
      speed: 0,
      easing: 'easeOutQuart',
      verticalNativeBarPos: 'right',
      maxHeight: undefined,
      maxWidth: undefined
    },
    rail: {
      background: '#01a99a',
      opacity: 0,
      size: '6px',
      specifyBorderRadius: false,
      gutterOfEnds: null,
      gutterOfSide: '2px',
      keepShow: true
    },
    bar: {
      showDelay: 0,
      onlyShowBarOnScroll: false,
      keepShow: false,
      background: '#c1c1c1',
      opacity: 1,
      hoverStyle: false,
      specifyBorderRadius: false,
      minSize: false,
      size: '6px',
      disable: false
    }
  }, // 在这里设置全局默认配置
  name: 'myScroll' // 在这里自定义组件名字，默认是vueScroll
})
