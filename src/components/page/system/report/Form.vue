<template>
  <ValidationObserver ref="form">
    <v-form>
      <v-container>
        <v-row no-gutters>
          <v-col cols="6" class="pr-2">
            <ValidationProvider
              name="reportReporter"
              rules="required|numeric"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.reporter"
                label="举报人ID"
                :error-messages="errors[0]"
                solo
                flat
                background-color="#F5F5F5"
                class="my-input"
                persistent-hint
                hint="举报人ID"
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="6" class="pl-2">
            <ValidationProvider
              name="reportAccusedUser"
              rules="required|numeric"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.accusedUser"
                label="被举报人ID"
                :error-messages="errors[0]"
                solo
                flat
                background-color="#F5F5F5"
                class="my-input"
                persistent-hint
                hint="被举报人ID"
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <!-- <v-col cols="12">
            <ValidationProvider
              name="reportReporter"
              rules="required|numeric"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.reporter"
                label="举报人ID"
                :error-messages="errors[0]"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12">
            <ValidationProvider
              name="reportAccusedUser"
              rules="required|numeric"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formData.accusedUser"
                label="被举报人ID"
                :error-messages="errors[0]"
                dense
                :disabled="!isEditing"
              ></v-text-field>
            </ValidationProvider>
          </v-col> -->
          <v-col cols="12">
            <ValidationProvider
              name="reportReason"
              rules="required|max:150"
              v-slot="{ errors }"
            >
              <v-textarea
                v-model="formData.reason"
                :disabled="!isEditing"
                :error-messages="errors[0]"
                :counter="150"
                label="举报理由"
                solo
                flat
                no-resize
                auto-grow
                rows="3"
                hint="评论内容"
                background-color="#F5F5F5"
                class="my-input"
                persistent-hint
              >
              </v-textarea>
            </ValidationProvider>
          </v-col>
          <v-col cols="12">
            <v-row align="center" class="px-3">
              <v-chip label color="blue lighten-5 blue--text" class="mr-2">
                处理状态
              </v-chip>
              <v-chip-group
                v-model="formData.handledStatus"
                mandatory
                active-class="blue lighten-5 light-blue--text"
              >
                <v-chip
                  :disabled="!isEditing"
                  v-for="item in handledStatusItem"
                  :key="item.text"
                  :value="item.text"
                  color=""
                >
                  {{ item.text }}
                </v-chip>
              </v-chip-group>
            </v-row>
            <!-- <ValidationProvider
              name="reportHandledStatus"
              rules="required|oneOf:待处理,处理中,已解决"
              v-slot="{ errors }"
            >
              <v-select
                v-model="formData.handledStatus"
                :items="handledStatusItem"
                menu-props="auto"
                :error-messages="errors[0]"
                label="举报信息处理状态"
                dense
                :disabled="!isEditing"
              ></v-select>
            </ValidationProvider> -->
          </v-col>
          <v-col cols="12">
            <v-row align="center" class="px-3">
              <v-chip label color="blue lighten-5 blue--text" class="mr-2">
                记录状态
              </v-chip>
              <v-chip-group
                v-model="formData.status"
                mandatory
                active-class="blue lighten-5 light-blue--text"
              >
                <v-chip
                  :disabled="!isEditing"
                  v-for="item in statusItem"
                  :key="item.text"
                  :value="item.text"
                  color=""
                >
                  {{ item.text }}
                </v-chip>
              </v-chip-group>
            </v-row>
            <!-- <ValidationProvider
              name="reportStatus"
              rules="required|oneOf:启用,禁用"
              v-slot="{ errors }"
            >
              <v-select
                v-model="formData.status"
                :items="statusItem"
                menu-props="auto"
                :error-messages="errors[0]"
                label="举报信息记录状态"
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
      handledStatusItem: [
        { text: '待处理' },
        { text: '处理中' },
        { text: '已解决' }
      ],
      statusItem: [{ text: '启用' }, { text: '禁用' }],
      //是否可编辑
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
