<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-08 11:56:29
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-08 12:25:55
 * @FilePath     : \VueProjects\my-blog\src\components\core\ArrowButton.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div class="arrow-wrapper">
    <div ref="hamburger" class="hamburger">
      <div class="inner-hamburger">
        <span class="arrow">
          <i ref="arrowLeft" class="fas fa-long-arrow-alt-left"></i>
          <i ref="arrowRight" class="fas fa-long-arrow-alt-right"></i>
          <!-- <i>i</i> -->
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'temp',
  data() {
    return {}
  },
  methods: {},
  components: {}
}
</script>

<style></style>
