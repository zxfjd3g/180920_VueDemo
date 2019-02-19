import Vue from 'vue'
import App from './App.vue'
import store from './store/index'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  store
})
