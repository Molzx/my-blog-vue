<template>
  <helper-dialog
    :show.sync="show"
    width="450"
    :headerTitle="formHeader"
    headerColor="info"
    cardTextHeight="250"
    @cancel="cancel"
  >
    <template slot="content.card-text">
      <v-container>
        <v-row class="justify-center align-start">
          <v-col cols="12" class="py-0 mb-2">
            <v-img :src="warnBg" height="180" contain></v-img>
          </v-col>
          <v-col cols="12" class="py-0">
            <p v-if="isUnbindPhone" class="text-center mb-0">
              是否解绑手机号：{{ info.phone }}
            </p>
            <p v-if="isUnbindEmail" class="text-center mb-0">
              是否解绑邮箱：{{ info.email }}
            </p>
          </v-col>
        </v-row>
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
          确认
        </v-btn>
      </v-card-actions>
    </template>
  </helper-dialog>
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
      loading: false,

      warnBg: require('@/assets/images/warn/warn.svg')
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
