<template>
  <div class="loader-container">
    <!-- <div class="loader">
      <div class="cube">
        <div class="sides">
          <div class="top"></div>
          <div class="right"></div>
          <div class="bottom"></div>
          <div class="left"></div>
          <div class="front"></div>
          <div class="back"></div>
        </div>
      </div>
      <div class="text">{{ loadingText }}</div>
    </div> -->
    <div class="loader">
      <div class="dot" v-for="char in loadingText" :key="char">{{ char }}</div>
      <!-- <div class="dot">在</div>
      <div class="dot">搜</div>
      <div class="dot">索</div> -->
      <div class="dot">...</div>
      <div class="cogs">
        <div class="cog cog0">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        <div class="cog cog1">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        <div class="cog cog2">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //
    loadingText: {
      type: String,
      default: '正在加载'
    }
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
  filters: {
    //
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped src="@styles/blog/loading2.scss"></style>
<style lang="scss" scoped>
.loader-container {
  height: 400px;
}
/*  */
</style>
