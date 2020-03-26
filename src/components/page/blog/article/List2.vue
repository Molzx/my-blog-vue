<template>
  <div>
    <v-card style="border-radius:12px" class="shadow-1  mb-6">
      <v-card-title
        >博客
        <v-spacer></v-spacer>
        <v-chip class="b-chip-count" text-color="green" color="grey lighten-5">
          <p class="text-center mb-0">
            <strong class="headline orange--text text-- darken-4">1523</strong
            >篇
          </p>
        </v-chip>
      </v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-row dense>
          <v-col v-for="(item, i) in getItems" :key="i" cols="12">
            <v-divider v-if="i !== 0"></v-divider>
            <v-card class="mx-4 mt-2" :color="item.color" flat>
              <v-row no-gutters justify-space-between>
                <v-col
                  cols="9"
                  md="9"
                  sm="9"
                  xs="auto"
                  order="first"
                  order-xs="13"
                >
                  <div>
                    <v-card-title
                      class="title text-no-wrap d-inline-block text-truncate"
                    >
                      {{ item.title | textLengthFormat(18) }}
                    </v-card-title>

                    <v-card-subtitle>
                      {{ item.artist | textLengthFormat(70) }}</v-card-subtitle
                    >
                  </div>
                </v-col>
                <v-col cols="auto">
                  <v-avatar class="ma-3" size="125" tile>
                    <v-img :src="item.src"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
              <!-- <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title
                        class="title text-no-wrap d-inline-block text-truncate"
                        v-text="item.title"
                        style="max-width: 400px;"
                      ></v-card-title>

                      <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                    </div>

                    <v-avatar class="ma-3" size="125" tile>
                      <v-img :src="item.src"></v-img>
                    </v-avatar>
                  </div> -->
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-list-item class="grow">
                  <v-list-item-avatar size="30" color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>奶茬</v-list-item-title>
                  </v-list-item-content>

                  <v-row align="center" justify="end">
                    <v-icon size="18" class="mr-1">mdi-heart</v-icon>
                    <span class="caption mr-2">256</span>
                    <span class="mr-1">·</span>
                    <v-icon size="18" class="mr-1">mdi-share-variant</v-icon>
                    <span class="caption mr-2">45</span>
                    <span class="mr-1">·</span>
                    <v-icon size="18" class="mr-1">mdi-calendar-blank</v-icon>
                    <span class="caption font-regular">2020-01-10</span>
                  </v-row>
                </v-list-item>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-divider></v-divider>
      <v-card-actions>
        <v-btn depressed color="info">上一页</v-btn>
        <v-spacer></v-spacer>

        <v-btn depressed color="info">下一页</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import testData from '@/assets/data/article'
export default {
  data() {
    return {
      items: testData.article.items
    }
  },
  methods: {},
  components: {},
  computed: {
    getItems() {
      var arr = this.items
      var arr2 = []

      arr2.push(...arr)
      arr2.push(...arr2)
      arr2.push(...arr2)
      return arr2
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

<style></style>
