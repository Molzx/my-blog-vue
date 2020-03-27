<template>
  <helper-dialog
    :show.sync="show"
    width="450"
    :headerTitle="formHeader"
    headerColor="info"
    cardTextHeight="250"
    @cancel="closeDialog"
  >
    <template slot="content.card-text">
      <v-container>
        <ValidationObserver ref="form">
          <v-form>
            <v-window v-model="step">
              <v-window-item :value="1">
                <p class="info-title-p mt-0 text-center">
                  {{ verifyHeader }}
                </p>
                <p class="info-p  text-center mb-0">
                  为了您的帐号安全，需要验证您的身份
                </p>
                <div>
                  <v-row v-if="isUpdatePhone" dense>
                    <v-col cols="12">
                      <ValidationProvider
                        name="phone"
                        rules="required|phone"
                        v-slot="{ errors }"
                        class="fill-width"
                      >
                        <v-text-field
                          v-model="formData.phone"
                          label="手机号码"
                          :error-messages="errors[0]"
                          :disabled="true"
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
                              :disabled="isSend || loading"
                              @click="sendCode"
                            >
                              {{ btnContent }}
                            </v-btn>
                          </template>
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>
                  </v-row>

                  <v-row v-if="isUpdateEmail" dense>
                    <v-col cols="12">
                      <ValidationProvider
                        name="email"
                        rules="required|email"
                        v-slot="{ errors }"
                        class="fill-width"
                      >
                        <v-text-field
                          v-model="formData.email"
                          label="邮箱帐号"
                          :error-messages="errors[0]"
                          :disabled="true"
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
                              :disabled="isSend || loading"
                              @click="sendCode"
                            >
                              {{ btnContent }}
                            </v-btn>
                          </template>
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row v-if="isUpdatePsw" dense>
                    <v-col cols="12">
                      <ValidationProvider
                        name="password"
                        rules="required|max:16"
                        v-slot="{ errors }"
                        class="fill-width"
                      >
                        <v-text-field
                          v-model="formData.password"
                          :type="showPassword ? 'text' : 'password'"
                          label="请输入旧密码"
                          :counter="16"
                          :append-icon="
                            showPassword ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          @click:append="showPassword = !showPassword"
                          :error-messages="errors[0]"
                          :disabled="loading"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider
                        name="captcha"
                        rules="required|length:4|numeric"
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
                            <img
                              :src="imageCodeData"
                              @click="sendCode"
                              style="cursor: pointer;"
                            />
                          </template>
                        </v-text-field>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </div>
              </v-window-item>

              <v-window-item :value="2">
                <v-row v-if="isUpdatePhone">
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

                <v-row v-if="isUpdateEmail">
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
                <v-row v-if="isUpdatePsw">
                  <v-col cols="12">
                    <ValidationProvider
                      name="password"
                      rules="required|max:16"
                      v-slot="{ errors }"
                      class="fill-width"
                    >
                      <v-text-field
                        v-model="formData.password"
                        :type="showPassword ? 'text' : 'password'"
                        label="请输入新密码"
                        :counter="16"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                        :error-messages="errors[0]"
                        :disabled="loading"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12">
                    <ValidationProvider
                      name="repassword"
                      rules="required|max:16|confirmed:password"
                      v-slot="{ errors }"
                      class="fill-width"
                    >
                      <v-text-field
                        v-model="repassword"
                        :type="showPassword ? 'text' : 'password'"
                        :counter="16"
                        label="请再次输入密码"
                        :error-messages="errors[0]"
                        :disabled="loading"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12">
                    <ValidationProvider
                      name="captcha"
                      rules="required|length:4|numeric"
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
                          <img
                            :src="imageCodeData"
                            @click="sendCode"
                            style="cursor: pointer;"
                          />
                        </template>
                      </v-text-field>
                    </ValidationProvider>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-form>
        </ValidationObserver>
      </v-container>
    </template>

    <template slot="footer">
      <v-divider></v-divider>

      <v-card-actions class="justify-center align-center">
        <v-btn
          :loading="loading"
          width="150"
          depressed
          color="primary"
          @click="confirm"
        >
          {{ stepContent }}
        </v-btn>
      </v-card-actions>
    </template>
  </helper-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
import { reloadSendBtn, changeSendBtn } from '@/assets/js/fct'
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
        password: '',
        phone: '',
        email: '',
        codeKey: '',
        captcha: ''
      },
      imageCaptcha: {
        width: 80,
        height: 30
      },
      code: {
        name: 'step',
        type: '',
        count: 0
      },
      //图片验证码base64数据
      imageCodeData:
        'data:image/jpeg;base64,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',
      //显示密码
      showPassword: false,
      repassword: '',

      isSend: true,
      btnContent: '获取验证码',
      templateCode: 'update',
      //是否可点击发送按钮
      canSend: false,

      //组件类型，默认0，1绑定手机号码，2为邮箱，3为密码
      type: 0,
      //步骤
      step: 1,
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
      // console.log('stepForm组件--')

      //打开对话框
      this.show = true

      //复制父组件传来的数据到表单
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = this.info[key]
      })

      //刷新图片验证码
      if (this.isUpdatePsw) {
        this.sendImageCode()
      } else {
        //加载倒计时
        if (this.type != 0) {
          this.reloadSend()
        }
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
        if (this.step == 1) {
          this.verify()
        } else if (this.step == 2) {
          this.update()
        }
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
      this.formData.password = ''

      if (this.code.count > 0 && this.step == 1) {
        // 更改发送按钮状态，终止计时器
        changeSendBtn(this, 3)
      } else {
        // 更改发送按钮状态，重置计时器
        changeSendBtn(this, 1)
      }
      this.code.type = 0
      this.code.count = 0

      this.step = 1
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
      if (this.isUpdatePhone) {
        this.sendSmsCode()
      } else if (this.isUpdateEmail) {
        this.sendEmailCode()
      } else if (this.isUpdatePsw) {
        this.sendImageCode()
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
    sendImageCode() {
      const vm = this
      this.$api.captcha.toSendImageCode(this.imageCaptcha).then(res => {
        // 接收转换后的Base64图片
        vm.imageCodeData = res.data.extend.imageData

        let codeKey = res.data.extend.codeKey
        vm.formData.codeKey = codeKey
        vm.setCodeKey(codeKey)
      })
    },
    update() {
      if (this.isUpdatePhone) {
        this.updatePhone()
      } else if (this.isUpdateEmail) {
        this.updateEmail()
      } else if (this.isUpdatePsw) {
        this.updatePassword()
      }
    },
    updatePhone() {
      // 更新手机号码
      this.loading = true
      let vm = this

      setTimeout(() => {
        let params = JSON.parse(JSON.stringify(this.formData))
        //删除不用的参数
        delete params.email
        delete params.password
        this.$api.user
          .toUpdatePhone(params)
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            vm.$toast.success('更新手机号成功！')
            vm.afterUpdate(true)
          })
          .catch(() => {
            vm.afterUpdate(false)
          })
      }, this.apiTime)
    },
    updateEmail() {
      // 更新邮箱
      this.loading = true
      let vm = this

      // setTimeout(() => {
      //   vm.afterUpdate(true)
      // }, this.apiTime)
      setTimeout(() => {
        let params = JSON.parse(JSON.stringify(this.formData))
        //删除不用的参数
        delete params.phone
        delete params.password
        this.$api.user
          .toUpdateEmail(params)
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            vm.$toast.success('更新邮箱成功！')
            vm.afterUpdate(true)
          })
          .catch(() => {
            vm.afterUpdate(false)
          })
      }, this.apiTime)
    },
    updatePassword() {
      // 修改密码
      this.loading = true
      let vm = this
      setTimeout(() => {
        let params = JSON.parse(JSON.stringify(this.formData))
        //删除不用的参数
        delete params.phone
        delete params.email
        this.$api.user
          .toUpdatePassword(params)
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            vm.$toast.success('修改密码成功！')
            vm.afterUpdate(true)
          })
          .catch(() => {
            vm.afterUpdate(false)
          })
      }, this.apiTime)
    },
    afterUpdate(success) {
      this.loading = false

      if (success) {
        //修改info 数据提交到父组件
        let obj = JSON.parse(JSON.stringify(this.formData))
        delete obj.captcha
        delete obj.codeKey
        if (this.isUpdatePhone) {
          delete obj.email
          delete obj.password
        } else if (this.isUpdateEmail) {
          delete obj.phone
          delete obj.password
        } else if (this.isUpdatePsw) {
          delete obj.phone
          delete obj.email
        }
        Object.keys(obj).forEach(key => {
          this.info[key] = obj[key]
        })
        //清空本地存储信息
        this.setUserInfo()
        this.updateParentData()

        this.closeDialog()
      }
    },
    verify() {
      if (this.isUpdatePhone) {
        this.verifyPhone()
      } else if (this.isUpdateEmail) {
        this.verifyEmail()
      } else if (this.isUpdatePsw) {
        this.verifyPsw()
      }
    },
    verifyPhone() {
      // 校验手机号码
      this.loading = true
      let vm = this

      // setTimeout(() => {
      //   vm.afterVerify(true)
      // }, 5000)

      setTimeout(() => {
        let params = JSON.parse(JSON.stringify(this.formData))
        //删除不用的参数
        delete params.email
        delete params.password

        this.$api.user
          .toVerifyPhone(params)
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            vm.$toast.success('校验成功！')
            vm.afterVerify(true)
          })
          .catch(() => {
            vm.afterVerify(false)
          })
      }, this.apiTime)
    },
    verifyEmail() {
      // 校验邮箱
      this.loading = true
      let vm = this

      // setTimeout(() => {
      //   vm.afterVerify(true)
      // }, 0)

      setTimeout(() => {
        let params = JSON.parse(JSON.stringify(this.formData))
        //删除不用的参数
        delete params.phone
        delete params.password
        this.$api.user
          .toVerifyEmail(params)
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            vm.$toast.success('校验成功！')
            vm.afterVerify(true)
          })
          .catch(() => {
            vm.afterVerify(false)
          })
      }, this.apiTime)
    },
    verifyPsw() {
      // 校验密码
      this.loading = true
      let vm = this
      // setTimeout(() => {
      //   vm.afterVerify(true)
      // }, 5000)

      setTimeout(() => {
        let params = JSON.parse(JSON.stringify(this.formData))
        //删除不用的参数
        delete params.phone
        delete params.email
        this.$api.user
          .toVerifyPsw(params)
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            vm.$toast.success('校验成功！')
            vm.afterVerify(true)
          })
          .catch(() => {
            vm.afterVerify(false)
          })
      }, this.apiTime)
    },
    afterVerify(success) {
      //
      this.loading = false

      if (success) {
        //重设表单校验
        this.reset()
        // 重置表单数据
        Object.assign(this.$data.formData, this.$options.data().formData)
        // 更改发送按钮状态
        changeSendBtn(this, 1)
        //跳到下一页
        this.step++
      }
      //刷新图片验证码
      if (this.isUpdatePsw) {
        this.sendImageCode()
      }
    }
  },
  computed: {
    //
    ...mapGetters({
      getCodeKey: 'getCodeKeyFun',
      getCodeTime: 'getCodeTimeFun'
    }),
    isUpdatePhone() {
      return this.type == 1
    },
    isUpdateEmail() {
      return this.type == 2
    },
    isUpdatePsw() {
      return this.type == 3
    },

    formHeader() {
      if (this.isUpdatePhone) {
        return '修改手机号码'
      }
      if (this.isUpdateEmail) {
        return '修改邮箱'
      }
      if (this.isUpdatePsw) {
        return '修改密码'
      }
      return ''
    },
    verifyHeader() {
      if (this.isUpdatePhone) {
        return '验证手机号'
      }
      if (this.isUpdateEmail) {
        return '验证邮箱'
      }
      if (this.isUpdatePsw) {
        return '验证密码'
      }
      return ''
    },
    stepContent() {
      if (this.step == 1) {
        return '下一步'
      } else {
        return '确认'
      }
    }
  },
  watch: {
    //
    info: {
      handler: function() {
        //do something
      },
      deep: true
    }
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped>
/*  */

.info-title-p {
  color: #363636 !important;
  margin-top: 24px;
  margin-bottom: 8px;
  font-size: 1.12rem;
}
.info-p {
  color: #7a7a7a !important;
  margin-bottom: 8px;
  font-size: 0.97rem;
}
/deep/ .captchaInput.v-text-field .v-input__append-inner {
  margin-top: 0px;
}
</style>
