<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-02-15 17:44:43
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-04 21:58:55
 * @FilePath     : \VueProjects\my-blog\src\components\page\blog\Breadcrumbs.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div>
    <!-- Something -->

    <v-card class="b-card-breadcrumbs">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>fas fa-angle-right</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :to="item.to"
            :exact="item.exact"
            :disabled="item.disabled"
          >
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => {
        return [
          {
            text: '标签',
            disabled: false,
            to: { path: '/blog/tags' },
            exact: true
          },
          {
            text: 'Java',
            disabled: true,
            to: '/blog/tags/tag'
          }
        ]
        // [
        //   {
        //     text: '标签',
        //     disabled: false,
        //     to: { path: '/blog/tags' },
        //     exact: true
        //   },
        //   {
        //     text: 'Java',
        //     disabled: true,
        //     to: '/blog/tags/tag'
        //   },
        //   {
        //     text: 'Link 2',
        //     disabled: true,
        //     href: 'breadcrumbs_link_2'
        //   }
        // ]
      }
    }
  },
  data() {
    return {
      //
    }
  },
  mounted() {
    //
  },
  methods: {
    //
  },
  computed: {
    //
  },
  watch: {
    //
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped>
/*  */
.blog .main-container a {
  color: #1976d2 !important;
}
</style>
