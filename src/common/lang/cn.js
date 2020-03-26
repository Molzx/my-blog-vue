/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-24 13:46:12
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-04 14:00:40
 * @FilePath     : \VueProjects\my-blog\src\common\lang\cn.js
 * @Description  : 这是一些注释
 */

// 引入中文文件
// import zh_CN from 'vee-validate/dist/locale/zh_CN.json'
export default {
  $vuetify: {
    badge: 'Badge',
    close: '关闭',
    dataIterator: {
      noResultsText: '没有记录',
      loadingText: '正在加载数据...'
    },
    dataTable: {
      itemsPerPageText: '每页的记录数:',
      ariaLabel: {
        sortDescending: ': Sorted descending. Activate to remove sorting.',
        sortAscending: ': Sorted ascending. Activate to sort descending.',
        sortNone: ': Not sorted. Activate to sort ascending.'
      },
      sortBy: 'Sort by'
    },
    dataFooter: {
      itemsPerPageText: '每页的记录数:',
      itemsPerPageAll: '全部',
      nextPage: '下一页',
      prevPage: '上一页',
      firstPage: '第一页',
      lastPage: '最后一页',
      pageText: '第 {0}-{1} 条，共 {2} 条'
    },
    datePicker: {
      itemsSelected: '{0} 已选中'
    },
    noDataText: '没有有效的数据',
    carousel: {
      prev: 'Previous visual',
      next: 'Next visual',
      ariaLabel: {
        delimiter: 'Carousel slide {0} of {1}'
      }
    },
    calendar: {
      moreEvents: '{0} more'
    },
    fileInput: {
      counter: '{0} 个文件',
      counterSize: '{0} 个文件 (最多 {1} 个)'
    },
    timePicker: {
      am: 'AM',
      pm: 'PM'
    }
  },
  fields: {
    captcha: '验证码',
    account: '帐号',
    avatar: '头像',
    nickName: '昵称',
    autograph: '个性签名',
    gender: '性别',
    phone: '手机号码',
    email: '邮箱',
    password: '密码',
    repassword: '确认密码',
    state: '用户状态',
    status: '帐号状态',
    //==
    roleCode: '角色代码',
    roleName: '角色名称',
    roleDescription: '角色描述',
    roleStatus: '角色状态',
    //==

    pUrl: '权限链接',
    pPath: '接口路径',
    pType: '接口类型',
    pName: '权限名称',
    pDescription: '权限描述',
    pcomponent: '组件',
    pStatus: '权限状态',

    //====
    file: '文件',
    fileCategory: '文件类型',
    fileName: '文件名称',
    fileDescription: '文件描述',
    fileStatus: '文件状态',

    tagName: '标签名称',
    tagStatus: '标签状态',
    categoryName: '分类名称',
    categoryStatus: '分类状态',

    //========博客文章
    blog_id: '博客表主键ID',
    user_id: '发布的用户帐号ID',
    category_id: '所属类别信息ID',
    article_title: '文章标题',
    article_description: '文章描述',
    article_cover_file: '文章封面文件',
    article_cover: '文章封面路径',
    article_content: '文章内容',
    article_md_content: '文章md格式内容',
    article_read: '文章阅读量',
    article_liked: '文章点赞量',
    article_collected: '文章收藏量',
    article_shared: '文章分享量',
    article_admiration_status: '赞赏功能 ',
    article_copyright_status: '版权声明',
    article_reprint_status: '转载声明',
    article_comment_status: '评论功能',
    article_published_status: '发布状态',
    article_recommend_status: '推荐状态',
    article_status: '状态标记',

    //====评论功能
    comment: '评论',
    commentType: '评论类型',
    commentContent: '评论内容',
    commentStatus: '评论状态',
    commentSticky: '置顶状态',
    commentOwnerId: '评论主资源Id',
    commentParentId: '回复评论Id',
    commentFromUser: '评论人',
    commentToUser: '被评论人'
  },
  // validation: zh_CN.messages
  validation: {
    alpha: '{_field_}只能包含字母字符',
    alpha_dash: '{_field_}能够包含字母数字字符、破折号和下划线',
    alpha_num: '{_field_}只能包含字母数字字符',
    alpha_spaces: '{_field_}只能包含字母字符和空格',
    between: '{_field_}必须在{min}与{max}之间',
    confirmed: '两次输入{_field_}不一样',
    // confirmed: '{_field_}不能和{target}匹配',
    digits: '{_field_}必须是数字，且精确到{length}位数',
    dimensions: '{_field_}必须在{width}像素与{height}像素之间',
    email: '{_field_}不是一个有效的邮箱',
    excluded: '{_field_}不是一个有效值',
    ext: '{_field_}不是一个有效的文件',
    image: '{_field_}不是一张有效的图片',
    oneOf: '{_field_}不是一个有效值',
    integer: '{_field_}必须是整数',
    length: '{_field_}长度必须为{length}',
    max: '{_field_}不能超过{length}个字符',
    max_value: '{_field_}必须小于或等于{max}',
    mimes: '{_field_}不是一个有效的文件类型',
    min: '{_field_}必须至少有{length}个字符',
    min_value: '{_field_}必须大于或等于{min}',
    numeric: '{_field_}只能包含数字字符',
    regex: '{_field_}格式无效',
    required: '{_field_}不能为空',
    required_if: '{_field_}是必须的',
    size: '{_field_}必须小于{size}KB',
    //===========
    _default: field => `${field}无效`,
    after: (field, [target]) => `${field}必须在${target}之后`,
    before: (field, [target]) => `${field}必须在${target}之前`,
    credit_card: field => `${field}格式错误`,
    date_between: (field, [min, max]) => `${field}必须在${min}和${max}之间`,
    date_format: (field, [format]) => `${field}必须符合${format}格式`,
    decimal: (field, [decimals = '*'] = []) =>
      `${field}必须是数字，且能够保留${decimals === '*' ? '' : decimals}位小数`,
    included: field => `${field}不是一个有效值`,
    ip: field => `${field}不是一个有效的地址`,
    length1: (field, [length, max]) => {
      if (max) {
        return `${field}长度必须在${length}到${max}之间`
      }
      return `${field}长度必须为${length}`
    },
    url: field => field + '不是一个有效的url',
    //===========
    nickName: '姓名只能包括中文字或英文字母',
    phone: '请输入正确的手机号码'
  }
}
