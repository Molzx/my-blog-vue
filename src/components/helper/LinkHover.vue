<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-04-06 17:42:41
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-06 23:25:16
 * @FilePath     : \VueProjects\my-blog\src\components\helper\LinkHover.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div class="social-buttons">
    <a
      href="#"
      class="social-buttons__button social-button social-button--facebook"
      aria-label="Facebook"
    >
      <span class="social-button__inner">
        <i class="fab fa-facebook-f"></i>
      </span>
    </a>
    <a
      href="#"
      class="social-buttons__button social-button social-button--linkedin"
      aria-label="LinkedIn"
    >
      <span class="social-button__inner">
        <i class="fab fa-linkedin-in"></i>
      </span>
    </a>
    <a
      href="#"
      class="social-buttons__button social-button social-button--snapchat"
      aria-label="SnapChat"
    >
      <span class="social-button__inner">
        <i class="fab fa-snapchat-ghost"></i>
      </span>
    </a>
    <a
      href="#"
      class="social-buttons__button social-button social-button--github"
      aria-label="GitHub"
    >
      <span class="social-button__inner">
        <i class="fab fa-github"></i>
      </span>
    </a>
    <a
      href="#"
      class="social-buttons__button social-button social-button--codepen"
      aria-label="CodePen"
    >
      <span class="social-button__inner">
        <i class="fab fa-codepen"></i>
      </span>
    </a>
  </div>
  <!-- 测试linkhover效果 -->
  <!-- <div id="content">
    <section class="links">
      <nav class="link-effect-1">
        <a href="#"><span data-hover="Ironman">Ironman</span></a>
        <a href="#"><span data-hover="Batman">Batman</span></a>
        <a href="#"><span data-hover="Deadpool">Deadpool</span></a>
        <a href="#"><span data-hover="Wolverine">Wolverine</span></a>
        <a href="#"><span data-hover="Superman">Superman</span></a>
      </nav>
    </section>
    <section class="links">
      <nav class="link-effect-2 light" id="link-effect-2">
        <a href="#link-effect-2"><span data-hover="Ironman">Ironman</span></a>
        <a href="#link-effect-2"><span data-hover="Batman">Batman</span></a>
        <a href="#link-effect-2"><span data-hover="Deadpool">Deadpool</span></a>
        <a href="#link-effect-2"
          ><span data-hover="Wolverine">Wolverine</span></a
        >
        <a href="#link-effect-2"><span data-hover="Superman">Superman</span></a>
      </nav>
    </section>
    <section class="links">
      <nav class="link-effect-3" id="link-effect-3">
        <a href="#link-effect-4" data-hover="Ironman">Ironman</a>
        <a href="#link-effect-4" data-hover="Batman">Batman</a>
        <a href="#link-effect-4" data-hover="Deadpool">Deadpool</a>
        <a href="#link-effect-4" data-hover="Wolverine">Wolverine</a>
        <a href="#link-effect-4" data-hover="Superman">Superman</a>
      </nav>
    </section>
    <section class="links">
      <nav class="link-effect-4" id="link-effect-4">
        <a href="#link-effect-3" data-hover="Ironman">Ironman</a>
        <a href="#link-effect-3" data-hover="Batman">Batman</a>
        <a href="#link-effect-3" data-hover="Deadpool">Deadpool</a>
        <a href="#link-effect-3" data-hover="Wolverine">Wolverine</a>
        <a href="#link-effect-3" data-hover="Superman">Superman</a>
      </nav>
    </section>
    <section class="links">
      <nav class="link-effect-5" id="link-effect-5">
        <a href="#link-effect-5" data-hover="Ironman">Ironman</a>
        <a href="#link-effect-5" data-hover="Batman">Batman</a>
        <a href="#link-effect-5" data-hover="Deadpool">Deadpool</a>
        <a href="#link-effect-5" data-hover="Wolverine">Wolverine</a>
        <a href="#link-effect-5" data-hover="Superman">Superman</a>
      </nav>
    </section>
    <section class="links">
      <nav class="link-effect-6" id="link-effect-6">
        <a href="#link-effect-6" data-hover="Ironman">Ironman</a>
        <a href="#link-effect-6" data-hover="Batman">Batman</a>
        <a href="#link-effect-6" data-hover="Deadpool">Deadpool</a>
        <a href="#link-effect-6" data-hover="Wolverine">Wolverine</a>
        <a href="#link-effect-6" data-hover="Superman">Superman</a>
      </nav>
    </section>
    <section class="links">
      <nav class="link-effect-7" id="link-effect-7">
        <a href="#link-effect-7" data-hover="Ironman">Ironman</a>
        <a href="#link-effect-7" data-hover="Batman">Batman</a>
        <a href="#link-effect-7" data-hover="Deadpool">Deadpool</a>
        <a href="#link-effect-7" data-hover="Wolverine">Wolverine</a>
        <a href="#link-effect-7" data-hover="Superman">Superman</a>
      </nav>
    </section>
    <section class="links">
      <nav class="link-effect-8" id="link-effect-8">
        <a href="#link-effect-8">Ironman</a>
        <a href="#link-effect-8">Batman</a>
        <a href="#link-effect-8">Deadpool</a>
        <a href="#link-effect-8">Wolverine</a>
        <a href="#link-effect-8">Superman</a>
      </nav>
    </section>
    <section class="links">
      <nav class="link-effect-9" id="link-effect-9">
        <a href="#link-effect-9">Ironman</a>
        <a href="#link-effect-9">Batman</a>
        <a href="#link-effect-9">Deadpool</a>
        <a href="#link-effect-9">Wolverine</a>
        <a href="#link-effect-9">Superman</a>
      </nav>
    </section>
    <section class="links">
      <nav class="link-effect-10" id="link-effect-10">
        <a href="#link-effect-10"><span>Ironman</span></a>
        <a href="#link-effect-10"><span>Batman</span></a>
        <a href="#link-effect-10"><span>Deadpool</span></a>
        <a href="#link-effect-10"><span>Wolverine</span></a>
        <a href="#link-effect-10"><span>Superman</span></a>
      </nav>
    </section>
    <section class="links">
      <nav class="link-effect-11" id="link-effect-11">
        <a href="#link-effect-11"><span>Ironman</span></a>
        <a href="#link-effect-11"><span>Batman</span></a>
        <a href="#link-effect-11"><span>Deadpool</span></a>
        <a href="#link-effect-11"><span>Wolverine</span></a>
        <a href="#link-effect-11"><span>Superman</span></a>
      </nav>
    </section>
    <section class="links">
      <nav class="link-effect-12" id="link-effect-12">
        <a href="#link-effect-12"><span>Ironman</span></a>
        <a href="#link-effect-12"><span>Batman</span></a>
        <a href="#link-effect-12"><span>Deadpool</span></a>
        <a href="#link-effect-12"><span>Wolverine</span></a>
        <a href="#link-effect-12"><span>Superman</span></a>
      </nav>
    </section>
    <section class="links">
      <nav class="link-effect-13" id="link-effect-13">
        <a href="#link-effect-13"><span>Ironman</span></a>
        <a href="#link-effect-13"><span>Batman</span></a>
        <a href="#link-effect-13"><span>Deadpool</span></a>
        <a href="#link-effect-13"><span>Wolverine</span></a>
        <a href="#link-effect-13"><span>Superman</span></a>
      </nav>
    </section>
    <section class="links">
      <nav class="link-effect-14 light" id="link-effect-14">
        <a class="current" href="#link-effect-14"><span>Ironman</span></a>
        <a href="#link-effect-14"><span>Batman</span></a>
        <a href="#link-effect-14"><span>Deadpool</span></a>
        <a href="#link-effect-14"><span>Wolverine</span></a>
        <a href="#link-effect-14"><span>Superman</span></a>
      </nav>
    </section>
  </div> -->
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
// <style lang="scss" scoped src="@styles/blog/link_hover.scss"></style>
</script>

<style lang="scss" scoped src="@styles/blog/social_icon_2.scss"></style>
<style>
/*  */
</style>
