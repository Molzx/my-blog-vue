<template>
  <div class="comment" :class="commentFlag ? '' : 'active'">
    <!-- Something -->
    <v-row class="justify-center" v-if="commentFlag">
      <p class="mb-0">来做第一个留言的人吧</p>
    </v-row>
    <v-container class="mt-2" v-else>
      <v-row class="comment-item">
        <v-col cols="12" md="auto" sm="auto">
          <v-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </v-col>
        <v-col>
          <v-col cols="12" class="comment-meta pa-0">
            <span class="comment-author">
              <span class="users">Jonhn</span>
              <span class="ml-2">
                <v-chip
                  label
                  x-small
                  class="green lighten-5"
                  text-color="green"
                  color="transparent"
                >
                  作者
                </v-chip>
              </span>
            </span>
          </v-col>
          <v-col cols="12" class="comment-content pa-0">
            <div class="comment-content-text">
              <p class="mb-0">
                Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
                sem. Sed in libero ut nibh placerat accumsan.. Curabitur blandit
                mollis lacus. Curabitur blandit mollis lacus.
              </p>
            </div>
            <div class="comment-footer">
              <time
                class="comment-meta-item timeago fs12 gray"
                datetime="2020-02-11T11:16:43+08:00"
                data-timeago="2020-2-11 11:16:43"
                itemprop="datePublished"
                data-tid="649"
                >3天前</time
              >
              <span class="ml-2"> <i class="far fa-thumbs-up"></i> 喜欢</span>
              <!-- <span class="dot"></span> -->
              <span class="ml-2"> <i class="far fa-thumbs-down"></i> 反对</span>
              <!-- <span class="dot"></span> -->
              <span class="ml-2"><i class="far fa-comment-dots">回复</i></span>
            </div>
            <!-- <v-alert prominent color="#f5f5f5" class="comment">
            </v-alert> -->
          </v-col>
          <v-container class="pa-0">
            <v-row v-for="i in [0, 1, 2]" :key="'k' + i">
              <v-col cols="12" md="auto" sm="auto" class="pb-0">
                <v-avatar size="36">
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-avatar>
              </v-col>
              <v-col class="pb-0">
                <v-col cols="12" class="comment-meta pa-0">
                  <span class="comment-author">
                    <span class="users">Jonhn</span>
                    <span class="comment_at">@</span>
                    <span class="users">Jonhn</span>
                    <span></span>
                  </span>
                </v-col>
                <v-col cols="12" class="comment-content pa-0">
                  <div class="comment-content-text">
                    <p class="mb-0">
                      Donec quam felis, ultricies nec, pellentesque eu, pretium
                      quis, sem.
                    </p>
                  </div>
                  <div class="comment-footer">
                    <time
                      class="comment-meta-item timeago fs12 gray"
                      datetime="2020-02-11T11:16:43+08:00"
                      data-timeago="2020-2-11 11:16:43"
                      itemprop="datePublished"
                      data-tid="649"
                      >3天前</time
                    >
                    <span class="ml-2">
                      <i class="far fa-thumbs-up"></i> 喜欢</span
                    >
                    <!-- <span class="dot"></span> -->
                    <span class="ml-2">
                      <i class="far fa-thumbs-down"></i> 反对</span
                    >
                    <!-- <span class="dot"></span> -->
                    <span class="ml-2"
                      ><i class="far fa-comment-dots">回复</i></span
                    >
                  </div>
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row class="comment-item" v-for="i in [0, 1, 2]" :key="i">
        <v-col cols="auto">
          <v-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </v-col>
        <v-col>
          <v-col cols="12" class="comment-meta pa-0">
            <span class="comment-author">
              <span class="users">Jonhn</span>
              <span></span>
            </span>
          </v-col>
          <v-col cols="12" class="comment-content pa-0">
            <div class="comment-content-text">
              <p class="mb-0">
                Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
                sem. Sed in libero ut nibh placerat accumsan.. Curabitur blandit
                mollis lacus. Curabitur blandit mollis lacus.
              </p>
            </div>
            <div class="comment-footer">
              <time
                class="comment-meta-item timeago fs12 gray"
                datetime="2020-02-11T11:16:43+08:00"
                data-timeago="2020-2-11 11:16:43"
                itemprop="datePublished"
                data-tid="649"
                >3天前</time
              >
              <span class="ml-2"> <i class="far fa-thumbs-up"></i> 喜欢</span>
              <!-- <span class="dot"></span> -->
              <span class="ml-2"> <i class="far fa-thumbs-down"></i> 反对</span>
              <!-- <span class="dot"></span> -->
              <span class="ml-2"><i class="far fa-comment-dots">回复</i></span>
            </div>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      commentFlag: false
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

<style lang="scss" scoped src="@styles/blog/social_icon2.scss"></style>
<style lang="scss" scoped>
/*  */
</style>
