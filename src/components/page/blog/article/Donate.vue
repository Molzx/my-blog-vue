<template>
  <div>
    <v-card class="shadow-1 my-4" style="border-radius:12px">
      <v-card-text>
        <p class="text-center">喜欢这篇文章？打赏一下作者吧</p>
        <div class="d-flex justify-center">
          <!-- 打赏按钮 -->
          <div>
            <v-btn depressed color="primary">
              支付宝
            </v-btn>
            <v-btn depressed class="ml-2" color="success">
              微信
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'temp',
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

<style>
/*  */
</style>
