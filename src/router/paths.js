/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */

import Home from '@views/Home.vue'
import Index from '@views/login-page/Index.vue'
import Login from '@views/Login.vue'
import Test from '@views/Test.vue'
import SysMain from '@views/system/Layout.vue'
import SysComment from '@views/system/Comment.vue'
import SysFile from '@views/system/File.vue'
import SysTemp1 from '@views/system/Temp1.vue'
import SysTemp2 from '@views/system/Temp2.vue'
import SysTemp3 from '@views/system/Temp3.vue'
import SysTemp4 from '@views/system/Temp4.vue'
// const SysMain = resolve => {
//   require.ensure(
//     [],
//     () => {
//       resolve(require('@views/system/Layout'))
//     },
//     'list'
//   )
// }
// component: resolve => require(['@views/system/SysMain.vue'], resolve),
// const SysMain = resolve => require(['@views/system/SysMain.vue'], resolve)
// const SysMain = () => import('../views/system/SysMain.vue')
// export const parents = [('system': SysMain), ('index': Index)]
//不知道为什么，这个路由不能删掉，即便没有用到，嵌套路由删了，嵌套路由页面就错位
export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/login-one',
    name: 'login-one',
    component: () => import('@views/login-page/One.vue')
  },
  {
    path: '/login-two',
    name: 'login-two',
    component: () => import('@views/login-page/Two.vue')
  },
  {
    path: '/login-three',
    name: 'login-three',
    component: () => import('@views/login-page/Three.vue')
  },
  {
    path: '/system',
    name: 'system',
    //重定向
    // redirect: '/system/comment',
    // component: () => import('../views/system/SysMain.vue'),
    // component: resolve => require(['@views/system/SysMain.vue'], resolve),
    component: SysMain,
    children: [
      // 以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
      {
        path: 'user-management/display',
        name: 'user-show',
        component: () =>
          import(
            /* webpackChunkName: "user-show" */ '@views/system/user-management/Display.vue'
          )
      },
      {
        path: 'user-management/addition',
        name: 'user-add',
        component: () =>
          import(
            /* webpackChunkName: "user-add" */ '@views/system/user-management/Addition.vue'
          )
      },
      {
        path: 'user-management/update',
        name: 'user-update',
        component: () =>
          import(
            /* webpackChunkName: "user-update" */ '@views/system/user-management/Update.vue'
          )
      },
      {
        path: 'comment',
        name: 'sysComment',
        component: SysComment
      },
      {
        path: 'file',
        name: 'sysFile',
        component: SysFile
      },
      {
        path: 'temp1',
        name: 'temp1',
        component: SysTemp1
      },
      {
        path: 'temp2',
        name: 'temp2',
        component: SysTemp2
      },
      {
        path: 'temp3',
        name: 'temp3',
        component: SysTemp3
      },
      {
        path: 'temp4',
        name: 'temp4',
        component: SysTemp4
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@views/About.vue')
  }
]

export const paths = [
  {
    path: '',
    // Relative to /src/views
    view: 'Index'
  },
  {
    path: '/',
    name: 'home',
    view: 'Home'
  },
  {
    path: '/index',
    name: 'index',
    view: 'Index'
  },
  {
    path: '/login',
    name: 'login',
    view: 'Login'
  },
  {
    path: '/test',
    name: 'test',
    view: 'Test'
  },
  {
    path: '/login-one',
    name: 'login-one',
    view: 'login-page/One'
  },
  {
    path: '/login-two',
    name: 'login-two',
    view: 'login-page/Two'
  },
  {
    path: '/login-three',
    name: 'login-three',
    view: 'login-page/Three'
  },
  {
    path: '/system',
    name: 'system',
    //重定向
    // redirect: '/system/comment',
    // view: 'system/SysMain',
    view: SysMain,
    sub: [
      // 以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。

      {
        path: 'user-management/display',
        name: 'user-show',
        view: 'system/user/Display'
      },
      {
        path: 'user-management/addition',
        name: 'user-add',
        view: 'system/user/Addition'
      },
      {
        path: 'user-management/update',
        name: 'user-update',
        view: 'system/user/Update'
      },
      {
        path: 'comment-management',
        name: 'sysComment',
        view: 'system/Comment'
      },
      {
        path: 'file',
        name: 'sysFile',
        view: 'system/File'
      },
      {
        path: 'temp1',
        name: 'temp1',
        view: 'system/Temp1'
      },
      {
        path: 'temp2',
        name: 'temp2',
        view: 'system/Temp2'
      },
      {
        path: 'temp3',
        name: 'temp3',
        view: 'system/Temp3'
      },
      {
        path: 'temp4',
        name: 'temp4',
        view: 'system/Temp4'
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    view: 'About'
  }
]
