/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 15:34:46
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-18 22:46:16
 * @FilePath     : \VueProjects\my-blog\vue.config.js
 * @Description  : 这是一些注释
 */

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 基本路径 默认'/'
  // 可以设置成相对路径，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // publicPath: './',
  //打包时生成的生产环境构建文件的目录
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'static',
  runtimeCompiler: true,
  devServer: {
    // 是否自动打开浏览器
    open: false,

    host: '127.0.0.1', // 本机ip地址

    port: 8080,

    https: false,

    hotOnly: true,

    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'http://127.0.0.1:8088', // 开发环境
        // target: 'http://@@@.@@@.@.@@/',//域名环境
        // 如果要代理 websockets
        // ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api' // 这个很重要
        }
      }
    }
  },
  // chainWebpack: config => {
  //   if (process.env.use_analyzer) {
  //     // 分析
  //     config
  //       .plugin('webpack-bundle-analyzer')
  //       .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  //   }
  // },
  //配置别名 绝对路径
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.vue', '.json', '.jsx', '.css', '.scss'],
      alias: {
        '@': resolve('src'),
        '@static': resolve('public/static'),
        '@styles': resolve('src/assets/styles'),
        '@js': resolve('src/assets/js'),
        '@components': resolve('src/components'),
        '@views': resolve('src/views'),
        '@commons': resolve('src/commons'),
        vue$: 'vue/dist/vue.esm.js'
      }
    }
  }
}
