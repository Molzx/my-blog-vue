<template>
  <div>
    <v-card class="shadow-1  b-card-title">
      <v-row class=" mx-3 fill-height" justify="center" align="center">
        <p class="  text-left mb-0 ml-3">
          <strong class="title headline blue-grey--text text--darken-4"
            >标签</strong
          >
        </p>
        <v-spacer></v-spacer>
        <v-chip class="green lighten-5" text-color="green" color="transparent">
          15215
        </v-chip>
      </v-row>
    </v-card>
    <v-card class="shadow-1  mb-6 b-card-content">
      <v-card-text>
        <v-scale-transition hide-on-leave>
          <v-row align="center" justify="start" v-if="otherData.tagInfoLoading">
            <v-col v-for="i in 18" :key="i" class="shrink pb-2">
              <v-boilerplate class="" type="chip" max-width=""></v-boilerplate>
            </v-col>
          </v-row>
          <v-row class="mx-0" justify="start" v-else>
            <v-chip
              v-for="tag in tagInfo"
              :key="tag.tagId + tag.tagName"
              class="ma-1"
              color="light-blue lighten-5"
              @click="filterTag(tag)"
              >{{ tag.tagName }}
              <v-badge
                color="green"
                :content="tag.count"
                class="ml-1"
                bordered
                inline
              >
              </v-badge>
            </v-chip>
          </v-row> </v-scale-transition
      ></v-card-text>
      <v-divider></v-divider>
    </v-card>

    <v-pagination v-model="page" class="my-4" :length="8"></v-pagination>
  </div>
</template>

<script>
import testData from '@/assets/data/article'
export default {
  props: {
    tagInfo: {
      type: Array
    },
    otherData: {
      type: Object,
      default: () => {
        return {
          tagInfoLoading: false
        }
      }
    }
  },
  data() {
    return {
      tags: testData.tag.items,
      page: 2
    }
  },
  methods: {
    filterTag(tag) {
      let path = this.$route.fullPath + '/tag'
      let params = tag.tagName
      // console.log(path)
      this.$router.push({ path: path, query: { q: params } })
    }
  },
  components: {
    // Create a new component that
    // extends v-skeleton-loader
    VBoilerplate: {
      functional: true,

      render(h, { data, props, children }) {
        return h(
          'v-skeleton-loader',
          {
            ...data,
            props: {
              ...props
            }
          },
          children
        )
      }
    }
  },
  //截断超出一定数量的字符
  filters: {
    textLengthFormat(value, num) {
      // let num = 18
      if (!value) return ''
      if (value.length > num) {
        return value.slice(0, num) + '...'
      }
      return value
    },
    subTitleFormat(value) {
      let num = 18
      if (!value) return ''
      if (value.length > num) {
        return value.slice(0, num) + '...'
      }
      return value
    }
  }
}
</script>

<style lang="scss" scoped>
$trans-props: all 0.3s ease;
/deep/ .theme--light.v-pagination .v-pagination__item,
/deep/ .theme--light.v-pagination .v-pagination__navigation {
  color: hsl(212, 16%, 48%);
  // box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: $trans-props;

  &.v-pagination__item--active {
    color: white;
  }
}

/deep/ .theme--light.v-pagination .v-pagination__item:hover,
/deep/ .theme--light.v-pagination .v-pagination__navigation:hover {
  transform: translateY(-4px);
  // color: #fff;
  // background-color: #BBDEFB;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16);
}

/deep/ .theme--light.v-pagination .v-pagination__item:hover i {
  /* 	transform: scale(1.1); */
  color: #fff;
}

/deep/ .theme--light.v-pagination .v-pagination__item:hover:after,
/deep/ .theme--light.v-pagination .v-pagination__navigation:hover::after {
  transform: translate(0) scale(1.2);
}
</style>
