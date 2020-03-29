// 博客页面公用的一些方法

//======================主栏数据==================

//首页文章列表信息
export function reqArticleData(vm) {
  // console.log(this.pageParams)
  setTimeout(() => {
    vm.$api.blog.toGetArticles(vm.pageParams).then(res => {
      console.log('send require article all')
      let data = res.data.extend

      vm.pageParams.total = data.total
      vm.articleList = data.records
      vm.otherData.articleListLoading = false
    })
  }, 0)
}

//详情页文章信息
export function reqArticleDetailData(vm) {
  // const vm = this
  setTimeout(() => {
    vm.$api.blog.toGetArticleById(vm.articleId).then(res => {
      console.log('require articleInfo detail')
      let data = res.data.extend

      vm.articleInfo = data.data
      vm.otherData.articleInfoLoading = false
      // console.log(vm.articleInfo)
    })
  }, 0)
}
//归档时间线页面 文章列表信息
export function reqTimelineArticleData(vm) {
  // console.log(this.pageParams)
  setTimeout(() => {
    vm.$api.blog.toGetTimelineArticles(vm.pageParams).then(res => {
      console.log('send require article timeline all')
      let data = res.data.extend

      //需要用到记录总数
      vm.recordTotal = data.total
      vm.articleList = data.records
      vm.otherData.articleListLoading = false
    })
  }, 0)
}

//分类页面，分类信息
export function reqCategoryData(vm) {
  // const vm = this
  setTimeout(() => {
    vm.$api.blog.toGetCategories().then(res => {
      console.log('send require category all')

      let data = res.data.extend
      vm.categoryInfo = data.data
      vm.otherData.categoryInfoLoading = false
    })
  }, 0)
}

//标签页面，标签信息
export function reqTagData(vm) {
  // const vm = this
  setTimeout(() => {
    vm.$api.blog.toGetTags().then(res => {
      console.log('send require tag all')

      let data = res.data.extend
      vm.tagInfo = data.data
      vm.otherData.tagInfoLoading = false
    })
  }, 0)
}

//================侧边栏数据====================

//侧边栏所有信息
export function reqSideAllData(vm) {
  // const vm = this
  //如果没有数据，则发送请求
  let flag = vm.getRecArticleItems
  if (flag == false) {
    setTimeout(() => {
      vm.$api.blog.toGetSideAll().then(res => {
        console.log('send require side all')

        let data = res.data.extend

        vm.sideRecArticleItems = data.recArticles.records
        //保存数据
        vm.setRecArticleItems(vm.sideRecArticleItems)
        vm.otherData.sideRecArticleLoading = false

        vm.sideCategoryItems = data.recArticles
        //保存数据
        vm.setCategoryItems(vm.sideCategoryItems)
        vm.otherData.sideCategoryLoading = false
      })
    }, 0)
  } else {
    console.log('innn')
    vm.sideRecArticleItems = vm.getRecArticleItems
    vm.otherData.sideRecArticleLoading = false
  }
}

//侧边栏最新推荐文章信息
export function reqSideRecArticleData(vm) {
  // const vm = this
  //如果没有数据，则发送请求
  let flag = vm.getRecArticleItems
  if (flag == false) {
    setTimeout(() => {
      vm.$api.blog.toGetSideRecArticles().then(res => {
        console.log('send require recommend article')

        let data = res.data.extend
        vm.sideRecArticleItems = data.records
        //保存数据
        vm.setRecArticleItems(vm.sideRecArticleItems)
        vm.otherData.sideRecArticleLoading = false
      })
    }, 0)
  } else {
    console.log('innn')
    vm.sideRecArticleItems = vm.getRecArticleItems
    vm.otherData.sideRecArticleLoading = false
  }
}

//侧边栏分类信息
export function reqSideCategoryData(vm) {
  // const vm = this
  //如果没有数据，则发送请求
  let flag = vm.getCategoryItems
  if (flag == false) {
    setTimeout(() => {
      vm.$api.blog.toGetSideCategories().then(res => {
        console.log('send require category')

        let data = res.data.extend
        vm.sideCategoryItems = data.data
        //保存数据
        vm.setCategoryItems(vm.sideCategoryItems)
        vm.otherData.sideCategoryLoading = false
      })
    }, 0)
  } else {
    vm.sideCategoryItems = vm.getCategoryItems
    vm.otherData.sideCategoryLoading = false
  }
}

//侧边栏标签信息
export function reqSideTagData(vm) {
  // const vm = this
  //如果没有数据，则发送请求
  let flag = vm.getTagItems
  if (flag == false) {
    setTimeout(() => {
      vm.$api.blog.toGetSideTags().then(res => {
        console.log('send require tag')

        let data = res.data.extend
        vm.sideTagItems = data.data
        //保存数据
        vm.setTagItems(vm.sideTagItems)
        vm.otherData.sideTagLoading = false
      })
    }, 0)
  } else {
    vm.sideTagItems = vm.getTagItems
    vm.otherData.sideTagLoading = false
  }
}

//侧边栏最新文章信息
export function reqSideNewArticleData(vm) {
  // const vm = this
  //如果没有数据，则发送请求
  let flag = vm.getNewArticleItems
  if (flag == false) {
    setTimeout(() => {
      vm.$api.blog.toGetSideNewArticles().then(res => {
        console.log('send require new article')

        let data = res.data.extend
        vm.sideNewArticleItems = data.records
        //保存数据
        vm.setNewArticleItems(vm.sideNewArticleItems)
        vm.otherData.sideNewArticleLoading = false
      })
    }, 0)
  } else {
    vm.sideNewArticleItems = vm.getNewArticleItems
    vm.otherData.sideNewArticleLoading = false
  }
}

//点赞
export function like(vm, params) {
  //点赞
  // let vm = this
  setTimeout(() => {
    this.$api.like
      .toLiked(params)
      .then(res => {
        let data = res.data.extend.data
        // console.log(data)
        //设置状态
        vm.setOptStatus(data)
      })
      .catch(() => {
        // vm.loading = false
      })
  }, 0)
}
//取消点赞
export function unlike(vm, params) {
  //取消点赞
  // let vm = this
  setTimeout(() => {
    this.$api.like
      .toUnliked(params)
      .then(res => {
        let data = res.data.extend.data
        // console.log(data)
        //设置状态
        vm.setOptStatus(data)
      })
      .catch(() => {
        // vm.loading = false
      })
  }, 0)
}
//收藏
export function collect(vm, params) {
  //收藏
  // let vm = this
  setTimeout(() => {
    this.$api.collect
      .toCollected(params)
      .then(res => {
        let data = res.data.extend.data
        // console.log(data)
        //设置状态
        vm.setOptStatus(data)
      })
      .catch(() => {
        // vm.loading = false
      })
  }, 0)
}
//取消收藏
export function uncollect(vm, params) {
  //取消收藏
  // let vm = this
  setTimeout(() => {
    this.$api.collect
      .toUncollected(params)
      .then(res => {
        let data = res.data.extend.data
        // console.log(data)
        //设置状态
        vm.setOptStatus(data)
      })
      .catch(() => {
        // vm.loading = false
      })
  }, 0)
}
