<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-03-20 14:33:37
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-25 23:06:20
 * @FilePath     : \VueProjects\my-blog\src\components\helper\TipDialog.vue
 * @Description  : 这是一些注释
 -->
<template>
  <helper-dialog
    :show.sync="isShowDialog"
    width="500"
    headerTitle="登录提示"
    headerColor="info"
    cardTextHeight="200"
    @cancel="cancel"
  >
    <template slot="content.card-text">
      <v-row justify="space-around">
        <v-img :src="warnBg" height="150" contain></v-img>
      </v-row>
      <p class="text-center mt-2" style="color:#99a4b0;">
        需要登录才可以下载！
      </p>
    </template>
  </helper-dialog>
</template>

<script>
export default {
  props: {
    //
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //
      isShowDialog: false,
      resolve: '',
      reject: '',
      // 保存promise对象
      promise: '',
      warnBg: require('@/assets/images/permission/no_permission2.svg')
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    // 确定,将promise断定为resolve状态
    confirm: function() {
      this.isShowDialog = false
      if (this.isShowInput) {
        this.resolve(this.inputValue)
      } else {
        this.resolve('confirm')
      }
      this.remove()
    },
    // 取消,将promise断定为reject状态
    cancel: function() {
      this.isShowDialog = false
      this.reject('cancel')
      this.remove()
    },
    // 弹出messageBox,并创建promise对象
    showMsgBox: function() {
      this.isShowDialog = true
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
      // 返回promise对象
      return this.promise
    },
    remove: function() {
      setTimeout(() => {
        this.destroy()
      }, 300)
    },
    destroy: function() {
      this.$destroy()
      document.body.removeChild(this.$el)
    }
  },
  computed: {
    //
  },
  watch: {
    //
    show(newVal) {
      this.isShowDialog = newVal
    }
  },
  components: {
    //
  }
}
</script>

<style>
/*  */
</style>
