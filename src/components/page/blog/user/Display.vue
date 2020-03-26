<template>
  <v-row no-gutters>
    <v-col cols="auto" class="mr-1">
      <v-card style="border-radius:8px" class="shadow-1  mb-6">
        <v-container style="height: 300px;min-width:230px;">
          <v-tabs vertical optional slider-size="3" v-model="tab">
            <v-tab
              class="left-tab"
              v-for="(item, i) in tabItems"
              :key="i"
              :to="item.to"
            >
              <v-icon left :size="item.iconSize">{{
                item.to == tab ? item.iconSelected : item.iconNormal
              }}</v-icon>
              {{ isSelfUserInfo ? item.textOwner : item.textOther }}
            </v-tab>
            <!-- <v-tab class="left-tab" to="/blog/users/info">
              <v-icon left>mdi-account</v-icon>
              {{ isSelfUserInfo ? '我的资料' : 'ta的资料' }}
            </v-tab>
            <v-tab class="left-tab" to="/blog/users/collects">
              <v-icon size="20" left>mdi-heart-outline</v-icon>
              {{ isSelfUserInfo ? '我的收藏' : 'ta的收藏' }}
            </v-tab>
            <v-tab class="left-tab">
              <v-icon size="20" left>mdi-thumb-up-outline</v-icon>
              {{ isSelfUserInfo ? '我的点赞' : 'ta的点赞' }}
            </v-tab> -->
          </v-tabs>
        </v-container>
      </v-card>
      <!-- <div>
        <v-card class="shadow-1  b-card-title">
          <v-row class=" mx-3 fill-height" justify="center" align="center">
            <p class="mb-0">
              <strong class="title headline blue-grey--text text--darken-4"
                >用户信息</strong
              >
            </p>
          </v-row>
        </v-card>
        <v-card class="shadow-1  mb-6 b-card-content">
          <v-card-text class="px-0" style="">
            <v-container style="height: 300px;">
              <v-tabs vertical>
                <v-tab>
                  <v-icon left>mdi-account</v-icon>
                  用户信息
                </v-tab>
                <v-tab>
                  <v-icon left>mdi-lock</v-icon>
                  Option 2
                </v-tab>
                <v-tab>
                  <v-icon left>mdi-access-point</v-icon>
                  Option 3
                </v-tab>
              </v-tabs>
            </v-container>
          </v-card-text>
        </v-card>
      </!-->
    </v-col>
    <v-col>
      <v-card style="border-radius:8px" class="shadow-1  mb-6">
        <router-view></router-view>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    //
  },
  data() {
    return {
      //
      tab: '',
      tabItems: [
        {
          to: '/blog/users/info',
          iconNormal: 'mdi-account-settings-outline',
          iconSelected: 'mdi-account-settings',
          iconSize: 20,
          textOwner: '我的资料',
          textOther: 'ta的资料'
        },
        {
          to: '/blog/users/likes',
          iconNormal: 'mdi-account-heart-outline',
          iconSelected: 'mdi-account-heart',
          iconSize: 20,
          textOwner: '我的点赞',
          textOther: 'ta的点赞'
        },
        {
          to: '/blog/users/collects',
          iconNormal: 'mdi-account-star-outline',
          iconSelected: 'mdi-account-star',
          iconSize: 20,
          textOwner: '我的收藏',
          textOther: 'ta的收藏'
        }
      ],
      bottomNav: 3
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
    ...mapGetters({
      getUseUserId: 'getUseUserIdFun'
    }),
    isSelfUserInfo() {
      return this.getUseUserId == ''
    },
    color() {
      switch (this.bottomNav) {
        case 0:
          return 'blue-grey'
        case 1:
          return 'teal'
        case 2:
          return 'brown'
        case 3:
          return 'indigo'
        default:
          return 'indigo'
      }
    }
  },
  watch: {
    //
    tab(newVal) {
      console.log(newVal)
    }
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped>
/*  */
.left-tab {
  justify-content: start !important;
}
//未选中hover
.theme--light.v-tabs .v-tab:hover::before {
  opacity: 0.04;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
//选中
.v-tab--active.v-tab:not(:focus)::before {
  opacity: 0.12;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
</style>
