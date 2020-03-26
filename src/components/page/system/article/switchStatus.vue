<template>
  <div>
    <!-- Something -->
    <!-- <v-row>
              <v-col cols="auto" md="auto">
                <ValidationProvider
                  name="article_admiration_status"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-switch
                    v-model="formData.admirationStatus"
                    inset
                    false-value="关闭"
                    true-value="开启"
                    :label="`已${formData.admirationStatus}赞赏功能`"
                    :error-messages="errors[0]"
                  ></v-switch>
                </ValidationProvider>
              </v-col>
              <v-col cols="auto" md="auto">
                <ValidationProvider
                  name="article_copyright_status"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-switch
                    v-model="formData.copyrightStatus"
                    inset
                    false-value="关闭"
                    true-value="开启"
                    :label="`已${formData.copyrightStatus}版权声明`"
                    :error-messages="errors[0]"
                  ></v-switch>
                </ValidationProvider>
              </v-col>
              <v-col cols="auto" md="auto">
                <ValidationProvider
                  name="article_reprint_status"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-switch
                    v-model="formData.reprintStatus"
                    inset
                    false-value="关闭"
                    true-value="开启"
                    :label="`已${formData.reprintStatus}转载声明`"
                    :error-messages="errors[0]"
                  ></v-switch>
                </ValidationProvider>
              </v-col>
              <v-col cols="auto" md="auto">
                <ValidationProvider
                  name="article_comment_status"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-switch
                    v-model="formData.commentStatus"
                    inset
                    false-value="关闭"
                    true-value="开启"
                    :label="`已${formData.commentStatus}评论功能`"
                    :error-messages="errors[0]"
                  ></v-switch>
                </ValidationProvider>
              </v-col>
              <v-col cols="auto" md="auto">
                <ValidationProvider
                  name="article_recommend_status"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-switch
                    v-model="formData.recommendStatus"
                    inset
                    false-value="不推荐"
                    true-value="推荐"
                    :label="`${formData.recommendStatus}文章`"
                    :error-messages="errors[0]"
                  ></v-switch>
                </ValidationProvider>
              </v-col>
              <v-col cols="auto" md="auto">
                <ValidationProvider
                  name="article_status"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-switch
                    v-model="formData.status"
                    inset
                    false-value="禁用"
                    true-value="启用"
                    :label="`${formData.status}文章`"
                    :error-messages="errors[0]"
                  ></v-switch>
                </ValidationProvider>
              </v-col>
            </v-row> -->
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
