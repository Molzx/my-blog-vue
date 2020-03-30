<template>
  <ValidationObserver ref="form">
    <v-form>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <ValidationProvider
              name="announcementTitle"
              rules="required|max:30"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.title"
                :counter="30"
                label="公告标题"
                :error-messages="errors[0]"
                solo
                flat
                background-color="#F5F5F5"
                class="my-input"
                persistent-hint
                hint="公告标题"
                :disabled="!isEditing"
              >
                <template v-slot:prepend> </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12">
            <ValidationProvider
              name="announcementContent"
              rules="required|max:150"
              v-slot="{ errors }"
            >
              <v-textarea
                v-model="formData.content"
                :counter="150"
                solo
                flat
                label="公告内容......"
                no-resize
                auto-grow
                rows="3"
                hint="公告内容"
                background-color="#F5F5F5"
                class="my-input"
                persistent-hint
                :error-messages="errors[0]"
                :disabled="!isEditing"
              >
              </v-textarea>
            </ValidationProvider>
          </v-col>

          <!-- <v-col cols="12">
            <v-chip-group
              v-model="uploadSelection"
              active-class="light-blue--text text--accent-4"
              mandatory
            >
              <v-chip label>上传文件</v-chip>
              <v-chip label>网络地址</v-chip>
            </v-chip-group>
          </v-col> -->
          <v-col cols="12">
            <v-row dense>
              <v-col>
                <ValidationProvider
                  name="announcementFile"
                  :rules="
                    uploadSelection == 0 ? 'required|image|size:12048' : ''
                  "
                  v-slot="{ errors, validate }"
                >
                  <v-file-input
                    v-model="otherData.file"
                    accept="image/png, image/jpeg, image/bmp"
                    prepend-icon="far fa-image"
                    show-size
                    :error-messages="errors[0]"
                    label="上传封面图片"
                    solo
                    flat
                    background-color="#F5F5F5"
                    class="my-input"
                    persistent-hint
                    hint="公告封面图片"
                    @change="validate"
                    :disabled="!isEditing || uploadSelection == 1"
                  ></v-file-input>
                </ValidationProvider>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  icon
                  class="mt-2"
                  @click="uploadSelection = 0"
                  style="background-color:#fafafa;"
                >
                  <v-icon
                    size="18"
                    :color="uploadSelection == 0 ? 'blue' : 'icon-color'"
                    >fas fa-upload</v-icon
                  >
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row dense>
              <v-col>
                <ValidationProvider
                  name="announcementUrl"
                  :rules="uploadSelection == 1 ? 'required' : ''"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="formData.url"
                    label="填写在线URL地址"
                    solo
                    flat
                    background-color="#F5F5F5"
                    class="my-input"
                    persistent-hint
                    hint="公告封面图片"
                    prepend-icon="far fa-image"
                    :error-messages="errors[0]"
                    :disabled="!isEditing || uploadSelection == 0"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  icon
                  class="mt-2"
                  @click="uploadSelection = 1"
                  style="background-color:#fafafa;"
                >
                  <v-icon
                    size="18"
                    :color="uploadSelection == 1 ? 'blue' : 'icon-color'"
                    >fas fa-link</v-icon
                  >
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-chip-group
              v-model="formData.status"
              mandatory
              active-class="blue lighten-5 light-blue--text"
            >
              <v-chip
                :disabled="!isEditing"
                label
                v-for="item in statusItem"
                :key="item.text"
                :value="item.text"
                color=""
              >
                {{ item.text }}公告
              </v-chip>
            </v-chip-group>
            <!-- <ValidationProvider
              name="announcementStatus"
              rules="required|oneOf:启用,禁用"
              v-slot="{ errors }"
            >
              <v-select
                v-model="formData.status"
                :items="statusItem"
                menu-props="auto"
                :error-messages="errors[0]"
                label="公告状态"
                dense
                :disabled="!isEditing"
              ></v-select>
            </ValidationProvider> -->
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
      statusItem: [{ text: '启用' }, { text: '禁用' }],
      //是否可编辑
      isEditing: true,
      //单选，选中上传文件，或者填写封面地址
      uploadSelection: 0
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
