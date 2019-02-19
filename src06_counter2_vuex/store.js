/*
vuex最核心的管理对象模块: store
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
包含所有状态数据的对象
相当于data
 */
const state = {
  count: 3,  // 指定初始状态数据
}

/*
包含n个用于直接更新状态数据方法的对象
 */
const mutations = {
  // 增加1
  INCREMENT (state) {
    state.count++
  },

  // 减少1
  DECREMENT (state) {
    state.count--
  },
}

/*
包含n个用于间接更新状态数据方法的对象
 */
const actions = {
  increment ({commit}) { // increment({commit(){}})
    commit('INCREMENT')
  },

  decrement ({commit}) {
    commit('DECREMENT')
  },
  incrementIfOdd ({commit, state}) {
    if(state.count%2===1) {
      commit('INCREMENT')
    }

  },
  incrementAsync ({commit}) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000)
  },
}

/*
包含...的对象
 */
const getters = {
  evenOrOdd (state) {
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})