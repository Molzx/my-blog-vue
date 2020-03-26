<template>
  <div>
    <v-sheet class="overflow-y-auto" max-height="700">
      <v-container style="">
        <v-row>
          <v-col>
            <page-system-chip-form
              :items.sync="items"
              :selections.sync="selections"
              :otherData.sync="otherData"
            ></page-system-chip-form>
          </v-col>
          <v-col>
            <template v-for="(item, i) in selections">
              <v-chip class="" :key="i" close @click:close="deleteItems(i)">
                {{ item[otherData.mainText] }}
              </v-chip>
            </template>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <page-system-list-item-form
              :items.sync="items"
              :selections.sync="selections"
              :otherData.sync="otherData"
            ></page-system-list-item-form>
          </v-col>
          <v-col>
            <v-list>
              <v-list-item-group active-class="border" color="indigo">
                <template v-for="(item, i) in selections">
                  <v-list-item
                    v-show="item.show"
                    :key="i"
                    :value="item[otherData.mainId]"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item[otherData.mainText]"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <!-- Something -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      //待显示的chip列表数据
      items: [],
      otherData: {
        ///======主要标识字段=========
        mainId: 'text',
        ///======主要显示字段=========
        mainText: 'text'
      },
      selections: []
    }
  },
  mounted() {
    //
    this.initItems()
  },
  methods: {
    //

    initItems() {
      let items = [
        {
          text: 'Nature',
          icon: 'mdi-nature'
        },
        {
          text: 'Nightlife',
          icon: 'mdi-glass-wine'
        },
        {
          text: 'November',
          icon: 'mdi-calendar-range'
        },
        {
          text: 'Portland',
          icon: 'mdi-map-marker'
        },
        {
          text: 'Biking',
          icon: 'mdi-bike'
        }
      ]
      for (let i = 0; i < 20; i++) {
        let item = {
          text: 'test' + i,
          icon: 'mdi-bike'
        }
        this.items.push(item)
      }
      this.items = this.items.concat(items)
      this.items.forEach(tem => {
        tem.show = true
      })
    },
    // eslint-disable-next-line no-unused-vars
    deleteItems(index) {
      //
      this.selections.splice(index, 1)
    }
  },
  computed: {
    //
  },
  watch: {
    //
    selections() {
      console.log(this.selections)
    }
  },
  components: {
    //
  }
}
</script>

<style>
/*  */
</style>
