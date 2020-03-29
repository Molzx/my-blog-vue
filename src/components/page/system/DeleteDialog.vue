<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-01-30 10:04:15
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-29 18:07:23
 * @FilePath     : \VueProjects\my-blog\src\components\page\system\DeleteDialog.vue
 * @Description  : 这是一些注释
 -->
<template>
  <helper-dialog
    :show.sync="show"
    width="500"
    headerTitle="删除警告"
    headerColor="error"
    :limitCardTextHeight="false"
    @cancel="cancel"
  >
    <template slot="content.card-text">
      <!--  -->
      <v-row align="center" justify="center" v-if="!loading">
        <v-col cols="12" justify="space-around">
          <v-img :src="warnBg" height="160" contain></v-img>
        </v-col>
        <v-col cols="12" class="py-0">
          <p class="text-center mt-2" style="color:#99a4b0;">
            确定删除此记录吗？
          </p>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" v-else>
        <v-progress-circular
          class="mt-6"
          :size="150"
          :width="7"
          color="orange"
          indeterminate
        ></v-progress-circular>
      </v-row>
    </template>
    <template slot="footer">
      <!--  -->
      <v-divider></v-divider>

      <v-card-actions class="d-flex justify-center">
        <v-btn
          color="red-lighten-5 red--text"
          depressed
          @click="confirm"
          style="width:150px;"
        >
          确认
        </v-btn>
      </v-card-actions>
    </template>
  </helper-dialog>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      show: false,
      loading: false,
      record: {},

      warnBg: require('@/assets/images/warn/warn.svg')
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
