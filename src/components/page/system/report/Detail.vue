<template>
  <helper-dialog
    :show.sync="show"
    width="500"
    headerTitle="举报信息"
    headerColor="info"
    cardTextHeight="300"
    @cancel="cancel"
  >
    <template slot="content.card-text">
      <p class="font-weight-medium">
        举报人ID
        <span>：</span>
        {{ info.reporter }}
      </p>
      <p class="font-weight-medium">
        被举报人ID
        <span>：</span>
        {{ info.accusedUser }}
      </p>
      <p class="font-weight-medium">
        举报理由
        <span>：</span>
        {{ info.reason }}
      </p>
      <p class="font-weight-medium">
        处理状态
        <span>：</span>
        {{ info.handledStatus }}
      </p>
      <p class="font-weight-medium">
        记录状态
        <span>：</span>
        {{ info.status }}
      </p>
      <p class="font-weight-medium">
        创建时间
        <span>：</span>
        {{ info.createdTime }}
      </p>
      <p class="font-weight-medium">
        更新时间
        <span>：</span>
        {{ info.updatedTime }}
      </p>
    </template>
  </helper-dialog>
</template>

<script>
export default {
  data() {
    return {
      info: {
        reporter: '举报人ID',
        accusedUser: '被举报人ID',
        handledStatus: '处理状态',
        status: '记录状态',
        reason: '举报理由',
        createdTime: '创建时间',
        updatedTime: '更新时间'
      },
      show: false
    }
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    getParentRefs() {
      let parent = this.$parent.$parent
      return parent
    },
    goBack() {
      let parent = this.getParentRefs()
      parent.goPageList()
    },
    initMethod() {
      console.log('detail组件--')
      let parent = this.getParentRefs()
      let reportId = parent.getUseReportId()
      console.log(reportId)
      //打开对话框
      this.show = true
      this.getReportInfo(reportId)
    },
    getReportInfo(reportId) {
      let vm = this
      this.$api.report
        .toGetInfoById(reportId)
        .then(res => {
          let data = res.data.extend.data
          vm.info = data
          // vm.roleData.roles = vm.info.roles
        })
        .catch(() => {
          this.loading = false
        })
    },
    cancel() {
      this.show = false
    },
    openDialog() {
      this.initMethod()
    }
  },
  components: {}
}
</script>

<style></style>
