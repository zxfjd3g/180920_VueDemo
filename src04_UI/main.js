import Vue from 'vue'
import App from './App.vue'
import {Button} from 'mint-ui'
// import 'mint-ui/lib/style.css'

// 全局注册
Vue.component(Button.name, Button) // mt-button
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
