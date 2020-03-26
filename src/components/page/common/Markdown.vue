<template>
  <!-- Something -->
  <mavon-editor
    v-model="formData.mdContent"
    ref="mdEditor"
    :autofocus="mdData.autofocus"
    :subfield="mdData.subfield"
    :toolbarsFlag="mdData.toolbarsFlag"
    :boxShadow="mdData.boxShadow"
    @imgAdd="$imgAdd"
    @change="change"
  />
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      // required: true,
      default: () => {
        return {
          //文章内容
          content: '',
          //文章md格式内容
          mdContent: ''
        }
      }
    },
    mdData: {
      type: Object,
      // required: true,
      default: () => {
        return {
          autofocus: true,
          subfield: true,
          toolbarsFlag: true,
          boxShadow: false
        }
      }
    },
    otherData: {
      type: Object,
      // required: true,
      default: () => {
        return {
          //
        }
      }
    }
  },
  data() {
    return {
      //
      // mdContent: '',
      // html: ''
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    // 将图片上传到服务器，返回地址替换到md中
    // eslint-disable-next-line no-unused-vars
    $imgAdd(pos, $file) {
      let formdata = new FormData()

      this.$upload
        .post('/上传接口地址', formdata)
        .then(res => {
          console.log(res.data)
          this.$refs.mdEditor.$img2Url(pos, res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.formData.content = render
    },
    // 提交
    submit() {
      // console.log(this.formData.mdContent)
      // console.log(this.formData.content)
      this.$emit('update:formData', this.formData)
      // this.$message.success('提交成功，已打印至控制台！')
    }
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

<style scoped>
/* .v-note-wrapper {
  min-height: 72px !important;
  min-width: 280px !important;
} */
</style>
