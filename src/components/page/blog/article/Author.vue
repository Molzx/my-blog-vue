<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-14 14:09:25
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-27 23:41:37
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\article\Author.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div class="mt-4">
    <!-- Something -->
    <v-btn depressed @click="show = true">hh</v-btn>
    <!-- 个人信息 -->
    <v-alert text dense color="teal">
      <template v-slot:prepend>
        <v-tooltip
          v-model="show"
          top
          content-class="b-tooltip contact"
          color="white"
          light
          max-width="180"
        >
          <template v-slot:activator="{ on }">
            <v-avatar size="72" color="grey lighten-4" class="mr-3">
              <v-img :src="avatarBg" height="72" contain v-on="on"></v-img>
            </v-avatar>
          </template>

          <!-- 扫码关注 -->
          <v-img :src="mmQrCodeBg" width="180" contain></v-img>
          <!-- <span class="grey--text text--darken-3">查看更多</span> -->
        </v-tooltip>
      </template>
      我是Naicha，一个正在起步的后端程序员，仍在不断学习新知识，探索成长路线。如果你与我一样，正在学习知识和充实自我，欢迎加我微信交流探讨。
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'temp',
  data() {
    return {
      //
      show: true,
      avatarBg: require('@/assets/images/avatar/contact_avatar.svg'),
      mmQrCodeBg: require('@/assets/images/mmqrcode.png')
    }
  },
  mounted() {
    //
  },
  methods: {
    //
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
.b-tooltip.contact {
  padding: 8px;
}
</style>
