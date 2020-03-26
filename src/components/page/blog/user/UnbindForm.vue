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
          <v-btn fab depressed small class="close-btn" @click="cancel">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-alert>

      <v-card-text>
        <v-container>
          <p v-if="isUnbindPhone">是否解绑手机号：{{ info.phone }}</p>
          <p v-if="isUnbindEmail">是否解绑邮箱：{{ info.email }}</p>
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

      //组件类型，默认0，1绑定手机号码，2为邮箱
      type: 0,
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
      setCodeKey: 'setCodeKeyFun',
      setUserInfo: 'setUserInfoFun'
    }),
    initMethod() {
      // console.log('UnbindForm组件--')
      //打开对话框
      this.show = true
    },
    openDialog(type) {
      this.type = type
      this.initMethod()
    },
    updateParentData() {
      this.$emit('update:info', this.info)
    },
    confirm() {
      //
      //解绑操作
      this.unbind()
    },
    cancel() {
      this.show = false
    },
    unbind() {
      if (this.isUnbindPhone) {
        this.unbindPhone()
      } else if (this.isUnbindEmail) {
        this.unbindEmail()
      }
    },

    unbindPhone() {
      // 解绑手机号码
      this.loading = true
      let vm = this
      setTimeout(() => {
        this.$api.user
          .toUnbindPhone()
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            vm.$toast.success('解绑成功！')
            vm.afterUnbind(true)
          })
          .catch(() => {
            vm.afterUnbind(false)
          })
      }, 1000)
    },
    unbindEmail() {
      // 解绑邮箱
      this.loading = true
      let vm = this
      setTimeout(() => {
        this.$api.user
          .toUnbindEmail()
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            vm.$toast.success('解绑成功！')
            vm.afterUnbind(true)
          })
          .catch(() => {
            vm.afterUnbind(false)
          })
      }, 1000)
    },
    afterUnbind(success) {
      this.loading = false

      if (success) {
        if (this.isUnbindPhone) {
          this.info.phone = ''
        } else if (this.isUnbindEmail) {
          this.info.email = ''
        }
        //清空本地存储信息
        this.setUserInfo()
        this.updateParentData()

        this.show = false
      }
    }
  },
  computed: {
    //
    isUnbindPhone() {
      return this.type == 1
    },
    isUnbindEmail() {
      return this.type == 2
    },
    formHeader() {
      if (this.isUnbindPhone) {
        return '解绑手机号'
      }
      if (this.isUnbindEmail) {
        return '解绑邮箱'
      }
      return ''
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

<style>
/*  */
</style>
