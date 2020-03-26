<template>
  <helper-dialog
    :show.sync="show"
    width="500"
    headerTitle="举报用户"
    headerColor="info"
    cardTextHeight="180"
    @cancel="cancel"
  >
    <template slot="content.card-text">
      <v-row justify="space-around">
        <ValidationObserver ref="form">
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <ValidationProvider
                    name="reportReason"
                    rules="required|max:150"
                    v-slot="{ errors }"
                  >
                    <v-textarea
                      v-model="formData.reason"
                      class="textarea-report"
                      :disabled="loading"
                      filled
                      placeholder="举报理由......"
                      no-resize
                      auto-grow
                      rows="3"
                      hint="举报理由"
                      persistent-hint
                      :error-messages="errors[0]"
                    >
                    </v-textarea>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container> </v-form
        ></ValidationObserver>
      </v-row>
    </template>
    <template slot="footer">
      <div class="d-flex justify-center align-center pb-3">
        <v-btn
          depressed
          color="info"
          class="delete-btn"
          @click="confirm"
          :loading="loading"
          :disabled="loading"
        >
          确认
        </v-btn>
      </div>
    </template>
  </helper-dialog>
</template>

<script>
// import { AwesomeHelp } from 'awesome-js'
import SensitiveSearch from '../../../../utils/sensitive-word/index'
// import testData from '@/assets/data/dictionaries/chinese_dictionary.txt'
import { mapGetters } from 'vuex'
export default {
  name: 'user-report',
  props: {
    //
  },
  data() {
    return {
      //
      show: false,
      loading: false,
      formData: {
        accusedUser: 0,
        reason: ''
      },
      search: '',
      changeFlag: false
      // ppath: require('../../../../assets/data/dictionaries/chinese_dictionary.txt')
    }
  },
  mounted() {
    //
    this.init()
  },
  methods: {
    //
    ...mapGetters({
      getUseUserId: 'getUseUserIdFun'
    }),
    confirm() {
      //
      this.validate()
    },
    cancel() {
      this.loading = false
      this.show = false
      //重设校验状态
      this.reset()
    },
    openDialog(accusedUser) {
      this.show = true
      this.formData.accusedUser = accusedUser
    },

    // readFile(filename) {
    //   var fso = new ActiveXObject('Scripting.FileSystemObject')
    //   var f = fso.OpenTextFile(filename, 1)
    //   var s = ''
    //   while (!f.AtEndOfStream) s += f.ReadLine() + '\n'
    //   f.Close()
    //   return s
    // },

    closeDialog() {
      this.loading = false
      this.show = false
      //重设校验状态
      this.reset()
      // 重置表单数据
      Object.assign(this.$data.formData, this.$options.data().formData)
    },
    validate() {
      let vm = this
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        vm.save()
      })
    },
    reset() {
      this.$refs.form.reset()
    },
    save() {
      this.loading = true
      // let vm = this
      setTimeout(() => {
        // vm.closeDialog()
      }, 10000)
      // setTimeout(() => {
      //   this.$api.report
      //     .toAddition(this.formData)
      //     .then(res => {
      //       let data = res.data.extend
      //       vm.$toast.success(data.data)
      //       //关闭
      //       vm.closeDialog()
      //     })
      //     .catch(() => {
      //       vm.loading = false
      //     })
      // }, 0)
    },
    init() {
      //
      // let filePath =
      //   '../../../../assets/data/dictionaries/chinese_dictionary.txt'
    }
  },
  computed: {
    //
  },
  watch: {
    //
    'formData.reason': {
      // eslint-disable-next-line no-unused-vars
      handler(newVal) {
        //替换敏感字
        // console.log(newVal)
        // console.log(this.changeFlag)
        if (this.changeFlag) {
          // console.log('in')
          this.changeFlag = false
          // console.log(this.changeFlag)
        } else {
          let changeContent = SensitiveSearch.search(newVal)
          // console.log('flag')
          // console.log(changeContent)
          if (changeContent && changeContent.indexOf('*') != -1) {
            this.$set(this.formData, 'reason', changeContent)
            // this.formData.reason = changeContent
            this.changeFlag = true
          }
        }
      },
      immediate: true
    }
  },
  components: {
    //
  }
}
</script>

<style lang="scss" scoped>
/*  */
.delete-btn {
  width: 200px !important;
  height: 40px !important;
}
.textarea-report
  .v-text-field
  > .v-input__control
  > .v-input__slot
  textarea:disabled {
  // background: green($color: #000000);
  background-color: NONE !important;
}
</style>
