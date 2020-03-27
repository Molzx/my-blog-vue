<template>
  <v-btn class="btt-btn" fab @click="scrollToTop">
    <v-icon class="grey--text text--darken-3">fas fa-angle-up</v-icon>
  </v-btn>
</template>

<script>
// import { scrollToTop } from '@/assets/js/scrolling'
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
    scrollToTop() {
      this.$scrollTop()
      // scrollToTop(this)
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
$color: #56cbe7;
$background: #fff;
$size: 48px;
.btt-btn {
  position: fixed !important;
  right: 20px !important;
  width: $size !important;
  height: $size !important;
  bottom: 50px !important;
  box-shadow: 0 0 2rem #e2e8ed !important;

  background-color: $background !important;
  border-radius: 50% !important;
  z-index: 45 !important;
  cursor: pointer !important;
  text-align: center !important;
  font-size: $size !important;
  line-height: $size !important;
  color: $background !important;
  &:hover {
    color: $background !important;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: $size !important;
    height: $size !important;
    // border: $color 12px solid !important;
    opacity: 0.3;
    animation: ripple 3s ease-out infinite;
    border-radius: 50%;
    box-shadow: 0 0 2rem #e2e8ed !important;
    z-index: -1;
  }
  &:after {
    animation-delay: -0.6s;
  }
  &.scroll-button-floating {
    position: fixed;
    bottom: 100px;
    transition: opacity 0.5s;
    opacity: 0;
    &.visible {
      opacity: 1;
    }
  }
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 0.75;
  }

  50%,
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
</style>
