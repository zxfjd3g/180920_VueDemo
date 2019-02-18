import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

// 声明使用vue插件
Vue.use(VueResource) // 内部给所有组件对象添加一个属性: $http, $http.get()/post()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
