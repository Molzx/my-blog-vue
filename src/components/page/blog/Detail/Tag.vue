<template>
  <div>
    <v-card class="shadow-1  b-card-title  short">
      <v-row class=" mx-6 fill-height" justify="center" align="center">
        <p class="b-title--normal  text-left mb-0">
          标签
        </p>
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
            <v-badge
              v-for="tag in tagInfo"
              :key="tag.tagId + tag.tagName"
              color="deep orange lighten-5 deep orange--text"
              :content="tag.count"
              class="ma-2"
              bordered
              overlap
            >
              <v-chip
                class=""
                color="teal lighten-5 teal--text"
                @click="filterTag(tag)"
              >
                <span class="">{{ tag.tagName }}</span>
              </v-chip>
            </v-badge>
          </v-row>
        </v-scale-transition></v-card-text
      >
      <v-divider></v-divider>
    </v-card>

    <!-- <v-pagination v-model="page" class="my-4" :length="8"></v-pagination> -->
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
      this.$toUrl(path, params, 'push')
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
    //
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
