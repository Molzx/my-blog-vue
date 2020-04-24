<template>
  <ValidationObserver ref="form">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <ValidationProvider
              name="pName"
              rules="required|max:10"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.name"
                :counter="10"
                label="权限名称"
                :error-messages="errors[0]"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              name="pUrl"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.url"
                label="接口Url"
                :error-messages="errors[0]"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              name="pPath"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.path"
                label="接口路径"
                :error-messages="errors[0]"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8">
            <v-row align="center">
              <v-chip outlined label class="mr-2">
                请求类型
              </v-chip>
              <v-chip-group
                v-model="type"
                column
                multiple
                mandatory
                active-class="primary--text"
                @change="changeType"
              >
                <v-chip filter outlined value="*" @click="changeAllType">
                  任意类型
                </v-chip>
                <v-chip
                  v-for="type in types"
                  :key="type"
                  filter
                  outlined
                  :value="type"
                >
                  {{ type }}
                </v-chip>
              </v-chip-group>
              <!-- <ValidationProvider
              name="pType"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.type"
                label="接口类型"
                :error-messages="errors[0]"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider> -->
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              name="pStatus"
              rules="required|oneOf:启用,禁用"
              v-slot="{ errors }"
            >
              <v-select
                v-model="formData.status"
                :items="statusItem"
                menu-props="auto"
                :error-messages="errors[0]"
                label="权限状态"
                dense
                :disabled="!isEditing"
              ></v-select>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <ValidationProvider
              name="pDescription"
              rules="required|max:50"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.description"
                :counter="50"
                label="权限描述"
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
      isEditing: true,
      //请求类型
      selectTypeAll: true,
      type: [],
      types: ['GET', 'POST', 'PUT', 'DELETE']
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
    changeAllType() {
      let index = this.type.indexOf('*')
      if (index != -1) {
        console.log('hh')
        this.formData.type = '*'
        this.type = []
        this.selectTypeAll = true
      }
    },
    changeType(newVal) {
      // console.log(newVal)
      if (newVal.length != 0) {
        // console.log(this.selectTypeAll)
        let index = this.type.indexOf('*')
        //当选中全部并且选中的项数不为1时，即不是只有一项*，就是在选中*项的基础上，再选其它项
        if (this.selectTypeAll && newVal.length != 1) {
          //取消选中全部
          this.selectTypeAll = false
          //删除数组中的选中项
          this.type.splice(index, 1)
        }
        this.formData.type = newVal.join('|')
        //如果重新选中全部
        if (!this.selectTypeAll && index != -1 && index != 0) {
          this.formData.type = '*'
          this.type = []
          this.selectTypeAll = true
        }
      } else {
        this.selectTypeAll = true
      }
      console.log(this.formData.type)
    },
    updateParentData() {
      this.$emit('update:formData', this.formData)
      this.$emit('update:otherData', this.otherData)
    }
  },
  components: {}
}
</script>
