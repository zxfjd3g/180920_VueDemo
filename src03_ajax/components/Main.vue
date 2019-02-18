<template>
  <h2 v-if="firstView">输入关键字搜索</h2>
  <h2 v-else-if="loading">请求中...</h2>
  <h2 v-else-if="errorMsg">{{errorMsg}}</h2>
  <div v-else>
    <div class="row">
      <div class="card" v-for="(user, index) in users" :key="index">
        <a :href="user.url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import axios from 'axios'

  export default {
    data () {
      return {
        firstView: true, // 是否显示初始界面
        loading: false, // 是否正在请求加载中
        errorMsg: '', // 请求失败需要显示的错误信息
        users: [], // 所有匹配的用户列表
      }
    },

    mounted () {
      // 订阅消息(search)
      PubSub.subscribe('search', (msg, searchName) => {
        // 更新状态数据(请求中)
        this.firstView = false
        this.loading = true
        // 发ajax请求获取users
        const url = `https://api.github.com/search/users2?q=${searchName}`
        axios.get(url).then(response => {
          // 成功了, 更新状态(成功)
          const result = response.data
          const users = result.items.map(item => ({
            name: item.login,
            url: item.html_url,
            avatar_url: item.avatar_url
          }))
          this.loading = false
          this.users = users
        }).catch(error => {
          // 失败了, 更新状态(失败)
          this.loading = false
          this.errorMsg = '请求出错了'
        })

      })
    }
  }
</script>

<style scoped>
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }

</style>
