/**
 * 目录类
 */
class Directory {
  /**
   * 当前目录下所有视图
   * @type {Array}
   * @private
   */
  _views = []

  /**
   * 文件路径分隔后的数组
   * @return {never|string[]}
   * @constructor
   */
  get PathInfos() {
    return this._path.split('/')
  }

  /**
   * 目录路径
   * @private
   */
  _path

  /**
   * 子目录
   * @type {Array}
   * @private
   */
  _subDirectory = []

  /**
   * 登录信息
   */
  _loginInfo

  constructor(path, loginInfo) {
    this._path = path
    this._loginInfo = loginInfo
  }

  addView(view) {
    if (this.isCurrentDirectoryView(view)) {
      this._views.push(view)
    } else if (this._isInSubDirectory(view)) {
      this._addInSubDirectory(view)
    } else {
      let newSubDirectory = this._createSubDirectory(view)
      newSubDirectory.addView(view)
      this._subDirectory.push(newSubDirectory)
    }
  }

  /**
   * 转换成 vue-router 的route对象
   */
  toRouter() {
    let layout = this._getLayout()
    return {
      path: this._getPath(),
      //设置默认子路由，父路由不用name
      // name: layout.Component.name,
      // component: require(`@views/${layout.FilePath}`).default,
      component: this._changeComponent(layout, layout.FilePath),
      // component: layout.Component,
      children: this._getChildrenRoutes()
    }
  }

  isCurrentDirectoryView(view) {
    let tailPathInfos = view.Path.replace(`${this._path}`, '')
      .replace(/^\//, '')
      .split('/')

    return (
      this._isStartWith(view.Path, this._path) && tailPathInfos.length === 1
    )
  }

  /**
   * 是否是在当前目录下
   * @param view
   */
  containView(view) {
    return this._isStartWith(view.Path, this._path)
  }

  /**
   * 判断target 是否是以 source开头的.
   * @param target
   * @param source
   * @return {boolean}
   * @private
   */
  _isStartWith(target, source) {
    let reg = new RegExp(`^${source}`)
    return reg.test(target)
  }

  /**
   * 是否是在子目录下
   * @param view
   * @return {boolean}
   * @private
   */
  _isInSubDirectory(view) {
    for (let index in this._subDirectory) {
      let directory = this._subDirectory[index]
      if (directory.containView(view)) return true
    }
    return false
  }

  /**
   * 添加到子目录下
   * @param view
   * @private
   */
  _addInSubDirectory(view) {
    let directory = this._getSubDirectory(view)
    directory.addView(view)
  }

  /**
   * 获取视图所在的目录
   * @param view
   * @return {null|*}
   * @private
   */
  _getSubDirectory(view) {
    for (let index in this._subDirectory) {
      let directory = this._subDirectory[index]
      if (directory.containView(view)) return directory
    }
    return null
  }

  /**
   * 新建一个子目录
   * @param view
   * @private
   */
  _createSubDirectory(view) {
    let path = view.Path.replace(`${this._path}`, '')
      .replace(/^\//, '')
      .split('/')[0]
    return new Directory(`${this._path}/${path}`)
  }

  /**
   * 获取layout视图
   * @return {View}
   * @private
   */
  _getLayout() {
    for (let index in this._views) {
      let view = this._views[index]
      if (view.IsLayout) return view
    }
    throw Error(`${this._path} 目录下没有Layout组件.`)
  }

  /**
   * 获取当前目录对应的路由路径
   * @return {string}
   * @private
   */
  _getPath() {
    if (this._path === '.') return '/'
    return this.PathInfos[this.PathInfos.length - 1]
  }

  /**
   * 获取当前目录对应下的子路由，分为两个部分
   * 1. 当前层的视图
   * 2. 子目录
   * @return {Array}
   * @private
   */
  _getChildrenRoutes() {
    let routes = []
    for (let index in this._views) {
      let view = this._views[index]
      if (view.IsLayout) continue
      routes.push(this._parseView(view))
    }

    for (let index in this._subDirectory) {
      let subRoute = this._subDirectory[index].toRouter()
      routes.push(subRoute)
    }
    return routes
  }

  /**
   * 解析view, 转换成route
   * @param view
   * @return {Object}
   * @private
   */
  _parseView(view) {
    var component
    //判断当前页面是否为登录页面，且是否使用默认登录页面
    if (view.IsLogin && !this._loginInfo['useDefault']) {
      //使用自定义登录页面时，加载path中的自定义登陆页路径
      let loginPath = this._loginInfo['usePath'] + '.vue'
      component = this._changeComponent(view, loginPath)
    } else {
      component = this._changeComponent(view, view.FilePath)
    }
    return {
      //当是默认子路由时，替换路径为/
      path: view.IsIndex ? '/' : view.LastInfo,
      name: view.Component.name,
      component: component,
      meta: {
        //对应每个页面要显示的标题
        title: view.Component.title
      }
      // component: view.Component
    }
  }
  _changeComponent(view, path) {
    const type = 1
    switch (type) {
      case 0:
        return view.Component
      case 1:
        return () => import(`@views/${path}`)
      case 2:
        return resolve => require([`@views/${path}`], resolve)
    }
  }
}
export default Directory
