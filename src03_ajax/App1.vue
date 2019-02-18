<template>
  <div>
    <h3 v-if="!repoName">loading...</h3>
    <p v-else>most star repo is <a :href="repoUrl">{{repoName}}</a></p>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        repoName: '',
        repoUrl: ''
      }
    },

    mounted () {
      // 使用vue-resource发送异步ajax请求获取数据
      const url = 'https://api.github.com/search/repositories?q=r&sort=stars'
      /*this.$http.get(url).then(response => {// 成功
        const result = response.data
        const repo = result.items[0]
        this.repoName = repo.name
        this.repoUrl = repo.html_url
      }).catch(error => { // 异常
        alert('请求失败')
      })*/

      // 使用axios发送异步ajax请求获取数据
      axios.get(url).then(response => {// 成功
        const result = response.data
        const repo = result.items[0]
        this.repoName = repo.name
        this.repoUrl = repo.html_url
      }).catch(error => { // 异常
        alert('请求失败2')
      })
    }
  }
</script>
<style>

</style>
