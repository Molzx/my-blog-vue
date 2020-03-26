<template>
  <v-dialog
    v-model="show"
    width="500"
    scrollable
    transition="scroll-x-transition"
    origin="center right"
  >
    <v-card class="mx-auto">
      <v-alert tile colored-border class=" pb-0">
        <div class="d-flex align-center">
          <v-alert text dense border="left" class="mb-0" color="info">
            修改资料
          </v-alert>
          <v-spacer></v-spacer>
          <v-btn fab depressed small class="close-btn" @click="cancel">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-alert>

      <v-card-text>
        <v-container>
          <ValidationObserver ref="form">
            <v-form>
              <v-row>
                <v-col cols="12">
                  <ValidationProvider
                    name="nickName"
                    rules="required|min:5|max:15|nickName"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="formData.nickName"
                      :counter="15"
                      label="昵称"
                      :error-messages="errors[0]"
                      dense
                      :disabled="loading"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <v-slider
                    v-model="formData.age"
                    color="green"
                    label="年龄"
                    min="10"
                    max="60"
                    thumb-label
                    dense
                    :disabled="loading"
                  ></v-slider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    name="gender"
                    rules="required|oneOf:男生,女生,保密"
                    v-slot="{ errors }"
                  >
                    <v-select
                      v-model="formData.gender"
                      :items="genderItem"
                      menu-props="auto"
                      :error-messages="errors[0]"
                      label="性别"
                      dense
                      :disabled="loading"
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    name="autograph"
                    rules="max:60"
                    v-slot="{ errors }"
                    ><v-textarea
                      v-model="formData.autograph"
                      :error-messages="errors[0]"
                      label="个性签名"
                      auto-grow
                      :rows="2"
                      :counter="60"
                      :disabled="loading"
                    ></v-textarea>
                    <!-- <v-text-field
                      v-model="formData.autograph"
                      :counter="20"
                      :error-messages="errors[0]"
                      label="个性签名"
                      dense
                      :disabled="loading"
                    ></v-text-field> -->
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
import { mapActions } from 'vuex'
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
        nickName: '',
        age: 0,
        gender: '男生',
        autograph: ''
      },
      genderItem: [{ text: '男生' }, { text: '女生' }, { text: '保密' }],
      show: false,
      loading: false
    }
  },
  mounted() {
    //
  },
  methods: {
    //,
    ...mapActions({
      setUserInfo: 'setUserInfoFun',
      setBaseUserInfo: 'setBaseUserInfo'
    }),
    initMethod() {
      // console.log('BaseForm组件--')
      //打开对话框
      this.show = true

      //复制父组件传来的数据到表单
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = this.info[key]
      })
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
        console.log(success)
        this.update()
      })
    },
    reset() {
      this.$refs.form.reset()
    },
    update() {
      this.loading = true
      let vm = this
      // setTimeout(() => {
      //   vm.loading = false
      //   vm.show = false
      //   //请求更新数据
      //   // vm.goBack()
      //   vm.updateParentData()
      // }, 1000)
      setTimeout(() => {
        let newFormData = new FormData()
        //这里将表单数据封装成json保存到formData中
        newFormData.append(
          'formData',
          new Blob([JSON.stringify(this.formData)], {
            type: 'application/json'
          })
        )
        this.$api.user
          .toUpdate(newFormData)
          .then(res => {
            // eslint-disable-next-line no-unused-vars
            let data = res.data.extend
            vm.$toast.success('更新成功')
            vm.afterUpdate(true)
          })
          .catch(() => {
            vm.afterUpdate(false)
          })
      }, 0)
    },

    afterUpdate(success) {
      this.loading = false
      if (success) {
        //修改info 数据提交到父组件
        let obj = JSON.parse(JSON.stringify(this.formData))

        Object.keys(obj).forEach(key => {
          this.info[key] = obj[key]
        })
        //清空本地存储信息
        this.setUserInfo()
        //设置本地头像数据
        this.setBaseUserInfo(this.info)
        //更新数据
        this.updateParentData()

        this.reset()
        //关闭对话框
        this.show = false
      }
    },
    confirm() {
      //
      //校验表单
      this.validate()
    },
    cancel() {
      this.reset()
      this.show = false
    },
    openDialog() {
      this.initMethod()
    }
  },
  computed: {
    //
  },
  watch: {
    //
  },
  components: {
    //
  }
}
</script>

<style>
/*  */
</style>
