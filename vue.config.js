/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 15:34:46
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-04 15:51:30
 * @FilePath     : \VueProjects\my-blog\vue.config.js
 * @Description  : 这是一些注释
 */
const CopyWebpackPlugin = require('copy-webpack-plugin') // 这里引入`这个CopyWebpackPlugin`插件
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
        '@common': resolve('src/common'),
        vue$: 'vue/dist/vue.esm.js'
      }
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'node_modules/mavon-editor/dist/highlightjs',
          to: path.resolve(__dirname, '../dist/highlightjs') // 插件将会把文件导出于/dist/highlightjs之下
        },
        {
          from: 'node_modules/mavon-editor/dist/markdown',
          to: path.resolve(__dirname, '../dist/markdown') // 插件将会把文件导出于/dist/markdown之下
        },
        {
          from: 'node_modules/mavon-editor/dist/katex', // 插件将会把文件导出
          to: path.resolve(__dirname, '../dist/katex')
        }
      ])
    ]
  }
}
