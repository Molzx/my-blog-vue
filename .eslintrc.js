/*
 * @Author       : xuzhenghao
 * @Date         : 2020-01-18 14:01:53
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-01-18 15:45:51
 * @FilePath     : \VueProjects\my-blog\.eslintrc.js
 * @Description  : 这是一些注释
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/prettier',
    'plugin:prettier/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
