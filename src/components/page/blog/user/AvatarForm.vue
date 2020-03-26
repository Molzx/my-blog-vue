<template>
  <div class="avatar-container">
    <div class="avatar-upload">
      <!-- <div class="avatar-edit">
              <input
                type="file"
                id="avatarUpload"
                @change="changeAvatarUrl($event)"
                accept=".png, .jpg, .jpeg"
              />
              <label for="imageUpload"></label>
            </div> -->
      <div class="avatar-edit" v-if="edited">
        <input
          type="file"
          id="imageUpload"
          accept=".png, .jpg, .jpeg"
          @change="changeAvatarUrl($event)"
        />
        <label for="imageUpload"></label>
      </div>
      <div class="avatar-preview">
        <!-- <div :style="previewAvatar"></div> -->
        <v-hover v-slot:default="{ hover }">
          <v-fade-transition mode="out-in" origin="center center">
            <v-img :key="`img-${avatarKey}`" :src="previewAvatar" lazy-src="">
              <v-row
                v-if="avatarChange && avatarloading"
                class="fill-height ma-0"
                align="center"
                justify="center"
                style="z-index:2;"
              >
                <v-progress-circular
                  :size="70"
                  :width="7"
                  indeterminate
                  color="light-blue "
                  style="z-index:2;"
                ></v-progress-circular>
              </v-row>
              <v-expand-transition>
                <div
                  v-if="(avatarChange && hover) || avatarloading"
                  class="d-flex justify-center align-center transition-fast-in-fast-out grey darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                >
                  <v-btn
                    v-if="!avatarloading"
                    depressed
                    color="success"
                    @click="updateAvatar"
                    >上传</v-btn
                  >
                </div>
              </v-expand-transition>
            </v-img>
          </v-fade-transition>
        </v-hover>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    //
    info: {
      type: Object
    },
    edited: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //

      avatarFile: [],
      loading: false,
      avatarKey: true,
      previewAvatar: require('@/assets/images/avatar/avatar.svg'),
      avatarloading: false,
      //是否更改了头像
      avatarChange: false
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    ...mapActions({
      setUserInfo: 'setUserInfoFun',
      setBaseUserInfo: 'setBaseUserInfoFun'
    }),

    changeAvatarUrl(e) {
      console.log('in')
      let vm = this
      let files = e.target.files
      this.avatarFile = files[0]
      if (files && files[0]) {
        //更改了头像，设为true
        this.avatarChange = true
        var reader = new FileReader()
        reader.onload = function(e) {
          vm.avatarKey = !vm.avatarKey
          vm.previewAvatar = e.target.result
        }
        reader.readAsDataURL(files[0])
      }
    },
    updateParentData() {
      this.$emit('update:info', this.info)
    },
    updateAvatar() {
      let formData = new FormData()
      formData.append('avatar', this.avatarFile)

      this.avatarloading = true
      let vm = this

      setTimeout(() => {
        this.$api.user
          .toUpdateAvatar(formData)
          .then(res => {
            let data = res.data.extend.data
            vm.$toast.success('修改成功')
            vm.info.avatar = data
            vm.afterUpdateAvatar(true)
          })
          .catch(() => {
            vm.afterUpdateAvatar(false)
          })
      }, 0)
    },
    afterUpdateAvatar(success) {
      this.avatarloading = false
      if (success) {
        //头像上传完毕，设为false
        this.avatarChange = false

        //清空本地存储信息
        this.setUserInfo()
        //设置本地头像数据
        this.setBaseUserInfo(this.info)
        //更新头像数据
        this.updateParentData()
      }
    }
  },
  computed: {
    //
  },
  watch: {
    //
    'info.avatar': {
      // eslint-disable-next-line no-unused-vars
      handler(newVal) {
        //头像修改
        // console.log(newVal)
        if (newVal) {
          this.previewAvatar = this.$avatar(newVal)
        }
      },
      immediate: true
    }
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped>
/*  */

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}

.avatar-container {
  // max-width: 960px;
  // margin: 30px auto;
  // padding: 20px;
}

.avatar-upload {
  position: relative;
  max-width: 205px;
  margin: 0 auto;
  .avatar-edit {
    position: absolute;
    right: 18px;
    z-index: 1;
    top: 16px;
    input {
      display: none;
      + label {
        display: inline-block;
        width: 36px;
        height: 36px;
        margin-bottom: 0;
        border-radius: 100%;
        background: #ffffff;
        border: 1px solid transparent;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
        cursor: pointer;
        font-weight: normal;
        transition: all 0.2s ease-in-out;
        &:hover {
          background: #f1f1f1;
          border-color: #d6d6d6;
        }
        &:after {
          content: '\f303';
          font-family: 'Font Awesome 5 Free';
          font-weight: 900;
          color: #1976d2;
          position: absolute;
          top: 7px;
          left: 0;
          right: 0;
          text-align: center;
          margin: auto;
          font-size: 14px;
        }
      }
    }
  }
  .avatar-preview {
    width: 192px;
    height: 192px;
    position: relative;
    border-radius: 100%;
    border: 6px solid #f8f8f8;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    > div,
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}
</style>
