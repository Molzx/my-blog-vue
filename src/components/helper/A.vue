<template>
  <div>
    <div class="a-container light red topBotomBordersOut">
      <a>HOME</a>
      <a>ARTICLES</a>
      <a>PORTFOLIO</a>
      <a>ABOUT</a>
      <a>CONTACT</a>
    </div>

    <div class="a-container purple topBotomBordersIn">
      <a>HOME</a>
      <a>ARTICLES</a>
      <a>PORTFOLIO</a>
      <a>ABOUT</a>
      <a>CONTACT</a>
    </div>

    <div class="a-container indigo topLeftBorders">
      <a>HOME</a>
      <a>ARTICLES</a>
      <a>PORTFOLIO</a>
      <a>ABOUT</a>
      <a>CONTACT</a>
    </div>

    <div class="a-container blue circleBehind">
      <a>HOME</a>
      <a>ARTICLES</a>
      <a>PORTFOLIO</a>
      <a>ABOUT</a>
      <a>CONTACT</a>
    </div>

    <div class="a-container cyan brackets">
      <a>HOME</a>
      <a>ARTICLES</a>
      <a>PORTFOLIO</a>
      <a>ABOUT</a>
      <a>CONTACT</a>
    </div>

    <div class="a-container teal borderYtoX">
      <a>HOME</a>
      <a>ARTICLES</a>
      <a>PORTFOLIO</a>
      <a>ABOUT</a>
      <a>CONTACT</a>
    </div>

    <div class="a-container green borderXwidth">
      <a>HOME</a>
      <a>ARTICLES</a>
      <a>PORTFOLIO</a>
      <a>ABOUT</a>
      <a>CONTACT</a>
    </div>

    <div class="a-container lightGreen pullDown">
      <a>HOME</a>
      <a>ARTICLES</a>
      <a>PORTFOLIO</a>
      <a>ABOUT</a>
      <a>CONTACT</a>
    </div>

    <div class="a-container lime pullUp">
      <a>HOME</a>
      <a>ARTICLES</a>
      <a>PORTFOLIO</a>
      <a>ABOUT</a>
      <a>CONTACT</a>
    </div>

    <div class="a-container yellow pullRight">
      <a>HOME</a>
      <a>ARTICLES</a>
      <a>PORTFOLIO</a>
      <a>ABOUT</a>
      <a>CONTACT</a>
    </div>

    <div class="a-container amber pullLeft">
      <a>HOME</a>
      <a>ARTICLES</a>
      <a>PORTFOLIO</a>
      <a>ABOUT</a>
      <a>CONTACT</a>
    </div>

    <div class="a-container orange pullUpDown">
      <a>HOME</a>
      <a>ARTICLES</a>
      <a>PORTFOLIO</a>
      <a>ABOUT</a>
      <a>CONTACT</a>
    </div>

    <div class="a-container deepOrange pullRightLeft">
      <a>HOME</a>
      <a>ARTICLES</a>
      <a>PORTFOLIO</a>
      <a>ABOUT</a>
      <a>CONTACT</a>
    </div>

    <div class="a-container brown highlightTextOut">
      <a alt="HOME">HOME</a>
      <a alt="ARTICLES">ARTICLES</a>
      <a alt="PORTFOLIO">PORTFOLIO</a>
      <a alt="ABOUT">ABOUT</a>
      <a alt="CONTACT">CONTACT</a>
    </div>

    <div class="a-container gray highlightTextIn">
      <a alt="HOME">HOME</a>
      <a alt="ARTICLES">ARTICLES</a>
      <a alt="PORTFOLIO">PORTFOLIO</a>
      <a alt="ABOUT">ABOUT</a>
      <a alt="CONTACT">CONTACT</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //NavMenu相关
      activeNavMenu: 0,
      navMenuShadow: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // this.$refs.body.on('mouseenter mouseleave', '.nav-item', function(e) {
      //   var _d = e.closest('.nav-item')
      //   _d.addClass('show')
      //   setTimeout(function() {
      //     _d[_d.is(':hover') ? 'addClass' : 'removeClass']('show')
      //   }, 1)
      // })
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped src="@styles/blog/_a.scss"></style>
<style></style>
