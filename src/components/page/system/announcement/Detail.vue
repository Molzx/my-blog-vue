<template>
  <helper-dialog
    :show.sync="show"
    width="500"
    headerTitle="公告信息"
    headerColor="info"
    cardTextHeight="240"
    @cancel="cancel"
  >
    <template slot="content.card-text">
      <p class="font-weight-medium">
        公告标题
        <span>：</span>
        {{ info.title }}
      </p>
      <p class="font-weight-medium">
        公告内容
        <span>：</span>
        {{ info.content }}
      </p>
      <p class="font-weight-medium">
        公告资源链接
        <span>：</span>
        {{ info.url }}
      </p>
      <p class="font-weight-medium">
        公告状态
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
        title: '公告标题',
        content: '公告内容',
        url: '公告资源链接',
        createdTime: '创建时间',
        updatedTime: '更新时间',
        status: '公告状态'
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
      let announcementId = parent.getUseAnnouncementId()
      //打开对话框
      this.show = true
      this.getAnnouncementInfo(announcementId)
    },
    getAnnouncementInfo(announcementId) {
      let vm = this
      this.$api.announcement
        .toGetInfoById(announcementId)
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
