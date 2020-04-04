<template>
  <v-card style="border-radius:8px" class="shadow-1  mb-6">
    <v-container class="px-8" style="min-height: 450px;">
      <p class="b-title my-6">
        {{ isOwnerSpace ? '我的资料' : info.nickName + '的资料' }}
      </p>
      <v-divider class="mx-0"></v-divider>
      <page-blog-user-base-form
        ref="baseForm"
        :info.sync="info"
      ></page-blog-user-base-form>
      <page-blog-user-bind-form
        ref="bindForm"
        :info.sync="info"
      ></page-blog-user-bind-form>
      <page-blog-user-step-form
        ref="stepForm"
        :info.sync="info"
      ></page-blog-user-step-form>
      <page-blog-user-unbind-form
        ref="unbindForm"
        :info.sync="info"
      ></page-blog-user-unbind-form>
      <v-row>
        <v-col>
          <page-blog-user-avatar-form
            ref="avatarForm"
            :info.sync="info"
            :edited="isOwnerSpace"
          ></page-blog-user-avatar-form>
          <div v-if="loading">
            <template v-for="i in 2">
              <v-skeleton-loader
                :key="i"
                type="card-heading"
                width="220"
              ></v-skeleton-loader>
              <v-skeleton-loader
                :key="i + '1'"
                type="list-item-three-line"
                width="420"
              ></v-skeleton-loader>
            </template>
          </div>
          <div v-else>
            <a
              class="info-a  d-flex justify-end mt-0"
              v-if="isOwnerSpace"
              @click="updateInfo"
              >修改资料</a
            >
            <p class="info-title-p mt-0">信息资料</p>
            <p class="info-p ">昵称：{{ info.nickName }}</p>
            <p class="info-p ">性别：{{ info.gender }}</p>
            <p class="info-p ">年龄：{{ info.age == 0 ? '未知' : info.age }}</p>
            <p class="info-title-p ">个性签名</p>
            <p class="info-p">{{ info.autograph ? info.autograph : '无' }}</p>
            <p class="info-title-p ">注册时长</p>
            <p class="info-p">
              加入博客已经{{ getDiffDate(info.createdTime) }}天了
            </p>
            <p class="info-title-p ">
              {{ isOwnerSpace ? '上次登录时间' : '活跃时间' }}
            </p>
            <p class="info-p">
              <Timeago :datetime="info.loginedTime" :autoUpdate="true">
              </Timeago>
            </p>
            <div v-if="isOwnerSpace">
              <v-divider class="mt-4"></v-divider>
              <p class="info-title-p ">私密信息（仅个人可见）</p>

              <p class="info-p ">
                用户帐号：{{ info.userName }}
                <a class="float-right" @click="stepData(3)">修改密码</a>
              </p>
              <p class="info-p ">
                手机号码：{{ alreadyBindPhone ? info.phone : '未绑定' }}
                <span class="float-right" v-if="alreadyBindPhone">
                  <a @click="unbindData(1)">解绑手机号</a>
                  <a class="ml-2" @click="stepData(1)">换绑手机号</a>
                </span>
                <span class="float-right" v-else>
                  <a class="" @click="bindData(1)">绑定手机号</a>
                </span>
              </p>
              <p class="info-p ">
                邮箱帐号：{{ alreadyBindEmail ? info.email : '未绑定' }}

                <span class="float-right" v-if="alreadyBindEmail">
                  <a @click="unbindData(2)">解绑邮箱</a>
                  <a class="ml-2" @click="stepData(2)">换绑邮箱</a>
                </span>
                <span class="float-right" v-else>
                  <a class="" @click="bindData(2)">绑定邮箱</a>
                </span>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
// import { scrollToTop } from '@/assets/js/scrolling'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    //
  },
  data() {
    return {
      //
      info: {
        userName: '',
        nickName: '',
        avatar: '',
        autograph: '',

        age: '',
        gender: '',
        phone: '',
        email: '',
        loginedTime: '',
        createdTime: ''
      },
      loading: true,
      bindType: 0,
      unbindType: 0,
      stepType: 0
    }
  },
  mounted() {
    //
    //回到顶部
    // scrollToTop(this)
    this.requireData()
  },
  methods: {
    //
    ...mapActions({
      setUserInfo: 'setUserInfoFun'
    }),
    requireData() {
      //是否为查看个人信息
      if (this.isOwnerSpace) {
        console.log(this.isOwnerSpace)
        //判断是否保存有个人信息
        let userInfo = this.getUserInfo
        //  && JSON.stringify(userInfo) != '{}'
        if (userInfo) {
          // console.log(this.getUserInfo)
          this.info = this.getUserInfo
          this.loading = false
        } else {
          //本地没有信息，则发送请求获取数据
          this.requireUserInfo()
        }
      } else {
        console.log('oini')
        //刷新页面，如果存在其他用户id，则请求数据，没有则跳到主页
        if (this.isExistOtherUserId) {
          this.requireOtherUserInfo()
        } else {
          //
          this.$router.replace('/blog/home')
        }
      }
    },
    //请求获取用户信息
    requireUserInfo() {
      //
      let vm = this
      // vm.loading = true

      setTimeout(() => {
        this.$api.user
          .toGetSomeInfo()
          .then(res => {
            let data = res.data.extend.data
            vm.info = data
            vm.setUserInfo(vm.info)
            vm.loading = false
          })
          .catch(() => {
            vm.loading = false
          })
      }, 4000)
    },
    //请求其他用户信息
    requireOtherUserInfo() {
      //
      let vm = this
      vm.loading = true
      this.$api.blog
        .toGetOtherUserInfo(this.getUseUserId)
        .then(res => {
          let data = res.data.extend.data
          vm.info = data
          vm.loading = false
        })
        .catch(() => {
          vm.loading = false
        })
    },

    updateInfo() {
      this.$refs.baseForm.openDialog()
    },
    bindData(type) {
      this.bindType = type
      this.$refs.bindForm.openDialog(this.bindType)
    },
    // eslint-disable-next-line no-unused-vars
    unbindData(type) {
      //解绑，0 手机号，1 邮箱
      this.unbindType = type
      this.$refs.unbindForm.openDialog(this.unbindType)
    },
    stepData(type) {
      //步骤条表单，更改密码，换绑，0 手机号，1 邮箱，2更改密码
      this.stepType = type
      this.$refs.stepForm.openDialog(this.stepType)
    },
    //计算指定时间到现在的天数
    getDiffDate(targetDate) {
      let date1 = new Date(targetDate)
      let date2 = new Date()
      date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
      date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
      const diff = date2.getTime() - date1.getTime()
      const diffDate = diff / (24 * 60 * 60 * 1000)
      return diffDate
    }
  },
  computed: {
    //
    ...mapGetters({
      //获取  用户信息
      getUserInfo: 'getUserInfoFun',
      getUseUserId: 'getUseUserIdFun'
    }),
    //是否为个人信息
    isOwnerSpace() {
      let flag = this.$route.fullPath.indexOf('/blog/users/owner') != -1
      return flag
    },
    isExistOtherUserId() {
      let variable = this.getUseUserId ? true : false
      return variable
    },
    alreadyBindPhone() {
      let variable = !this.info.phone
      return !variable
    },
    alreadyBindEmail() {
      let variable = !this.info.email
      return !variable
    }
  },
  watch: {
    //
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped>
.info-a {
  margin-top: 24px;
}
.info-title-p {
  color: #4d4d4d !important;
  margin-top: 24px;
  margin-bottom: 8px;
  font-size: 1.12rem;
}
.info-p {
  color: #6c6c6c !important;
  margin-bottom: 8px;
  font-size: 0.97rem;
}
</style>
