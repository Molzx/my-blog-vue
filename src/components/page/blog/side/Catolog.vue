<template>
  <div>
    <v-card class="shadow-1  b-card-title">
      <v-row class=" mx-3 fill-height" justify="center" align="center">
        <p class="mb-0">
          <strong class="title headline blue-grey--text text--darken-4"
            >目录</strong
          >
        </p>
      </v-row>
    </v-card>
    <v-card class="shadow-1  mb-6 b-card-content">
      <v-card-text class="px-0" style="">
        <div v-if="loading">
          <v-skeleton-loader type="list-item@6"></v-skeleton-loader>
        </div>
        <div id="toc" v-show="!loading"></div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'
//加载toc-helper
import 'toc-helper/css/toc-helper.min.css'
import TocHelper from 'toc-helper'
export default {
  props: {
    //
  },
  data() {
    return {
      //

      toc: {
        brand: '目4444录',
        tocFixed: false
      },
      loading: true
    }
  },
  mounted() {
    //
    // this.initCatolog()
    this.$nextTick(() => {
      // this.initCatolog()
    })
  },
  methods: {
    //
    ...mapActions({
      //设置文章是否加载完毕
      setArticlePreviewSuccess: 'setArticlePreviewSuccessFun'
    }),

    initCatolog() {
      //
      let options = {
        dom: '*[data-toc]', // 文章内容元素 选择器 或 HTMLElement
        classNames: {
          // class选择器
          toc: 'toc',
          fxied: 'toc-fixed',
          brand: 'toc-brand',
          navbar: 'toc-navbar',
          hightlight: 'toc-hightlight',
          nav: 'toc-nav',
          link: 'toc-link',
          active: 'active',
          marginLeft1: 'toc-link-ml-1',
          marginLeft2: 'toc-link-ml-2',
          marginLeft3: 'toc-link-ml-3',
          marginLeft4: 'toc-link-ml-4',
          marginLeft5: 'toc-link-ml-5',
          marginLeft6: 'toc-link-ml-6'
        },
        hightlight: true,
        brand: '',
        shadow: 'none',
        idPrefix: 'toc-heading-',
        offsetBody: document.body,
        tocFixed: false,
        maxDepth: 6,
        autoScroll: true
      }
      let h = new TocHelper(options, options)
      // h.options = options
      // console.log(h)
      h.reset()
      h.reload()
      // new TocHelper([toc, toc]).reload()
      // new TocHelper([this.top, this.top]).reload()
    },
    reloadCatolog() {
      new TocHelper([this.top, this.top]).reload()
    }
  },
  computed: {
    //
    ...mapGetters({
      //文章是否加载完毕
      isArticleLoadingSuccess: 'getArticlePreviewSuccessFun'
    })
  },
  watch: {
    //
    isArticleLoadingSuccess(newVal) {
      if (newVal) {
        //初始化目录
        this.initCatolog()
        this.loading = false
        this.setArticlePreviewSuccess(false)
      }
    }
  },
  components: {
    //
  }
}
</script>

<style lang="scss">
.toc {
  padding: 0rem 0;
  width: 100%;
  max-width: 350px;
  margin: 0rem 0;
  color: #333;

  position: relative;

  background: #fff;
}
.toc.shadow {
  box-shadow: none;
  // box-shadow: 0 0 0.5rem #eee;
}
.toc-link {
  display: block;
  padding: 0.2rem 1.7rem;
  font-size: 0.9rem;
  text-decoration: none;
  color: #555 !important;
  position: relative;
  //限制两行
  overflow: hidden;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  display: -webkit-box;
  display: bo;
}
.toc-link.active,
.toc-link:hover {
  color: #009a61 !important;
}
.toc-link::before {
  content: ' ';
  height: 0.25rem;
  width: 0.25rem;
  background: #555;
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  border-radius: 50%;
}
.toc-link-ml-1 {
  margin-left: 1rem !important;
}
.toc-link-ml-2 {
  margin-left: 2rem !important;
}
.toc-link-ml-3 {
  margin-left: 4rem !important;
}
.toc-link-ml-4 {
  margin-left: 4rem !important;
}
.toc-link-ml-5 {
  margin-left: 5rem !important;
}
.toc-link-ml-6 {
  margin-left: 6rem !important;
}
</style>
