/*
包含n个状态数据的对象
 */
export default {
  firstView: true, // 是否显示初始界面
  loading: false, // 是否正在请求加载中
  errorMsg: '', // 请求失败需要显示的错误信息
  users: [], // 所有匹配的用户列表
}