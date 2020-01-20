<template>
  <nav class="menu">
    <span></span>
    <v-layout row wrap align-center justify-center fill-height>
      <ol>
        <li class="menu-item-active">
          <a class="nav-a-active" href="#0">Home</a>
        </li>
        <li class="menu-item"><a class="nav-a" href="#0">About</a></li>
        <li class="menu-item">
          <a class="nav-a" href="#0"
            >Widgets
            <svg
              version="1.1"
              class="plus-icon"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 18 18"
            >
              <line
                fill="none"
                stroke-width="4"
                stroke-linecap="round"
                stroke-miterlimit="10"
                x1="10"
                y1="9"
                x2="17"
                y2="9"
              />
              <line
                fill="none"
                stroke-width="4"
                stroke-linecap="round"
                stroke-miterlimit="10"
                x1="9"
                y1="9"
                x2="9"
                y2="1"
              />
              <g id="lineGroup_1">
                <line
                  fill="none"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  x1="1"
                  y1="9"
                  x2="8"
                  y2="9"
                />
                <line
                  fill="none"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  x1="9"
                  y1="17"
                  x2="9"
                  y2="9"
                />
              </g>
            </svg>
          </a>
          <ol class="sub-menu">
            <li class="sub-menu-item">
              <a class="nav-a" href="#0">Big Widgets</a>
            </li>
            <li class="sub-menu-item">
              <a class="nav-a" href="#0">Bigger Widgets</a>
            </li>
            <li class="sub-menu-item">
              <a class="nav-a" href="#0">Huge Widgets</a>
            </li>
          </ol>
        </li>
        <li class="menu-item">
          <a class="nav-a" href="#0"
            >Kabobs
            <svg
              version="1.1"
              class="plus-icon"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 18 18"
            >
              <line
                fill="none"
                stroke-width="4"
                stroke-linecap="round"
                stroke-miterlimit="10"
                x1="10"
                y1="9"
                x2="17"
                y2="9"
              />
              <line
                fill="none"
                stroke-width="4"
                stroke-linecap="round"
                stroke-miterlimit="10"
                x1="9"
                y1="9"
                x2="9"
                y2="1"
              />
              <g id="lineGroup_2">
                <line
                  fill="none"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  x1="1"
                  y1="9"
                  x2="8"
                  y2="9"
                />
                <line
                  fill="none"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  x1="9"
                  y1="17"
                  x2="9"
                  y2="9"
                />
              </g>
            </svg>
          </a>
          <ol class="sub-menu">
            <li class="sub-menu-item">
              <a class="nav-a" href="#0">Shishkabobs</a>
            </li>
            <li class="sub-menu-item">
              <a class="nav-a" href="#0">BBQ kabobs</a>
            </li>
            <li class="sub-menu-item">
              <a class="nav-a" href="#0">Summer kabobs</a>
            </li>
          </ol>
        </li>
        <li class="menu-item"><a class="nav-a" href="#0">Contact</a></li>
      </ol>
    </v-layout>
  </nav>
</template>

<script>
import { TimelineLite, TweenMax, Sine, Power1 } from '@commons/tweenmax/all'
export default {
  name: 'test',
  data() {
    return {}
  },
  mounted() {
    let tl = new TimelineLite(),
      links = document.querySelectorAll('.menu-item'),
      pIcon = document.querySelectorAll('.plus-icon')
    tl.staggerFromTo(
      links,
      0.4,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease: Sine.easeInOut },
      0.2
    )
    links[2].addEventListener('mouseenter', function() {
      TweenMax.to(pIcon[0], 0.15, { rotation: -45, ease: Power1.easeIn })
      TweenMax.to('#lineGroup_1', 0.2, {
        attr: { 'stroke-dashoffset': '8', 'stroke-dasharray': '8' },
        ease: Power1.easeIn
      })
    })
    links[2].addEventListener('mouseleave', function() {
      TweenMax.to(pIcon[0], 0.15, { rotation: 0, ease: Power1.easeIn })
      TweenMax.to('#lineGroup_1', 0.2, {
        attr: { 'stroke-dashoffset': '0', 'stroke-dasharray': '0' },
        ease: Power1.easeIn
      })
    })
    links[3].addEventListener('mouseenter', function() {
      TweenMax.to(pIcon[1], 0.15, { rotation: -45, ease: Power1.easeIn })
      TweenMax.to('#lineGroup_2', 0.2, {
        attr: { 'stroke-dashoffset': '8', 'stroke-dasharray': '8' },
        ease: Power1.easeIn
      })
    })
    links[3].addEventListener('mouseleave', function() {
      TweenMax.to(pIcon[1], 0.15, { rotation: 0, ease: Power1.easeIn })
      TweenMax.to('#lineGroup_2', 0.2, {
        attr: { 'stroke-dashoffset': '0', 'stroke-dasharray': '0' },
        ease: Power1.easeIn
      })
    })

    const menuToggle = document.querySelector('.menu span')
    const menu = document.querySelector('.menu')
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('open')
    })
  },
  methods: {},
  components: {}
}
</script>

<style lang="scss" scoped src="@styles/nav_menu.scss"></style>
<style lang="scss" scoped>
$shadow: true;

.menu {
  @if $shadow== 'false' {
    box-shadow: none;
  }
}
</style>
