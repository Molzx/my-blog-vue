<template>
  <ValidationObserver ref="form">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12">
            <ValidationProvider
              name="commentType"
              rules="required|oneOf:文章,文件"
              v-slot="{ errors }"
            >
              <v-overflow-btn
                v-model="formData.type"
                hint="评论类型"
                placeholder="评论类型"
                :items="typeItem"
                persistent-hint
                single-line
                dense
                flat
                disable-lookup
                background-color="#fafafa"
                menu-props="bottom, overflowY"
                :error-messages="errors[0]"
              >
              </v-overflow-btn>
            </ValidationProvider>
          </v-col>
          <v-col cols="6">
            <ValidationProvider
              name="commentOwnerId"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.ownerId"
                label="评论所属资源ID"
                :error-messages="errors[0]"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="6">
            <ValidationProvider
              name="commentParentId"
              rules=""
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.parentId"
                label="回复评论Id"
                :error-messages="errors[0]"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12">
            <ValidationProvider
              :mode="validateMode"
              name="comment"
              rules="required|max:180"
              v-slot="{ errors }"
            >
              <v-textarea
                v-model="formData.content"
                :disabled="addCommentLoading"
                solo
                placeholder="评论内容......"
                no-resize
                auto-grow
                rows="3"
                hint="评论内容"
                persistent-hint
                :error-messages="errors[0]"
              >
              </v-textarea>
            </ValidationProvider>
          </v-col>

          <v-col cols="6">
            <ValidationProvider
              name="commentStatus"
              rules="required|oneOf:启用,禁用"
              v-slot="{ errors }"
            >
              <v-overflow-btn
                v-model="formData.status"
                hint="评论状态"
                placeholder="评论状态"
                :items="statusItem"
                persistent-hint
                single-line
                dense
                flat
                disable-lookup
                background-color="#fafafa"
                menu-props="bottom, overflowY"
                :error-messages="errors[0]"
              >
              </v-overflow-btn>
            </ValidationProvider>
          </v-col>
          <v-col cols="6">
            <ValidationProvider
              name="commentSticky"
              rules="required|oneOf:置顶,不置顶"
              v-slot="{ errors }"
            >
              <v-overflow-btn
                v-model="formData.sticky"
                hint="置顶状态"
                placeholder="置顶状态"
                :items="stickyItem"
                persistent-hint
                single-line
                dense
                flat
                disable-lookup
                background-color="#fafafa"
                menu-props="bottom, overflowY"
                :error-messages="errors[0]"
              >
              </v-overflow-btn>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-container> </v-form
  ></ValidationObserver>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object
    },
    otherData: {
      type: Object
    }
  },
  data() {
    return {
      typeItem: [{ text: '文章' }, { text: '文件' }],
      stickyItem: [{ text: '置顶' }, { text: '不置顶' }],
      statusItem: [{ text: '启用' }, { text: '禁用' }],
      //是否可编辑
      isEditing: true,

      addCommentLoading: false
    }
  },
  watch: {
    //
  },
  methods: {
    setEditing(flag) {
      //
      this.isEditing = flag
    },
    validate() {
      let vm = this
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        console.log(success)
        vm.otherData.validateSuccess = true
        vm.updateParentData()
      })
    },
    reset() {
      this.$refs.form.reset()
    },
    updateParentData() {
      this.$emit('update:formData', this.formData)
      this.$emit('update:otherData', this.otherData)
    }
  },
  components: {}
}
</script>
