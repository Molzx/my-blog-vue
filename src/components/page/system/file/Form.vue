<template>
  <ValidationObserver ref="form">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12">
            <ValidationProvider
              name="fileCategory"
              rules="required|oneOf:未定义,头像,封面,文章图片,共享文件,其他文件"
              v-slot="{ errors }"
            >
              <v-select
                v-model="formData.category"
                :items="fileCategoryItem"
                menu-props="auto"
                :error-messages="errors[0]"
                label="文件类型"
                dense
                :disabled="!isEditing"
              ></v-select>
            </ValidationProvider>
          </v-col>
          <v-col cols="12">
            <ValidationProvider
              name="fileName"
              rules="required|max:50"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.name"
                :counter="50"
                label="文件名称"
                :error-messages="errors[0]"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12">
            <ValidationProvider
              name="fileDescription"
              rules="required|max:50"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.description"
                :counter="50"
                label="文件描述"
                :error-messages="errors[0]"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider> </v-col
          ><v-col cols="12" v-if="!isUpdateType">
            <ValidationProvider
              name="file"
              rules=""
              v-slot="{ errors, validate }"
            >
              <v-file-input
                v-model="otherData.file"
                placeholder="上传文件"
                prepend-icon="mdi-file"
                show-size
                :error-messages="errors[0]"
                label="文件"
                @change="validate"
                dense
                :disabled="!isEditing"
              ></v-file-input>
            </ValidationProvider>
          </v-col>
          <v-col cols="12">
            <ValidationProvider
              name="fileStatus"
              rules="required|oneOf:启用,禁用"
              v-slot="{ errors }"
            >
              <v-select
                v-model="formData.status"
                :items="statusItem"
                menu-props="auto"
                :error-messages="errors[0]"
                label="文件状态"
                dense
                :disabled="!isEditing"
              ></v-select>
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
      fileCategoryItem: [
        { text: '未定义' },
        { text: '头像' },
        { text: '封面' },
        { text: '文章图片' },
        { text: '共享文件' },
        { text: '其他文件' }
      ],
      statusItem: [{ text: '启用' }, { text: '禁用' }],
      //是否可编辑
      isEditing: true,
      //是否为更新数据，如果是则隐藏上传文件框
      isUpdateType: false
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
    setUpdateType() {
      this.isUpdateType = true
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
