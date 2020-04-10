/*
 * @Author: your name
 * @Date: 2019-12-08 16:50:21
 * @LastEditTime : 2020-04-10 14:16:09
 * @LastEditors  : xuzhenghao
 * @Description: In User Settings Edit
 * @FilePath     : \VueProjects\my-blog\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
// import { paths } from './paths'

// import SysMain from '@views/system/SysMain.vue'
// function route(path, view, name, sub) {
//   if (sub != null) {
//     // console.log(children.map(path =>
//     //   route(path.path, path.view, path.name, path.children)),
//     return {
//       name: name,
//       path: path,
//       // component: SysMain,
//       // component: r =>
//       //   require.ensure(
//       //     [],
//       //     () => r(require('@views/system/SysMain.vue')),
//       //     'system'
//       //   ),
//       component: view,
//       // component: () => import(`@/views/${view}.vue`),
//       // component: resolve => require([`@views/${view}.vue`], resolve),
//       // component: resolve => import(`@/views/${view}.vue`).then(resolve),
//       children: sub.map(ch => routeChildren(ch.path, ch.view, ch.name))
//     }
//   } else {
//     return {
//       name: name || view,
//       path: path,
//       // component: () => import(`@/views/${view}.vue`)
//       component: resolve => require([`@views/${view}.vue`], resolve)
//       // component: resolve => import(`@/views/${view}.vue`).then(resolve)
//     }
//   }
// }

// function routeChildren(path, view, name) {
//   return {
//     name: name || view,
//     path: path,
//     // component: () => import(`@/views/${view}.vue`)
//     component: resolve => require([`@views/${view}.vue`], resolve)
//     // component: resolve => import(`@/views/${view}.vue`).then(resolve)
//   }
// }

Vue.use(VueRouter)

// const routes = paths
//   .map(path => route(path.path, path.view, path.name, path.sub))
//   .concat([{ path: '*', redirect: '/' }])

// import { routes } from './paths'
import RouteGenerator from '../utils/easy-router/index.js'
let generator = new RouteGenerator(
  require.context('@views', true, /\.vue$/, 'lazy')
)
let routes = [generator.generate()].concat([{ path: '*', redirect: '/404' }])

const router = new VueRouter({
  // 去掉url中的#
  mode: 'history',
  // routes
  routes: routes
})

// import NProgress from '../plugins/nprogress'
import { encryUrlOfRouter } from '@/utils/secretUrl'
//导入url解密获取
// import { GetQueryParamOfObjEntry } from '@/utils/secretUrl'
router.beforeEach((to, from, next) => {
  // NProgress.start()
  // next()
  console.log('hh')
  let flag = encryUrlOfRouter(to, from, next)
  console.log(flag)
  if (flag) {
    console.log('normal')
    next()
  }
  // console.log('over')
})

router.afterEach(() => {
  // NProgress.done()
})

export default router
