/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-21 12:25:08
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-07 14:51:04
 * @FilePath     : \VueProjects\my-blog\src\assets\data\table-header.js
 * @Description  : 系统展示表格头部数据
 */

export const user = [
  {
    text: '',
    align: 'center',
    sortable: false,
    value: 'userId'
  },
  { text: '账号', value: 'userName' },
  { text: '昵称', value: 'nickName' },
  // { text: '用户头像地址', value: 'avatar' },
  // { text: '个性签名', value: 'autograph' },
  { text: '性别', value: 'gender' },
  { text: '手机号码', value: 'phone' },
  { text: '邮箱', value: 'email' },
  { text: '上次登录时间', value: 'loginedTime' },
  // { text: '明文密码', value: 'pwd' },
  { text: '用户状态', value: 'state' },
  // { text: '创建时间', value: 'createdTime' },
  // { text: '更新时间', value: 'updatedTime' },
  { text: '状态标记', value: 'status' },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 140
  }
]

export const role = [
  {
    text: '',
    align: 'center',
    sortable: false,
    value: 'roleId'
  },
  { text: '代码', value: 'code' },
  { text: '名称', value: 'name' },
  { text: '描述', value: 'description' },
  { text: '状态', value: 'status' },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 140
  }
]
export const permission = [
  {
    text: '',
    align: 'center',
    sortable: false,
    value: 'permissionId'
  },
  { text: '接口链接', value: 'url' },
  { text: '接口路径', value: 'path' },
  { text: '接口类型', value: 'type' },
  { text: '名称', value: 'name' },
  { text: '状态', value: 'status' },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 140
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
    width: 140,
    show: false
  }
]

export const tag = [
  {
    text: '',
    align: 'center',
    sortable: false,
    value: 'tagId'
  },
  { text: '标签名称', value: 'tagName' },
  { text: '标签状态', value: 'status' },
  { text: '创建时间', value: 'createdTime' },
  { text: '更新时间', value: 'updatedTime' },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 140
  }
]

export const category = [
  {
    text: '',
    align: 'center',
    sortable: false,
    value: 'categoryId'
  },
  { text: '分类名称', value: 'categoryName' },
  { text: '分类状态', value: 'status' },
  { text: '创建时间', value: 'createdTime' },
  { text: '更新时间', value: 'updatedTime' },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 140
  }
]
export const article = [
  {
    text: '',
    align: 'center',
    sortable: false,
    value: 'articleId'
  },
  { text: '文章标题', value: 'title' },
  { text: '文章类型', value: 'type' },
  { text: '赞赏功能', value: 'admirationStatus' },
  { text: '版权声明', value: 'copyrightStatus' },
  { text: '转载声明', value: 'reprintStatus' },
  { text: '评论功能', value: 'commentStatus' },
  { text: '发布状态', value: 'publishedStatus' },
  { text: '推荐状态', value: 'recommendStatus' },
  { text: '状态标记', value: 'status' },
  { text: '创建时间', value: 'createdTime' },
  { text: '更新时间', value: 'updatedTime' },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 140
  }
]
export const comment = [
  {
    text: '',
    align: 'center',
    sortable: false,
    value: 'commentId'
  },
  {
    text: '被评论的资源id',
    align: 'center',
    sortable: false,
    value: 'ownerId'
  },
  { text: '评论类型', value: 'type' },
  { text: '发布评论的用户ID', value: 'fromUid' },
  { text: '发布评论的用户帐号', value: 'fromUserName' },
  { text: '发布评论的用户的昵称', value: 'fromNickName' },
  { text: '被评论的用户ID', value: 'toUid' },
  { text: '被评论的用户帐号', value: 'toUserName' },
  { text: '被评论的用户的昵称', value: 'toNickName' },
  { text: '评论内容', value: 'content' },
  { text: '评论状态', value: 'status' },
  { text: '创建时间', value: 'createdTime' },
  { text: '更新时间', value: 'updatedTime' },
  {
    text: '可用操作',
    value: 'action',
    sortable: false,
    align: 'center',
    width: 140
  }
]
