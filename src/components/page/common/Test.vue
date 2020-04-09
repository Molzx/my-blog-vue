<template>
  <div>
    <!-- Something -->

    <div class="loader">
      <div v-for="i in 10" :key="i" class="d"></div>
    </div>
    <v-dialog
      v-model="show"
      width="500"
      transition="scroll-x-transition"
      origin="center right"
    >
      <v-card>
        <v-alert tile colored-border class="mb-0">
          <div class="d-flex align-center">
            <v-alert text dense border="left" class="mb-0" color="error">
              举报信息
            </v-alert>
            <v-spacer></v-spacer>
            <v-btn fab depressed small class="close-btn" @click="cancel">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-alert>

        <v-card-text class="pb-0">
          <v-row justify="space-around">
            <ValidationObserver ref="form">
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <ValidationProvider
                        name="reportReason"
                        rules="required|max:150"
                        v-slot="{ errors }"
                      >
                        <v-textarea
                          v-model="formData.reason"
                          :disabled="loading"
                          filled
                          placeholder="举报理由......"
                          no-resize
                          auto-grow
                          rows="3"
                          hint="举报理由"
                          persistent-hint
                          :error-messages="errors[0]"
                        >
                        </v-textarea>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </v-container> </v-form
            ></ValidationObserver>
          </v-row>
        </v-card-text>

        <!-- <v-divider></v-divider> -->

        <div class="d-flex justify-center align-center pb-3">
          <v-btn
            depressed
            color="info"
            class="delete-btn"
            @click="confirm"
            :loading="loading"
            :disabled="loading"
          >
            确认
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <material-card color="green" class="mb-12">
      <div slot="header">
        <div class="title font-weight-light mb-2">测试标题信息</div>
        <div class="category font-weight-thin">
          副标题
        </div>
      </div>
      <v-card-text>
        <v-btn depressed color="info" @click="openDialog">
          打开
        </v-btn>
      </v-card-text>
    </material-card>

    <v-card class="shadow-1 " max-width="280">
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="120px"
      ></v-img>
      <v-card-text>
        <p class="an-title">大家好啊，这是一条测试信息。</p>
        <p class="mb-0">
          对技术充满热情，对未知领域充满好奇，热爱各种折腾,
          对多个领域略知一二，时常苦于不求甚解，博而不专.
        </p>
      </v-card-text>
      <v-btn class="toast-btn" fab>
        <v-icon color="green">iconfont icon-alert</v-icon>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'temp',
  props: {
    //
  },
  data() {
    return {
      //
      show: false,
      loading: false,
      warnBg: require('@/assets/images/warn/warning1.svg'),

      formData: {
        accusedUser: 0,
        reason: ''
      }
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    confirm() {
      //
      //
      this.validate()
    },
    cancel() {
      this.loading = false
      this.show = false
      //重设校验状态
      this.reset()
    },
    openDialog(accusedUser) {
      this.show = true
      this.formData.accusedUser = accusedUser
    },
    closeDialog() {
      this.loading = false
      this.show = false
      //重设校验状态
      this.reset()
      // 重置表单数据
      Object.assign(this.$data.formData, this.$options.data().formData)
    },
    validate() {
      let vm = this
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        vm.save()
      })
    },
    reset() {
      this.$refs.form.reset()
    },
    save() {
      this.loading = true
      let vm = this
      setTimeout(() => {
        vm.closeDialog()
      }, 1000)
      // setTimeout(() => {
      //   this.$api.report
      //     .toAddition(this.formData)
      //     .then(res => {
      //       let data = res.data.extend
      //       vm.$toast.success(data.data)
      //       //关闭
      //       vm.closeDialog()
      //     })
      //     .catch(() => {
      //       vm.loading = false
      //     })
      // }, 0)
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

<style lang="scss" scoped>
/*  */
.delete-btn {
  // background: #f5f5f5;
  // color: aquamarine;
  width: 200px !important;
  height: 40px !important;
}
.an-title {
  color: #4a4a4a;
  font-size: 1.1rem;
  margin-bottom: 4px;
}
.toast-btn {
  position: absolute !important;
  top: -24px !important;
  right: -24px !important;
  width: 48px !important;
  height: 48px !important;
  background: white !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08) !important;
}
</style>
