<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <List :todos="todos" :deleteTodo="deleteTodo"/>
      <Footer :todos="todos" :clearAllComplete="clearAllComplete" :selectAll="selectAll"/>
    </div>
  </div>
</template>
<script>
  /*
  1. 如何判断状态保存在哪个组件?  看数据是哪个组件需要还是哪些组件需要
  2. 更新状态数据的行为(方法)定义在哪个组件?  看状态数据在哪个组件
   */
  import Header from './components/Header.vue'
  import List from './components/List.vue'
  import Footer from './components/Footer.vue'

  import storageUtil from './util/storageUtil'

  export default {
    data () {
      return {
        todos: storageUtil.getTodos()
      }
    },

    methods: {
      addTodo (todo) {
        this.todos.unshift(todo)
      },

      deleteTodo (index) {
        this.todos.splice(index, 1)
      },

      clearAllComplete () {
        this.todos = this.todos.filter(todo => !todo.complete)
      },

      // 对所有todo进行选中/不选中
      selectAll (check) {
        this.todos.forEach(todo => todo.complete = check)
      }
    },

    watch: {
      todos: {
        deep: true, // 深度监视
        /*handler:  function (value)  {// value是todos最新的值
          // 将todos最新的值的json数据保存到localStorage
          storageUtil.saveTodos(value)
        }*/
        handler: storageUtil.saveTodos
        /*handler: function (todos) {
          localStorage.setItem('todos_key', JSON.stringify(todos))
        }*/
      }
    },
    components: {
      Header,
      List,
      Footer
    }
  }
</script>
<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
