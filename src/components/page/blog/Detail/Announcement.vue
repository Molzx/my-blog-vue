<template>
  <div v-if="loading">
    <v-card
      class="shadow-1 mb-6"
      style="border-radius: 8px !important;"
      max-width="310"
    >
      <v-skeleton-loader tile type="image" max-height="150px">
      </v-skeleton-loader>
      <v-skeleton-loader type="card-heading"> </v-skeleton-loader>

      <v-skeleton-loader type="list-item-three-line" class="mt-0" width="100%">
      </v-skeleton-loader>
    </v-card>
  </div>
  <v-card
    v-else
    class="shadow-1"
    :class="getMainPadding"
    style="border-radius: 8px !important;"
    max-width="310"
  >
    <!-- <v-card flat>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="130px"
        ></v-img>
      </v-card> -->
    <v-img
      :lazy-src="$cover()"
      :src="$cover(record.url)"
      max-width="310px"
    ></v-img>
    <v-card-text :class="getContentPadding">
      <p class="an-title">{{ record.title }}</p>
      <p class="an-content">
        {{ record.content }}
      </p>
      <div class="d-flex justify-end" v-if="!side">
        <v-chip
          small
          class="green lighten-5"
          text-color="green"
          color="transparent"
        >
          <span class="an-time">
            {{ record.updatedTime }}
          </span>
        </v-chip>
      </div>
      <!-- <p class="text-right mt-3 mb-0">3天前</p> -->
    </v-card-text>
    <v-tooltip
      top
      content-class="b-tooltip"
      color="white"
      light
      :open-on-hover="side"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          class="toast-btn"
          :class="getBottomBtnClass"
          v-on="on"
          @click="showMore"
        >
          <v-icon color="green">mdi-bell</v-icon>
        </v-btn>
      </template>
      <span class="grey--text text--darken-3">查看更多公告</span>
    </v-tooltip>
  </v-card>
</template>

<script>
export default {
  name: 'temp',
  props: {
    //是否为侧边栏类型，是为true
    side: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: true
    },
    record: {
      type: [Number, Object],
      default: () => {
        return {
          title: '',
          content: '',
          url: '',
          updatedTime: ''
        }
      }
    }
  },
  data() {
    return {
      //展示tooltip
      showTip: false
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    showMore() {
      this.$router.push('/blog/announcements')
    }
  },
  computed: {
    //获取整体距离的边距
    getMainPadding() {
      if (this.side) {
        return 'mt-4 mb-8'
      } else {
        return 'mb-7'
      }
    },
    //获取内容距离下边的边距
    getContentPadding() {
      if (this.side) {
        return 'pb-6'
      } else {
        return 'pb-3'
      }
    },
    //获取底部按钮的位置class
    getBottomBtnClass() {
      if (this.side) {
        return ''
      } else {
        return 'bottom left disabled'
      }
    }
  },
  watch: {
    //
    side(newVal) {
      console.log(newVal)
      this.showTip = newVal
    }
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped>
.an-title {
  color: #4a4a4a;
  font-size: 1.125rem;
  margin-bottom: 4px;
}
.an-content {
  color: #616161;
  font-size: 0.895rem;
  margin-bottom: 8px;
}
.an-time {
  font-size: 0.8rem !important;
}
.toast-btn {
  position: absolute !important;
  // top: -21px !important;
  // right: -21px !important;
  bottom: -21px !important;
  left: calc(50% - 21px) !important;
  width: 42px !important;
  height: 42px !important;
  background: white !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08) !important;
  &.bottom.left {
    bottom: -21px !important;
    left: 21px !important;
  }
  &.disabled {
    pointer-events: none;
  }
}
.toast-time {
  position: absolute !important;
  // top: -21px !important;
  // right: -21px !important;
  bottom: -21px !important;
  right: 21px !important;
  width: 122px !important;
  height: 42px !important;
  background: white !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08) !important;
  z-index: 4;
}
</style>
