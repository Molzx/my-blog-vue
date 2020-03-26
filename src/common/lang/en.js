/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-24 13:46:07
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-09 10:49:14
 * @FilePath     : \VueProjects\my-blog\src\common\lang\en.js
 * @Description  : 这是一些注释
 */

// 引入英文文件
// import en from 'vee-validate/dist/locale/en.json'
export default {
  $vuetify: {
    badge: 'Badge',
    close: 'Close',
    dataIterator: {
      noResultsText: 'No matching records found',
      loadingText: 'Loading items...'
    },
    dataTable: {
      itemsPerPageText: 'Rows per page:',
      ariaLabel: {
        sortDescending: ': Sorted descending. Activate to remove sorting.',
        sortAscending: ': Sorted ascending. Activate to sort descending.',
        sortNone: ': Not sorted. Activate to sort ascending.'
      },
      sortBy: 'Sort by'
    },
    dataFooter: {
      itemsPerPageText: 'Items per page:',
      itemsPerPageAll: 'All',
      nextPage: 'Next page',
      prevPage: 'Previous page',
      firstPage: 'First page',
      lastPage: 'Last page',
      pageText: '{0}-{1} of {2}'
    },
    datePicker: {
      itemsSelected: '{0} selected'
    },
    noDataText: 'No data available',
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
      counter: '{0} files',
      counterSize: '{0} files ({1} in total)'
    },
    timePicker: {
      am: 'AM',
      pm: 'PM'
    }
  },
  fields: {
    captcha: 'Captcha',
    account: 'Account',
    avatar: 'Avatar',
    nickName: 'NickName',
    autograph: 'Autograph',
    gender: 'Gender',
    phone: 'Phone',
    email: 'E-mail',
    password: 'Password',
    repassword: 'Confirm Password',
    state: 'State',
    status: 'Status',
    //==
    roleCode: 'RoleCode',
    roleName: 'RoleName',
    roleDescription: 'RoleDescription',
    roleStatus: 'RoleStatus',
    //==

    pUrl: 'URL',
    pPath: 'Path',
    pType: 'Type',
    pName: 'Name',
    pDescription: 'Description',
    pcomponent: 'Component',
    pStatus: 'Status',
    //=======
    file: 'File',
    fileCategory: 'File Category',
    fileName: 'FileName',
    fileDescription: 'FileDescription',
    fileStatus: 'FileStatus',

    tagName: 'TagName',
    tagStatus: 'TagStatus',
    categoryName: 'CategoryName',
    categoryStatus: 'CategoryStatus',

    //========博客文章
    blog_id: 'BlogID',
    user_id: 'UserID',
    category_id: 'CategoryID',
    article_title: 'ArticleTitle',
    article_description: 'Article Description',
    article_cover: 'Cover URL',
    article_cover_file: 'Cover File',
    article_content: 'Article Content',
    article_md_content: 'Article Markdown Content',
    article_admiration_status: 'Admiration Status',
    article_copyright_status: 'Copyright Status',
    article_reprint_status: 'Reprint Status',
    article_comment_status: 'Comment Staus',
    article_published_status: 'Published Status',
    article_recommend_status: 'Recommend Status',
    article_status: 'Article Status',

    //====评论功能
    comment: 'Comment',
    commentType: 'CommentType',
    commentContent: 'Comment Content',
    commentStatus: 'Comment Status',
    commentSticky: 'CommentSticky',
    commentOwnerId: 'CommentOwnId',
    commentParentId: 'CommentParentId',
    commentFromUser: 'CommentFromUser',
    commentToUser: 'CommentToUser'
  },
  // validation: en.messages
  validation: {
    alpha: 'The {_field_} field may only contain alphabetic characters',
    alpha_num: 'The {_field_} field may only contain alpha-numeric characters',
    alpha_dash:
      'The {_field_} field may contain alpha-numeric characters as well as dashes and underscores',
    alpha_spaces:
      'The {_field_} field may only contain alphabetic characters as well as spaces',
    between: 'The {_field_} field must be between {min} and {max}',
    confirmed: 'The {_field_} field confirmation does not match',
    digits:
      'The {_field_} field must be numeric and exactly contain {length} digits',
    dimensions: 'The {_field_} field must be {width} pixels by {height} pixels',
    email: 'The {_field_} field must be a valid email',
    excluded: 'The {_field_} field is not a valid value',
    ext: 'The {_field_} field is not a valid file',
    image: 'The {_field_} field must be an image',
    integer: 'The {_field_} field must be an integer',
    length: 'The {_field_} field must be {length} long',
    max_value: 'The {_field_} field must be {max} or less',
    max: 'The {_field_} field may not be greater than {length} characters',
    mimes: 'The {_field_} field must have a valid file type',
    min_value: 'The {_field_} field must be {min} or more',
    min: 'The {_field_} field must be at least {length} characters',
    numeric: 'The {_field_} field may only contain numeric characters',
    oneOf: 'The {_field_} field is not a valid value',
    regex: 'The {_field_} field format is invalid',
    required_if: 'The {_field_} field is required',
    required: 'The {_field_} field is required',
    size: 'The {_field_} field size must be less than {size}KB',

    //==========自定义==========
    nickName: 'The nickname is not a valid value',
    phone: 'The phone number is not a valid value'
  }
}
