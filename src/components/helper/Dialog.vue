<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-03-19 21:36:51
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-19 23:45:02
 * @FilePath     : \VueProjects\my-blog\src\components\helper\Dialog.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-dialog
    v-model="show"
    :scrollable="scrollable"
    :width="width"
    :height="height"
    :transition="transition"
    :origin="origin"
    :persistent="persistent"
    overlay-opacity="0.38"
    overlay-color="green  lighten-5"
    content-class="shadow-1 b-dialog"
  >
    <v-card class="b-dialog">
      <slot name="header">
        <v-alert tile colored-border class="">
          <div class="d-flex align-center">
            <v-alert text dense border="left" class="mb-0" :color="headerColor">
              {{ headerTitle }}
            </v-alert>
            <v-spacer></v-spacer>
            <v-btn
              fab
              depressed
              small
              class="close-btn"
              @click="cancel"
              v-if="isShowCloseBtn"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-alert>
      </slot>
      <slot name="content">
        <v-card-text :style="`height: ${cardTextHeight}px;`">
          <slot name="content.card-text"></slot>
        </v-card-text>
      </slot>
      <slot name="footer"> </slot>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    //显示对话框
    show: {
      type: Boolean,
      default: false
    },
    isShowCloseBtn: {
      type: Boolean,
      default: true
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: 500
    },
    height: {
      type: [Number, String],
      default: undefined
    },
    cardTextHeight: {
      type: [Number, String],
      default: 300
    },
    transition: {
      type: String,
      default: 'scroll-y-transition'
    },
    origin: {
      type: String,
      default: 'center right'
    },
    persistent: {
      type: Boolean,
      default: true
    },
    headerTitle: {
      type: String,
      defalut: '标题'
    },
    headerColor: {
      type: String,
      defalut: 'info'
    }
  },
  data() {
    return {
      //
      showDialog: false
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    cancel() {
      // this.$emit('update:show', this.show)
      // this.show = false
      this.$emit('cancel')
    }
  },
  computed: {
    //
  },
  watch: {
    //
    // show(newVal) {
    //   this.showDialog = newVal
    // }
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped>
/*  */
.b-dialog {
  border-radius: 8px !important;
}
</style>
