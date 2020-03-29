<template>
  <div class="active-box">
    <div class="d-flex flex-column justify-center">
      <div class="social-icon-wrapper">
        <div class="social-icons">
          <div class="d-flex flex-column justify-center">
            <v-tooltip
              right
              content-class="b-tooltip"
              color="white"
              light
              nudge-top="3"
            >
              <template v-slot:activator="{ on }">
                <v-badge
                  :value="hover[0]"
                  color="white"
                  overlap
                  border
                  left
                  offset-x="10"
                  offset-y="16"
                  transition="slide-y-reverse-transition"
                >
                  <template v-slot:badge>
                    {{ getLikeCount | getMaxNum(5) }}
                  </template>
                  <v-hover v-model="hover[0]">
                    <a
                      class="social-icon i-pink"
                      :class="isLikedClass"
                      @click="doOpt('like')"
                      v-on="on"
                    >
                      <i class="fas fa-thumbs-up"></i>
                    </a>
                  </v-hover>
                </v-badge>
              </template>
              <span class="max-index icon-color">喜欢就点个赞叭 :)</span>
            </v-tooltip>

            <v-tooltip
              right
              content-class="b-tooltip"
              color="white"
              light
              nudge-top="3"
            >
              <template v-slot:activator="{ on }">
                <v-badge
                  :value="hover[1]"
                  color="white"
                  overlap
                  border
                  left
                  offset-x="10"
                  offset-y="16"
                  transition="slide-y-reverse-transition"
                >
                  <template v-slot:badge>
                    {{ getCollectCount | getMaxNum(5) }}
                  </template>
                  <v-hover v-model="hover[1]">
                    <a
                      class="social-icon i-deep-orange"
                      :class="isCollectedClass"
                      @click="doOpt('collect')"
                      v-on="on"
                    >
                      <i class="fas fa-star"></i>
                    </a>
                  </v-hover>
                </v-badge>
              </template>
              <span class="max-index icon-color">收藏</span>
            </v-tooltip>
            <v-tooltip
              right
              content-class="b-tooltip"
              color="white"
              light
              nudge-top="3"
            >
              <template v-slot:activator="{ on }">
                <v-badge
                  :value="hover[2]"
                  color="white"
                  overlap
                  border
                  left
                  offset-x="10"
                  offset-y="16"
                  transition="slide-y-reverse-transition"
                >
                  <template v-slot:badge>
                    {{ getCommentCount | getMaxNum(5) }}
                  </template>
                  <v-hover v-model="hover[2]">
                    <a
                      class="social-icon i-orange"
                      v-on="on"
                      @click="goToComment"
                    >
                      <i class="fas fa-comment-alt"></i>
                    </a>
                  </v-hover>
                </v-badge>
              </template>
              <span class="max-index icon-color">评论</span>
            </v-tooltip>
            <!-- <a
              class="social-icon i-orange"
              href="#"
              target="_blank"
              rel="author"
            >
              <i class="fas fa-comment-alt"></i>
            </a> -->

            <v-tooltip
              right
              content-class="b-tooltip"
              color="white"
              light
              nudge-top="3"
            >
              <template v-slot:activator="{ on }">
                <v-badge
                  :value="hover[3] && !showShareGroup"
                  color="white"
                  overlap
                  border
                  left
                  offset-x="10"
                  offset-y="16"
                  transition="slide-y-reverse-transition"
                >
                  <template v-slot:badge>
                    {{ getShareCount | getMaxNum(5) }}
                  </template>
                  <v-hover v-model="hover[3]">
                    <a
                      class="social-icon i-green"
                      @click="changeShowShareGroup"
                      v-on="on"
                    >
                      <v-scale-transition mode="out-in">
                        <i
                          :key="`icon-${showShareGroup}`"
                          :class="
                            showShareGroup ? 'fas fa-angle-up' : 'fas fa-share'
                          "
                        ></i>
                      </v-scale-transition>
                    </a>
                  </v-hover>
                </v-badge>
              </template>
              <span class="max-index icon-color">{{
                showShareGroup ? '收起' : '分享'
              }}</span>
            </v-tooltip>
            <v-slide-y-transition>
              <div v-show="showShareGroup">
                <div class="social-share" ref="social" data-initialized="true">
                  <a class="social-icon twitter icon-twitter" href="">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a class="social-icon facebook icon-facebook" href="">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a class="social-icon google icon-google" href="">
                    <i class="fab fa-google"></i>
                  </a>
                  <a class="social-icon qq icon-qq" href="">
                    <i class="fab fa-qq"></i>
                  </a>

                  <v-tooltip
                    v-model="showShareQrCode"
                    right
                    content-class="b-tooltip contact"
                    color="white"
                    light
                    max-width="320"
                    close-delay="300"
                  >
                    <template v-slot:activator="{ on }">
                      <a
                        class="social-icon wechat icon-wechat"
                        href=""
                        v-on="on"
                      >
                        <i class="fab fa-weixin"></i>
                      </a>
                    </template>
                    <v-row align="center" justify="center" dense>
                      <v-col>
                        <!-- 扫码分享 -->
                        <div class="shareCode my-3">
                          <!-- 放置二维码的容器,需要给一个ref -->
                          <div id="qrcode" ref="qrcode"></div>
                        </div>
                      </v-col>
                      <v-col>
                        <p class="mb-0 icon-color">
                          微信里点“发现”，扫一下二维码便可将本文分享至朋友圈。
                        </p>
                        <!-- <p class="mb-0 grey--text text--darken-3">
                        </p> -->
                      </v-col>
                    </v-row>
                  </v-tooltip>
                  <a class="social-icon weibo icon-weibo" href="">
                    <i class="fab fa-weibo"></i>
                  </a>
                  <a class="social-icon qzone icon-qzone" href="">
                    <i class="social-qzone"></i>
                  </a>

                  <!-- <a
                    class="social-icon instagram"
                    href="https://instagram.com/anronkai"
                    target="_blank"
                    rel="author"
                  >
                    <i class="fab fa-instagram"></i>
                  </a> -->
                </div>
              </div>
            </v-slide-y-transition>
          </div>
        </div>
      </div>
    </div>
    <!-- 登录提示组件 -->
    <helper-permission-dialog
      :show.sync="showLoginTip"
      :shortContent="getTipContent"
    ></helper-permission-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'
import { scrollToComment } from '@/assets/js/scrolling'
import { like, unlike, collect, uncollect } from '@/assets/js/blog'
//分享
import '../../../../../node_modules/social-share.js/dist/js/social-share.min.js'
//生成二维码
// 引入
import QRCode from 'qrcodejs2'
export default {
  props: {
    //
    floatGroupData: {
      type: Object
    }
  },
  data() {
    return {
      //
      showThis: true,
      hover: [false, false, false, false],
      showShareGroup: false,
      optData: {
        likeCount: 0,
        collectCount: 0,
        commentCount: 0,
        shareCount: 0,
        isLiked: false,
        isCollected: false,
        isShared: false
      },
      optType: '',
      //点赞、收藏操作的参数
      optParams: {
        //资源类型
        ownerType: '文章',
        //资源id
        ownerId: ''
        //用户id
        // userId: userId
      },
      showLoginTip: false,
      LoginTipContent: {
        like: '点赞',
        collect: '收藏'
      },
      showShareQrCode: false
    }
  },
  mounted() {
    //
  },
  methods: {
    getUrlParams() {
      let params = this.$route.query.q
      this.optParams.ownerId = params
    },
    changeShowShareGroup() {
      this.showShareGroup = !this.showShareGroup
    },
    //进行点赞或收藏
    doOpt(type) {
      this.optType = type
      //判断是否已登录
      if (this.$isLogin()) {
        if (this.optType == 'like') {
          let flag = this.optData.isLiked
          flag ? unlike(this, this.optParams) : like(this, this.optParams)
        } else if (this.optType == 'collect') {
          let flag = this.optData.isCollected
          flag ? uncollect(this, this.optParams) : collect(this, this.optParams)
        }
      } else {
        console.log('in')
        this.showLoginTip = true
      }
    },
    goToComment() {
      scrollToComment(this)
      // this.showThis = false
    },

    //设置点赞/收藏图标的显示状态
    setOptStatus(result) {
      let data = this.optData
      if (this.optType == 'like') {
        data.isLiked = !data.isLiked
        data.likeCount = result.count
      } else if (this.optType == 'collect') {
        data.isCollected = !data.isCollected
        data.collectCount = result.count
      }
    },
    refixCountData(data) {
      let count = eval(data)
      if (count > 9999) {
        return '9999+'
      } else if (count > 0) {
        return data
      } else {
        return false
      }
    },
    // 展示二维码
    showQrCode() {
      // 二维码内容,一般是由后台返回的跳转链接,这里是写死的一个链接
      this.qrcode = document.location.href
      // 使用$nextTick确保数据渲染
      this.$nextTick(() => {
        this.createQrcode()
      })
    },
    // 生成二维码
    createQrcode() {
      this.qr = new QRCode('qrcode', {
        width: 130,
        height: 130, // 高度
        text: this.qrcode // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      })
      // console.log(this.qrcode)
    },
    // 关闭弹框,清除已经生成的二维码
    closeQrCode() {
      this.$refs.qrcode.innerHTML = ''
    }
  },
  computed: {
    // ...mapGetters({
    //   //判断是否本地有token ，有返回 true
    //   isLogin: 'getLoginStatusFun'
    // }),
    getLikeCount() {
      let data = this.optData.likeCount
      return data
      // let data = this.articleData.likeCount
      // return this.refixCountData(data)
    },
    getCollectCount() {
      let data = this.optData.collectCount
      return data
      // let data = this.articleData.collectCount
      // return this.refixCountData(data)
    },
    getCommentCount() {
      let data = this.optData.commentCount
      return data
      // let data = this.articleData.commentCount
      // return this.refixCountData(data)
    },
    getShareCount() {
      let data = this.optData.shareCount
      return data
      // let data = this.articleData.shareCount
      // return this.refixCountData(data)
    },
    isLikedClass() {
      if (this.optData.isLiked) {
        return 'active'
      }
      return ''
    },
    isCollectedClass() {
      if (this.optData.isCollected) {
        return 'active'
      }
      return ''
    },
    getTipContent() {
      return this.LoginTipContent[this.optType]
    }
  },
  watch: {
    //
    floatGroupData: {
      // eslint-disable-next-line no-unused-vars
      handler(newVal, oldVal) {
        //
        if (newVal) {
          //
          this.optData = JSON.parse(JSON.stringify(newVal))
        }
      },
      deep: true
    },
    showShareQrCode(newVal) {
      if (newVal) {
        this.showQrCode()
      } else {
        this.closeQrCode()
      }
    }
  },
  components: {
    //
  }
}
</script>
<style
  src="../../../../../node_modules/social-share.js/dist/css/share.min.css"
></style>
<style></style>
<style lang="scss" src="@styles/blog/social_icon.scss" scoped></style>
<style lang="scss" scoped>
.fab {
  font-family: 'Font Awesome 5 Brands' !important;
}
/deep/ .social-share {
  .icon-twitter::before,
  .icon-facebook::before,
  .icon-qzone::before,
  .icon-qq::before,
  .icon-weibo::before,
  .icon-wechat::before,
  .icon-douban::before,
  .icon-google::before {
    content: none !important;
  }
  .social-qzone::before {
    font-family: 'socialshare' !important;
    content: '\f08a';
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
  }
}
/deep/ .v-badge__badge {
  // box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  color: hsl(212, 16%, 48%);
  // color: #e65100;
  font-weight: 700;
}
</style>
