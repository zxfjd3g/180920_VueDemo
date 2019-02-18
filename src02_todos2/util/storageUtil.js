
export default {
  saveTodos (todos) {
    localStorage.setItem('todos_key', JSON.stringify(todos))
  },

  getTodos () {
    return JSON.parse(localStorage.getItem('todos_key')||'[]')
  }
}