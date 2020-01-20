/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-16 15:06:14
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-18 09:28:16
 * @FilePath     : \VueProjects\blog\src\utils\easy-router\generator.js
 * @Description  : 这是一些注释
 */
import View from './view'
import Directory from './directory'
import { loginInfo } from './path'

class RouteProvider {
  /**
   * 自动生成路由的目录
   * @type {Array}
   * @private
   */
  _dir

  /**
   * 视图数组
   * @type {RouteProvider}
   * @private
   */
  _views = []

  /**
   * 路由对象数组
   * @type {Array}
   * @private
   */
  _routes = []

  /**
   * 根目录对象
   * @private
   */
  _directory

  constructor(dir) {
    this._dir = dir
    this._views = this._getViews(this._dir)
    this._directory = new Directory('.', loginInfo)
    this._generateDirectory()
  }

  /**
   * 根据目录生成路由对象的数组，供vue-router使用（routes选项）
   * @return {Array}
   */
  generate() {
    return this._directory.toRouter()
  }

  /**
   * 解析目录，还原目录结构
   * 首先将文件列表进行排序，根据文件的深度进行排序，深度浅的在前，深的在后。
   * @param dir
   * @return {this}
   * @private
   */
  _getViews(dir) {
    let views = []

    let keys = dir.keys()
    for (let index in keys) {
      let path = keys[index]

      views.push(this._getChangeView(true, dir, path))
    }
    views = views.sort((x, y) => {
      return x.Deep > y.Deep ? 1 : -1
    })
    return views
  }

  /**
   * @description: 根据path获取文件在views下的真正路径
   * @param {path}
   * @return: {filePath}
   */
  _getFilePath(path) {
    var filePath = path
    let index = filePath.indexOf('/') + 1
    filePath = filePath.substring(index)
    return filePath
  }

  /**
   * @description: 更改拿到组件的方式
   * @param {other} 另一种方式
   * @param {dir}
   * @param {path}
   * @return: View
   */
  _getChangeView(other, dir, path) {
    var filePath = this._getFilePath(path)
    if (other) {
      let component = require(`@views/${filePath}`).default
      return View.create(path, component, filePath)
    } else {
      let component = dir(path)
      return View.create(path, component.default || component, filePath)
    }
  }

  /**
   * 解析views,生成对应的目录结构
   * @private
   */
  _generateDirectory() {
    for (let index in this._views) {
      let view = this._views[index]

      this._directory.addView(view)
    }
  }
}

export default RouteProvider
