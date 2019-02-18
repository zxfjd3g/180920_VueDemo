import Vue from 'vue'
import App from './App.vue'

import Footer from './components/Footer.vue'

import './base.css'

/*
注册全局组件
Vue.component('Footer', Footer)
Vue.component('Xxx', {
  data () {
    return {

    }
  },
  template: '<Footer/>'
})*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
