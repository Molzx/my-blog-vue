<template>
  <div>
    <v-card class="shadow-1  b-card-title  ">
      <v-row class=" mx-6 fill-height" justify="center" align="center">
        <p class="b-title--normal  text-left mb-0">
          分类
        </p>
        <v-spacer></v-spacer>
        <v-tooltip
          top
          content-class="b-tooltip"
          color="white"
          light
          transition="scale-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              small
              color="blue"
              style="background:#E3F2FD"
              @click="toMore"
              v-on="on"
            >
              <v-icon size="20">mdi-unfold-more-vertical</v-icon>
            </v-btn>
          </template>
          <span class="grey--text text--darken-3">查看更多</span>
        </v-tooltip>
        <!-- <v-chip
          class="green lighten-5"
          text-color="green"
          color="transparent"
          @click="toMore"
        >
          More
          <v-icon dense right color="green">fas fa-angle-double-right</v-icon>
        </v-chip> -->
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

          <v-list nav dense class="pa-0" v-else>
            <v-list-item-group active-class="blue--text">
              <!-- <v-divider></v-divider> -->
              <template v-for="(item, i) in sideCategoryItems">
                <v-list-item
                  :key="item.categoryId + item.categoryName + i"
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
                      color="blue lighten-5 blue--text"
                      :content="item.count"
                      class="ml-1"
                      inline
                    >
                    </v-badge>
                  </v-list-item-action>
                </v-list-item>

                <!-- <v-divider
                  v-if="i + 1 < sideCategoryItems.length"
                  :key="i"
                ></v-divider> -->
              </template>

              <!-- <v-divider></v-divider> -->
            </v-list-item-group>
          </v-list>
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
  filters: {
    //
  }
}
</script>

<style lang="scss" scoped>
/deep/ .v-list-item__title {
  color: #545c63;
  padding-bottom: 2px;
}
/deep/ .v-list--dense .v-list-item .v-list-item__subtitle,
.v-list--dense .v-list-item .v-list-item__title,
.v-list-item--dense .v-list-item__subtitle,
.v-list-item--dense .v-list-item__title {
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1rem;
}
</style>
