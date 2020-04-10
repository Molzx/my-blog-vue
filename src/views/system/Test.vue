<!--
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 21:52:07
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-04-10 14:20:14
 * @FilePath     : \VueProjects\my-blog\src\views\system\Test.vue
 * @Description  : 这是一些注释
 -->
<template>
  <div class="content">
    <material-card color="green">
      <div slot="header">
        <div class="title font-weight-light mb-2">测试标题信息</div>
        <div class="category font-weight-thin">
          副标题
        </div>
      </div>
      <v-btn depressed @click="add">tianjia</v-btn>
    </material-card>

    <div class="gear"></div>
  </div>
</template>

<script>
//导入url解密获取
// import { GetQueryParamOfObjEntry } from '@/utils/secretUrl'
export default {
  name: 'my-text',
  data() {
    return {
      pageParams: {
        p: 1,
        search: 'nihao'
      }
    }
  },
  created() {
    console.log('in')
    let obj = this.$global.GetQueryParamOfObjEntry()
    for (let key in obj) {
      console.log(key)
      console.log(obj[key])
    }
  },
  methods: {
    add() {
      console.log('in')
      this.pageParams.p++
      this.$router.replace(
        { path: this.$route.path, query: this.pageParams },
        // eslint-disable-next-line no-unused-vars
        onComplete => {},
        // eslint-disable-next-line no-unused-vars
        onAbort => {}
      )
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped src="@styles/blog/loading_gear.scss"></style>
<style></style>
