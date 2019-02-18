<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="add"/>
  </div>
</template>

<script>
  export default {
    // 声明接收属性: 属性的名称/值的类型/必要性
    props: {
      /*addTodo: {
        type: Function,
        required: true
      }*/
    },

    data () {
      return {
        title: '', // todo的标题
      }
    },

    methods: {
      add () {
        // 根据输入生成一个todo对象
        const title = this.title.trim()
        if(!title) {
          return
        }
        const todo = {
          title,
          complete: false
        }
        // 添加到todos中显示
        // this.addTodo(todo)
        // 分发自定义事件(addTodo)
        this.$emit('addTodo', todo)

        // 清除输入
        this.title = ''
      }
    }
  }
</script>

<style scoped>
  .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
  }

  .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
  }
</style>
