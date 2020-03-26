<template>
  <ValidationObserver ref="form">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <ValidationProvider
              name="roleCode"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.code"
                label="角色代码"
                :error-messages="errors[0]"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12" md="4">
            <ValidationProvider
              name="roleName"
              rules="required|max:10"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.name"
                :counter="10"
                label="角色名称"
                :error-messages="errors[0]"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              name="roleStatus"
              rules="required|oneOf:启用,禁用"
              v-slot="{ errors }"
            >
              <v-select
                v-model="formData.status"
                :items="statusItem"
                menu-props="auto"
                :error-messages="errors[0]"
                label="角色状态"
                dense
                :disabled="!isEditing"
              ></v-select>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <ValidationProvider
              name="roleDescription"
              rules="required|max:50"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.description"
                :counter="50"
                label="角色描述"
                :error-messages="errors[0]"
                dense
                :disabled="!isEditing"
              ></v-text-field>
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
      statusItem: [{ text: '启用' }, { text: '禁用' }],
      isEditing: true
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
