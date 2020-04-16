<template>
  <div>
    <v-card class="shadow-1  b-card-title">
      <v-row class=" mx-6 fill-height" justify="center" align="center">
        <p class="b-title--normal  text-left mb-0">
          标签
        </p>
        <v-spacer></v-spacer>
        <v-tooltip top content-class="b-tooltip" color="white" light>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              small
              color="green"
              style="background:#E8F5E9"
              @click="toMore"
              v-on="on"
            >
              <v-icon size="20">mdi-unfold-more-vertical</v-icon>
            </v-btn>
          </template>
          <span class="grey--text text--darken-3">查看更多</span>
        </v-tooltip>
      </v-row>
    </v-card>
    <v-card class="shadow-1  mb-6 b-card-content">
      <v-card-text>
        <v-scale-transition hide-on-leave>
          <v-row align="center" justify="start" v-if="loading">
            <v-col v-for="i in 8" :key="i" class="shrink pb-2">
              <v-boilerplate class="" type="chip" max-width=""></v-boilerplate>
            </v-col>
          </v-row>
          <v-row class="mx-0" justify="start" v-else>
            <v-chip
              v-for="tag in sideTagItems"
              :key="tag.tagId + tag.tagName"
              class="ma-1 "
              color="grey lighten-5 "
              @click="filterTag(tag)"
              ><span class="color-sub">{{ tag.tagName }}</span>
              <v-badge
                color="green lighten-5 green--text"
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
    loading: {
      type: Boolean,
      default: true
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
      let params = {
        q: tag.tagName
      }
      // console.log(path)
      this.$toUrl(path, params, 'push')
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
