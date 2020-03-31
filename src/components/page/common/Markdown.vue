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
        @click="uploadBatchImg"
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
      mdFile: [],
      isUploadBatch: true,
      img_file: {},
      //存储上传失败的文件在数组中的index
      errorIndex: []
    }
  },
  mounted() {
    //
  },
  methods: {
    //
    addMdFile() {
      //加载本地md文件到编辑器中
      let fileReader
      let vm = this
      if (this.mdFile) {
        fileReader = new FileReader()
        fileReader.readAsText(this.mdFile)
        fileReader.onload = function() {
          vm.formData.mdContent = fileReader.result
          vm.mdFile = ''
          // console.log(fileReader.result)
        }
      }
    },
    // 将图片上传到服务器，返回地址替换到md中
    // eslint-disable-next-line no-unused-vars
    $imgAdd(pos, $file) {
      if (this.isUploadBatch) {
        //批量图片上传,
        // 缓存图片信息
        this.img_file[pos] = $file
      } else {
        // 单张图片上传
        // let formdata = new FormData()
        // this.$upload
        //   .post('/上传接口地址', formdata)
        //   .then(res => {
        //     console.log(res.data)
        //     this.$refs.mdEditor.$img2Url(pos, res.data)
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
      }
    },
    uploadBatchImg() {
      // 第一步.将图片上传到服务器.
      var formData = new FormData()
      // let fileArr = JSON.parse(JSON.stringify(this.img_file))

      // let arr = [2, 3, 5, 7]
      // let arr2 = [3, 5]
      // for (let index of errorIndex) {
      //   fileArr.splice(index, 1);//结果arr=['a','c','d']（下标1开始，删除1个）
      // }
      for (var index in this.img_file) {
        formData.append('images', this.img_file[index])
      }
      // formData.forEach((value, key) => {
      //   console.log('key %s: value %s', key, value)
      // })
      //
      let vm = this
      setTimeout(() => {
        this.$api.file
          .toUploadBatchImg(formData)
          .then(res => {
            let data = res.data.extend.data

            /**
             * 例如：返回数据为 res = [[pos, url], [pos, url]...]
             * pos 为原图片标志（0）
             * url 为上传后图片的url地址
             */
            // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
            let errMsg = '上传失败的图片有：第'
            data.forEach((url, index) => {
              if (url == 'error') {
                errMsg = errMsg + index + '，'
                this.errorIndex.push(index)
              } else {
                this.$refs.mdEditor.$img2Url(index, url)
              }
            })
            if (this.errorIndex.length > 0) {
              vm.$toast.info(errMsg + '张', true)
            } else {
              vm.$toast.success('上传成功')
            }
          })
          .catch(() => {
            //
          })
      }, 0)
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
