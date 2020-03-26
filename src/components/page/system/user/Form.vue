<template>
  <ValidationObserver ref="form">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <ValidationProvider
              name="account"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.userName"
                label="帐号"
                :error-messages="errors[0]"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12" md="4">
            <ValidationProvider
              name="nickName"
              rules="required|max:10|nickName"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.nickName"
                :counter="10"
                label="昵称"
                :error-messages="errors[0]"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12" md="4">
            <v-slider
              v-model="formData.age"
              color="green"
              label="年龄"
              min="10"
              max="60"
              thumb-label
              dense
              :disabled="!isEditing"
            ></v-slider>
            <!-- <v-text-field
              v-model="form.age"
              label="年龄"
              required
            ></v-text-field> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <ValidationProvider
              name="password"
              :rules="passwordRule"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.password"
                :counter="16"
                :error-messages="errors[0]"
                label="密码"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12" md="4">
            <ValidationProvider
              name="repassword"
              :rules="repasswordRule"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="repassword"
                :counter="16"
                :error-messages="errors[0]"
                label="重复密码"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12" md="4">
            <ValidationProvider
              name="gender"
              rules="required|oneOf:男生,女生,保密"
              v-slot="{ errors }"
            >
              <v-select
                v-model="formData.gender"
                :items="genderItem"
                menu-props="auto"
                :error-messages="errors[0]"
                label="性别"
                dense
                :disabled="!isEditing"
              ></v-select>
            </ValidationProvider>
            <!-- <v-text-field v-model="gender" label="性别" required></v-text-field> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <ValidationProvider
              name="autograph"
              rules="max:60"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.autograph"
                :counter="60"
                :error-messages="errors[0]"
                label="个性签名"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12" md="4">
            <ValidationProvider
              name="phone"
              rules="required|phone"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.phone"
                :counter="11"
                :error-messages="errors[0]"
                label="手机号码"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12" md="4">
            <ValidationProvider
              name="email"
              rules="required|email"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.email"
                :error-messages="errors[0]"
                label="邮箱帐号"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <ValidationProvider
              name="state"
              rules="required|oneOf:正常,禁言,冻结"
              v-slot="{ errors }"
            >
              <v-select
                v-model="formData.state"
                :items="stateItem"
                menu-props="auto"
                :error-messages="errors[0]"
                label="用户状态"
                dense
                :disabled="!isEditing"
              ></v-select>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              name="status"
              rules="required|oneOf:启用,禁用"
              v-slot="{ errors }"
            >
              <v-select
                v-model="formData.status"
                :items="statusItem"
                menu-props="auto"
                :error-messages="errors[0]"
                label="帐号状态"
                dense
                :disabled="!isEditing"
              ></v-select>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider
              name="avatar"
              rules="image|size:2048"
              v-slot="{ errors, validate }"
            >
              <v-file-input
                v-model="otherData.file"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="上传头像照片"
                prepend-icon="mdi-camera"
                show-size
                :error-messages="errors[0]"
                label="Avatar"
                @change="validate"
                dense
                :disabled="!isEditing"
              ></v-file-input>
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
      passwordRule: 'required|max:16',
      repasswordRule: 'required|max:16|confirmed:password',
      repassword: '',
      genderItem: [{ text: '男生' }, { text: '女生' }, { text: '保密' }],
      stateItem: [{ text: '正常' }, { text: '禁言' }, { text: '冻结' }],
      statusItem: [{ text: '启用' }, { text: '禁用' }],
      isEditing: true
    }
  },
  watch: {
    //
  },
  methods: {
    setEditing(flag) {
      this.passwordRule = 'max:16'
      this.repasswordRule = 'max:16|confirmed:password'
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

<style></style>
