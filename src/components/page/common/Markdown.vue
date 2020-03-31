<template>
  <!-- Something -->
  <div>
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
    <v-row align="center" justify="start" class="mx-0 py-3">
      <v-btn
        class="mr-4 ml-1"
        depressed
        color="blue lighten-5 blue--text"
        @click="uploadAllImg"
      >
        <!-- <v-icon left>iconfont icon-plus-circle</v-icon> -->
        上传所有图片
      </v-btn>
      <v-file-input
        v-model="mdFile"
        show-size
        hide-details
        prepend-icon="iconfont icon-file-plus-alt"
        solo
        flat
        label="加载本地md文件到编辑器"
        background-color="#F5F5F5"
        class="my-input"
        style="max-width:320px;"
        @change="addMdFile"
      >
      </v-file-input>
    </v-row>
  </div>
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
      // html: '',
      mdFile: []
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    addMdFile() {
      //
      let fileReader
      let vm = this
      if (this.mdFile) {
        fileReader = new FileReader()
        fileReader.readAsText(this.mdFile)
        fileReader.onload = function() {
          vm.formData.mdContent = fileReader.result
          // console.log(fileReader.result)
        }
      }
    },
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

<style lang="scss" scoped>
.v-note-wrapper {
  border: none;
  z-index: 800 !important;
}
/deep/ .v-note-wrapper {
  height: 400px !important;
  // min-width: 280px !important;
  &.fullscreen {
    height: 100vh !important;
    z-index: 802 !important;
  }
}
/deep/ .markdown-body {
  color: #4f4f4f;
  h1,
  h2,
  h3,
  h4,
  h5 {
    color: #4d4d4d;
  }
  code {
    font-size: 90%;
  }
  .hljs code {
    font-size: 100%;
  }
}
</style>
