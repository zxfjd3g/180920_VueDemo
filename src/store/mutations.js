/*
包含n个用于直接更新状态数据的方法的对象
 */
import {
  REQUESTING,
  REQUEST_SUCCESS,
  REQUEST_FAIL
} from './mutation-types'
export default {
  // 更新状态为请求中
  [REQUESTING] (state) {
    state.firstView = false
    state.loading = true
  },

  // 请求成功
  [REQUEST_SUCCESS] (state, users) {
    state.loading = false
    state.users = users
  },

  // 请求失败
  [REQUEST_FAIL] (state, errorMsg) {
    state.loading = false
    state.errorMsg = errorMsg
  }
}