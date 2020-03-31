<template>
  <ValidationObserver ref="form">
    <v-form>
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-row class="align-center">
              文章类型：
              <v-chip-group
                v-model="formData.type"
                active-class="blue--text"
                mandatory
              >
                <v-chip
                  v-for="item in typeItem"
                  :key="item.text"
                  :value="item.text"
                >
                  {{ item.text }}
                </v-chip>
              </v-chip-group>
            </v-row>
            <!-- <ValidationProvider
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
                solo
                flat
                background-color="#F5F5F5"
                class="my-input"
                disable-lookup
                menu-props="bottom, overflowY"
                :error-messages="errors[0]"
              >
              </v-overflow-btn>
            </ValidationProvider> -->
          </v-col>
          <v-col cols="6">
            <ValidationProvider
              name="commentOwnerId"
              rules="required|numeric"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.ownerId"
                label="评论所属资源ID"
                :error-messages="errors[0]"
                solo
                flat
                background-color="#F5F5F5"
                class="my-input"
                persistent-hint
                hint="评论所属资源ID"
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="6">
            <ValidationProvider
              name="commentParentId"
              rules="numeric"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.parentId"
                label="回复评论Id"
                :error-messages="errors[0]"
                solo
                flat
                background-color="#F5F5F5"
                class="my-input"
                persistent-hint
                hint="回复评论Id"
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12">
            <ValidationProvider
              name="comment"
              rules="required|max:180"
              v-slot="{ errors }"
            >
              <v-textarea
                v-model="formData.content"
                :disabled="addCommentLoading"
                solo
                flat
                label="评论内容......"
                no-resize
                auto-grow
                rows="3"
                hint="评论内容"
                background-color="#F5F5F5"
                class="my-input"
                persistent-hint
                :error-messages="errors[0]"
              >
              </v-textarea>
            </ValidationProvider>
          </v-col>

          <v-col cols="auto" class="pl-3">
            <ValidationProvider
              name="commentStatus"
              rules="required|oneOf:启用,禁用"
              v-slot="{ errors }"
            >
              <v-switch
                v-model="formData.status"
                inset
                dense
                hint="评论状态"
                persistent-hint
                color="green"
                :label="`${formData.status}`"
                :true-value="statusItem[0].text"
                :false-value="statusItem[1].text"
                :error-messages="errors[0]"
              >
              </v-switch>
              <!-- <v-overflow-btn
                v-model="formData.status"
                hint="评论状态"
                placeholder="评论状态"
                :items="statusItem"
                persistent-hint
                single-line
                dense
                flat
                solo
                background-color="#F5F5F5"
                class="my-input"
                disable-lookup
                menu-props="bottom, overflowY"
                :error-messages="errors[0]"
              >
              </v-overflow-btn> -->
            </ValidationProvider>
          </v-col>
          <v-col cols="auto" class="ml-6">
            <ValidationProvider
              name="commentSticky"
              rules="required|oneOf:置顶,不置顶"
              v-slot="{ errors }"
            >
              <v-switch
                v-model="formData.sticky"
                inset
                dense
                hint="置顶状态"
                persistent-hint
                color="blue"
                :label="`${formData.sticky}`"
                :true-value="stickyItem[0].text"
                :false-value="stickyItem[1].text"
                :error-messages="errors[0]"
              >
              </v-switch>
              <!-- <v-overflow-btn
                v-model="formData.sticky"
                hint="置顶状态"
                placeholder="置顶状态"
                :items="stickyItem"
                persistent-hint
                single-line
                dense
                flat
                solo
                background-color="#F5F5F5"
                class="my-input"
                disable-lookup
                menu-props="bottom, overflowY"
                :error-messages="errors[0]"
              >
              </v-overflow-btn> -->
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </ValidationObserver>
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
