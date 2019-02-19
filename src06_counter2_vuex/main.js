import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({// 配置对象
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  store, // 配置vuex的store
})
