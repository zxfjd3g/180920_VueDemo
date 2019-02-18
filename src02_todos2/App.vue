<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header @addTodo="addTodo"/>
      <List :todos="todos"/>
      <Footer>
        <input type="checkbox" v-model="isCheckAll" slot="left"/>
        <span slot="middle">
            <span>已完成{{completeSize}}</span> / 全部{{todos.length}}
        </span>
        <button class="btn btn-danger" slot="right" v-show="completeSize>0" @click="clearAllComplete">清除已完成任务</button>
      </Footer>
    </div>
  </div>
</template>
<script>
  /*
  1. 如何判断状态保存在哪个组件?  看数据是哪个组件需要还是哪些组件需要
  2. 更新状态数据的行为(方法)定义在哪个组件?  看状态数据在哪个组件
   */
  import PubSub from 'pubsub-js'
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

    computed: {
      // 已完成的数量
      completeSize () {
        return this.todos.reduce((pre, todo) => pre + (todo.complete ? 1 : 0), 0)
      },
      // 是否全选中
      isCheckAll: {
        get () {
          return this.todos.length === this.completeSize && this.completeSize>0
        },

        set (value) {// value: 最新的选中状态
          this.selectAll(value)
        }
      }

    },

    mounted () {
      // 订阅消息
      PubSub.subscribe('deleteTodo', (msg, index) => {
        this.deleteTodo(index)
      })
      // PubSub.subscribe('deleteTodo', this.deleteTodo)
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
