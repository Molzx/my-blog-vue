<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-08 10:16:02
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-28 16:21:21
 * @FilePath     : \VueProjects\my-blog\src\components\core\Footer.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-footer padless app absolute color="transparent">
    <v-card tile class="shadow-1 text-center opacity-6 fill-width">
      <v-card-text class="black--text">
        <strong
          >Copyright © {{ new Date().getFullYear() }} Naicha. All rights
          reserved.</strong
        >
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  props: {
    //
  },
  data() {
    return {
      //
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
.opacity-6 {
  opacity: 0.6;
}
</style>
