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

//搜索文章列表信息
export function reqSearchArticleData(vm) {
  // console.log(this.pageParams)
  setTimeout(() => {
    vm.$api.blog.toGetSearchArticles(vm.pageParams).then(res => {
      console.log('send require search article')
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

//一个一个请求侧边栏数据
export function reqSideData(vm) {
  // eslint-disable-next-line no-unused-vars
  let s5 = reqSideRecArticleData(vm)
  // eslint-disable-next-line no-unused-vars
  let s2 = reqSideCategoryData(vm)
  // eslint-disable-next-line no-unused-vars
  let s3 = reqSideTagData(vm)
  // eslint-disable-next-line no-unused-vars
  let s4 = reqSideNewArticleData(vm)
  // eslint-disable-next-line no-unused-vars
  let s1 = reqSideTopViewArticleData(vm)
  vm.sideData.listShow.forEach((el, i) => {
    if (i != 0) {
      if (el) {
        eval('s' + i)
      }
    }
  })
}
//侧边栏所有信息
export function reqSideAllData(vm) {
  // const vm = this
  //如果没有数据，则发送请求
  // let flag = vm.$store.getters.getRecArticleItemsFun
  let flag = vm.getRecArticleItems
  if (flag == false) {
    setTimeout(() => {
      vm.$api.blog.toGetSideAll().then(res => {
        console.log('send require side all')

        let data = res.data.extend

        vm.sideData.recArticleItems = data.recArticles.records
        //保存数据
        vm.setRecArticleItems(vm.sideData.recArticleItems)
        vm.sideData.recArticleLoading = false

        vm.sideData.categoryItems = data.recArticles
        //保存数据
        vm.setCategoryItems(vm.categoryItems)
        vm.sideData.categoryLoading = false
      })
    }, 0)
  } else {
    console.log('innn')
    vm.sideData.recArticleItems = vm.getRecArticleItems
    vm.sideData.recArticleLoading = false
  }
}

//侧边栏最新推荐文章信息
export function reqSideRecArticleData(vm) {
  // const vm = this
  //如果没有数据，则发送请求
  let records = vm.$store.getters.getRecArticleItemsFun
  // let flag = vm.getRecArticleItems
  if (!records || records.length < 1) {
    setTimeout(() => {
      vm.$api.blog.toGetSideRecArticles().then(res => {
        console.log('send require recommend article')

        let data = res.data.extend
        vm.sideData.recArticleItems = data.records
        //保存数据
        vm.$store.dispatch('setRecArticleItemsFun', vm.sideData.recArticleItems)
        // vm.setRecArticleItems(vm.sideRecArticleItems)
        vm.sideData.recArticleLoading = false
      })
    }, 0)
  } else {
    vm.sideData.recArticleItems = records
    vm.sideData.recArticleLoading = false
  }
}

//侧边栏分类信息
export function reqSideCategoryData(vm) {
  // const vm = this
  //如果没有数据，则发送请求
  let records = vm.$store.getters.getCategoryItemsFun
  // let flag = vm.getCategoryItems
  if (!records || records.length < 1) {
    setTimeout(() => {
      vm.$api.blog.toGetSideCategories().then(res => {
        console.log('send require category')

        let data = res.data.extend
        vm.sideData.categoryItems = data.data
        //保存数据
        vm.$store.dispatch('setCategoryItemsFun', vm.sideData.categoryItems)
        // vm.setCategoryItems(vm.sideCategoryItems)
        vm.sideData.categoryLoading = false
      })
    }, 0)
  } else {
    vm.sideData.categoryItems = records
    vm.sideData.categoryLoading = false
  }
}

//侧边栏标签信息
export function reqSideTagData(vm) {
  // const vm = this
  //如果没有数据，则发送请求
  let records = vm.$store.getters.getTagItemsFun
  // let flag = vm.getTagItems
  if (!records || records.length < 1) {
    setTimeout(() => {
      vm.$api.blog.toGetSideTags().then(res => {
        console.log('send require tag')

        let data = res.data.extend
        vm.sideData.tagItems = data.data
        //保存数据
        vm.$store.dispatch('setTagItemsFun', vm.sideData.tagItems)
        // vm.setTagItems(vm.sideTagItems)
        vm.sideData.tagLoading = false
      })
    }, 0)
  } else {
    vm.sideData.tagItems = records
    vm.sideData.tagLoading = false
  }
}

//侧边栏最新文章信息
export function reqSideNewArticleData(vm) {
  // const vm = this
  //如果没有数据，则发送请求
  let records = vm.$store.getters.getNewArticleItemsFun
  // let flag = vm.getNewArticleItems
  if (!records || records.length < 1) {
    setTimeout(() => {
      vm.$api.blog.toGetSideNewArticles().then(res => {
        console.log('send require new article')

        let data = res.data.extend
        vm.sideData.newArticleItems = data.records
        //保存数据
        vm.$store.dispatch('setNewArticleItemsFun', vm.sideData.newArticleItems)
        // vm.setNewArticleItems(vm.sideNewArticleItems)
        vm.sideData.newArticleLoading = false
      })
    }, 0)
  } else {
    vm.sideData.newArticleItems = records
    vm.sideData.newArticleLoading = false
  }
}

//侧边栏浏览量最高的文章信息
export function reqSideTopViewArticleData(vm) {
  // const vm = this
  //如果没有数据，则发送请求
  let records = vm.$store.getters.getTopViewArticleItemsFun
  // let flag = vm.getNewArticleItems
  if (!records || records.length < 1) {
    setTimeout(() => {
      vm.$api.blog.toGetSideTopViewArticles().then(res => {
        console.log('send require top view article')

        let data = res.data.extend
        vm.sideData.topViewArticleItems = data.records
        console.log(vm.sideData.topViewArticleItems)
        //保存数据
        vm.$store.dispatch(
          'setTopViewArticleItemsFun',
          vm.sideData.topViewArticleItems
        )
        vm.sideData.topViewArticleLoading = false
      })
    }, 0)
  } else {
    vm.sideData.topViewArticleItems = records
    vm.sideData.topViewArticleLoading = false
  }
}

//点赞
export function like(vm, params) {
  //点赞
  // let vm = this
  setTimeout(() => {
    vm.$api.like
      .toLiked(params)
      .then(res => {
        let data = res.data.extend.data
        // console.log(data)
        //设置状态
        vm.setOptStatus(data)
        vm.$toast('点赞成功~~')
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
    vm.$api.like
      .toUnliked(params)
      .then(res => {
        let data = res.data.extend.data
        // console.log(data)
        //设置状态
        vm.setOptStatus(data)
        // vm.$toast('已取消点赞')
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
    vm.$api.collect
      .toCollected(params)
      .then(res => {
        let data = res.data.extend.data
        // console.log(data)
        //设置状态
        vm.setOptStatus(data)
        vm.$toast('收藏成功~~')
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
    vm.$api.collect
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
//分享
export function share(vm, params) {
  //分享
  // let vm = this
  setTimeout(() => {
    vm.$api.blog
      .toShared(params)
      .then(res => {
        let data = res.data.extend.data
        console.log('分享成功')
        console.log(data)
      })
      .catch(() => {
        // vm.loading = false
      })
  }, 0)
}
