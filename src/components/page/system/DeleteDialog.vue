<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-01-30 10:04:15
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-04 14:30:05
 * @FilePath     : \VueProjects\my-blog\src\components\page\DeleteDialog.vue
 * @Description  : 这是一些注释
 -->
<template>
  <v-dialog
    v-model="show"
    width="500"
    transition="scroll-x-transition"
    origin="center right"
  >
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        删除警告
      </v-card-title>

      <v-card-text>
        <v-row justify="space-around">
          <v-icon v-if="!loading" size="200" color="orange"
            >mdi-alert-circle-outline</v-icon
          >
          <v-progress-circular
            class="mt-6"
            v-else
            :size="150"
            :width="7"
            color="orange"
            indeterminate
          ></v-progress-circular>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancel">
          取消
        </v-btn>
        <v-btn color="primary" text @click="confirm">
          确认
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      show: false,
      loading: false,
      record: {}
    }
  },
  computed: {},
  watch: {
    //
  },
  methods: {
    getParentRefs() {
      let parent = this.$parent
      return parent
    },
    confirm() {
      //
      this.loading = true
      //
      this.getParentRefs().delete()
    },
    cancel() {
      this.show = false
    },
    openDialog(item) {
      this.show = true
      this.record = item
    },
    closeDialog() {
      this.loading = false
      this.show = false
    }
  },
  components: {}
}
</script>

<style></style>
