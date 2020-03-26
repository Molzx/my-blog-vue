<template>
  <div>
    <v-card class="shadow-1  b-card-title  ">
      <v-row class=" mx-3 fill-height" justify="center" align="center">
        <p class="  text-left mb-0 ml-3">
          <strong class="title headline blue-grey--text text--darken-4"
            >分类</strong
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
          <v-skeleton-loader
            v-if="otherData.sideCategoryLoading"
            type="list-item@5"
          >
          </v-skeleton-loader>

          <v-list nav class="pa-0" v-else>
            <v-list-item-group active-class="pink--text">
              <v-divider></v-divider>
              <template v-for="(item, i) in sideCategoryItems">
                <v-list-item
                  :key="item.categoryId + item.categoryName"
                  class="mb-0"
                  @click="filterCategory(item)"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{
                        item.categoryName | textLengthFormat(12)
                      }}</v-list-item-title
                    >
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-badge
                      color="primary"
                      :content="item.count"
                      class="ml-1"
                      inline
                    >
                    </v-badge>
                  </v-list-item-action>
                </v-list-item>

                <v-divider
                  v-if="i + 1 < sideCategoryItems.length"
                  :key="i"
                ></v-divider
              ></template>

              <v-divider></v-divider></v-list-item-group
          ></v-list>
        </v-scale-transition>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    sideCategoryItems: {
      type: Array
    },
    otherData: {
      type: Object,
      default: () => {
        return {
          sideCategoryLoading: false
        }
      }
    }
  },
  data() {
    return {
      //
    }
  },
  methods: {
    filterCategory(category) {
      let path = '/blog/categories/category'
      let params = category.categoryName
      // console.log(path)
      this.$router.push({ path: path, query: { q: params } })
    },
    toMore() {
      let path = '/blog/categories'
      // console.log(path)
      this.$router.push({ path: path })
    }
  },
  components: {},
  computed: {
    //=======内容相关
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
/deep/ .v-list-item__title {
  color: #4a4a4a;
}
</style>
