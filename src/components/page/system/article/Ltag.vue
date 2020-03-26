<template>
  <v-card class="mx-auto" max-width="500">
    <v-toolbar flat color="transparent">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Photo Info</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$refs.search.focus()">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container class="py-0">
      <v-row align="center" justify="start">
        <!-- <v-col
          v-for="(selection, i) in selections"
          :key="selection[mainId]"
          class="shrink"
        >
          <v-chip
            :disabled="loading"
            close
            @click:close="selected.splice(i, 1)"
          >
            <v-icon left v-text="selection.icon"></v-icon>
            {{ selection[mainText] }}
          </v-chip>
        </v-col> -->
        <v-col v-if="!allSelected" cols="12">
          <v-text-field
            ref="search"
            v-model="search"
            full-width
            hide-details
            label="Search"
            single-line
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-divider v-if="!allSelected"></v-divider>
    <!-- <v-sheet
      id="scrolling-techniques-2"
      class="overflow-y-auto"
      max-height="200"
    >
      <v-container style="">
        <template v-for="(item, i) in categories">
          <v-chip
            class="ma-2"
            v-if="!selected.includes(item[mainId])"
            :key="item[mainId]"
            :disabled="loading"
            @click="selected.push(item[mainId])"
          >
            <v-icon left v-text="item.icon"></v-icon>
            {{ i + ':' + item[mainText] }}
          </v-chip>
        </template>
      </v-container>
    </v-sheet> -->
    <!-- <v-list>
      <template v-for="(item, i) in categories">
        <v-list-item
          v-if="!selected.includes(i)"
          :key="i"
          :disabled="loading"
          @click="selected.push(i)"
        >
          <v-list-item-avatar>
            <v-icon :disabled="loading" v-text="item.icon"></v-icon>
          </v-list-item-avatar>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </template>
    </v-list> -->

    <v-divider></v-divider>
    <v-chip-group v-model="amenities" column multiple>
      <template v-for="(item, i) in itemList">
        <v-chip
          filter
          outlined
          class="ma-2"
          :value="item[mainId]"
          v-show="item.show"
          :key="item[mainId] + i"
          >{{ item.text }}</v-chip
        >
      </template>
      <!-- <v-chip filter outlined>Washer / Dryer</v-chip>
        <v-chip filter outlined>Fireplace</v-chip>
        <v-chip filter outlined>Wheelchair access</v-chip>
        <v-chip filter outlined>Dogs ok</v-chip>
        <v-chip filter outlined>Cats ok</v-chip> -->
    </v-chip-group>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!selected.length"
        :loading="loading"
        color="purple"
        text
        @click="next"
        >Next</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'temp',
  data() {
    return {
      //

      items: [],
      loading: false,
      search: '',
      selected: [],
      amenities: [],
      ///======主要标识字段=========
      mainId: 'text',
      ///======主要显示字段=========
      mainText: 'text'
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
    showChip(item) {
      // let flag=!this.selected.includes(item[this.mainId])
      if (this.search) {
        console.log(this.categories)
        var result = this.categories.some(temp => {
          if (temp[this.mainId] == item[this.mainId]) {
            return true
          }
        })
        return result

        // for (let temp of this.categories) {
        //   // console.log(temp)
        //   if (temp[this.mainId] === item[this.mainId]) {
        //     return true
        //   } else {
        //     return false
        //   }
        // }
      } else {
        return true
      }
    },
    next() {
      this.loading = true

      setTimeout(() => {
        this.search = ''
        this.selected = []
        this.loading = false
      }, 2000)
    }
  },
  computed: {
    allSelected() {
      return this.selected.length === this.items.length
    },
    categories() {
      const search = this.search.toLowerCase()

      if (!search) return this.items

      return this.items.filter(item => {
        const text = item[this.mainText].toLowerCase()

        return text.indexOf(search) > -1
      })
    },
    selections() {
      const selections = []
      for (const selection of this.selected) {
        let index = this.items.findIndex(
          item => item[this.mainId] === selection
        )
        selections.push(this.items[index])
      }

      return selections
    },

    itemList() {
      const search = this.search.toLowerCase()

      if (search) {
        this.items.forEach(tem => {
          const text = tem[this.mainText].toLowerCase()
          if (text.indexOf(search) > -1) {
            tem.show = true
          } else {
            tem.show = false
          }
        })
      } else {
        this.items.forEach(tem => {
          tem.show = true
        })
      }

      return this.items
    }
  },

  watch: {
    selected() {
      // this.search = ''
    },
    amenities() {
      console.log(this.amenities)
      this.amenities.forEach(item => {
        this.selected.push(item[this.mainId])
      })
      // for (let item in this.amenities) {
      //   this.selected.push(item[this.mainId])
      // }
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
