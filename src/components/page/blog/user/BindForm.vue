<template>
  <v-dialog
    v-model="show"
    width="500"
    scrollable
    transition="scroll-y-transition"
    origin="center right"
  >
    <v-card class="mx-auto">
      <v-alert tile colored-border class=" pb-0">
        <div class="d-flex align-center">
          <v-alert text dense border="left" class="mb-0" color="info">
            {{ formHeader }}
          </v-alert>
          <v-spacer></v-spacer>
          <v-btn fab depressed small class="close-btn" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-alert>

      <v-card-text>
        <v-container>
          <ValidationObserver ref="form">
            <v-form>
              <v-row v-if="isBindPhone">
                <v-col cols="12">
                  <ValidationProvider
                    name="phone"
                    rules="required|phone"
                    v-slot="{ errors, passed }"
                    class="fill-width"
                  >
                    <div v-show="false">{{ (canSend = passed) }}</div>
                    <v-text-field
                      v-model="formData.phone"
                      label="请输入手机号码"
                      :error-messages="errors[0]"
                      :disabled="loading"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    name="captcha"
                    rules="required|min:4|numeric"
                    v-slot="{ errors }"
                    class="fill-width"
                  >
                    <v-text-field
                      v-model="formData.captcha"
                      label="请输入验证码"
                      :error-messages="errors[0]"
                      :disabled="loading"
                      class="captchaInput"
                    >
                      <template v-slot:append>
                        <v-btn
                          text
                          color="green"
                          :disabled="!canSend || isSend || loading"
                          @click="sendCode"
                        >
                          {{ btnContent }}
                        </v-btn>
                      </template>
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>

              <v-row v-if="isBindEmail">
                <v-col cols="12">
                  <ValidationProvider
                    name="email"
                    rules="required|email"
                    v-slot="{ errors, passed }"
                    class="fill-width"
                  >
                    <div v-show="false">{{ (canSend = passed) }}</div>
                    <v-text-field
                      v-model="formData.email"
                      label="请输入邮箱帐号"
                      :error-messages="errors[0]"
                      :disabled="loading"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    name="captcha"
                    rules="required|min:4|numeric"
                    v-slot="{ errors }"
                    class="fill-width"
                  >
                    <v-text-field
                      v-model="formData.captcha"
                      label="请输入验证码"
                      :error-messages="errors[0]"
                      :disabled="loading"
                      class="captchaInput"
                    >
                      <template v-slot:append>
                        <v-btn
                          text
                          color="green"
                          :disabled="!canSend || isSend || loading"
                          @click="sendCode"
                        >
                          {{ btnContent }}
                        </v-btn>
                      </template>
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-form>
          </ValidationObserver>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-center align-center">
        <v-btn
          :loading="loading"
          width="150"
          depressed
          color="primary"
          @click="confirm"
        >
          确认
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { changeSendBtn, reloadSendBtn } from '@/assets/js/fct'
export default {
  props: {
    //
    info: {
      type: Object
    }
  },
  data() {
    return {
      //
      formData: {
        phone: '',
        email: '',
        codeKey: '',
        captcha: ''
      },
      code: {
        name: 'bind',
        type: '',
        count: 0
      },

      //组件类型，默认0，1绑定手机号码，2为邮箱
      type: 0,

      isSend: true,
      btnContent: '获取验证码',
      templateCode: 'bind',
      //是否可点击发送按钮
      canSend: false,

      show: false,
      loading: false,

      //接口发送延时
      apiTime: 0
    }
  },
  mounted() {
    //
  },
  methods: {
    //,
    ...mapActions({
      setCodeKey: 'setCodeKeyFun',
      setCodeTime: 'setCodeTimeFun',
      setUserInfo: 'setUserInfoFun'
    }),
    initMethod() {
      // console.log('bindForm组件--')
      //打开对话框
      this.show = true

      if (this.type != 0) {
        this.reloadSend()
      }
      // console.log('codeKey From Local ：' + this.codeKey)
    },
    updateParentData() {
      this.$emit('update:info', this.info)
    },
    validate() {
      // let vm = this
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        // console.log(success)
        this.bind()
      })
    },
    reset() {
      this.$refs.form.reset()
    },
    confirm() {
      //
      //校验表单
      this.validate()
    },
    closeDialog() {
      this.show = false

      // 重置表单数据
      this.formData.codeKey = ''
      this.formData.captcha = ''

      if (this.code.count > 0) {
        // 更改发送按钮状态，终止计时器
        changeSendBtn(this, 3)
      } else {
        // 更改发送按钮状态，重置计时器
        changeSendBtn(this, 1)
      }

      this.code.type = 0
      this.code.count = 0

      this.reset()
    },
    openDialog(type) {
      this.type = type
      // console.log('getCodeTime')
      // console.log(this.getCodeTime)
      this.initMethod()
    },
    //继续倒计时
    reloadSend() {
      //从本地中拿到codeKey，避免刷新页面误操作造成丢失
      this.formData.codeKey = this.getCodeKey
      //设置发送验证码的类型
      this.code.type = this.type
      //重新加载倒计时
      reloadSendBtn(this)
    },
    sendCode() {
      if (this.isBindPhone) {
        this.sendSmsCode()
      } else if (this.isBindEmail) {
        this.sendEmailCode()
      }
    },
    sendSmsCode() {
      // 更改发送按钮状态
      changeSendBtn(this)
      let vm = this

      let captchaData = {
        phone: this.formData.phone,
        smsTemplateCodeEnum: this.templateCode
      }
      // 发送短信验证码
      this.$api.captcha.toSendSmsCode(captchaData).then(res => {
        // console.log(res.data)

        var result = res.data.extend

        let codeKey = result.codeKey
        vm.formData.codeKey = codeKey
        vm.setCodeKey(codeKey)
      })
    },
    sendEmailCode() {
      // 更改发送按钮状态
      changeSendBtn(this)
      let vm = this
      let captchaData = {
        email: this.formData.email,
        mailTemplateCodeEnum: this.templateCode
      }

      // 发送邮箱验证码
      this.$api.captcha.toSendEmailCode(captchaData).then(res => {
        var result = res.data.extend

        let codeKey = result.codeKey
        vm.formData.codeKey = codeKey
        vm.setCodeKey(codeKey)
      })
    },
    bind() {
      if (this.isBindPhone) {
        this.bindPhone()
      } else if (this.isBindEmail) {
        this.bindEmail()
      }
    },
    bindPhone() {
      // 绑定手机号码
      this.loading = true
      let vm = this
      setTimeout(() => {
        let params = JSON.parse(JSON.stringify(this.formData))
        //删除不用的参数
        delete params.email
        this.$api.user
          .toUpdatePhone(params)
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            vm.$toast.success('绑定成功！')
            vm.afterBind(true)
          })
          .catch(() => {
            vm.afterBind(false)
          })
      }, this.apiTime)
    },
    bindEmail() {
      // 绑定邮箱
      this.loading = true
      let vm = this

      setTimeout(() => {
        let params = JSON.parse(JSON.stringify(this.formData))
        //删除不用的参数
        delete params.phone
        // console.log(params)
        this.$api.user
          .toUpdateEmail(params)
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            vm.$toast.success('绑定成功！')
            vm.afterBind(true)
          })
          .catch(() => {
            vm.afterBind(false)
          })
      }, this.apiTime)
    },

    afterBind(success) {
      this.loading = false

      if (success) {
        //修改info 数据提交到父组件
        let obj = JSON.parse(JSON.stringify(this.formData))
        delete obj.captcha
        delete obj.codeKey
        if (this.isBindPhone) {
          delete obj.email
        } else if (this.isBindEmail) {
          delete obj.phone
        }
        Object.keys(obj).forEach(key => {
          this.info[key] = obj[key]
        })
        //清空本地存储信息
        this.setUserInfo()
        this.updateParentData()

        this.closeDialog()
      }
    }
  },
  computed: {
    //
    ...mapGetters({
      getCodeKey: 'getCodeKeyFun',
      getCodeTime: 'getCodeTimeFun'
    }),
    isBindPhone() {
      return this.type == 1
    },
    isBindEmail() {
      return this.type == 2
    },
    formHeader() {
      if (this.isBindPhone) {
        return '绑定手机号码'
      }
      if (this.isBindEmail) {
        return '绑定邮箱'
      }
      return ''
    }
  },
  watch: {
    //,
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped>
/*  */

/deep/ .captchaInput.v-text-field .v-input__append-inner {
  margin-top: 0px;
  margin-bottom: 1px;
}
</style>
