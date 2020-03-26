/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-31 10:12:44
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-07 14:24:27
 * @FilePath     : \VueProjects\my-blog\src\utils\axios\Interceptor.js
 * @Description  : 拦截器配置，请求拦截器，响应拦截器
 */
import axios from 'axios'
import store from '@/store'
import judgeErrorCode from './errorCode.js'
import NProgress from '../../plugins/nprogress'

// axios配置
let config = {
  // baseURL: '/api',
  // withCredentials: true
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

// 创建axios实例
const instance = axios.create(config)

// 添加请求拦截器
instance.interceptors.request.use(
  // 这里是每个接口都需要传的值，所以单独拿出来，放到这里，主要是因为懒（默认参数放到了参数里面，没有放到header里面，可以放到header里面，但是后端还需要写公共方法进行读取
  // 这里的默认值其实需要判断是否为空，但是为了懒省事，就让后端去判断，然后返回状态码
  // 在响应拦截器里面去判断返回状态码，进行相应的操作
  config => {
    // 设置加载进度条(开始..)
    NProgress.start()

    let defaultParams = {
      // hotel_id: store.state.hotel_id,
      // merchant_id: store.state.merchant_id
    }
    // 自定义header信息
    // config.headers['B-Token'] = store.state.token
    // 默认值与前面传来的参数进行合并
    //config.data = Object.assign(defaultParams, config.data);
    //判断如果请求类型为formdata
    if (config.headers['Content-Type'] != 'multipart/form-data') {
      config.data = Object.assign(defaultParams, config.data)
    }
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = store.state.Authorization
    token && (config.headers.Authorization = token)
    return config
  },
  function(error) {
    // 设置加载进度条(结束..)
    NProgress.done()
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function(res) {
    // 对响应数据做点什么
    // 由于状态码没有用http的状态码，全部是后端随性而来，哎~所以状态码返回在res.data里面
    // 这里的状态码可根据实际情况来修改
    // console.log('res')
    // console.log(res)

    // 设置加载进度条(结束..)
    NProgress.done()

    let isBlob = res.data instanceof Blob
    // console.log(isBlob)
    if (res.data.code == '200' || isBlob) {
      return Promise.resolve(res)
    } else {
      // judgeErrorCode详情看errorCode文件
      judgeErrorCode(`code${res.data.code}`, res.data.msg)
      return Promise.reject(res)
    }
  },
  function(error) {
    // 对响应错误做点什么
    // judgeErrorCode(`code${500}`, '未知错误')
    // return Promise.reject(error)

    // 设置加载进度条(结束..)
    NProgress.done()
    // console.log('error')
    // console.log(error)
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      // errorHandle(response.status, response)
      let code = response.status
      judgeErrorCode(`code${code}`, response.data.msg)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      store.commit('changeNetwork', false)
    }
  }
)

export default instance
