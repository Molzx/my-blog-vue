<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-03-25 23:07:13
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-29 09:03:29
 * @FilePath     : \VueProjects\my-blog\src\components\helper\PermissionDialog.vue
 * @Description  : 这是一些注释
 -->
<template>
  <helper-dialog
    :show.sync="isShowDialog"
    width="480"
    headerTitle="登录提示"
    headerColor="info"
    cardTextHeight="280"
    @cancel="cancel"
  >
    <template slot="content.card-text">
      <v-col align="center" justify="center">
        <v-col cols="12" justify="space-around">
          <v-img :src="warnBg" height="150" contain></v-img>
        </v-col>
        <v-col cols="12">
          <p
            class="text-center mt-2"
            style="color:#99a4b0;"
            v-html="getContent"
          ></p>
        </v-col>
      </v-col>
    </template>
  </helper-dialog>
</template>

<script>
export default {
  props: {
    //
    shortContent: {
      type: String
    },
    content: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //
      isShowDialog: false,
      warnBg: require('@/assets/images/permission/no_permission2.svg')
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    cancel() {
      //
      this.isShowDialog = false
      this.$emit('update:show', this.isShowDialog)
    }
  },
  computed: {
    //
    getContent() {
      if (this.content) {
        return this.content
      } else {
        return '需要登录才可以' + this.shortContent + '哦 :) '
      }
    }
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
