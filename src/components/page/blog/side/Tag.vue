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
        <v-chip
          class="green lighten-5"
          text-color="green"
          color="transparent"
          @click="toMore"
        >
          More
          <v-icon dense right color="green">fas fa-angle-double-right</v-icon>
        </v-chip>
      </v-row>
    </v-card>
    <v-card class="shadow-1  mb-6 b-card-content">
      <v-card-text>
        <v-scale-transition hide-on-leave>
          <v-row align="center" justify="start" v-if="otherData.sideTagLoading">
            <v-col v-for="i in 8" :key="i" class="shrink pb-2">
              <v-boilerplate class="" type="chip" max-width=""></v-boilerplate>
            </v-col>
          </v-row>
          <v-row class="mx-0" justify="start" v-else>
            <v-chip
              v-for="tag in sideTagItems"
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
          </v-row>
        </v-scale-transition>
      </v-card-text>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    sideTagItems: {
      type: Array
    },
    otherData: {
      type: Object,
      default: () => {
        return {
          sideTagLoading: false
        }
      }
    }
  },
  data() {
    return {
      tags: [
        'Work',
        'Home Improvement',
        'Vacation',
        'Food',
        'Drawers',
        'Shopping',
        'Art',
        'Tech',
        'Creative Writing'
      ]
    }
  },
  methods: {
    filterTag(tag) {
      let path = '/blog/tags/tag'
      let params = tag.tagName
      // console.log(path)
      this.$router.push({ path: path, query: { q: params } })
    },
    toMore() {
      let path = '/blog/tags'
      // console.log(path)
      this.$router.push({ path: path })
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
  }
}
</script>

<style></style>
