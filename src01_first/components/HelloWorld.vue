<template>
  <div>
    <h2>{{msg}}</h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'HelloWorld Component'
    }
  }
}
</script>

<style scoped>
  h2 {
    color: red;
  }
</style>
