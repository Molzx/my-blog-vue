/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-21 12:25:08
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-03-31 15:18:41
 * @FilePath     : \VueProjects\my-blog\src\assets\data\table-header.js
 * @Description  : 系统展示表格头部数据
 */

export const user = [
  {
    text: '',
    sortable: false,
    value: 'userId',
    align: 'center',
    width: 70
  },
  { text: '账号', value: 'userName', align: 'center', width: 120 },
  { text: '昵称', value: 'nickName', align: 'center', width: 120 },
  // { text: '用户头像地址', value: 'avatar' },
  // { text: '个性签名', value: 'autograph' },
  { text: '性别', value: 'gender', align: 'center', width: 70 },
  { text: '手机号码', value: 'phone', align: 'center', width: 170 },
  { text: '邮箱', value: 'email', align: 'center', width: 170 },
  { text: '上次登录时间', value: 'loginedTime', align: 'center', width: 170 },
  // { text: '明文密码', value: 'pwd' },
  { text: '用户状态', value: 'state', align: 'center', width: 70 },
  { text: '创建时间', value: 'createdTime', align: 'center', width: 170 },
  { text: '更新时间', value: 'updatedTime', align: 'center', width: 170 },
  { text: '状态标记', value: 'status', align: 'center', width: 70 },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 170
  }
]

export const role = [
  {
    text: '',
    sortable: false,
    align: 'center',
    value: 'roleId',
    width: 70
  },
  { text: '代码', value: 'code', align: 'center', width: 170 },
  { text: '名称', value: 'name', align: 'center', width: 170 },
  { text: '描述', value: 'description', align: 'center', width: 250 },
  { text: '状态', value: 'status', align: 'center', width: 70 },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 170
  }
]
export const permission = [
  {
    text: '',
    sortable: false,
    value: 'permissionId',
    align: 'center',
    width: 70
  },
  { text: '接口链接', value: 'url', align: 'center', width: 170 },
  { text: '接口路径', value: 'path', align: 'center', width: 170 },
  { text: '接口类型', value: 'type', align: 'center', width: 100 },
  { text: '名称', value: 'name', align: 'center', width: 170 },
  { text: '状态', value: 'status', align: 'center', width: 70 },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 170
  }
]

export const file = [
  //===自定义字段，用于cardtable展示，
  //显示为主标题的字段
  // title: false,
  //显示为副标题的字段
  // subTitle:false,
  // //哪个字段不显示
  // show: false
  {
    text: 'id',
    align: 'center',
    sortable: false,
    value: 'id'
  },
  {
    text: '名称',
    value: 'name',
    //显示为主标题的字段
    title: true
  },
  { text: '描述', value: 'description' },
  { text: '状态', value: 'status' },
  {
    text: '保存的文件名',
    value: 'fileName'
  },
  {
    text: '文件原始名',
    value: 'originName',
    //显示为副标题的字段
    subTitle: true
  },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 170,
    show: false
  }
]

export const tag = [
  {
    text: '',
    sortable: false,
    value: 'tagId',
    align: 'center',
    width: 70
  },
  { text: '标签名称', value: 'tagName', align: 'center', width: 250 },
  { text: '标签状态', value: 'status', align: 'center', width: 70 },
  { text: '创建时间', value: 'createdTime', align: 'center', width: 170 },
  { text: '更新时间', value: 'updatedTime', align: 'center', width: 170 },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 170
  }
]

export const category = [
  {
    text: '',
    sortable: false,
    value: 'categoryId',
    align: 'center',
    width: 70
  },
  { text: '分类名称', value: 'categoryName', align: 'center', width: 250 },
  { text: '分类状态', value: 'status', align: 'center', width: 70 },
  { text: '创建时间', value: 'createdTime', align: 'center', width: 170 },
  { text: '更新时间', value: 'updatedTime', align: 'center', width: 170 },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 170
  }
]
export const article = [
  {
    text: '',
    align: 'center',
    sortable: false,
    value: 'articleId',
    width: 70
  },
  { text: '文章标题', value: 'title', align: 'center', width: 200 },
  { text: '文章类型', value: 'type', align: 'center', width: 70 },
  { text: '赞赏功能', value: 'admirationStatus', align: 'center', width: 70 },
  { text: '版权声明', value: 'copyrightStatus', align: 'center', width: 70 },
  { text: '转载声明', value: 'reprintStatus', align: 'center', width: 70 },
  { text: '评论功能', value: 'commentStatus', align: 'center', width: 70 },
  { text: '发布状态', value: 'publishedStatus', align: 'center', width: 70 },
  { text: '推荐状态', value: 'recommendStatus', align: 'center', width: 70 },
  { text: '状态标记', value: 'status', align: 'center', width: 70 },
  { text: '创建时间', value: 'createdTime', align: 'center', width: 170 },
  {
    text: '更新时间',
    value: 'updatedTime',
    align: 'center',
    width: 170
  },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 170
  }
]
export const comment = [
  {
    text: '',
    sortable: false,
    value: 'commentId',
    align: 'center',
    width: 70
  },
  {
    text: '所属资源id',
    sortable: false,
    value: 'ownerId',
    align: 'center',
    width: 120
  },
  // { text: '类型', value: 'type' },
  { text: '发布人ID', value: 'fromUid', align: 'center', width: 70 },
  { text: '发布人帐号', value: 'fromUserName', align: 'center', width: 120 },
  // { text: '发布人昵称', value: 'fromNickName' },
  { text: '被回复人ID', value: 'toUid', align: 'center', width: 120 },
  { text: '被回复人帐号', value: 'toUserName', align: 'center', width: 120 },
  // { text: '被回复人昵称', value: 'toNickName' },
  { text: '内容', value: 'content', align: 'center', width: 200 },
  { text: '状态', value: 'status', align: 'center', width: 70 },
  { text: '创建时间', value: 'createdTime', align: 'center', width: 170 },
  { text: '更新时间', value: 'updatedTime', align: 'center', width: 170 },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 170
  }
]

export const announcement = [
  {
    text: '',
    sortable: false,
    value: 'id',
    align: 'center',
    width: 70
  },
  { text: '标题', value: 'title', align: 'center', width: 200 },
  { text: '内容', value: 'content', align: 'center', width: 200 },
  // { text: '封面链接', value: 'url', align: 'center', width: 120 },
  { text: '创建时间', value: 'createdTime', align: 'center', width: 170 },
  { text: '更新时间', value: 'updatedTime', align: 'center', width: 170 },
  { text: '状态', value: 'status', align: 'center', width: 70 },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 170
  }
]

export const report = [
  {
    text: '',
    sortable: false,
    value: 'id',
    align: 'center',
    width: 70
  },
  { text: '举报人', value: 'reporter', align: 'center', width: 70 },
  { text: '被举报人', value: 'accusedUser', align: 'center', width: 70 },
  { text: '举报理由', value: 'reason', align: 'center', width: 200 },
  { text: '处理状态', value: 'handledStatus', align: 'center', width: 70 },
  { text: '创建时间', value: 'createdTime', align: 'center', width: 170 },
  { text: '更新时间', value: 'updatedTime', align: 'center', width: 170 },
  { text: '状态', value: 'status', align: 'center', width: 70 },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 170
  }
]
