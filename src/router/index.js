/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'

Vue.use(VueRouter)


export default new VueRouter({
  mode: 'history', // 路由链接不带#
  // 所有的路由
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/',
      redirect: '/about'
    }
  ]
})