<template>
  <ul>
    <li>id: {{$route.params.id}}</li>
    <li>title: {{detail.title}}</li>
    <li>content: {{detail.content}}</li>
  </ul>
</template>

<script>
  const allMessageDetails = [
    {id: 1, title: 'message001', content: 'message content001....'},
    {id: 3, title: 'message003', content: 'message content003....'},
    {id: 5, title: 'message005', content: 'message content005....'},
  ]
  export default {
    data () {
      return {
        detail: {}
      }
    },

    mounted () {
      console.log('mounted()')
      const id = this.$route.params.id * 1
      // 查找对应的detail
      const detail = allMessageDetails.find(detail => detail.id===id)
      // 更新状态
      this.detail = detail
    },

    watch: {
      $route (value) { // value是$route的最新值
        const id = value.params.id * 1
        // 查找对应的detail
        const detail = allMessageDetails.find(detail => detail.id===id)
        // 更新状态
        this.detail = detail
      }
    }
  }
</script>

<style scoped>

</style>
