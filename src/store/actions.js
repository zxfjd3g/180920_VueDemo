/*
包含n个用于间接更新状态数据的方法的对象
 */
import axios from 'axios'
import {
  REQUESTING,
  REQUEST_SUCCESS,
  REQUEST_FAIL
} from './mutation-types'

export default {

  /*
  异步搜索的action
   */
  search ({commit}, searchName) {

    // 更新状态(请求中)
    commit(REQUESTING)

    // 发送异步ajax请求获取users
    const url = `https://api.github.com/search/users?q=${searchName}`
    axios.get(url).then(response => {
      // 成功了, 更新状态(成功)
      const result = response.data
      const users = result.items.map(item => ({
        name: item.login,
        url: item.html_url,
        avatar_url: item.avatar_url
      }))
      commit(REQUEST_SUCCESS, users)
    }).catch(error => {
      // 失败了, 更新状态(失败)
      commit(REQUEST_FAIL, '请求失败....')
    })

  }
}