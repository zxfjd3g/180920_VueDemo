<template>
  <ul class="todo-main">
    <Item v-for="(todo, index) in todos" :key="index" :todo="todo"/>
  </ul>
</template>

<script>
  import Item from './Item.vue'

  export default {
    // 声明接收属性: 属性名
    // 所有接收的标签属性都会成功当前组件对象的属性
    props: ['todos'],


    components: {
      Item
    }
  }
</script>

<style scoped>
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
</style>
